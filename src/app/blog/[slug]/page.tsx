  "use client";

  import { Navbar } from "@/components/navbar";
  import { Footer } from "@/components/footer";
  import { JSX, useEffect, useState } from "react";
  import { getBlog } from "@/api/blogAPI";
  import Output from "editorjs-react-renderer";
  import React from "react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
 

  // import Image from "next/image"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/profile/avatar";
import Comments from "@/components/blogs/comments";

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
          {data.items.map((item: any, index: number) => (
            <li key={index}>{item.content}</li>
          ))}
        </ListTag>
      );
    },
  };

  export default function BlogPost({ params }: any) {
    const Params: any = React.use(params);
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
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <article className="px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.heading}
                </h1>
    
                {/* Author and Icons */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                      <Avatar className="w-16 h-16 mx-auto">
                        <AvatarImage
                          src={post.author.profilePhoto}
                          alt={post.author.fullName}
                        />
                        <AvatarFallback className="sm:w-10 sm:h-10 sm:border-none">
                          {post.author.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{post.author.fullName}</p>
                      <p className="text-sm text-gray-500">
                        Published on{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-red-500 hover:text-red-600">
                      <FontAwesomeIcon icon={faHeart} size="lg" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      <FontAwesomeIcon icon={faBookmark} size="lg" />
                    </button>
                  </div>
                </div>
    
                {/* Cover Image */}
                {post.coverPhoto && (
                  <div className="bg-gray-200 h-64 mb-8 rounded border border-gray-300">
                    <img
                      src={post.coverPhoto || "/placeholder.svg"}
                      alt={post.heading}
                      className="w-full h-full rounded object-cover"
                    />
                  </div>
                )}
    
                {/* Blog Content */}
                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <Output data={parsedContent} renderers={renderers} />
                </div>
    
                {/* Tags */}
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
              </article>
            </div>
          </div>
          <Comments/>
        </main>
        <Footer />
      </div>
    );
    
    
  }
