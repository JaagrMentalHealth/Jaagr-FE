"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { baseAxiosInstance } from "@/api/authAPI";

interface User {
  _id: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  country: string;  // This was missing in original interface
  gender: "male" | "female" | "other";
  fullName: string;
  bio: string;
  blogs: any[];
  likedBlogs: any[];
  savedBlogs: any[];
  history: any[];
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  __v: number;  // This was missing in original interface
}

interface UserContextType {
  user: any | null;
  setUser: (user: any | null) => void;
  fetchUser: () => Promise<void>;
  isLoading: boolean;
}

// Initialize with proper type
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      setIsLoading(true);
      const response = await baseAxiosInstance.get("/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.data;
      if (data.status === "success") {
        console.log("Setting user:", data.data.user);
        setUser(data.data.user);
      } else {
        throw new Error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data");
    } finally {
      setIsLoading(false);
      console.log(user)
    }
  }, []);

  // Create the context value object
  const value: UserContextType = {
    user,
    setUser,
    fetchUser,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
