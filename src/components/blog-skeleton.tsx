import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BlogSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/9] relative overflow-hidden bg-purple-200 animate-pulse" />
      <CardHeader>
        <div className="h-6 w-3/4 bg-purple-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-purple-200 rounded animate-pulse" />
          <div className="h-4 bg-purple-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-purple-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-10 w-10 rounded-full bg-purple-200 animate-pulse" />
          <div className="space-y-1">
            <div className="h-4 w-24 bg-purple-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-purple-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
