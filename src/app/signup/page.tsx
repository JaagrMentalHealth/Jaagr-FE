"use client";
import { signup } from "@/api/authAPI";
import { useState, FormEvent, ChangeEvent } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { countries } from 'countries-list';
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/userContext";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

type Gender = 'male' | 'female' | 'other';

interface SignupData {
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: Gender;
  fullName: string;
  bio: string;
  country: string;
}

interface UserResponse {
  status: string;
  token: string;
  data: {
    user: {
      userName: string;
      email: string;
      password: string;
      dateOfBirth: string;
      gender: Gender;
      fullName: string;
      bio: string;
      country: string;
      blogs: any[];
      likedBlogs: any[];
      savedBlogs: any[];
      history: any[];
      _id: string;
      profilePhoto: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }
}

export default function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<Gender | ''>("");
  const [dob, setDOB] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setUser } = useUser();
  const router = useRouter();

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name
  })).sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const username = name.split(" ").join("").toLowerCase();

    const data: SignupData = {
      userName: username,
      email,
      password,
      dateOfBirth: dob,
      gender: gender as Gender,
      fullName: name,
      bio,
      country,
    };
    
    try {
      const res: any = await signup(data);
      console.log(res)
      if (res.status === 'success' && res.token) {
        Cookies.set('token', res.token, { expires: 7 });
        
        console.log(res.data.user)
        setUser(res.data.user);
        toast.success('Signup successful!');
        router.push('/');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.log("Signup failed:", error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account to start writing and sharing your thoughts.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  required
                  value={dob}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDOB(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value: Gender) => setGender(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={(value: string) => setCountry(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryList.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  minLength={8}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-500 hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}