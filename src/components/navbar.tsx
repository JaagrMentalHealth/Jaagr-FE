'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

const leftNavItems = [
  { href: '/self-assessment', label: 'Self Assessment' },
  { href: '/blogs', label: 'Articles' },
]

const rightNavItems = [
  { href: '/mission', label: 'Our Mission' },
  { href: '/contact', label: 'Get in Touch' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

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
                  pathname === item.href ? 'text-primary' : ''
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
                  pathname === item.href ? 'text-primary' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex space-x-2">
            <Button asChild variant="ghost" className="hover:text-primary">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
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
                  pathname === item.href ? 'text-primary' : ''
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="ghost" className="w-full hover:text-primary">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
