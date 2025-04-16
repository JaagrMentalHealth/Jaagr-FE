"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getWarmupQuestions, submitWarmup, submitScreening, submitSeverity } from "@/api/assessment"

// Question type definition based on the actual data structure
type Question = {
  _id: string
  questionName: string
  optionType: "Slider" | "Radio" | "Buttons" | "Emoji"
  options: string[]
  validOptions: string[]
  disease: string | null
  phase: 0 | 1 | 2
}

// Answer type definition
type Answer = {
  questionId: string
  answer: string
}

export default function DiagnoseForm({
  orgUserId,
  organizationId,
  assessmentId
}: {
  orgUserId?: string | null,
  organizationId?: string | null,
  assessmentId?: string | null
}) {
  // State for questions and answers
  const [warmupQuestions, setWarmupQuestions] = useState<Question[]>([])
  const [screeningQuestions, setScreeningQuestions] = useState<Question[]>([])
  const [severityQuestions, setSeverityQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [outcomeId, setOutcomeId] = useState<string>("")


  // UI state
  const [currentPhase, setCurrentPhase] = useState<0 | 1 | 2>(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Get current questions based on phase
  const currentQuestions =
    currentPhase === 0 ? warmupQuestions : currentPhase === 1 ? screeningQuestions : severityQuestions

  const currentQuestion = currentQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1
  const router=useRouter();

  // Fetch initial warmup questions
  useEffect(() => {
    const fetchWarmupQuestions = async () => {
      try {
        setIsLoading(true)
        const response = await getWarmupQuestions()
        setWarmupQuestions(response.data)
      } catch (err) {
        setError("Failed to load questions. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWarmupQuestions()
  }, [])

  // Set an answer for the current question
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

  // Get the current answer for a question
  const getAnswer = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId)?.answer || ""
  }

  // Handle phase transitions
  const handleSubmitPhase = async () => {
    try {
      setIsSubmitting(true)
  
      if (currentPhase === 0) {
        // Submit warmup and get screening questions
        const response = await submitWarmup({
          warmupAnswers: warmupQuestions.map((q) => ({
            questionId: q._id,
            answer: getAnswer(q._id),
          })),
          orgUserId,
          organizationId,
          assessmentId,
        })
        // console.log(response.data)
  
        setScreeningQuestions(response.data.screeningQuestions)
        setOutcomeId(response.data.outcomeId)
        Cookies.set("outcomeId", response.data.outcomeId); 
        setCurrentPhase(1)
        setCurrentQuestionIndex(0)
      } else if (currentPhase === 1) {
        // Submit screening and get severity questions
        const response = await submitScreening({
          answers,
          outcomeId, // <-- Send outcomeId
        })
  
        setSeverityQuestions(response.data.severityQuestions)
  
        if (response.data.severityQuestions.length > 0) {
          setCurrentPhase(2)
          setCurrentQuestionIndex(0)
        } else {
          router.push(`/assessment-result?outcomeId=${outcomeId}`);
          setDiagnosisResult({
            message: "No conditions requiring further assessment were detected.",
          })
        }
      } else if (currentPhase === 2) {
        // Submit severity and get final results
        const response = await submitSeverity({
          answers,
          outcomeId, // <-- Send outcomeId
        })
        router.push(`/assessment-result?outcomeId=${outcomeId}`);
  
        setDiagnosisResult(response.data)
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle next question
  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmitPhase()
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  // Handle previous question
  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading questions...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show diagnosis result
  if (diagnosisResult) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Assessment Results</h2>

          {Array.isArray(diagnosisResult) ? (
            <div className="space-y-4">
              {diagnosisResult.map((result, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <h3 className="font-medium">{result.disease}</h3>
                  <div
                    className={`mt-2 font-semibold ${
                      result.severity === "Severe"
                        ? "text-red-500"
                        : result.severity === "Moderate"
                          ? "text-orange-500"
                          : "text-yellow-500"
                    }`}
                  >
                    Severity: {result.severity}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg border">
              <p>{diagnosisResult.message || "Assessment complete."}</p>
            </div>
          )}

          <Button className="mt-6 w-full" onClick={() => window.location.reload()}>
            Start New Assessment
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Get options based on question type
  const renderOptions = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.optionType) {
      case "Radio":
        return (
          <RadioGroup
            value={getAnswer(currentQuestion._id)}
            onValueChange={(value) => setAnswer(currentQuestion._id, value)}
            className="grid gap-3 mt-4"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 space-y-0 rounded-lg border p-4 transition-colors ${
                  getAnswer(currentQuestion._id) === option ? "bg-muted border-primary" : ""
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="font-medium w-full cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "Emoji":
        return (
          <div className="grid grid-cols-5 gap-3 mt-4">
            {currentQuestion.options.map((emoji, index) => (
              <button
                key={index}
                className={`text-3xl p-4 rounded-lg border transition-colors ${
                  getAnswer(currentQuestion._id) === emoji ? "bg-muted border-primary" : "hover:bg-muted/50"
                }`}
                onClick={() => setAnswer(currentQuestion._id, emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )

      case "Buttons":
        return (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={getAnswer(currentQuestion._id) === option ? "default" : "outline"}
                className="h-16"
                onClick={() => setAnswer(currentQuestion._id, option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )

      case "Slider":
        return (
          <div className="space-y-6 mt-4">
            <div className="flex justify-between text-sm">
              {currentQuestion.options.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max={currentQuestion.options.length - 1}
              step="1"
              value={
                currentQuestion.options.indexOf(getAnswer(currentQuestion._id)) >= 0
                  ? currentQuestion.options.indexOf(getAnswer(currentQuestion._id))
                  : "0"
              }
              onChange={(e) => {
                const index = Number.parseInt(e.target.value)
                setAnswer(currentQuestion._id, currentQuestion.options[index])
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg transition-all duration-300 transform">
          <CardContent className="pt-6 px-4 sm:px-6">
          {/* Stepper */}
          {!isLoading && !error && !diagnosisResult && (
            <div className="mb-6">
              <div className="flex items-center justify-between w-full mb-4">
                <div className={`h-2 w-full rounded-full ${currentPhase >= 0 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div className="mx-2"></div>
                <div className={`h-2 w-full rounded-full ${currentPhase >= 1 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div className="mx-2"></div>
                <div className={`h-2 w-full rounded-full ${currentPhase >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Warmup</span>
                <span>Screening</span>
                <span>Assessment</span>
              </div>
            </div>
          )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Loading questions...</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-center text-red-500 py-8">
                <p>{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Diagnosis result */}
            {diagnosisResult && (
              <div className="py-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Assessment Results</h2>

                {Array.isArray(diagnosisResult) ? (
                  <div className="space-y-4">
                    {diagnosisResult.map((result, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <h3 className="font-medium">{result.disease}</h3>
                        <div
                          className={`mt-2 font-semibold ${
                            result.severity === "Severe"
                              ? "text-red-500"
                              : result.severity === "Moderate"
                                ? "text-orange-500"
                                : "text-yellow-500"
                          }`}
                        >
                          Severity: {result.severity}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg border">
                    <p className="text-center">{diagnosisResult.message || "Assessment complete."}</p>
                  </div>
                )}

                <Button className="mt-6 w-full" onClick={() => window.location.reload()}>
                  Start New Assessment
                </Button>
              </div>
            )}

            {/* Question and options */}
            {!isLoading && !error && !diagnosisResult && currentQuestion && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-center">{currentQuestion.questionName}</h2>
                  <p className="text-sm text-muted-foreground text-center">
                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                  </p>
                </div>

                <div className="my-6">
                  {currentQuestion.optionType === "Radio" && (
                    <RadioGroup
                      value={getAnswer(currentQuestion._id)}
                      onValueChange={(value) => setAnswer(currentQuestion._id, value)}
                      className="grid gap-3"
                    >
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 space-y-0 rounded-lg border p-4 transition-colors ${
                            getAnswer(currentQuestion._id) === option ? "bg-muted border-primary" : ""
                          }`}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="font-medium w-full cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion.optionType === "Emoji" && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {currentQuestion.options.map((emoji, index) => (
                        <button
                          key={index}
                          className={`text-3xl p-4 rounded-lg border transition-colors ${
                            getAnswer(currentQuestion._id) === emoji ? "bg-muted border-primary" : "hover:bg-muted/50"
                          }`}
                          onClick={() => setAnswer(currentQuestion._id, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.optionType === "Buttons" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={getAnswer(currentQuestion._id) === option ? "default" : "outline"}
                          className="h-16 w-full"
                          onClick={() => setAnswer(currentQuestion._id, option)}
                        >
                        <span className="w-full h-full flex items-center justify-center">{option}</span>
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.optionType === "Slider" && (
                    <div className="space-y-6">
                      <div className="flex justify-between text-sm">
                        {currentQuestion.options.map((label, index) => (
                          <span key={index} className="text-xs sm:text-sm">
                            {label}
                          </span>
                        ))}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={currentQuestion.options.length - 1}
                        step="1"
                        value={
                          currentQuestion.options.indexOf(getAnswer(currentQuestion._id)) >= 0
                            ? currentQuestion.options.indexOf(getAnswer(currentQuestion._id))
                            : "0"
                        }
                        onChange={(e) => {
                          const index = Number.parseInt(e.target.value)
                          setAnswer(currentQuestion._id, currentQuestion.options[index])
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="w-1/2"
                  >
                    Previous
                  </Button>

                  <Button onClick={handleNext} disabled={!getAnswer(currentQuestion._id || "")} className="w-1/2">
                    {isLastQuestion ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

