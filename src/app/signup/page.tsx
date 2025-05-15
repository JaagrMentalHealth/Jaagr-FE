"use client"

import { signup, verifyUsername, googleLogin } from "@/api/authAPI"
import { sendOTP } from "@/api/otpAPI"
import { useState, type FormEvent, type ChangeEvent, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { OTPModal } from "@/components/ui/otpModal"
import { useUser } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import Loader from "@/components/Loader"
import Link from "next/link"

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "valid" | "invalid">("idle")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isEmailVerifying, setIsEmailVerifying] = useState(false)
  const { setUser, user } = useUser()
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/profile")
    }
  }, [user, router])

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

  const initiateOTP = async () => {
    setIsEmailVerifying(true)
    try {
      const res: any = await sendOTP(email)
      if (res.status === 200) {
        setIsOTPModalOpen(true)
      } else if (res.status === 403) {
        toast.error(res.response.data.message)
      } else {
        toast.error("Unknown Error Occurred")
      }
    } catch (err) {
      console.error(err)
      toast.error("Unknown Error Occurred")
    } finally {
      setIsEmailVerifying(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google")
      }
      setIsLoading(true)
      const res: any = await googleLogin(credentialResponse.credential)
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEmailVerified || usernameStatus !== "valid") {
      toast.error("Please verify your email and username before signing up.")
      return
    }
    setIsLoading(true)

    const data: SignupData = {
      userName: username,
      email,
      password,
      fullName: name,
      bio: "",
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
      console.error(error)
      toast.error(`Signup failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex min-h-screen flex-col">
        {isLoading && <Loader />}
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-purple-50 to-white flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account to start writing and sharing your thoughts.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={isEmailVerified ? "border-green-500" : ""}
                    />
                    <Button
                      type="button"
                      onClick={initiateOTP}
                      size="sm"
                      disabled={!email || isEmailVerified || isEmailVerifying}
                      className="w bg-purple-600"
                    >
                      {isEmailVerifying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>{isEmailVerified ? "Verified" : "Verify"}</>
                      )}
                    </Button>
                  </div>
                </div>
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setUsernameStatus("idle")
                      }}
                      placeholder="Username"
                      className={usernameStatus === "valid" ? "border-green-500" : ""}
                    />
                    <Button
                      type="button"
                      onClick={checkUsername}
                      size="sm"
                      disabled={!username || isVerifying}
                      className="w bg-purple-600"
                    >
                      {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                    </Button>
                  </div>
                </div>
                {/* Password */}
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
                      placeholder="Password (min 8 characters)"
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
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-purple-600"
                  disabled={isLoading || !isEmailVerified || usernameStatus !== "valid"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.log("Google login failed")
                    toast.error("Google sign-in failed. Please try again.")
                  }}
                />

                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-500 hover:underline">
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </main>
        <Footer />
      </div>

      {/* OTP Modal outside the Provider */}
      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        verify={() => setIsEmailVerified(true)}
        email={email}
      />
    </GoogleOAuthProvider>
  )
}
