"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const blogs = [
  {
    category: "Personal Issues",
    title: "Overcome Anxiety",
    description:
      "Discover tools to boost your self-esteem and confidence, enabling you to embrace your full potential and worth in your own self.",
    image: "/images/pi.jpeg?height=400&width=600",
  },
  {
    category: "Mental Health",
    title: "Role of Meditation",
    description:
      "Learn effective techniques to manage daily work stressors, enhancing your overall well-being, work productivity, and mental resilience.",
    image: "/images/mh.jpeg?height=400&width=600",
  },
]

export function BlogPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium">{blog.category}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-white/90 mb-4">{blog.description}</p>
                  <Button variant="secondary" size="sm">
                    Read Blog
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

