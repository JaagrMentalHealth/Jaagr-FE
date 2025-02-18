import axios from "axios";
import Cookies from "js-cookie";
import { URL } from "@/api/URL";
// import { headers } from "next/headers";
export const baseAxiosInstance = axios.create({
  baseURL: `${URL}/api/assessment`,
});


export const testHit=async(token)=>{
    try{
        const res=await baseAxiosInstance.post("/test",{},{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        return res;
    }
    catch(error){
        return error;
    }
}