'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { baseAxiosInstance } from '@/api/authAPI';

interface User {
  userName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  fullName: string;
  bio: string;
  blogs: any[]; // Consider creating a Blog interface if you have the structure
  likedBlogs: any[];
  savedBlogs: any[];
  history: any[];
  _id: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser: any = useCallback(async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      setIsLoading(true);
      const response = await baseAxiosInstance.get('/getUser', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response)

      if (response.status!=200) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.data;
      if (data.status === 'success') {
        setUser(data.user);
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user data');
      // Optionally clear the token if it's invalid
      // Cookies.remove('token');
    } finally {
      setIsLoading(false);
      return user;
    }
  }, []);

  // Optionally fetch user data when the provider mounts
  // React.useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};