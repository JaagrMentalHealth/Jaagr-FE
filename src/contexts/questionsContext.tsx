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
  phase2Questions: Question[]
  answers: Answer[]
  phase1Diagnosis: any
  currentPhase: number
  setQuestions: (questions: Question[]) => void
  setPhase2Questions: (questions: Question[]) => void
  setAnswer: (questionId: string, percentage: number) => void
  clearAnswers: () => void
  setPhase1Diagnosis: (diagnosis: any) => void
  setCurrentPhase: (phase: number) => void
}

const QuestionsContext = createContext < QuestionsContextType | undefined > (undefined)

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [phase2Questions, setPhase2Questions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [phase1Diagnosis, setPhase1Diagnosis] = useState<any>(null)
  const [currentPhase, setCurrentPhase] = useState<number>(1)

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
        clearAnswers,
        setPhase1Diagnosis,
        setCurrentPhase
      }}
    >
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

