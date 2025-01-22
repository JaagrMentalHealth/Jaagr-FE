import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-800 py-12 text-white">
      <div className="container grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="text-center sm:text-left">
          <Link href="/" className="mb-4 inline-flex items-center">
            <span className="text-4xl font-bold text-orange-500">जाग्र</span>
          </Link>
          <p className="text-sm text-zinc-400">
            Share your stories with the world and connect with readers who love your content
          </p>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="text-sm text-zinc-400 hover:text-white">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-zinc-400 hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-zinc-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center gap-4 sm:justify-start">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </Link>
            <Link href="https://www.instagram.com/jaagrhealth/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
