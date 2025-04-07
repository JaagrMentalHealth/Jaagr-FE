"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/profile/avatar";
import { Progress } from "@/components/ui/progress";
import { Pencil } from "lucide-react";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";
import { BlogCardGrid } from "@/components/profile/blog-card-grid";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BlogCard } from "@/components/blog-card";

// Mock data
// const user = {
//   name: "Jane Doe",
//   profilePicture: "/placeholder.svg?height=200&width=200",
//   bio: "Mental health advocate and writer",
//   gender: "Female",
//   dateOfBirth: "1990-01-15",
// }

interface UserProfile {
  fullName: string;
  email: string;
  userName: string;
  bio: string;
  dateOfBirth: string;
  country: string;
  gender: string;
}

const mentalHealthProgress = 65;
const blogsRead = [
  {
    title: "Understanding Anxiety",
    excerpt: "Learn about the common signs and symptoms of anxiety disorders.",
    author: "Dr. Emily Johnson",
    date: "2023-05-15",
    image: "/placeholder.svg?height=200&width=300",
    slug: "understanding-anxiety",
  },
  {
    title: "Mindfulness Techniques",
    excerpt: "Discover effective mindfulness practices for daily life.",
    author: "Sarah Thompson",
    date: "2023-05-10",
    image: "/placeholder.svg?height=200&width=300",
    slug: "mindfulness-techniques",
  },
  {
    title: "Dealing with Depression",
    excerpt: "Strategies to cope with and overcome depression.",
    author: "Dr. Michael Brown",
    date: "2023-05-05",
    image: "/placeholder.svg?height=200&width=300",
    slug: "dealing-with-depression",
  },
];
const blogsWritten = [
  {
    title: "My Journey to Mental Wellness",
    excerpt: "A personal account of overcoming mental health challenges.",
    author: "Jane Doe",
    date: "2023-05-20",
    image: "/placeholder.svg?height=200&width=300",
    slug: "journey-to-mental-wellness",
  },
  {
    title: "5 Tips for Better Sleep",
    excerpt: "Improve your sleep quality with these simple tips.",
    author: "Jane Doe",
    date: "2023-05-01",
    image: "/placeholder.svg?height=200&width=300",
    slug: "tips-for-better-sleep",
  },
];
const lastAssessment = {
  date: "2023-05-18",
  score: 75,
};

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, setUser, isLoading, fetchUser } = useUser();
  // const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    userName: "",
    bio: "",
    dateOfBirth: "",
    country: "",
    gender: "",
  });
  const [pendingUpdates, setPendingUpdates] = useState<Partial<UserProfile>>(
    {}
  );

  useEffect(()=>{
    
    fetchUser();
  },[])

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        userName: user.userName || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
        country: user.country || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Please log in to view your profile
      </div>
    );
  }
  const getExcerpt = (content: string): string => {
    try {
      const parsedContent = JSON.parse(content);
      const firstParagraph = parsedContent.blocks.find(
        (block: any) => block.type === "paragraph"
      );
      return firstParagraph
        ? firstParagraph.data.text.slice(0, 150) + "..."
        : "";
    } catch (error) {
      console.error("Error parsing blog content:", error);
      return "";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4 space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-purple-800">
                    {user.fullName}
                  </h1>
                  <p className="text-gray-600 mt-2">{user.bio}</p>
                </div>
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                  <AvatarFallback>
                    {user.fullName
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="outline"
                className="mt-4"
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mental Health Exercise Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mentalHealthProgress} className="w-full" />
              <p className="mt-2 text-center">
                {mentalHealthProgress}% Complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blogs Read</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {user.history.length > 0 ? (
                  <>
                    {user.history.map((post: any, index: any) => {
                      console.log(post);
                      return (
                        <BlogCard
                          key={post._id}
                          heading={post.heading}
                          excerpt={getExcerpt(post.content)}
                          author={post.author}
                          date={new Date(post.createdAt).toLocaleDateString()}
                          coverPhoto={
                            post.coverPhoto ||
                            "/placeholder.svg?height=200&width=300"
                          }
                          slug={post.slug}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>You haven&apos;t read any blogs</>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="flex justify-between">
                <p>Blogs Written</p>
                <Button
                  onClick={() => {
                    router.push("/upload");
                  }}
                  className=" w-fit p-4"
                >
                  Write a New Blog
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {user.blogs.map((post: any, index: any) => (
                  <BlogCard
                    key={post._id}
                    heading={post.heading}
                    excerpt={getExcerpt(post.content)}
                    author={post.author.fullName}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    coverPhoto={
                      post.coverPhoto || "/placeholder.svg?height=200&width=300"
                    }
                    slug={post.slug}
                    user={user.fullName}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Assessment</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <p>Date: {lastAssessment.date}</p>
              <p>Score: {lastAssessment.score}</p>
            </CardContent> */}
          </Card>
        </div>
      </main>
      <Footer />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
