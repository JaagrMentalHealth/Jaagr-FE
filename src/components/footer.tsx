import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
export function Footer() {
  return (
    <footer className="w-full bg-zinc-800 py-12 text-white">
      <div className="container grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="text-center sm:text-left">
          <Link href="/" className="mb-4 inline-flex items-center">
            <Image src="/logo.svg" height={60} width={80} alt="Jaagr" />
          </Link>
          <p className="text-sm text-zinc-400">
            Bringing mental health experts to your palm. Discover a supportive community and valuable resources for your well-being journey.
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
              Terms of condition
            </Link>
            <Link href="/faq" className="text-sm text-zinc-400 hover:text-white">
              FAQs
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
