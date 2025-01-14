import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
// import Image from "next/image"

interface BlogPost {
  slug: string
  title: string
  content: string
  author: string
  date: string
  // image: string
}

// This would typically come from a database or API
const getBlogPost = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    "10-ways-to-overcome-anxiety": {
      slug: "10-ways-to-overcome-anxiety",
      title: "10 Ways to Overcome Anxiety With Proven Techniques",
      content: `Anxiety is a common mental health condition...`,
      author: "John Doe",
      date: "March 15, 2025",
      // image: "/placeholder.svg?height=400&width=800"
    },
    "understanding-anxiety-signs": {
      slug: "understanding-anxiety-signs",
      title: "Understanding Anxiety: Signs and Symptoms",
      content: `Anxiety is a natural response to stress...`,
      author: "John Doe",
      date: "March 15, 2025",
      // image: "/placeholder.svg?height=400&width=800"
    },
    "role-of-meditation": {
      slug: "role-of-meditation",
      title: "The Role of Meditation in Improving Mental Health",
      content: `Meditation has gained significant attention...`,
      author: "John Doe",
      date: "March 15, 2025",
      // image: "/placeholder.svg?height=400&width=800"
    }
  }

  return posts[slug] || null
}

// interface BlogPostProps {
//   params: { slug: string }
// }

export default function BlogPost({ params }: any) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Published on {post.date}</p>
                </div>
              </div>
            </div>
            {/* <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div> */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

