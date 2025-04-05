import axios from "axios"
import { URL } from "@/api/URL"

const baseAxiosInstance = axios.create({
  baseURL: `${URL}/assessment/assessment/`,
})

export const getWarmupQuestions = async () => {
  return await baseAxiosInstance.get("warmup")
}

export const submitWarmup = async (data: {
  warmupAnswers: { questionId: string; answer: string }[]
  orgUserId?: string | null
  organizationId?: string | null
  assessmentId?: string | null
}) => {
  return await baseAxiosInstance.post("submit-warmup", data)
}

export const submitScreening = async (data: {
  answers: { questionId: string; answer: string }[]
  outcomeId: string
}) => {
  return await baseAxiosInstance.post("submit-screening", {
    screeningAnswers: data.answers,
    outcomeId: data.outcomeId,
  })
}

export const submitSeverity = async (data: {
  answers: { questionId: string; answer: string }[]
  outcomeId: string
}) => {
  return await baseAxiosInstance.post("submit-severity", {
    severityAnswers: data.answers,
    outcomeId: data.outcomeId,
  })
}

export const fetchOutcome=async(outcomeId:string | null)=>{
  return await baseAxiosInstance.get(`outcome/${outcomeId}`)
}
