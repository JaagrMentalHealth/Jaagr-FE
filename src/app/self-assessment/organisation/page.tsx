"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { useSearchParams } from "next/navigation";
import {testHit} from '@/api/assessment'

export default function UserPage() {
  const [userName, setUserName] = useState<string | null>(null);
//   const searchParams=useSearchParams();
//   const token=searchParams.get("a")
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response:any = await testHit(token); 
//         console.log(response);
//         setUserName(response.data.fullName) 
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full"
      >
        <h1 className="text-4xl font-extrabold text-gray-900">
          {userName ? `Welcome, ${userName}!` : "Loading..."}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          We're excited to have you here. Explore and enjoy your experience!
        </p>
      </motion.div>
    </div>
  );
}
