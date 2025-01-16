import axios from "axios";

const baseAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

//Signup API call Function
export const signup = async (data) => {
  try {
    const res = await axios.post("/signup", data);
    return res;
  } catch (err) {
    return err;
  }
};
