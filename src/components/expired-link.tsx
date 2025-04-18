"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExpiredLink() {
  const router=useRouter()
  // Function to handle requesting a new link
  const handleRequestNewLink = () => {
    // This would typically send a request to your backend
    console.log("Requesting new assessment link")
    // You could show a success message or redirect
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-purple-100">
        <CardHeader className="bg-purple-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-purple-100" />
            <span className="text-sm font-medium text-purple-100">Link Status</span>
          </div>
          <CardTitle className="text-2xl font-bold">Assessment Link Expired</CardTitle>
          <p className="text-purple-100 mt-2">
            We&apos;re sorry, but the link to this assessment has expired for security reasons.
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h2 className="font-medium text-purple-900 mb-2">Why did my link expire?</h2>
            <p className="text-sm text-purple-800">
              Assessment links expire after 48 hours to protect your privacy and ensure the security of your personal
              information.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-purple-900">What you can do next:</h3>
            <ul className="space-y-2">
              {[
                "Request a new assessment link",
                "Contact our support team for assistance",
                "Check your email for a newer link",
                "Visit our help center for more information",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-purple-800">
                  <ArrowRight className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-purple-100">
            <div className="text-center text-sm text-purple-700">
              <p>Need immediate assistance?</p>
              <p className="mt-1">
                <a href="/contact " className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-purple-50 px-6 py-4 border-t border-purple-100 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleRequestNewLink}
            className="w-full sm:w-auto rounded-lg bg-purple-600 hover:bg-purple-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Request New Link
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-lg border-purple-200 text-purple-700 hover:bg-purple-100"
            onClick={()=>router.push('/')}
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
