"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useUser } from "@/contexts/userContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/profile/avatar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const leftNavItems = [
  { href: "", label: "" },
  { href: "", label: "" },
];

const rightNavItems = [
  { href: "", label: "" },
  { href: "", label: "" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser } = useUser();
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const logOut = () => {
    try {
      setUser(null);
      Cookies.remove("token");
      router.push("/");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Could not log out");
    }
  };

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-4xl font-bold text-primary">
            <Image src="/logo.svg" height={60} width={60} alt="Jaagr" />
          </Link>
          <nav className="hidden md:flex space-x-4">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {user?.userName ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user.profilePhoto || "/default.jpg"}
                    alt={user.fullName}
                  />
                  <AvatarFallback>
                    {user.fullName
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Change Password
                  </button>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full sm:w-auto text-lg py-5 px-7 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col items-center gap-4 bg-white p-4 shadow-lg">
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : ""
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
