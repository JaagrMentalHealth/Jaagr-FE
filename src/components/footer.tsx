import Link from "next/link";
import Image from "next/image";

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
            <li><Link href="/career" className="hover:text-white">Career</Link></li>
            <li><Link href="/testimonials" className="hover:text-white">Testimonials</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Support</h3>
          <ul className="space-y-2 text-sm text-white-400">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white">User Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Support</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-white-400">
            <li>📞 +91 7820001282</li>
            <li>📧 hello@jaagr.com</li>
            <li>📍 Dehradun</li>
            <li>🔗 Social Media</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
