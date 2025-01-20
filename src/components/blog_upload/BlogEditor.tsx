"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData, API } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/image";
import { ArrowLeft, Camera } from "lucide-react";
import Preview from "./Preview";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import { blogUpload } from "@/api/blogAPI";
import { useRouter } from "next/navigation";

// AWS S3 configuration
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

interface BlogContent {
  title: string;
  content: OutputData;
  tags: string[];
  coverPhoto: string | null;
  draft: boolean;
}

const BlogEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [lastSaved, setLastSaved] = useState<string>("2 minutes ago");
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [blogContent, setBlogContent] = useState<BlogContent>({
    title: "",
    content: { blocks: [] },
    tags: [],
    coverPhoto: null,
    draft: true,
  });
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!isPreviewMode && editorRef.current && !editor) {
      const editorInstance = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          image: SimpleImage,
        },
        data: blogContent.content,
        placeholder: "Start writing your blog post here...",
        onChange: (api: API) => {
          updateWordAndCharCount(api);
        },
        onReady: () => {
          setEditor(editorInstance);
        },
        autofocus: true,
      });
    }

    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [isPreviewMode, editor]);

  const updateWordAndCharCount = async (api: API) => {
    const content = await api.saver.save();
    let words = 0;
    let chars = 0;

    if (content && Array.isArray(content.blocks)) {
      content.blocks.forEach((block) => {
        if (block.data && typeof block.data.text === "string") {
          words += block.data.text.trim().split(/\s+/).length;
          chars += block.data.text.length;
        }
      });
    }

    setWordCount(words);
    setCharCount(chars);
    setBlogContent((prev) => ({ ...prev, content }));
  };

  const handleSave = async (publishMode: boolean = false) => {
    if (editor) {
      try {
        const content = await editor.save();
        console.log(content);
        const blogData = {
          heading: blogContent.title,
          tags: blogContent.tags,
          coverPhoto: uploadedImage,
          content: JSON.stringify(content),
          draft: publishMode ? false : blogContent.draft,
        };

        console.log(blogData);

        const response = await blogUpload(blogData);
        const slug = response.data.blog.slug;
        router.push(`/blog/${slug}`);

        console.log("Blog saved successfully:", response.data);
        setLastSaved("just now");
        setBlogContent((prev) => ({
          ...prev,
          content,
          draft: publishMode ? false : prev.draft,
        }));

        if (publishMode) {
          setUploadMessage("Blog published successfully!");
        } else {
          setUploadMessage("Draft saved successfully!");
        }
        setTimeout(() => setUploadMessage(null), 3000);
      } catch (error) {
        console.error("Error saving content:", error);
        setUploadMessage("Failed to save. Please try again.");
        setTimeout(() => setUploadMessage(null), 3000);
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create a unique file name
        const fileName = `${Date.now()}-${file.name}`;

        // Convert file to buffer
        const buffer = await file.arrayBuffer();

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
          Key: `blog-images/${fileName}`,
          Body: new Uint8Array(buffer),
          ContentType: file.type,
          ACL: "public-read",
        });

        await s3Client.send(command);

        // Generate the URL for the uploaded image
        const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/blog-images/${fileName}`;

        setUploadedImage(imageUrl);
        setBlogContent((prev) => ({ ...prev, coverPhoto: imageUrl }));

        setUploadMessage("Image uploaded successfully!");
        setTimeout(() => setUploadMessage(null), 3000);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadMessage("Failed to upload the image. Please try again.");
        setTimeout(() => setUploadMessage(null), 3000);
      }
    }
  };

  const togglePreviewMode = async () => {
    if (!isPreviewMode && editor) {
      try {
        const content = await editor.save();
        setBlogContent((prev) => ({ ...prev, content }));
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
    setIsPreviewMode(!isPreviewMode);
  };

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setBlogContent((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
      setUploadMessage("Tag added successfully!");
      setTimeout(() => setUploadMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Enter blog title..."
              className="border-none text-lg font-medium focus:outline-none"
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              Last saved {lastSaved}
            </span>
            <button
              className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => handleSave(false)}
            >
              Save Draft
            </button>
            <button
              className="rounded border bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
              onClick={() => handleSave(true)}
            >
              Publish
            </button>
            <button
              className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
              onClick={togglePreviewMode}
            >
              {isPreviewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1fr,300px]">
        <div className="space-y-6">
          {isPreviewMode ? (
            <Preview content={blogContent} />
          ) : (
            <div className="rounded-lg border bg-white p-6">
              <div id="editorjs" ref={editorRef} className="min-h-[400px]" />
              <div className="mt-4 text-sm text-gray-500">
                Words: {wordCount} Characters: {charCount}
                <span className="float-right text-green-500">
                  Changes saved
                </span>
              </div>
            </div>
          )}
          {uploadedImage && (
            <div className="rounded-lg border bg-white p-4">
              <h3 className="font-medium">Uploaded Image Preview</h3>
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="mt-4 rounded-lg max-w-full h-auto"
              />
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Categories</h3>
            <select className="w-full rounded-md border p-2">
              <option>AI</option>
              <option>Computer Science</option>
              <option>Agents</option>
              <option>Currency</option>
              <option>Computer</option>
              <option>Pollution</option>
              <option>Environment</option>
            </select>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Tags</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              {blogContent.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                className="w-full rounded-md border p-2"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag();
                  }
                }}
              />
              <button
                onClick={handleAddTag}
                className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Featured Image</h3>
            <div className="flex items-center justify-center">
              <label
                htmlFor="imageUpload"
                className="flex cursor-pointer items-center rounded-lg border border-dashed px-4 py-8 text-center"
              >
                <Camera className="mx-auto mb-2 h-6 w-6" />
                <span className="text-sm text-gray-500">
                  Click to upload an image
                </span>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </aside>
      </main>

      {/* Toast Message */}
      {uploadMessage && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
