"use client";

import { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/landing/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/landing/section-header";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function Home() {
  const { fetchUser, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const featuredBlogs = [
    {
      slug: "10-ways-to-overcome-anxiety",
      heading: "10 Ways to Overcome Anxiety With Proven Techniques",
      excerpt:
        "Anxiety is a common mental health condition that affects millions of people worldwide. While medication can be helpful, there are many natural techniques that can help manage anxiety effectively.",
      author: "John Doe",
      date: "March 15, 2025",
      coverPhoto: "/images/blog1.png",
    },
    {
      slug: "understanding-anxiety-signs",
      heading: "Understanding Anxiety: Signs and Symptoms to Watch For",
      excerpt:
        "Anxiety is a natural response to stress, but when it becomes excessive and persistent, it can interfere with daily life. Learn to recognize the signs and symptoms of anxiety disorders.",
      author: "Jane Smith",
      date: "March 20, 2025",
      coverPhoto: "/images/blog2.png",
    },
    {
      slug: "role-of-meditation",
      heading: "The Role of Meditation in Improving Mental Health",
      excerpt:
        "Meditation has gained significant attention as a powerful tool for enhancing mental well-being. Discover how this ancient practice can help reduce stress, anxiety, and depression.",
      author: "Alex Johnson",
      date: "March 25, 2025",
      coverPhoto: "/images/blog3.png",
    },
  ];

  // const researchHighlights = [
  //   {
  //     title: "The Impact of Online Communities on Mental Health",
  //     description:
  //       "A study on how platforms like Jaagr contribute to mental well-being and support networks.",
  //     link: "#",
  //   },
  //   {
  //     title: "Effectiveness of Digital Mental Health Interventions",
  //     description:
  //       "Research findings on the efficacy of online mental health resources and tools.",
  //     link: "#",
  //   },
  //   {
  //     title: "Peer Support in Mental Health Recovery",
  //     description:
  //       "Exploring the role of community engagement in mental health improvement and recovery.",
  //     link: "#",
  //   },
  // ];

  return (
    <div className="flex items min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Mission Statement Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-purple-800">Our Mission</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700">
              At Jaagr, we believe in the power of shared experiences and open dialogue to foster mental well-being. Our
              mission is to create a supportive community where individuals can express themselves freely, learn from
              others, and access valuable mental health resources.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button 
                onClick={() => {
                router.push("/contact");
                }}
                className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 rounded-full py-6 px-8 text-lg">
                Need Help?
              </Button>
              <Button
                onClick={() => {
                router.push("/mental-health-exercise");
                }}
                variant="outline"
                className="hover:bg-purple-100 transition-colors duration-300 rounded-full py-6 px-8 text-lg"
              >
                Learn More
              </Button>
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

        {/* Support Our Cause Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-purple-800">Support Our Cause </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700">
            Our prevention mission is is about looking for the root causes of today&apos;s problems. Our
            work looks to address these issues through research, community work and influencing
            policy.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button 
              onClick={() => {
                router.push("/contact");
                }}
              className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 rounded-full py-6 px-8 text-lg">
                Get in touch
              </Button>
              <Button
              onClick={() => {
                router.push("/coming-soon");
                }}
                variant="outline"
                className="hover:bg-purple-100 transition-colors duration-300 rounded-full py-6 px-8 text-lg"
              >
                Shop
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
                  <p className="mb-4">
                    Connect with other mental health professionals and
                    contribute to our community-driven approach.
                  </p>
                  <Button className="bg-purple-700 text-white hover:bg-purple-600 transition-colors duration-300 rounded-full py-6 px-8 text-lg">
                    <Link href="/professionals/join">Join Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Research Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Explore opportunities to conduct and participate in
                    cutting-edge mental health research.
                  </p>
                  <Button className="bg-purple-700 text-white hover:bg-purple-600 transition-colors duration-300 rounded-full py-6 px-8 text-lg">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Resources for Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Access a wealth of resources, including latest research,
                    best practices, and professional development materials.
                  </p>
                  <Button className="bg-purple-700 text-white hover:bg-purple-600 transition-colors duration-300 rounded-full py-6 px-8 text-lg">
                    <Link href="/professionals/resources">
                      Access Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Section */}
        {/* <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Research"
              subtitle="Explore our latest findings and ongoing studies in mental health"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {researchHighlights.map((research, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <CardTitle>{research.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{research.description}</p>
                    <Link
                      href={research.link}
                      className="text-primary hover:underline"
                    >
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
        </section> */}
      </main>
      <Footer />
    </div>
  );
}
