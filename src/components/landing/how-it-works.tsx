"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Answer our Interactive Questionnaire carefully.",
    description: "Take the first step towards understanding your mental health",
  },
  {
    title: "Our AI Analyzes your response patterns and potential mental health concerns.",
    description: "Advanced algorithms ensure accurate analysis",
  },
  {
    title: "Get a Detailed Report with actionable insights and tailored recommendations.",
    description: "Personalized guidance for your well-being journey",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            # How It Works
          </span>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-200 hidden md:block" />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

