"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MentalHealthAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: "mood",
      type: "emoji",
      question: "How are you feeling today?",
      subtext: "Select the emoji that best represents your current mood",
    },
    {
      id: "sleep",
      type: "slider",
      question: "How well did you sleep last night?",
      subtext: "Drag the slider to indicate your sleep quality",
      min: 0,
      max: 10,
    },
    {
      id: "anxiety",
      type: "yesno",
      question: "Have you felt anxious or on edge?",
      subtext: "Consider how you've felt over the past two weeks",
    },
    {
      id: "support",
      type: "emoji",
      question: "How supported do you feel by those around you?",
      subtext: "Select the emoji that best represents your feeling of support",
    },
    {
      id: "energy",
      type: "slider",
      question: "How would you rate your energy levels?",
      subtext: "Drag the slider to indicate your energy level",
      min: 0,
      max: 10,
    },
    {
      id: "screening",
      type: "yesnomaybe",
      question: "Would you like to speak with a mental health professional?",
      subtext: "This is an initial screening question to determine next steps",
    },
  ]

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  const handleSkip = () => {
    handleNext()
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-purple-100">
        <CardContent className="p-0">
          {/* Progress bar section */}
          <div className="bg-white px-4 sm:px-6 py-4 border-b border-purple-100">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-purple-700">Your Mental Health Journey</h2>
              <span className="text-sm font-medium text-purple-700">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <motion.div
                className="bg-purple-600 h-2 rounded-full"
                initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question content */}
          <div className="bg-white px-4 sm:px-6 py-6 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[320px] sm:min-h-[350px] flex flex-col"
              >
                <h1 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">{currentQuestion.question}</h1>
                <p className="text-sm sm:text-base text-purple-600 mb-6 sm:mb-8">{currentQuestion.subtext}</p>

                <div className="flex-grow flex flex-col justify-center items-center w-full">
                  {currentQuestion.type === "emoji" && (
                    <div className="grid grid-cols-5 gap-1 sm:gap-3 w-full max-w-sm my-4">
                      {["😢", "😞", "😐", "🙂", "😃"].map((emoji, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAnswer(currentQuestion.id, index)}
                          className={`aspect-square flex items-center justify-center text-3xl sm:text-4xl p-2 rounded-full transition-all ${
                            answers[currentQuestion.id] === index
                              ? "bg-purple-100 shadow-md ring-2 ring-purple-300"
                              : "hover:bg-purple-50"
                          }`}
                          aria-label={`Emotion level ${index + 1}`}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === "slider" && (
                    <div className="w-full max-w-sm my-6 px-2">
                      <Slider
                        defaultValue={[answers[currentQuestion.id] || 5]}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleAnswer(currentQuestion.id, value[0])}
                        className="my-8"
                      />
                      <div className="flex justify-between text-sm text-purple-600 mt-2 px-1">
                        <span>Low</span>
                        <span className="text-center">
                          {answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id] : 5}
                        </span>
                        <span>High</span>
                      </div>
                    </div>
                  )}

                  {currentQuestion.type === "yesno" && (
                    <div className="flex flex-col sm:flex-row justify-center gap-4 my-6 w-full max-w-xs">
                      <Button
                        onClick={() => handleAnswer(currentQuestion.id, true)}
                        variant={answers[currentQuestion.id] === true ? "default" : "outline"}
                        className={`w-full sm:w-32 h-14 text-lg rounded-xl ${
                          answers[currentQuestion.id] === true
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-purple-200"
                        }`}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => handleAnswer(currentQuestion.id, false)}
                        variant={answers[currentQuestion.id] === false ? "default" : "outline"}
                        className={`w-full sm:w-32 h-14 text-lg rounded-xl ${
                          answers[currentQuestion.id] === false
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-purple-200"
                        }`}
                      >
                        No
                      </Button>
                    </div>
                  )}
                  {currentQuestion.type === "yesnomaybe" && (
                    <div className="flex flex-col sm:flex-row justify-center gap-3 my-6 w-full max-w-xs">
                      <Button
                        onClick={() => handleAnswer(currentQuestion.id, "yes")}
                        variant={answers[currentQuestion.id] === "yes" ? "default" : "outline"}
                        className={`w-full sm:w-28 h-14 text-lg rounded-xl ${
                          answers[currentQuestion.id] === "yes"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-purple-200"
                        }`}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => handleAnswer(currentQuestion.id, "maybe")}
                        variant={answers[currentQuestion.id] === "maybe" ? "default" : "outline"}
                        className={`w-full sm:w-28 h-14 text-lg rounded-xl ${
                          answers[currentQuestion.id] === "maybe"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-purple-200"
                        }`}
                      >
                        Maybe
                      </Button>
                      <Button
                        onClick={() => handleAnswer(currentQuestion.id, "no")}
                        variant={answers[currentQuestion.id] === "no" ? "default" : "outline"}
                        className={`w-full sm:w-28 h-14 text-lg rounded-xl ${
                          answers[currentQuestion.id] === "no"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-purple-200"
                        }`}
                      >
                        No
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="bg-purple-50 px-4 sm:px-6 py-4 border-t border-purple-100 flex flex-wrap sm:flex-nowrap gap-2 justify-between">
            <Button
              onClick={handlePrevious}
              variant="ghost"
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 rounded-lg h-10"
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg order-last sm:order-none w-full sm:w-auto h-10 mt-2 sm:mt-0"
            >
              Skip this question
            </Button>

            <Button
              onClick={handleNext}
              variant={answers[currentQuestion.id] !== undefined ? "default" : "outline"}
              className={`rounded-lg h-10 ${
                answers[currentQuestion.id] !== undefined
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-300 text-purple-700"
              }`}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <span>Complete</span>
              ) : (
                <>
                  <span className="hidden sm:inline">Next</span>
                  <span className="inline sm:hidden">Next Question</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

