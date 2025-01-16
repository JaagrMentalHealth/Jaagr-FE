"use client";
import { signup } from "@/api/authAPI";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import countriesData from "world-countries";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts[1] || "";
    const username = (firstName + lastName).toLowerCase();

    
    const formData = {
      userName: username,
      email: email.toLowerCase(),
      country,
      password,
      fullName: name,
      age,
      phone
    };

    try {
    
      console.log('Submitting form data:', formData);

      const res = await signup(formData);
      
      
      if (res) {
        console.log('Server response:', res);
      } else {
        console.log('Full server response:', res);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };


  const getCountryNames = () => {
    const names = countriesData.map((c) => c.name.common);
    const otherCountries = names.filter(name => name !== "India").sort();
    return ["India", ...otherCountries];
  };

  const countryNames = getCountryNames();

  return (
    <>
      
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm z-10" />
      )}
      
      <div className="flex min-h-screen flex-col relative">
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12">
          <Card className={`w-full max-w-md relative z-20 transition-all duration-200 ${
            isDropdownOpen ? "blur-sm" : ""
          }`}>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Create your account to start writing and sharing your thoughts.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="rounded-md border-gray-300 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="13"
                    max="120"
                    placeholder="25"
                    className="rounded-md border-gray-300 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    className="rounded-md border-gray-300 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="rounded-md border-gray-300 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={country}
                    onValueChange={setCountry}
                    onOpenChange={setIsDropdownOpen}
                    required
                  >
                    <SelectTrigger className="rounded-md border-gray-300 focus:ring-orange-500">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="z-30">
                      {countryNames.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    className="rounded-md border-gray-300 focus:ring-orange-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                >
                  Sign Up
                </Button>
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-orange-500 hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
}