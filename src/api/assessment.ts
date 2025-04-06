import axios from "axios"
import { URL } from "@/api/URL"

const baseAxiosInstance = axios.create({
  baseURL: `${URL}`,
})

export const getWarmupQuestions = async () => {
  return await baseAxiosInstance.get("/assessment/assessment/warmup")
}

export const submitWarmup = async (data: {
  warmupAnswers: { questionId: string; answer: string }[]
  orgUserId?: string | null
  organizationId?: string | null
  assessmentId?: string | null
}) => {
  return await baseAxiosInstance.post("/assessment/assessment/submit-warmup", data)
}

export const submitScreening = async (data: {
  answers: { questionId: string; answer: string }[]
  outcomeId: string
}) => {
  return await baseAxiosInstance.post("/assessment/assessment/submit-screening", {
    screeningAnswers: data.answers,
    outcomeId: data.outcomeId,
  })
}

export const submitSeverity = async (data: {
  answers: { questionId: string; answer: string }[]
  outcomeId: string
}) => {
  return await baseAxiosInstance.post("/assessment/assessment/submit-severity", {
    severityAnswers: data.answers,
    outcomeId: data.outcomeId,
  })
}

export const fetchOutcome=async(outcomeId:string | null)=>{
  return await baseAxiosInstance.get(`/assessment/assessment/outcome/${outcomeId}`)
}

export const fetchOrgUser=async(id:String )=>{
  return await baseAxiosInstance.get(`/admin/org-users/${id}`)
}
