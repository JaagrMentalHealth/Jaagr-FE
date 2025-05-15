"use client"

import { useEffect, useState } from "react"
import { deleteBlog } from "@/api/blogAPI"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { useUser } from "@/contexts/userContext"
import { findById } from "@/api/authAPI"

interface BlogCardProps {
  heading: string
  excerpt: string
  author: any
  date: string
  coverPhoto: string
  slug: string
  user?: any
}

function SkeletonBlogCard() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/9] relative overflow-hidden">
        <div className="h-full w-full bg-gray-200 animate-pulse" />
      </div>
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-200 animate-pulse" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-200 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

export function BlogCard({ heading, excerpt, author, date, coverPhoto, slug, user }: BlogCardProps) {
  const [writer, setWriter] = useState<string>("")
  const deleteStatus = user === author
  const { fetchUser } = useUser()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const res: any = await findById(author)
        if (res.status === 200) {
          setWriter(res.data.fullName)
        } else {
          setWriter(user || author)
        }
      } catch (error) {
        console.error("Error fetching author name:", error)
        setWriter(user || author)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFullName()
  }, [author, user])

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(slug)
      if (res.status === 204) {
        toast.success("Blog Deleted Successfully")
        fetchUser()
      } else {
        toast.error("Failed to delete blog")
      }
    } catch (err) {
      toast.error("An error occurred while deleting the blog")
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading) {
    return <SkeletonBlogCard />
  }

  return (
    <div
      className="relative "
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div
        className={`transform transition-transform z-20  relative duration-300 ${
          isHovered && deleteStatus ? "-translate-y-12" : ""
        }`}
      >
        <Link href={`/blog/${slug}`}>
          <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-[16/9]  relative overflow-hidden">
              <Image
                src={coverPhoto || "/window.svg"}
                alt={heading}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <h3 className="line-clamp-2 text-xl font-semibold">{heading}</h3>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="line-clamp-3 text-sm text-muted-foreground">{excerpt}</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      {/* {deleteStatus && (
        <div className="absolute inset-x-0 z-0 -bottom-2 p-2">
          <button
            onClick={handleDelete}
            className="w-full px-6 py-2 z-0 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Delete Blog
          </button>
        </div>
      )} */}
    </div>
  )
}
