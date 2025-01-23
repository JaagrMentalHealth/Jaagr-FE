"use client";

import { signup, verifyUsername } from "@/api/authAPI";
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
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { countries } from "countries-list";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type Gender = "male" | "female" | "other";

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

export default function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [gender, setGender] = useState<Gender | "">("");
  const [dob, setDOB] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [isVerifying, setIsVerifying] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const countryList = [
    { code: "IN", name: "India" },
    ...Object.entries(countries)
      .map(([code, country]) => ({ code, name: country.name }))
      .filter((c) => c.name !== "India")
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const checkUsername = async () => {
    setIsVerifying(true);
    try {
      const response: any = await verifyUsername(username);
      const data: any = response.data;
      setUsernameStatus(data.exists ? "invalid" : "valid");
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsLoading(true);

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

    const res: any = await signup(data);

    try {
      if (res.status === "success" && res.token) {
        Cookies.set("token", res.token, { expires: 7 });
        setUser(res.data.user);
        toast.success("Signup successful!");
        router.push("/");
      } else {
        toast.error(`Signup failed: ${res}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Full Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format.";
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!dob) newErrors.dob = "Date of Birth is required.";
    if (!gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12">
        <Card className={`w-full max-w-md transition-all duration-200 ${isDropdownOpen ? "blur-sm" : ""}`}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account to start writing and sharing your thoughts.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? "border-red-500" : ""}
                  onBlur={validateFields}
                />
                <div className="h-5">
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className={errors.email ? "border-red-500" : ""}
                  onBlur={validateFields}
                />
                <div className="h-5">
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUsername(e.target.value);
                      setUsernameStatus("idle");
                    }}
                    placeholder="johndoe"
                    className={`flex-1 ${errors.username ? "border-red-500" : ""} ${
                      usernameStatus === "valid"
                        ? "border-green-500"
                        : usernameStatus === "invalid"
                        ? "border-red-500"
                        : ""
                    }`}
                    onBlur={validateFields}
                  />
                  <Button
                    type="button"
                    onClick={checkUsername}
                    disabled={!username || isVerifying}
                    size="sm"
                  >
                    {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                  </Button>
                </div>
                <div className="h-5">
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                  {usernameStatus !== "idle" && (
                    <p className={`text-sm ${usernameStatus === "valid" ? "text-green-500" : "text-red-500"}`}>
                      {usernameStatus === "valid" ? "Username can be used" : "Username taken"}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  required
                  value={dob}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDOB(e.target.value)}
                  className={errors.dob ? "border-red-500" : ""}
                  onBlur={validateFields}
                />
                <div className="h-5">
                  {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={gender}
                  onValueChange={(value: Gender) => setGender(value)}
                  onOpenChange={setIsDropdownOpen}
                  required
                >
                  <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-5">
                  {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={country}
                  onValueChange={(value: string) => setCountry(value)}
                  onOpenChange={setIsDropdownOpen}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryList.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    minLength={8}
                    className={errors.password ? "border-red-500" : ""}
                    onBlur={validateFields}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="h-5">
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
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
                  "Sign Up"
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