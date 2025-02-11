import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ForWhom } from "@/components/landing/for-whom"
import { WhyJaagr } from "@/components/landing/why-jaagr"
import { BlogPreview } from "@/components/landing/blog-preview"
import { Testimonial } from "@/components/landing/testimonials"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ForWhom />
        <WhyJaagr />
        <BlogPreview />
        <Testimonial />
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">GET STARTED TODAY</h2>
            <div className="flex justify-center gap-4">
              <Link href="/self-assessment">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full">Take the Depression Analysis Test</Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline">Explore Resources</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

