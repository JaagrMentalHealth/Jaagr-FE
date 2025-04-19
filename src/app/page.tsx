import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ForWhom } from "@/components/landing/for-whom"
import { WhyJaagr } from "@/components/landing/why-jaagr"
import { BlogPreview } from "@/components/landing/blog-preview"
import { Testimonial } from "@/components/landing/testimonials"
import { Footer } from "@/components/footer"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8">GET STARTED TODAY</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/self-assessment">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-6 py-3 text-sm sm:text-base">
                  Take an Emotional Well-being Check-in Today
                </Button>
              </Link>
              <Link href="/blogs">
                <Button className="bg-white text-black hover:bg-purple-100 border border-black rounded-full px-6 py-3 text-sm sm:text-base">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

