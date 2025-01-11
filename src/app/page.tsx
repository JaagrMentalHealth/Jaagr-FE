import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { BlogCard } from "@/components/landing/blog-card"
import { TestimonialCard } from "@/components/landing/testimonial-card"
import { Footer } from "@/components/landing/footer"
import { Input } from "@/components/landing/ui//input"

export default function Home() {
  const featuredBlogs = [
    {
      slug: "10-ways-to-overcome-anxiety",
      title: "10 Ways to Overcome Anxiety With Proven Techniques",
      excerpt: "Anxiety is a common mental health condition that affects millions of people worldwide. While medication can be helpful, there are many natural techniques that can help manage anxiety effectively.",
      author: "John Doe",
      date: "March 15, 2025",
      image: "/images/blog1.png"
    },
    {
      slug: "understanding-anxiety-signs",
      title: "Understanding Anxiety: Signs and Symptoms to Watch For",
      excerpt: "Anxiety is a natural response to stress, but when it becomes excessive and persistent, it can interfere with daily life. Learn to recognize the signs and symptoms of anxiety disorders.",
      author: "Jane Smith",
      date: "March 20, 2025",
      image: "/images/blog2.png"
    },
    {
      slug: "role-of-meditation",
      title: "The Role of Meditation in Improving Mental Health",
      excerpt: "Meditation has gained significant attention as a powerful tool for enhancing mental well-being. Discover how this ancient practice can help reduce stress, anxiety, and depression.",
      author: "Alex Johnson",
      date: "March 25, 2025",
      image: "/images/blog3.png"
    }
  ]

  const testimonials = [
    {
      quote: "Jaagr has transformed the way I share my mental health journey. The community is incredibly supportive and engaging.",
      author: "Emily Chen",
      role: "Mental Health Advocate"
    },
    {
      quote: "As a therapist, I find Jaagr to be an invaluable resource for my clients. It provides a safe space for expression and growth.",
      author: "Dr. Michael Brown",
      role: "Clinical Psychologist"
    },
    {
      quote: "Jaagr has helped me understand my thoughts and emotions better. It's like having a supportive friend in your pocket.",
      author: "Sarah Thompson",
      role: "Jaagr User"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-4">Search for Insights</h2>
            <Input
              type="search"
              placeholder="Search for blogs..."
              className="max-w-xl mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Blogs</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </section>
        <section className="bg-orange-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

