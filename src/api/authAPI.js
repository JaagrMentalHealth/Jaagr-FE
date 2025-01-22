import axios from "axios";

export const baseAxiosInstance = axios.create({
  baseURL: "https://jaagr-miy0.onrender.com/api/users",
});

//Signup API call Function
export const signup = async (data) => {
  try {
    const res = await baseAxiosInstance.post("/signup", data);
    if (res.status == 201) {
      return res.data;
    } else {
      return res;
    }
  } catch (err) {
    // console.log(err.response.data.message)
    return err.response.data.message;
  }
};

export const login = async (data) => {
  try {
    const res = await baseAxiosInstance.post("/login", data);
    if (res.status == 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (err) {
    return err;
  }
};

export const verifyUsername = async (data) => {
  try {
    const res = await baseAxiosInstance.get(`/verifyUsername/${data}`);
    return res;
  } catch (err) {
    return err;
  }
};

// export const fetchData=async ()=>{
//   try{

//   }
// }
