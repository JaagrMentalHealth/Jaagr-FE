'use client'

import { useState } from 'react'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SelfAssessmentTest } from "@/components/self-assesment-test"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, HelpCircle } from 'lucide-react'

const questions = [
  { id: 1, text: "How often do you feel nervous, anxious, or on edge?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 2, text: "How often do you feel down, depressed, or hopeless?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 3, text: "How often do you have trouble falling or staying asleep, or sleeping too much?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 4, text: "How often do you feel tired or have little energy?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 5, text: "How often do you have trouble concentrating on things?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 6, text: "How often do you feel bad about yourself or that you are a failure?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 7, text: "How often do you have little interest or pleasure in doing things?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 8, text: "How often do you feel restless or have trouble sitting still?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 9, text: "How often do you have poor appetite or overeat?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 10, text: "How often do you feel afraid as if something awful might happen?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 11, text: "How often do you have trouble relaxing?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 12, text: "How often do you avoid situations that make you anxious?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 13, text: "How often do you have thoughts that you would be better off dead?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 14, text: "How often do you feel lonely or isolated?", options: ["Never", "Sometimes", "Often", "Very Often"] },
  { id: 15, text: "How often do you have difficulty making decisions?", options: ["Never", "Sometimes", "Often", "Very Often"] },
]

export default function SelfAssessmentPage() {
  const [showTest, setShowTest] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Mental Health Self-Assessment</h1>

          {!showTest && (
            <>
              <section className="mb-12">
                <Card className="bg-white shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
                    <CardTitle className="text-2xl font-bold text-orange-800">Why Self-Assessment is Important</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none p-6">
                    <p className="text-lg mb-4">Self-assessment is a crucial step in understanding and managing your mental health. It helps you:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Identify potential mental health concerns early</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Track changes in your mental well-being over time</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Gain insights into your thoughts, feelings, and behaviors</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Determine when it might be appropriate to seek professional help</li>
                      <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Take proactive steps towards maintaining good mental health</li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">Remember, while self-assessment tools are valuable, they are not a substitute for professional diagnosis or treatment.</p>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12 text-center">
                <Button onClick={() => setShowTest(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 px-8">
                  Start Your Self-Assessment <ArrowRight className="ml-2" />
                </Button>
              </section>
            </>
          )}

          {showTest && (
            <section className="mb-12">
              <SelfAssessmentTest questions={questions} />
            </section>
          )}

          <section className="mb-12">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
                <CardTitle className="text-2xl font-bold text-orange-800">When to Take a Mental Wellness Check</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none p-6">
                <p className="text-lg mb-4">Consider taking a mental wellness check:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Clock className="text-blue-500 mr-2" /> Regularly, as part of your self-care routine (e.g., monthly or quarterly)</li>
                  <li className="flex items-center"><Clock className="text-blue-500 mr-2" /> When you're experiencing significant life changes or stressors</li>
                  <li className="flex items-center"><Clock className="text-blue-500 mr-2" /> If you notice changes in your mood, behavior, or thought patterns</li>
                  <li className="flex items-center"><Clock className="text-blue-500 mr-2" /> Before and after starting a new mental health treatment or medication</li>
                  <li className="flex items-center"><Clock className="text-blue-500 mr-2" /> If you're concerned about your mental well-being for any reason</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Remember, it's always okay to seek help or take a mental wellness check, even if you're not sure you need it.</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
                <CardTitle className="text-2xl font-bold text-orange-800">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none p-6">
                <ol className="space-y-2">
                  <li className="flex items-start"><span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">1</span> Answer the questions honestly, based on how you've been feeling over the past two weeks.</li>
                  <li className="flex items-start"><span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">2</span> Take your time and reflect on each question before answering.</li>
                  <li className="flex items-start"><span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">3</span> Once you've completed all questions, you'll receive a general assessment of your mental health status.</li>
                  <li className="flex items-start"><span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">4</span> Review your results and the provided recommendations.</li>
                  <li className="flex items-start"><span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">5</span> If suggested, consider reaching out to a mental health professional for a more comprehensive evaluation.</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">Remember, this self-assessment is not a diagnostic tool. It's designed to help you understand your mental health better and determine if you might benefit from professional support.</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
