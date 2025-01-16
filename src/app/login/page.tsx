"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toast } from "./toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted with:", { email, password });
    setIsLoading(true);

    try {
      const response = await axios.post("https://jaagr-miy0.onrender.com/api/users/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        setToast({ message: "Login Successful. Welcome back!", type: "success" });
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login";
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Log In</CardTitle>
            <CardDescription>Welcome back! Please log in to your account.</CardDescription>
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
                  onChange={(e) => {
                    console.log("Email entered:", e.target.value); // Log the email value
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="rounded-md border-gray-300 focus:ring-orange-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    console.log("Password entered:", e.target.value); // Log the password value
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  className="rounded-md border-gray-300 focus:ring-orange-500"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-orange-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
