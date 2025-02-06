import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData, API } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/image";
import { ArrowLeft, Camera } from "lucide-react";
import Preview from "./Preview";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { blogUpload } from "@/api/blogAPI";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// AWS S3 configuration

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// Image upload handler function
const handleEditorImageUpload = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: `blog-images/${fileName}`,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/blog-images/${fileName}`;

    return {
      success: 1,
      file: {
        url: imageUrl,
      },
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: 0,
      error: "Image upload failed",
    };
  }
};

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

  const handleRemoveTag = (index: any) => {
    setBlogContent((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const validateAndCleanEditorData = (data: OutputData): OutputData => {
    if (!data || !Array.isArray(data.blocks)) {
      return { blocks: [] }
    }

    const cleanedBlocks = data.blocks.filter((block) => {
      if (block.type === "paragraph" && (!block.data || !block.data.text)) {
        return false // Remove invalid paragraph blocks
      }
      return true
    })

    return { ...data, blocks: cleanedBlocks }
  }

  useEffect(() => {
    if (editorRef.current && !editor) {
      const editorInstance = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          image: {
            class: SimpleImage,
            inlineToolbar: true,
            config: {
              placeholder: "Paste image URL",
              types: "image/*",
              uploader: {
                uploadByFile: async (file: File) => {
                  try {
                    const fileName = `${Date.now()}-${file.name}`;
                    const buffer = await file.arrayBuffer();

                    const command = new PutObjectCommand({
                      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
                      Key: `blog-images/${fileName}`,
                      Body: new Uint8Array(buffer),
                      ContentType: file.type,
                      ACL: "public-read",
                    });

                    await s3Client.send(command);

                    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/blog-images/${fileName}`;

                    return {
                      success: 1,
                      file: {
                        url: imageUrl,
                      },
                    };
                  } catch (error) {
                    console.error("Error uploading image:", error);
                    return {
                      success: 0,
                      file: {
                        url: null,
                      },
                    };
                  }
                },
                uploadByUrl: async (url: string) => {
                  return {
                    success: 1,
                    file: {
                      url: url,
                    },
                  };
                },
              },
            },
          },
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
  }, [editor]);

  //Preview Mode CardContent

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
        console.log(response);
        if (
          response.status == 200 ||
          response.status == 201 ||
          response.status == "success"
        ) {
          console.log(response.data.data.blog);
          const slug = response.data.data.blog.slug;
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
        } else {
          console.log(response);
          toast.error(response);
        }
      } catch (error) {
        // toast.error(error)
        console.log(error);
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
        const fileName = `${Date.now()}-${file.name}`;
        const buffer = await file.arrayBuffer();

        const command = new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
          Key: `blog-images/${fileName}`,
          Body: new Uint8Array(buffer),
          ContentType: file.type,
          ACL: "public-read",
        });

        await s3Client.send(command);

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
    if (editor) {
      try {
        const content = await editor.save();
        console.log(content)
        setBlogContent((prev) => ({ ...prev, content }));
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
    // Instead of destroying the editor, just hide/show it
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
          <div className="flex items-center space-x-4 w-11/12">
            <button className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <textarea
              rows={1}
              placeholder="Enter blog title..."
              className="border-none text-lg font-medium focus:outline-none w-[70%] resize-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
              className="rounded bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600"
              onClick={togglePreviewMode}
            >
              {isPreviewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1fr,300px]">
        <div className="space-y-6">
          <div
            className={`${
              isPreviewMode ? "hidden" : "block"
            } rounded-lg border bg-white p-6`}
          >
            <div id="editorjs" ref={editorRef} className="min-h-[400px]" />
            <div className="mt-4 text-sm text-gray-500">
              Words: {wordCount} Characters: {charCount}
              <span className="float-right text-green-500">Changes saved</span>
            </div>
          </div>

          {isPreviewMode && <Preview content={blogContent} />}
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
              <option>Mental Health</option>
              <option>Anxiety</option>
              <option>Dipression</option>
              <option>Meditation</option>
              <option>Mindfulness</option>
              <option>Self-care</option>
              <option>Wellness</option>
              <option>Relationships</option>
            </select>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Tags</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              {blogContent.tags.map((tag, index) => (
                <div key={index} className="relative inline-flex items-center">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm relative pr-6">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="absolute top-0 right-0 -mt-1 -mr-1 rounded-full bg-purple-200 text-white text-xs px-1.5 py-0.5 hover:bg-red-300"
                      aria-label="Remove tag"
                    >
                      ×
                    </button>
                  </span>
                </div>
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
                className="rounded bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600"
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
