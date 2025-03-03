import axios from "axios";

export const baseAxiosInstance = axios.create({
    baseURL: `http://localhost:5001/api/`,
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
    const res=await baseAxiosInstance.post('diagnose/',{answers})
    console.log(res);
    return res;
  }
  catch(err){
    return err;
  }
}
  