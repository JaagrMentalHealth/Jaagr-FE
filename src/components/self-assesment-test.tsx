import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Question {
  id: number
  text: string
  options: string[]
}

interface SelfAssessmentTestProps {
  questions: Question[]
}

export function SelfAssessmentTest({ questions }: SelfAssessmentTestProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    return Object.values(answers).filter(answer => answer === 'Often' || answer === 'Very Often').length
  }

  const getResultMessage = (score: number) => {
    if (score <= 5) return "Your mental health appears to be in good condition. Keep up the good work!"
    if (score <= 10) return "You may be experiencing some mild mental health concerns. Consider talking to a friend or a professional."
    return "Your responses suggest you may be experiencing significant mental health challenges. We strongly recommend speaking with a mental health professional."
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
        <CardTitle className="text-2xl font-bold text-orange-800">Mental Health Self-Assessment</CardTitle>
        <Progress value={progress} className="w-full h-2" />
      </CardHeader>
      <CardContent className="p-6">
        {!showResult ? (
          <div key={questions[currentQuestion].id} className="mb-4">
            <p className="font-medium mb-4 text-lg">{currentQuestion + 1}. {questions[currentQuestion].text}</p>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
              value={answers[questions[currentQuestion].id]}
              className="space-y-2"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <RadioGroupItem value={option} id={`q${questions[currentQuestion].id}-${index}`} />
                  <Label htmlFor={`q${questions[currentQuestion].id}-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-orange-800">Your Result</h3>
            <p className="text-lg mb-4">{getResultMessage(calculateScore())}</p>
            <p className="text-sm text-gray-600">Remember, this assessment is not a diagnosis. If you're concerned about your mental health, please consult with a healthcare professional.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50">
        {!showResult && (
          <>
            <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center">
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
