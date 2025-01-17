"use client";
import { login } from "@/api/authAPI";
import { useState } from "react";

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
import Link from "next/link";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser,user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loginData = { email, password };
    console.log("Hi")
    try {
      const res: any = await login(loginData);
      console.log("HI")
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 });
        const User = await fetchUser();
        console.log(user)
        console.log("hi")
        // console.log(user);
        toast.success("Login successful!");
        router.push("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    // console.log('Login submitted', { email, password })
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Welcome back! Please log in to your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-orange-500 hover:underline"
                >
                  Sign up
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
