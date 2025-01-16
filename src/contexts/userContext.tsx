'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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

