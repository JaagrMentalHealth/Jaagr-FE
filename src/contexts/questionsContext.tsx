"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define types
type Question = {
  _id: string
  questionName: string
  optionType: string
  options: string[]
  validOptions: string[]
  disease: string | null
  phase: number
}

type Answer = {
  questionId: string
  answer: string
}

type QuestionsContextType = {
  questions: Question[]
  phase2Questions: Question[]
  answers: Answer[]
  phase1Diagnosis: any
  currentPhase: 0 | 1 | 2
  setQuestions: (questions: Question[]) => void
  setPhase2Questions: (questions: Question[]) => void
  setAnswer: (questionId: string, answer: string) => void
  setPhase1Diagnosis: (diagnosis: any) => void
  setCurrentPhase: (phase: 0 | 1 | 2) => void
}

// Create context
const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined)

// Provider component
export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [phase2Questions, setPhase2Questions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [phase1Diagnosis, setPhase1Diagnosis] = useState<any>(null)
  const [currentPhase, setCurrentPhase] = useState<0 | 1 | 2>(0)

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === questionId)

      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev]
        newAnswers[existingAnswerIndex] = { questionId, answer }
        return newAnswers
      } else {
        return [...prev, { questionId, answer }]
      }
    })
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        phase2Questions,
        answers,
        phase1Diagnosis,
        currentPhase,
        setQuestions,
        setPhase2Questions,
        setAnswer,
        setPhase1Diagnosis,
        setCurrentPhase,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  )
}

// Hook for using the context
export function useQuestions() {
  const context = useContext(QuestionsContext)
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider")
  }
  return context
}

