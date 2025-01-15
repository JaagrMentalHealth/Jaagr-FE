import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="lead">Last updated: January 10, 2024</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Jaagr, you agree to be bound by these Terms of Service.</p>

            <h2>2. Description of Service</h2>
            <p>Jaagr provides a platform for users to create, publish, and share blog posts related to mental health and well-being.</p>

            <h2>3. User Responsibilities</h2>
            <ul>
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must not use the service for any illegal or unauthorized purpose</li>
              <li>You must respect the intellectual property rights of others</li>
            </ul>

            <h2>4. Content Guidelines</h2>
            <p>Users must not post content that:</p>
            <ul>
              <li>Is illegal, harmful, or offensive</li>
              <li>Infringes on others' intellectual property rights</li>
              <li>Contains malware or harmful code</li>
              <li>Violates others' privacy</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>You retain ownership of your content, but grant us a license to use it on our platform.</p>

            <h2>6. Termination</h2>
            <p>We reserve the right to terminate or suspend accounts that violate these terms.</p>

            <h2>7. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>

            <h2>8. Contact</h2>
            <p>For questions about these Terms, please contact us.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
