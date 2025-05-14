import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Linkedin, } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-purple-600 py-12 text-white rounded-t-3xl overflow-hidden">
      <div className="container mx-auto grid gap-8 px-6 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="flex items-center space-x-4">
          <Link href="/" className="text-4xl font-bold text-primary">
            <Image src="/footer_logo.svg" height={60} width={60} alt="Jaagr" />
          </Link></h2>
          <p className="mt-2 text-sm text-white-400">
            We are mental health experienced therapists passionate about empowering you mentally.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter email for newsletter..."
              className="w-full rounded-lg bg-white-800 px-4 py-2 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white-400">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/coming-soon" className="hover:text-white">Career</Link></li>
            <li><Link href="/coming-soon" className="hover:text-white">Testimonials</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Support</h3>
          <ul className="space-y-2 text-sm text-white-400">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white">User Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Support</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of use </Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
        <h3 className="mb-4 text-lg font-semibold">Contact</h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +91 7820001282
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> hello@jaagr.com
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Dehradun
          </li>
          <li className="flex items-center gap-2">
          <a href="https://www.instagram.com/jaagr.mind/" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-white transition-colors duration-200" />
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-white transition-colors duration-200" />
            </a> */}
            <a href="https://www.linkedin.com/company/jaagr/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 hover:text-white transition-colors duration-200" />
            </a>
          </li>
        </ul>
      </div>
      </div>
    </footer>
  );
}
