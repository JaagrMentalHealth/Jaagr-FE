"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonial() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-8">
            # Testimonials
          </span>
          <blockquote className="text-2xl font-medium text-gray-900 mb-8">
          &quot;Jaagr gave me the strength to overcome my anxiety. The compassionate therapists provided unwavering
            support, and I&apos;ve found a renewed sense of purpose and tranquility in my life.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Reena Singh" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="font-semibold">Reena Singh</div>
              <div className="text-sm text-gray-600">Client from Delhi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

