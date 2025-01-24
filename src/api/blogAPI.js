// import {baseAxiosInstance} from './authAPI'
import axios from "axios";

import Cookies from "js-cookie";

const baseBlogInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export async function blogUpload(blogData) {
  try {
    const token = Cookies.get("token");

    const res = await baseBlogInstance.post("blogs", blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function getAllBlogs() {
  try {
    const res = await baseBlogInstance.get("blogs");
    if (res.status == 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getBlog(slug) {
  try {
    const token = Cookies.get("token");
    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
    const res = await baseBlogInstance.get(`blogs/${slug}`, {
      headers: headers,
    });
    if (res.status == 200) {
      return res.data;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteBlog(slug) {
  try {
    const token = Cookies.get("token");
    const res = await baseBlogInstance.delete(`blogs/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data)
    return res;
  } catch (err) {
    return err.response.data.message;
  }
}
