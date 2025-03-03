"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Question = {
  _id: string
  questionKey: string
  text: string
  symptom: {
    _id: string
    name: string
  }
  phase: string
}

type Answer = {
  questionId: string
  answerPercentage: number
}

type QuestionsContextType = {
  questions: Question[]
  answers: Answer[]
  setQuestions: (questions: Question[]) => void
  setAnswer: (questionId: string, percentage: number) => void
  clearAnswers: () => void
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined)

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])

  const setAnswer = (questionId: string, percentage: number) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId)
      if (existing !== -1) {
        const newAnswers = [...prev]
        newAnswers[existing] = { questionId, answerPercentage: percentage }
        return newAnswers
      }
      return [...prev, { questionId, answerPercentage: percentage }]
    })
  }

  const clearAnswers = () => setAnswers([])

  return (
    <QuestionsContext.Provider value={{ questions, answers, setQuestions, setAnswer, clearAnswers }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionsContext)
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider")
  }
  return context
}

