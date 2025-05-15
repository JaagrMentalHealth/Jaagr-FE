"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const slides = [
  {
    image: "/images/hero.jpeg",
    title: "Rediscover Your Inner Peace",
    subtitle: "Holistic Well-being",
  },
  {
    image: "/images/hero2.jpg",
    title: "Your Companion for Mental Well-being",
    subtitle: "24/7 Support",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-xs sm:text-sm text-gray-600">Enhancement and Support for Mental Health</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              BE MORE AWARE
              <br />{" "}
              <span className="inline-block relative">
                <Image
                  src="/logoHero.svg"
                  alt="Jaagr Logo"
                  width={130}
                  height={48.75}
                  className="object-contain mt-2 animate-float w-[90px] h-[33.75px] sm:w-[110px] sm:h-[41.25px] md:w-[130px] md:h-[48.75px]"
                  priority
                />
              </span>{" "}
              ABOUT YOUR THOUGHTS
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg">
              Bringing mental health experts to your palm. Discover a supportive community and valuable resources for
              your well-being journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/self-assessment">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full text-sm sm:text-base">
                  Start Assessment <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
              <Link href="/blogs">
                <Button className="bg-white-600 text-black hover:bg-purple-100 border rounded-full text-sm sm:text-base">
                  Explore more
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 text-white">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">{slide.title}</h3>
                    <p className="text-xs sm:text-sm">{slide.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-purple-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
