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
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <h3 className="line-clamp-2 text-xl font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between">
          <p className="line-clamp-3 text-sm text-muted-foreground mb-4">{excerpt}</p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-500 font-semibold">
              {author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{author}</p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
