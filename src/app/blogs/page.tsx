'use client'

import { useState } from 'react'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Pagination } from "@/components/pagination"
import { SearchBar } from "@/components/search-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for blog posts
const blogPosts = [
  {
    title: "Understanding Anxiety: Signs and Symptoms",
    excerpt: "Anxiety is a common mental health condition that affects millions of people worldwide. In this post, we'll explore the signs and symptoms of anxiety and discuss ways to manage it effectively.",
    author: "Dr. Emily Johnson",
    date: "May 15, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Mental Health",
    slug: "understanding-anxiety"
  },
  {
    title: "The Power of Mindfulness in Daily Life",
    excerpt: "Mindfulness is a powerful tool for reducing stress and improving overall well-being. Learn how to incorporate mindfulness practices into your daily routine for a more balanced life.",
    author: "Sarah Thompson",
    date: "June 2, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Mindfulness",
    slug: "power-of-mindfulness"
  },
  {
    title: "Breaking the Stigma: Talking About Depression",
    excerpt: "Depression is a serious mental health condition that often goes undiagnosed due to stigma. This post aims to open up the conversation about depression and encourage seeking help.",
    author: "Michael Chen",
    date: "June 20, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Depression",
    slug: "breaking-stigma-depression"
  },
  {
    title: "Self-Care Strategies for Busy Professionals",
    excerpt: "In the fast-paced world of modern work, self-care often takes a backseat. Discover practical self-care strategies that busy professionals can easily incorporate into their daily lives.",
    author: "Lisa Rodriguez",
    date: "July 5, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Self-Care",
    slug: "self-care-busy-professionals"
  },
  {
    title: "The Role of Exercise in Mental Health",
    excerpt: "Exercise isn't just good for your physical health - it plays a crucial role in maintaining good mental health too. Learn about the mental health benefits of regular physical activity.",
    author: "Dr. James Wilson",
    date: "July 18, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Wellness",
    slug: "exercise-mental-health"
  },
  {
    title: "Navigating Relationships with Anxiety",
    excerpt: "Anxiety can significantly impact our relationships. This post provides insights and strategies for maintaining healthy relationships while managing anxiety.",
    author: "Emma Davis",
    date: "August 3, 2023",
    image: "/placeholder.svg?height=200&width=300",
    category: "Relationships",
    slug: "relationships-with-anxiety"
  }
]

const categories = ["All", "Mental Health", "Mindfulness", "Depression", "Self-Care", "Wellness", "Relationships"]

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'All' || post.category === selectedCategory)
  )

  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold">Blogs</h1>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar onSearch={setSearchQuery} />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                image={post.image}
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
