"use client"

import { motion } from "framer-motion"
import Image from "next/image"


const features = [
  {
    icon: "/images/1.png",
    title: "Easy Access",
    description: "Take the test anytime, anywhere, on any device.",
  },
  {
    icon: "/images/2.png",
    title: "Confidentiality First",
    description: "All your data remains private and secure.",
  },
  {
    icon: "/images/3.png",
    title: "AI-Driven Precision",
    description: "Advanced algorithms ensure accurate analysis.",
  },
  {
    icon: "/images/4.png",
    title: "Non-Judgmental Support",
    description: "An unbiased approach to understanding your mental health.",
  },
]

export function WhyJaagr() {
  return (
    <section className="py-20 bg-purple-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">WHY जाग्र ?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block p-4 mb-4">
              <Image src={feature.icon || "/placeholder.svg"} alt={feature.title} width={100} height={100} className="mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-purple-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

