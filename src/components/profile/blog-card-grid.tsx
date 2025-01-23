import { BlogCard } from "@/components/blog-card"

interface Blog {
  heading: string
  excerpt: string
  author: any
  date: string
  coverPhoto: string
  slug: string
}

interface BlogCardGridProps {
  blogs: Blog[]
}

export function BlogCardGrid({ blogs }: BlogCardGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  )
}

