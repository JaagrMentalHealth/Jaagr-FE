'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/landing/ui/button"
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-6xl font-bold text-orange-500">जाग्र</span>
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-16 flex-col items-center gap-4 bg-white p-4 shadow-lg w-full md:static md:flex md:flex-row md:items-center md:gap-6 md:w-auto md:shadow-none`}
        >
          <Link href="/" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-orange-500 transition-colors">
            About Us
          </Link>
          <Link href="/blogs" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Blogs
          </Link>
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-4">
            <Link href="/login" className="w-full md:w-auto">
              <Button variant="ghost" className="w-full md:w-auto hover:text-orange-500">Login</Button>
            </Link>
            <Link href="/signup" className="w-full md:w-auto">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 md:w-auto">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

