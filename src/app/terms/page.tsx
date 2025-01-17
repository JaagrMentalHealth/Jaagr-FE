import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Terms of Service</h1>
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
              <CardTitle className="text-2xl font-bold text-orange-800">Last updated: January 10, 2024</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
                  <AccordionContent>
                    By accessing or using Jaagr, you agree to be bound by these Terms of Service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. Description of Service</AccordionTrigger>
                  <AccordionContent>
                    Jaagr provides a platform for users to create, publish, and share blog posts related to mental health and well-being.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. User Responsibilities</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>You must provide accurate information when creating an account</li>
                      <li>You are responsible for maintaining the security of your account</li>
                      <li>You must not use the service for any illegal or unauthorized purpose</li>
                      <li>You must respect the intellectual property rights of others</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>4. Content Guidelines</AccordionTrigger>
                  <AccordionContent>
                    <p>Users must not post content that:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Is illegal, harmful, or offensive</li>
                      <li>Infringes on others&apos; intellectual property rights</li>
                      <li>Contains malware or harmful code</li>
                      <li>Violates others&apos; privacy</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>5. Intellectual Property</AccordionTrigger>
                  <AccordionContent>
                    You retain ownership of your content, but grant us a license to use it on our platform.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>6. Termination</AccordionTrigger>
                  <AccordionContent>
                    We reserve the right to terminate or suspend accounts that violate these terms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>7. Changes to Terms</AccordionTrigger>
                  <AccordionContent>
                    We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>8. Contact</AccordionTrigger>
                  <AccordionContent>
                    For questions about these Terms, please contact us.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
