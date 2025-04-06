"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams, useParams,notFound } from "next/navigation"
import Cookies from "js-cookie"
import DiagnoseForm from "./diagnosis-form"

export default function SelfAssessmentPage() {
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
