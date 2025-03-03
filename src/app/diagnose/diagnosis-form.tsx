"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useQuestions } from "@/contexts/questionsContext"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getQuestions as getQ,submitAnswers } from "@/api/diagnosis"

async function getQuestions() {
  const res: any = await getQ()
  if (res.status != 200) throw new Error("Failed to fetch questions")
  console.log(res)
  return res.data
}

async function submitDiagnosis(answers: { questionId: string; answerPercentage: number }[]) {
  const res:any=await submitAnswers(answers);
  if (res.status !=200) throw new Error("Failed to submit diagnosis")
  return res
}

export function DiagnosisForm() {
  const { questions, answers, setQuestions, setAnswer } = useQuestions()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    getQuestions().then(setQuestions).catch(console.error)
  }, [setQuestions])

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      console.log(answers)
      await submitDiagnosis(answers)
      // Handle success (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.log("Error submitting diagnosis:", error)
      // Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const currentAnswer = answers.find((a) => currentQuestion && a.questionId === currentQuestion._id)

  if (!questions.length) {
    return <div>Loading questions...</div>
  }

  const options = [
    { value: 0, label: "Never", color: "text-green-500" },
    { value: 25, label: "Rarely", color: "text-green-400" },
    { value: 50, label: "Sometimes", color: "text-yellow-500" },
    { value: 75, label: "Often", color: "text-orange-500" },
    { value: 100, label: "Every time", color: "text-red-500" },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-muted-foreground">{currentQuestion.text}</p>
          </div>

          <div className="space-y-6">
            <RadioGroup
              value={currentAnswer?.answerPercentage?.toString() || ""}
              onValueChange={(value) => {
                if (currentQuestion) {
                  setAnswer(currentQuestion._id, Number.parseInt(value))
                }
              }}
              className="grid gap-3"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem defaultValue={25} value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className={`font-medium ${option.color}`}>
                    {option.label} ({option.value}%)
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentAnswer === undefined}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Progress: {answers.length} of {questions.length} questions answered
      </div>
    </div>
  )
}

