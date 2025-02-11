import axios from "axios";
import Cookies from "js-cookie";
import { URL } from "@/api/URL";
export const baseAxiosInstance = axios.create({
  baseURL: `${URL}/api/users`,
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

// In authAPI.js
export const googleLogin = async (credential) => {
  // console.log(tokenId);
  try {
    const response = await baseAxiosInstance.post(
      `/google-login`,
      JSON.stringify({ credential }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // return await response.json();
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = baseAxiosInstance.patch(`/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const findById = async (id) => {
  try {
    const res = await baseAxiosInstance.get(`/findById/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const changePassword = async () => {
  try {
    const token = Cookies.get("token");

    const res = await baseAxiosInstance.get("/change-password", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const changePasswordResponse = async (hashedUserId, newPassword) => {
  try {
    // const token = Cookies.get("token");

    const res = await baseAxiosInstance.post("/change-password", {
      hashedUserId,
      newPassword,
    });
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
