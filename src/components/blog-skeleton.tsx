import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function BlogSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden items-center justify-center text-center p-8">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-lg font-semibold text-gray-700">Curating some good blogs...</p>
      </div>
    </Card>
  )
}
