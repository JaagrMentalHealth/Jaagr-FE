import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Lightbulb, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">About Jaagr</h1>
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center font-bold text-purple-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <p className="text-lg text-gray-600 mb4">
              Jaagr is a platform dedicated to promoting mental health awareness and providing a safe space for individuals to express their thoughts and experiences.
                </p>
                <p className="text-lg text-gray-600 mb4">
                Our mission is to create a supportive community where people can share their stories, gain insights from mental health experts, and find resources to improve their well-being.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Heart className="w-12 h-12 text-purple-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Compassionate Support</h2>
                  <p className="text-lg text-gray-600 max-w-lg">
                  We foster a community of empathy and understanding, where every voice is heard and valued.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="w-12 h-12 text-purple-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Diverse Perspectives</h2>
                  <p className="text-lg text-gray-600 max-w-lg">
                  We celebrate the diversity of experiences and viewpoints in mental health journeys.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Lightbulb className="w-12 h-12 text-purple-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Continuous Learning</h2>
                  <p className="text-lg text-gray-600 max-w-lg">
                  We&apos;re committed to providing up-to-date resources and insights on mental health.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Globe className="w-12 h-12 text-purple-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Global Community</h2>
                  <p className="text-lg text-gray-600 max-w-lg">
                  We&apos;re building a worldwide network of support and understanding.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-lg">
              <CardHeader >
                <CardTitle className="text-2xl text-center font-bold text-purple-800">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <p className="text-lg text-gray-600 mb-4">
              Founded in 2025, Jaagr has grown into a global community of writers, readers, and mental health advocates. We believe in the power of storytelling and open dialogue to reduce stigma and foster understanding around mental health issues.
              </p>
              <p className="text-lg text-gray-600 mb-4">
              Join us in our journey to make mental health conversations more accessible and create a world where everyone feels heard and supported.
              </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
