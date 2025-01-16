import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-orange-50">
        <div className="container px-4 py-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Coming Soon</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          <Link href="/">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Return Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
