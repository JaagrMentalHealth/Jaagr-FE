"use client"

import { signup, verifyUsername, googleLogin } from "@/api/authAPI"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

interface SignupData {
  userName: string
  email: string
  password: string
  fullName: string
  bio: string
}

export default function SignUpPage() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [bio, setBio] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "valid" | "invalid">("idle")
  const [isVerifying, setIsVerifying] = useState(false)
  const { setUser } = useUser()
  const router = useRouter()

  const checkUsername = async () => {
    setIsVerifying(true)
    try {
      const response: any = await verifyUsername(username)
      const data: any = response.data
      setUsernameStatus(data.exists ? "invalid" : "valid")
    } catch (error) {
      console.error(error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data: SignupData = {
      userName: username,
      email,
      password,
      fullName: name,
      bio,
    }

    try {
      const res: any = await signup(data)
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 })
        setUser(res.data.user)
        toast.success("Signup successful!")
        router.push("/")
      } else {
        toast.error(`Signup failed: ${res}`)
      }
    } catch (error: any) {
      toast.error(`Signup failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google")
      }

      const res: any = await googleLogin(credentialResponse.credential)
      console.log(res)
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 })
        setUser(res.data.user)
        toast.success("Google login successful!")
        router.push("/")
      } else {
        throw new Error(res.message || "Google login failed")
      }
    } catch (error: any) {
      console.error("Google login error:", error)
      toast.error(`Google login failed: ${error.message}`)
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account to start writing and sharing your thoughts.</CardDescription>
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
                  <Label htmlFor="username">Username</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value)
                        setUsernameStatus("idle")
                      }}
                      placeholder="johndoe"
                      className={`flex-1 ${
                        usernameStatus === "valid"
                          ? "border-green-500"
                          : usernameStatus === "invalid"
                            ? "border-red-500"
                            : ""
                      }`}
                    />
                    <Button type="button" onClick={checkUsername} disabled={!username || isVerifying} size="sm">
                      {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                    </Button>
                  </div>
                  {usernameStatus !== "idle" && (
                    <p className={`text-sm ${usernameStatus === "valid" ? "text-green-600" : "text-red-600"}`}>
                      {usernameStatus === "valid" ? "Username can be used" : "Username taken"}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                  />
                </div> */}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.log("Login Failed")
                    toast.error("Google sign-in failed. Please try again.")
                  }}
                />
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
    </GoogleOAuthProvider>
  )
}

