"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Pagination } from "@/components/pagination"
import { SearchBar } from "@/components/search-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllBlogs } from "@/api/blogAPI"
import { BlogSkeleton } from "@/components/blog-skeleton"

interface BlogPost {
  _id: string
  heading: string
  tags: string[]
  coverPhoto: string | null
  content: string
  likes: number
  views: number
  draft: boolean
  createdAt: string
  updatedAt: string
  slug: string
}

const categories = ["All", "Mental Health", "Mindfulness", "Depression", "Self-Care", "Wellness", "Relationships"]

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        const res = await getAllBlogs()
        setBlogs(res.data.blogs)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch Articles. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const getExcerpt = (content: string): string => {
    try {
      const parsedContent = JSON.parse(content)
      const firstParagraph = parsedContent.blocks.find((block: any) => block.type === "paragraph")
      return firstParagraph ? firstParagraph.data.text.slice(0, 150) + "..." : ""
    } catch (error) {
      console.error("Error parsing blog content:", error)
      return ""
    }
  }

  const filteredPosts = blogs.filter(
    (post:any) =>
      post.heading.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || post.tags.includes(selectedCategory)),
  )

  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 w-full max-w-4xl">
          {[...Array(6)].map((_, index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold">Articles</h1>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar onSearch={setSearchQuery} />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <BlogCard
                key={post._id}
                heading={post.heading}
                excerpt={getExcerpt(post.content)}
                coverPhoto={post.coverPhoto || "/placeholder.svg?height=200&width=300"}
                slug={post.slug}
              />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
              onPageChange={paginate}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
