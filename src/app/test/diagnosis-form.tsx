"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  getWarmupQuestions,
  submitWarmup,
  submitScreening,
  submitSeverity,
} from "@/api/assessment";
import ExpiredLink from "@/components/expired-link";
import {
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Question type definition based on the actual data structure
type Question = {
  _id: string;
  questionName: string;
  optionType: "Slider" | "Radio" | "Buttons" | "Emoji";
  options: string[];
  validOptions: string[];
  disease: string | null;
  phase: 0 | 1 | 2;
};

// Answer type definition
type Answer = {
  questionId: string;
  answer: string;
};

export default function DiagnoseForm({
  orgUserId,
  organizationId,
  assessmentId,
}: {
  orgUserId?: string | null;
  organizationId?: string | null;
  assessmentId?: string | null;
}) {
  // State for questions and answers
  const [phasesAvailable, setPhasesAvailable] = useState([]);
  const [questionsByPhase, setQuestionsByPhase] = useState({});
  const [answers, setAnswers] = useState<any>([]);
  const [outcomeId, setOutcomeId] = useState("");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [linkExpired, setLinkExpired] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);

  const currentPhase = phasesAvailable[currentPhaseIndex] ?? 0;
  const currentQuestions: any = questionsByPhase[currentPhase] ?? [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
  const isLastPhase = currentPhaseIndex === phasesAvailable.length - 1;

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await getWarmupQuestions({
          assessmentId,
          orgUserId,
          organizationId,
        });
        console.log(response)
        setOutcomeId(response.data.outcomeId)
        const { phase0, phase1, phase2, phasesAvailable } = response.data.data;
        const allQuestions = {
          0: phase0 || [],
          1: phase1 || [],
          2: phase2 || [],
        };
        setQuestionsByPhase(allQuestions);
        setPhasesAvailable(phasesAvailable.sort());
      } catch (err: any) {
        if (err?.response?.status === 409)
          setError("You’ve already completed this assessment.");
        else if (err?.response?.status === 410) setLinkExpired(true);
        else setError("Failed to load questions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [assessmentId]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (currentPhaseIndex < phasesAvailable.length) {
        event.preventDefault();
        event.returnValue = "";
        setShowExitWarning(true);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentPhaseIndex, phasesAvailable]);

  const setAnswer = (questionId: any, answer: any) => {
    setAnswers((prev: any) => {
      const existingIndex = prev.findIndex(
        (a: any) => a.questionId === questionId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, answer };
        return updated;
      }
      return [...prev, { questionId, answer }];
    });
  };

  const getAnswer = (questionId: any) =>
    answers.find((a:any) => a.questionId === questionId)?.answer || "";
  const getPhaseName = (phase: number) => {
    switch (phase) {
      case 0:
        return "Warmup";
      case 1:
        return "Screening";
      case 2:
        return "Assessment";
      default:
        return "";
    }
  };
  const handleSubmitPhase = async () => {
    setIsSubmitting(true);
    try {
      if (currentPhase === 0) {
        const response = await submitWarmup({
          warmupAnswers: currentQuestions.map((q:any) => ({
            questionId: q._id,
            answer: getAnswer(q._id),
          })),
          orgUserId,
          organizationId,
          assessmentId,
        });
        // setOutcomeId(response.data.outcomeId);
        Cookies.set("outcomeId", response.data.outcomeId);
        if (response.data.screeningQuestions?.length > 0) {
          setQuestionsByPhase((prev) => ({
            ...prev,
            1: response.data.screeningQuestions,
          }));
        }
      } else if (currentPhase === 1) {
        const response = await submitScreening({ answers, outcomeId });
        if (response.data.severityQuestions?.length > 0) {
          setQuestionsByPhase((prev) => ({
            ...prev,
            2: response.data.severityQuestions,
          }));
        } else {
          router.push(`/assessment-result?outcomeId=${outcomeId}`);
          return;
        }
      } else if (currentPhase === 2) {
        console.log(outcomeId)
        const response = await submitSeverity({ answers: answers, outcomeId });
        router.push(`/assessment-result?outcomeId=${outcomeId}`);
        return;
      }

      if (!isLastPhase) {
        setCurrentPhaseIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) handleSubmitPhase();
    else setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="shadow-xl border-t-4 border-t-primary rounded-xl overflow-hidden transition-all duration-300 transform">
          <CardContent className="p-0">
            {/* Header with phase indicator */}
            <div className="bg-primary/10 dark:bg-primary/20 p-6 border-b">
              <h1 className="text-2xl font-bold text-center text-primary">
                Emotional Well-being Assessment
              </h1>

              {!isLoading && !error && !diagnosisResult && (
                <div className="mt-6">
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 ease-in-out"
                        style={{ width: `${(currentPhase / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div
                      className={`flex flex-col items-center ${
                        currentPhase >= 0 ? "text-primary font-medium" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                          currentPhase >= 0
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        1
                      </div>
                      <span>Warmup</span>
                    </div>
                    <div
                      className={`flex flex-col items-center ${
                        currentPhase >= 1 ? "text-primary font-medium" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                          currentPhase >= 1
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        2
                      </div>
                      <span>Screening</span>
                    </div>
                    <div
                      className={`flex flex-col items-center ${
                        currentPhase >= 2 ? "text-primary font-medium" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                          currentPhase >= 2
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        3
                      </div>
                      <span>Assessment</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/30 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="mt-6 text-lg font-medium">
                    Loading your assessment...
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Please wait while we prepare your questions
                  </p>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    {error}
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              )}

              {/* Diagnosis result */}
              {diagnosisResult && (
                <div className="py-6">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Assessment Complete
                    </h2>
                    <p className="text-muted-foreground text-center">
                      Your results are being processed
                    </p>
                  </div>

                  {Array.isArray(diagnosisResult) ? (
                    <div className="space-y-4">
                      {diagnosisResult.map((result, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-lg border bg-card shadow-sm"
                        >
                          <h3 className="font-semibold text-lg">
                            {result.disease}
                          </h3>
                          <div
                            className={`mt-2 font-medium text-sm px-3 py-1 rounded-full inline-block ${
                              result.severity === "Severe"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : result.severity === "Moderate"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {result.severity}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-5 rounded-lg border bg-card shadow-sm">
                      <p className="text-center">
                        {diagnosisResult.message || "Assessment complete."}
                      </p>
                    </div>
                  )}

                  <Button
                    className="mt-8 w-full"
                    onClick={() => window.location.reload()}
                  >
                    Start New Assessment
                  </Button>
                </div>
              )}

              {/* Question and options */}
              {!isLoading && !error && !diagnosisResult && currentQuestion && (
                <div className="py-4">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary">
                        {getPhaseName(currentPhase)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestionIndex + 1} of{" "}
                        {currentQuestions.length}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                      {currentQuestion.questionName}
                    </h2>
                  </div>

                  <div className="my-8">
                    {currentQuestion.optionType === "Radio" && (
                      <RadioGroup
                        value={getAnswer(currentQuestion._id)}
                        onValueChange={(value) =>
                          setAnswer(currentQuestion._id, value)
                        }
                        className="grid gap-3"
                      >
                        {currentQuestion.options.map(
                          (option: any, index: any) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 space-y-0 rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 ${
                                getAnswer(currentQuestion._id) === option
                                  ? "bg-primary/5 border-primary shadow-sm"
                                  : ""
                              }`}
                            >
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}`}
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className="font-medium w-full cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          )
                        )}
                      </RadioGroup>
                    )}

                    {currentQuestion.optionType === "Emoji" && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {currentQuestion.options.map((emoji:any, index:any) => (
                          <button
                            key={index}
                            className={`text-3xl p-6 rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                              getAnswer(currentQuestion._id) === emoji
                                ? "bg-primary/5 border-primary shadow-sm"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() =>
                              setAnswer(currentQuestion._id, emoji)
                            }
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.optionType === "Buttons" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentQuestion.options.map((option:any, index:any) => (
                          <Button
                            key={index}
                            variant={
                              getAnswer(currentQuestion._id) === option
                                ? "default"
                                : "outline"
                            }
                            className={`h-16 w-full transition-all duration-200 ${
                              getAnswer(currentQuestion._id) === option
                                ? "shadow-md"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() =>
                              setAnswer(currentQuestion._id, option)
                            }
                          >
                            <span className="w-full h-full flex items-center justify-center">
                              {option}
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.optionType === "Slider" && (
                      <div className="space-y-8 px-2">
                        <div className="flex justify-between text-sm">
                          {currentQuestion.options.map((label:any, index:any) => (
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
                            currentQuestion.options.indexOf(
                              getAnswer(currentQuestion._id)
                            ) >= 0
                              ? currentQuestion.options.indexOf(
                                  getAnswer(currentQuestion._id)
                                )
                              : "0"
                          }
                          onChange={(e) => {
                            const index = Number.parseInt(e.target.value);
                            setAnswer(
                              currentQuestion._id,
                              currentQuestion.options[index]
                            );
                          }}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        {getAnswer(currentQuestion._id) && (
                          <div className="text-center mt-2 font-medium text-primary">
                            {getAnswer(currentQuestion._id)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between gap-4 pt-6 mt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="w-1/2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!getAnswer(currentQuestion._id || "")}
                      className="w-1/2"
                    >
                      {isLastQuestion ? (
                        isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Don't leave yet!</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            If you reload or close this tab now, your assessment will be
            submitted automatically. Are you sure?
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExitWarning(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowExitWarning(false);
                window.removeEventListener("beforeunload", () => {});
                window.location.reload(); // OR: window.close()
              }}
            >
              Leave Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
