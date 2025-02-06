"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      setQuizCompleted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {!quizCompleted ? (
          <>
            <h1 className="text-2xl font-bold text-purple-800 mb-4">Emotional Wellbeing Assessment</h1>
            <div className="mb-6">
              <h2 className="text-xl text-purple-700 mb-2">Question {currentQuestion + 1}</h2>
              <p className="text-lg text-purple-900">{questions[currentQuestion].question}</p>
            </div>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-2 mb-6">
              {questions[currentQuestion].options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-purple-800">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">Quiz Completed!</h1>
            <p className="text-xl text-purple-700">
              Your score: {score} out of {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

