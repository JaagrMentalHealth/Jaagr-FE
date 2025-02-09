import axios from "axios";
import Cookies from "js-cookie";
import { URL } from "@/api/URL";
export const baseAxiosInstance = axios.create({
  baseURL: `${URL}/api/otp`,
});

export const sendOTP = async (email) => {
  try {
    // console.log(email);
    const res = await baseAxiosInstance.post("/send-otp", { email });
    return res;
  } catch (err) {
    return err;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await baseAxiosInstance.post("/verify-otp", { email, otp });
    return res;
  } catch (err) {
    return err;
  }
};
