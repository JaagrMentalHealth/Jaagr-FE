import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl font-bold mb-8 text-center">About Jaagr</h1>
          <div className="max-w-3xl mx-auto space-y-6 text-lg">
            <p>
              Jaagr is a platform dedicated to promoting mental health awareness and providing a safe space for individuals to express their thoughts and experiences.
            </p>
            <p>
              Our mission is to create a supportive community where people can share their stories, gain insights from mental health experts, and find resources to improve their well-being.
            </p>
            <p>
              Founded in 2025, Jaagr has grown into a global community of writers, readers, and mental health advocates. We believe in the power of storytelling and open dialogue to reduce stigma and foster understanding around mental health issues.
            </p>
            <p>
              Join us in our journey to make mental health conversations more accessible and create a world where everyone feels heard and supported.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
