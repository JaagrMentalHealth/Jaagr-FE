import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function submitContact({ name, email, subject, message }) {
  const resp = await axios.post(
    `${BASE_URL}/api/contact`,     // adjust path if yours is e.g. `/contacts`
    { name, email, subject, message },
    { headers: { "Content-Type": "application/json" } }
  );
  return resp.data;            // { status:"success", data:{ contact } }
}