"use client";

import { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { BlogCard } from "@/components/blog-card";
import { TestimonialCard } from "@/components/landing/testimonial-card";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/landing/section-header";
import Link from "next/link";

export default function Home() {
  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
  ];

  const researchHighlights = [
    {
      title: "The Impact of Online Communities on Mental Health",
      description: "A study on how platforms like Jaagr contribute to mental well-being and support networks.",
      link: "#"
    },
    {
      title: "Effectiveness of Digital Mental Health Interventions",
      description: "Research findings on the efficacy of online mental health resources and tools.",
      link: "#"
    },
    {
      title: "Peer Support in Mental Health Recovery",
      description: "Exploring the role of community engagement in mental health improvement and recovery.",
      link: "#"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Mission Statement Section */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <SectionHeader 
              title="Our Mission" 
              subtitle="Creating a supportive community for mental well-being"
            />
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              At Jaagr, we believe in building habits and models that serve your life purpose
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button className="bg-primary text-white hover:bg-primary/90">Need Help?</Button>
              <Button variant="outline" className="hover:bg-accent-foreground/10">Learn more</Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeader 
            title="Featured Insights" 
            subtitle="Explore our curated collection of mental health articles"
          />
          <div className="mb-12">
            <Input
              type="search"
              placeholder="Search for blogs..."
              className="max-w-xl mx-auto"
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-orange-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="What Our Users Say" 
              subtitle="Hear from our community members"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Support Our Cause Section */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <SectionHeader 
              title="Support Our Cause" 
              subtitle="Join us in our mission to promote mental health awareness and prevention"
            />
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our prevention mission is about looking for the root causes of today's problems. Our work looks to address these issues through research, community work and influencing policy.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/contribute">Contribute</Link>
              </Button>
              <Button asChild variant="outline" className="hover:bg-accent-foreground/10">
                <Link href="/shop">Shop</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Professionals Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="For Professionals" 
              subtitle="Join our network of mental health experts and contribute to our community"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Join Our Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Connect with other mental health professionals and contribute to our community-driven approach.</p>
                  <Button asChild>
                    <Link href="/professionals/join">Join Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Research Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Explore opportunities to conduct and participate in cutting-edge mental health research.</p>
                  <Button asChild>
                    <Link href="/professionals/research">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Resources for Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Access a wealth of resources, including latest research, best practices, and professional development materials.</p>
                  <Button asChild>
                    <Link href="/professionals/resources">Access Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Research" 
              subtitle="Explore our latest findings and ongoing studies in mental health"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {researchHighlights.map((research, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{research.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{research.description}</p>
                    <Link href={research.link} className="text-primary hover:underline">
                      Read more
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/research">View All Research</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

