"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuestions } from "@/contexts/questionsContext";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  getQuestions as getQ,
  submitAnswers,
  submitAnswersPhase2,
} from "@/api/diagnosis";
import { ProgressBar } from "@/components/ui/progress-bar";

async function getQuestions() {
  const res: any = await getQ();
  if (res.status != 200) throw new Error("Failed to fetch questions");
  console.log(res);
  return res.data;
}

async function submitDiagnosis(
  answers: { questionId: string; answerPercentage: number }[]
) {
  const res: any = await submitAnswers(answers);
  if (res.status != 200) throw new Error("Failed to submit diagnosis");
  return res;
}

async function submitDiagnosisPhase2(
  answers: { questionId: string; answerPercentage: number }[],
  phase1Diagnosis: any
) {
  const res: any = await submitAnswersPhase2(answers, phase1Diagnosis);
  if (res.status != 200) throw new Error("Failed to submit phase 2 diagnosis");
  return res;
}

export function DiagnosisForm() {
  const {
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
  } = useQuestions();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  useEffect(() => {
    getQuestions().then(setQuestions).catch(console.error);
  }, [setQuestions]);

  const handleSubmitPhase1 = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting phase 1 answers:", answers);
      const response = await submitDiagnosis(answers);
      console.log("Phase 1 diagnosis result:", response.data);

      // Store the phase 1 diagnosis result
      setPhase1Diagnosis(response.data.diagnosis);
      // console.log(phase1Diagnosis)

      // Set phase 2 questions from the response
      if (
        response.data.phase2Questions &&
        response.data.phase2Questions.length > 0
      ) {
        setPhase2Questions(response.data.phase2Questions);
        setCurrentPhase(2);
        setCurrentQuestionIndex(0);
      } else {
        // If no phase 2 questions, show final result
        setDiagnosisResult(response.data);
      }
    } catch (error) {
      console.log("Error submitting phase 1 diagnosis:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPhase2 = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting phase 2 answers:", answers);
      console.log("With phase 1 diagnosis:", phase1Diagnosis);

      const response = await submitDiagnosisPhase2(answers, phase1Diagnosis);
      console.log("Final diagnosis result:", response.data);

      // Show final result
      setDiagnosisResult(response.data);
    } catch (error) {
      console.log("Error submitting phase 2 diagnosis:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which questions to use based on current phase
  const currentPhaseQuestions =
    currentPhase === 1 ? questions : phase2Questions;
  const currentQuestion = currentPhaseQuestions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === currentPhaseQuestions.length - 1;
  const currentAnswer = answers.find(
    (a) => currentQuestion && a.questionId === currentQuestion._id
  );

  // Show loading state if questions aren't loaded yet
  if (currentPhase === 1 && !questions.length) {
    return <div>Loading questions...</div>;
  }

  // Show final diagnosis result if available
  if (diagnosisResult) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Diagnosis Result</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto">
            {JSON.stringify(diagnosisResult, null, 2)}
          </pre>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Start New Diagnosis
          </Button>
        </CardContent>
      </Card>
    );
  }

  const options = [
    { value: 0, label: "Never", color: "text-green-500" },
    { value: 25, label: "Rarely", color: "text-green-400" },
    { value: 50, label: "Sometimes", color: "text-yellow-500" },
    { value: 75, label: "Often", color: "text-orange-500" },
    { value: 100, label: "Every time", color: "text-red-500" },
  ];

  return (
    <div className="space-y-8">
      <ProgressBar
        currentPhase={currentPhase}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        phase2Questions={phase2Questions}
      />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Phase {currentPhase}: Question {currentQuestionIndex + 1} of{" "}
              {currentPhaseQuestions.length}
            </h2>
            <p className="text-muted-foreground">{currentQuestion?.text}</p>
          </div>

          <div className="space-y-6">
            <RadioGroup
              value={currentAnswer?.answerPercentage?.toString() || ""}
              onValueChange={(value) => {
                if (currentQuestion) {
                  setAnswer(currentQuestion._id, Number.parseInt(value));
                }
              }}
              className="grid gap-3"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`option-${option.value}`}
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className={`font-medium ${option.color}`}
                  >
                    {option.label} ({option.value}%)
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={
                    currentPhase === 1 ? handleSubmitPhase1 : handleSubmitPhase2
                  }
                  disabled={isSubmitting || currentAnswer === undefined}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : currentPhase === 1
                    ? "Submit Phase 1"
                    : "Submit Final Diagnosis"}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(currentPhaseQuestions.length - 1, prev + 1)
                    )
                  }
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
        Phase {currentPhase} Progress:{" "}
        {
          currentPhaseQuestions.filter((q) =>
            answers.some((a) => a.questionId === q._id)
          ).length
        }{" "}
        of {currentPhaseQuestions.length} questions answered
      </div>
    </div>
  );
}
