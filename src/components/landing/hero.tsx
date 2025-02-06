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
    <section className="w-full bg-gradient-to-b from-purple-100 via-purple-50 to-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Be more aware{" "}
              <span className="inline-block relative">
                <Image
                  src="/logoHero.svg"
                  alt="Jaagr Logo"
                  width={150}
                  height={60}
                  className="object-contain mt-2 animate-float"
                  priority
                />
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                about your thoughts
              </span>
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl max-w-2xl mx-auto lg:mx-0">
              Bringing mental health experts to your palm. Discover a supportive community and valuable resources for
              your well-being journey.
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
          <div className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] mx-auto lg:mx-0">
            <Image
              src="/images/hero.png"
              alt="Mental Health Illustration"
              fill
              className="object-contain drop-shadow-2xl animate-float"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

