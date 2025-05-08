"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const blogs = [
  {
    category: "Personal Issues",
    title: "Overcome Anxiety",
    description:
      "Discover tools to boost your self-esteem and confidence, enabling you to embrace your full potential and worth in your own self.",
    image: "/images/pi.jpeg",
  },
  {
    category: "Mental Health",
    title: "Role of Meditation",
    description:
      "Learn effective techniques to manage daily work stressors, enhancing your overall well-being, work productivity, and mental resilience.",
    image: "/images/mh.jpeg",
  },
]

export function BlogPreview() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl"
            >
              <div className="relative aspect-[3/2] sm:aspect-[16/9]">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/90 rounded-full text-xs sm:text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{blog.title}</h3>
                  <p className="text-white/90 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                    {blog.description}
                  </p>
                  <Link href="/blogs">
                    <Button variant="secondary" size="sm" className="text-xs sm:text-sm">
                      Read Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
