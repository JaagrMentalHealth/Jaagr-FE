import { Card, CardContent } from "@/components/landing/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
      <CardContent className="p-6">
        <p className="mb-4 text-lg italic text-gray-700">&quot;{quote}&quot;</p>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-500 font-semibold">
            {author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

