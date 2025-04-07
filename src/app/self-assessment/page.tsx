"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/Assessment/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, Clock, Brain, HeartHandshake } from "lucide-react"
import { UserInfoModal } from "@/components/Assessment/assessment-info-popup"
import Image from "next/image"
import { useUser } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Cookies from "js-cookie"

export default function SelfAssessmentPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const getButtonPosition = (progress: number) => {
    if (progress < 0.5) {
      return {
        x: `${progress * 200}%`,
        y: `0`,
      }
    } else {
      const remainingProgress = (progress - 0.5) * 2
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
  }

  const handleStartAssessment = () => {
    // Check if user is logged in
    const isLoggedIn = checkUserLoggedIn()

    if (isLoggedIn) {
      // User is logged in, show the assessment info modal
      router.push('/diagnose')
    } else {
      // User is not logged in, show the login required modal
      setIsLoginModalOpen(true)
    }
  }

  const checkUserLoggedIn = () => {
    // Check if user exists in context
    if (user) {
      return true
    }

    // Check if auth token exists in cookies
    const token = Cookies.get("authToken")
    return !!token
  }

  const handleRedirectToLogin = () => {
    router.push("/login")
  }

  const handleStartTest = (userInfo: { name: string; phone: string; email: string }) => {
    console.log("Starting test with user info:", userInfo)
    setIsModalOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-white-50 to-white">
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C40,20 60,20 100,0 L100,100 0,100 Z" fill="rgba(250,245,255,0.3)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="md:w-1/2 text-left mb-12 md:mb-0">
              <h1 className="text-6xl font-bold leading-tight">Emotional Wellbeing Check</h1>
              <h2 className="text-4xl font-semibold mb-4 text-purple-600">Hi there,</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Welcome to your emotional wellbeing check. This assessment is designed to help you understand and
                reflect on your current emotional state. Take a moment for yourself and let&apos;s explore your mental
                landscape together.
              </p>
              <motion.div
                ref={ref}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-600 text-white text-lg px-8 py-6 rounded-full shadow-lg"
                  onClick={handleStartAssessment}
                >
                  Start Your Assessment
                </Button>
              </motion.div>
            </div>
            <div className="inlineblock relative">
              <Image
                src="/images/lighthouse.svg"
                alt="Emotional Wellbeing"
                width={700}
                height={400}
                className="object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-6 py-2 bg-purple-200 text-purple-600 rounded-full text-sm font-medium mb-4 shadow-sm">
                #Important Guidelines
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Things to Keep in Mind</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <CheckCircle className="w-10 h-10 text-purple-600" />,
                  title: "Be Honest",
                  description:
                    "Answer truthfully for the most accurate results. This assessment is for your self-reflection.",
                },
                {
                  icon: <Clock className="w-10 h-10 text-purple-600" />,
                  title: "Take Your Time",
                  description:
                    "There's no rush. Read each question carefully and reflect before selecting your answer.",
                },
                {
                  icon: <Brain className="w-10 h-10 text-purple-600" />,
                  title: "Consider Recent Feelings",
                  description: "Think about your emotions and experiences over the past two weeks while answering.",
                },
                {
                  icon: <HeartHandshake className="w-10 h-10 text-purple-600" />,
                  title: "Reach Out if Needed",
                  description: "If you're struggling, don't hesitate to talk to someone or seek professional support.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mr-4">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-6 py-2 bg-purple-200 text-purple-600 rounded-full text-sm font-medium mb-4 shadow-sm">
                #What Our Users Say
              </span>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    This assessment helped me understand my emotions better. It was a great starting point for my mental
                    health journey.
                  </p>
                  <p className="font-semibold text-purple-600">- Sarah T.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    I appreciate how comprehensive yet easy to understand this wellbeing check is. It&apos;s now part of
                    my monthly self-care routine.
                  </p>
                  <p className="font-semibold text-purple-600">- Michael R.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-lg text-gray-700">
                    Taking this assessment regularly has helped me track my emotional wellbeing over time. It&apos;s
                    been invaluable for my personal growth.
                  </p>
                  <p className="font-semibold text-purple-600">- Emily L.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* <UserInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStartTest={handleStartTest} /> */}

      {/* Login Required Modal - Cannot be closed */}
      <Dialog open={isLoginModalOpen} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-md"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Login Required</DialogTitle>
            <DialogDescription className="text-center pt-4 text-base">
              You need to be logged in to take the assessment. Please log in to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center sm:justify-center mt-6">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md w-full"
              onClick={handleRedirectToLogin}
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

