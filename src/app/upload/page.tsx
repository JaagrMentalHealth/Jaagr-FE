'use client'

import dynamic from "next/dynamic";
// import BlogEditor from "@/components/blog_upload/BlogEditor";

const BlogEditor = dynamic(() => import("@/components/blog_upload/BlogEditor"), {
  ssr: false, // Disable SSR for this component
});

export default function UploadPage() {
  return <BlogEditor />;
}