import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200">
              <CardTitle className="text-2xl font-bold text-purple-800">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[70vh] pr-4">
                <div className="prose prose-purple max-w-none">
                  <p className="text-sm text-gray-600 mb-4">Last Updated: 21st Feb 2025</p>

                 <h2>1. Information We Collect</h2>
                  <p>We collect information you provide directly to us when you:</p>
                  <ul>
                  <li>Create an account</li>
                  <li>Create or publish blog posts</li>
                  <li>Comment on blog posts</li>
                  <li>Contact us</li>
                  </ul>

                  <h2>2. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul>
                  <li>Provide and maintain our services</li>
                  <li>Improve and personalize your experience</li>
                  <li>Communicate with you</li>
                  <li>Monitor and analyze usage patterns</li>
                  </ul>

                  <h2>3. Information Sharing</h2>
                  <p>We do not share your personal information with third parties except:</p>
                  <ul>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  </ul>

                  <h2>4. Security</h2>
                  <p>We take reasonable measures to protect your personal information from unauthorized access or disclosure.</p>

                  <h2>5. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of communications</li>
                  </ul>

                  <h2>6. Contact Us</h2>
                  <p>If you have questions about this Privacy Policy, please contact us.</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

