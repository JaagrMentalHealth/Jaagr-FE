"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams, useParams,notFound } from "next/navigation"
import Cookies from "js-cookie"
import DiagnoseForm from "./diagnosis-form"
import { Loader2 } from "lucide-react"

export default function DiagnosePage(){
  return (
    <Suspense fallback=<LoadingScreen/>>
      <SelfAssessmentPage/>
    </Suspense>
  )
}

 function SelfAssessmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const organizationId = searchParams.get("organizationId") || null
  const orgUserId = searchParams.get("orgUserId") || null
  const assessmentId = searchParams.get("assessmentId") || null


  const token = Cookies.get("token") // Your JWT cookie name

  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    // Check for valid user session
    if (token || (orgUserId && organizationId)) {
      console.log(organizationId,orgUserId,assessmentId);
      
      setAllowed(true)
    } 
    else{
      router.replace("/login")

    }
  }, [token, orgUserId, organizationId, router])

  return allowed ? (
    <DiagnoseForm
      orgUserId={orgUserId}
      organizationId={organizationId}
      assessmentId={assessmentId}
    />
  ) : null
}


const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Loader2 className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          Preparing your Questions...
        </p>
      </div>
    </div>
  );
};