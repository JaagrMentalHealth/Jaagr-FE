"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { JSX, useEffect, useState } from "react";
import { getBlog } from "@/api/blogAPI";
import Output from "editorjs-react-renderer";
import React from "react";
// import Image from "next/image"

interface Author {
  _id: string;
  userName: string;
  fullName: string;
  profilePhoto: string;
}

interface BlogPost {
  _id: string;
  heading: string;
  tags: string[];
  coverPhoto: string | null;
  author: Author;
  content: string;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const renderers = {
  header: ({ data }: any) => {
    const Tag = `h${data.level}` as keyof JSX.IntrinsicElements;
    return <Tag className="text-2xl font-bold mt-6 mb-4">{data.text}</Tag>;
  },
  paragraph: ({ data }: any) => <p className="mb-4">{data.text}</p>,
  list: ({ data }: any) => {
    const ListTag = data.style === "ordered" ? "ol" : "ul";
    return (
      <ListTag className="list-disc list-inside mb-4">
        {data.items.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
    );
  },
};

export default function BlogPost({params}:any) {
  const Params:any=React.use(params)
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsLoading(true);
        const res = await getBlog(Params.slug);
        setPost(res.data.blog);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blog. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [Params.slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">
            {error || "Blog post not found"}
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  const parsedContent = JSON.parse(post.content);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              {post.heading}
            </h1>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                  {post.author.profilePhoto && (
                    <img
                      src={post.author.profilePhoto || "/placeholder.svg"}
                      alt={post.author.fullName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{post.author.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    Published on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            {post.coverPhoto && (
              <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg">
                <img
                  src={post.coverPhoto || "/placeholder.svg"}
                  alt={post.heading}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              <Output data={parsedContent} renderers={renderers} />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
