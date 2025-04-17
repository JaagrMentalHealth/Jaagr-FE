import axios from "axios"
import { URL } from "@/api/URL"
import Cookies from "js-cookie"

const baseAxiosInstance = axios.create({
  baseURL: `${URL}`,
})

export const getWarmupQuestions = async (params?: { assessmentId?: string | null }) => {
  return await baseAxiosInstance.get("/assessment/assessment/warmup", {
    params,
  });
};

export const submitWarmup = async (data: {
  warmupAnswers: { questionId: string; answer: string }[]
  orgUserId?: string | null
  organizationId?: string | null
  assessmentId?: string | null
}) => {
  const token = Cookies.get("token")

  const headers: Record<string, string> = {};

  // Add JWT auth only for regular users (not org users)
  if (token && !data.orgUserId) {
    headers.Authorization = `Bearer ${token}`;
  }
  return await baseAxiosInstance.post("/assessment/assessment/submit-warmup", data, {
    headers
  })
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
