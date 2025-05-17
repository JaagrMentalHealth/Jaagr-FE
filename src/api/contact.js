import axios from "axios";

import { URL } from "./URL";
export async function submitContact({ name, email, subject, message }) {
  const resp = await axios.post(
    `${URL}/api/contact`,     // adjust path if yours is e.g. `/contacts`
    { name, email, subject, message },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(resp)
  return resp.data;            // { status:"success", data:{ contact } }
}