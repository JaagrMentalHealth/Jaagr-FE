import axios from "axios"
import { URL } from "@/api/URL"

// Create axios instance with base URL
const baseAxiosInstance = axios.create({
  baseURL: `${URL}/assessment/assessment/`,
})

/**
 * Fetch warmup questions (phase 0)
 */
export const getWarmupQuestions = async () => {
  try {
    const response = await baseAxiosInstance.get("warmup")
    return response
  } catch (error) {
    console.error("Error fetching warmup questions:", error)
    throw error
  }
}

/**
 * Submit warmup answers and get screening questions
 */
export const submitWarmup = async () => {
  try {
    const response = await baseAxiosInstance.post("submit-warmup")
    return response
  } catch (error) {
    console.error("Error submitting warmup answers:", error)
    throw error
  }
}

/**
 * Submit screening answers and get severity questions
 * @param {Object} data - The answers data
 * @param {Array} data.answers - Array of {questionId, answer} objects
 */
export const submitScreening = async (data: { answers: { questionId: string; answer: string }[] }) => {
  try {
    const response = await baseAxiosInstance.post("submit-screening", data)
    return response
  } catch (error) {
    console.error("Error submitting screening answers:", error)
    throw error
  }
}

/**
 * Submit severity answers and get final diagnosis
 * @param {Object} data - The answers data
 * @param {Array} data.answers - Array of {questionId, answer} objects
 */
export const submitSeverity = async (data: { answers: { questionId: string; answer: string }[] }) => {
  try {
    const response = await baseAxiosInstance.post("submit-severity", data)
    return response
  } catch (error) {
    console.error("Error submitting severity answers:", error)
    throw error
  }
}

