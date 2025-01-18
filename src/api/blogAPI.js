// import {baseAxiosInstance} from './authAPI'
import axios from "axios";
import Cookies from "js-cookie";

const baseBlogInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

const token = Cookies.get("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export async function blogUpload(blogData) {
  try {
    const res = await baseBlogInstance.post("blogs",blogData);
    if(res.status==201){
        return res.data
    }
    else{
        return res
    }
  } catch (error) {
    return error;
  }
}
