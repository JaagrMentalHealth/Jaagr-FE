import axios from "axios";
import { URL } from "@/api/URL";

export const baseAxiosInstance = axios.create({
    baseURL: `${URL}/assessment/api/`,
  });

export const getQuestions=async ()=>{
  try{
    const res=await baseAxiosInstance.get('questions/')
    console.log(res)
    return res;
  }
  catch(err){
    return err;
  }
}


export const submitAnswers=async (answers)=>{
  try{
    const res=await baseAxiosInstance.post('diagnose/phase1/',{answers})
    console.log(res);
    return res;
  }
  catch(err){
    return err;
  }
}


export const submitAnswersPhase2=async (answers,phase1Diagnosis)=>{
  try{
    const res=await baseAxiosInstance.post('diagnose/phase2/',{answers,phase1Diagnosis})
    console.log(res);
    return res;
  }
  catch(err){
    return err;
  }
}

  