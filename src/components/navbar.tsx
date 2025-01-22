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

const leftNavItems = [
  { href: "/self-assessment", label: "Self Assessment" },
  { href: "/blogs", label: "Articles" },
];

const rightNavItems = [
  { href: "/about", label: "Our Mission" },
  { href: "/contact", label: "Get in Touch" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <span className="text-4xl font-bold text-primary">जाग्र</span>
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
          <div className="hidden md:flex space-x-2">
            {user?.userName && user !== null ? (
              <Link href="/profile">
                 <Avatar className="w-16 h-16 mx-auto">
                        <AvatarImage
                          src={user.profilePhoto}
                          alt={user.fullName}
                        />
                        <AvatarFallback className="sm:w-[3.75rem] sm:h-[3.75rem] sm:border-none">
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:text-orange-500">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
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
            {user?.userName && user !== null ? (
              <Link href="/profile" onClick={toggleMenu}>
                <Image
                  alt={user.userName}
                  src={
                    user.profilePhoto === "default-male.png"
                      ? "/default.jpg"
                      : user.profilePhoto
                  }
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <>
                <Link href="/login" className="w-full" onClick={toggleMenu}>
                  <Button
                    variant="ghost"
                    className="w-full hover:text-orange-500"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="w-full" onClick={toggleMenu}>
                  <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
