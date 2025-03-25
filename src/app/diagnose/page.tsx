import  DiagnoseForm  from "./diagnosis-form"
import { QuestionsProvider } from "@/contexts/questionsContext"

export default function DiagnosePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <QuestionsProvider>
        <main className="container mx-auto p-4 max-w-2xl flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-left">Symptom Diagnosis</h1>
          <div className="flex-1 flex items-center justify-center">
            <DiagnoseForm />
          </div>
        </main>
      </QuestionsProvider>
    </div>
  )
}

