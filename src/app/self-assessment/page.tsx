"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion,  useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, Clock, Brain, HeartHandshake } from "lucide-react"
import { UserInfoModal } from "@/components/Assessment/assessment-info-popup"

export default function SelfAssessmentPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const getButtonPosition = (progress: number) => {
    if (progress < 0.5) {
      // Move from center to right
      return {
        x: `${progress * 200}%`,
        y: `0`,
      }
    } else {
      // Move from right to bottom-right
      // console.log(progress)
      const remainingProgress = (progress - 0.5) * 2
      console.log(remainingProgress,progress)
      return {
        x: `70vw`,
        y: `${remainingProgress * 100}vh`,
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
    // transform:getButtonPosition(scrollProgress)
  }

  

  const handleStartAssessment = () => {
    setIsModalOpen(true)
  }

  const handleStartTest = (userInfo: { name: string; phone: string; email: string }) => {
    console.log("Starting test with user info:", userInfo)
    setIsModalOpen(false)
    // Here you would typically start the actual test or navigate to the test page
    // For now, we'll just log the info and close the modal
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white">
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C40,20 60,20 100,0 L100,100 0,100 Z" fill="rgba(255,237,213,0.3)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold mb-8 text-purple-800 leading-tight">Emotional Wellbeing Check</h1>
            <div className="text-left mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold mb-4 text-purple-700">Hi there,</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Welcome to your emotional wellbeing check. This assessment is designed to help you understand and
                reflect on your current emotional state. Take a moment for yourself and let&apos;s explore your mental
                landscape together.
              </p>
            </div>
            <motion.div
  ref={ref}
  initial="hidden"
  animate="visible"
  variants={buttonVariants}
  whileHover="hover"
  whileTap="tap"
  style={scrollProgress<0.5?getButtonPosition(scrollProgress):undefined}
  // transformTemplate={getButtonPosition(scrollProgress)}
  className={`inline-block ${scrollProgress >= 0.5 ?  `${scrollProgress<0.6?`transform: translate-y-[150 vh]`:"fixed bottom-32 right-32 z-50"}` : ""}`}
>
  <Button
    size="lg"
    className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-6 rounded-full shadow-lg"
    onClick={handleStartAssessment}
  >
    Start Your Assessment
  </Button>
</motion.div>

          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-purple-100 to-purple-200">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-purple-800">Things to Consider</h2>
            <ul className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <li className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-2xl mb-2 text-purple-700">Be Honest</h3>
                  <p className="text-lg text-gray-700">
                    Answer questions truthfully for the most accurate assessment of your emotional wellbeing.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Clock className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-2xl mb-2 text-purple-700">Take Your Time</h3>
                  <p className="text-lg text-gray-700">
                    There&apos;s no rush. Reflect on each question and choose the answer that best describes your feelings.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Brain className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-2xl mb-2 text-purple-700">Consider Recent Events</h3>
                  <p className="text-lg text-gray-700">
                    Think about how you&apos;ve felt over the past two weeks when answering the questions.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <HeartHandshake className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-2xl mb-2 text-purple-700">Seek Help If Needed</h3>
                  <p className="text-lg text-gray-700">
                    If you&apos;re feeling distressed, don&apos;t hesitate to reach out to a mental health professional.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-purple-800">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    This assessment helped me understand my emotions better. It was a great starting point for my
                    mental health journey.
                  </p>
                  <p className="font-semibold text-purple-600">- Sarah T.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    I appreciate how comprehensive yet easy to understand this wellbeing check is. It&apos;s now part of my
                    monthly self-care routine.
                  </p>
                  <p className="font-semibold text-purple-600">- Michael R.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    Taking this assessment regularly has helped me track my emotional wellbeing over time. It&apos;s been
                    invaluable for my personal growth.
                  </p>
                  <p className="font-semibold text-purple-600">- Emily L.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <UserInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStartTest={handleStartTest} />
    </div>
  )
}

