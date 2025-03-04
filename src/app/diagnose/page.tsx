import { DiagnosisForm } from "./diagnosis-form"
import { QuestionsProvider } from "@/contexts/questionsContext"

export default function DiagnosePage() {
  return (
    <QuestionsProvider>
      <main className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Symptom Diagnosis</h1>
        <DiagnosisForm />
      </main>
    </QuestionsProvider>
  )
}

