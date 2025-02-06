import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  slug: string
}

export function BlogCard({ title, excerpt, author, date, image, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <h3 className="text-xl font-semibold line-clamp-2 mb-2">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{author}</span>
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

