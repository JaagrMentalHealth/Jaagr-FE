import Link from "next/link"
import Image from "next/image"


export function Navbar() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-4xl font-bold text-primary">
            <Image src="/logo.svg" height={60} width={60} alt="Jaagr" />
        </Link>
      </div>
    </header>
  )
}

