"use client"

import { Button } from "@/components/landing/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const { user } = useUser()
  const router = useRouter()

  const handleStartWriting = () => {
    router.push("/self-assessment")
  }

  return (
  <section className="w-full min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-white overflow-hidden flex items-center">
  <div className="container mx-auto px-4 flex items-center min-h-screen">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center order-1 lg:order-2">
        <div className="relative h-[300px] w-[300px] md:h-[600px] md:w-[500px]">
          <Image
            src="/images/hero.svg"
            alt="Mental Health Illustration"
            fill
            className="object-contain drop-shadow-2xl animate-float"
            priority
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Be more aware{" "}
          <span className="inline-block relative">
            <Image
              src="/logoHero.svg"
              alt="Jaagr Logo"
              width={180}
              height={80}
              className="object-contain mt-2 animate-float"
              priority
            />
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            about your thoughts
          </span>
        </h1>
        <p className="text-xl text-gray-600 md:text-3xl max-w-2xl mx-auto lg:mx-0">
          Bringing mental health experts to your palm. Discover a supportive community and valuable resources for your well-being journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
          <Button
            onClick={handleStartWriting}
            className="w-full sm:w-auto text-lg py-6 px-8 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl"
          >
            Take Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Link href="/blogs" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-lg py-6 px-8 hover:bg-purple-100 transition-colors duration-300 rounded-full"
            >
              Read Blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

