"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { submitContact } from "@/api/contact"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const result = await submitContact(form)
      setReferenceId(result.data.contact.referenceId)
      setSuccess(true)
      toast.success(`Thanks! We got your message (Ref: ${result.data.contact.referenceId}).`)
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || err.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Have questions? We&apos;d love to hear from you. Send us a message and we'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center py-8">
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-2">Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We&apos;ve received your message and will get back to you soon.</p>
                    <p className="mt-2 font-medium">Your reference ID: {referenceId}</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSuccess(false)
                      setReferenceId(null)
                    }}
                    className="bg-purple-600"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={6}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
