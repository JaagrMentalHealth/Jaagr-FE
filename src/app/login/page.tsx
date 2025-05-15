"use client"

import type React from "react"

import { googleLogin, login } from "@/api/authAPI"
import { useState, Suspense, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { useUser } from "@/contexts/userContext"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import Loader from "@/components/Loader"

function LoginForm({ setIsLoading }: { setIsLoading: (val: boolean) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { fetchUser, user, setUser } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/profile")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const loginData = { email, password }
    try {
      const res: any = await login(loginData)
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 })
        await fetchUser()
        toast.success("Login successful!")
        router.back()
      } else {
        throw new Error("Login failed")
      }
    } catch (error) {
      console.log("Login failed:", error)
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google")
      }

      setIsLoading(true)
      const res: any = await googleLogin(credentialResponse.credential)
      console.log(res)
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 })
        setUser(res.data.user)
        toast.success("Google login successful!")
        router.back()
      } else {
        throw new Error(res.message || "Google login failed")
      }
    } catch (error: any) {
      console.error("Google login error:", error)
      toast.error(`Google login failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Welcome back! Please log in to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
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
            <Button type="submit" className="w-full bg-purple-600">
              <Loader2 className="mr-2 h-4 w-4 animate-spin hidden" />
              Login
            </Button>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log("Login Failed")
                toast.error("Google sign-in failed. Please try again.")
              }}
            />
            <p className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-500 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </GoogleOAuthProvider>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  // Check if user is already logged in at the page level
  useEffect(() => {
    if (user) {
      router.push("/profile")
    }
  }, [user, router])

  return (
    <div className="flex min-h-screen flex-col relative">
      {isLoading && <Loader />}
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm setIsLoading={setIsLoading} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
