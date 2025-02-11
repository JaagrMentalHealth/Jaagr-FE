"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const targetUsers = [
  "Individuals experiencing symptoms like fatigue, sadness, or lack of motivation",
  "Those seeking to understand their mental health better",
  "Anyone wanting an easy and private first step toward help",
  "Caregivers and loved ones who want to support someone struggling with their mental health",
]

export function ForWhom() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">FOR WHOM?</h2>
            <div className="space-y-4">
              {targetUsers.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <p className="text-gray-700">{user}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

