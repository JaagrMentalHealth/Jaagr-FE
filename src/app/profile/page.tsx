"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/profile/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/profile/tabs";
import { Separator } from "@/components/profile/separator";
import { BlogCard } from "@/components/blog-card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  Calendar,
  Lock,
} from "lucide-react";
import { useUser } from "@/contexts/userContext"; // Adjust the import path as needed
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, setUser, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    userName: "",
    bio: "",
    dateOfBirth: "",
    country: "",
    gender: "",
  });

  // Update local state when user data is loaded
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        userName: user.userName || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "", // Format date for input
        country: user.country || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Here you would make an API call to update the user profile
      // For now, we'll just update the context
      if (user) {
        const updatedUser = {
          ...user,
          ...profile,
        };
        setUser(updatedUser);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-orange-800">
                Your Profile
              </CardTitle>
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  variant="ghost"
                  className="text-orange-800"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="blogs">My Blogs</TabsTrigger>
                  <TabsTrigger value="saved">Saved Blogs</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="mt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Avatar className="w-32 h-32 mx-auto">
                        <AvatarImage
                          src={user.profilePhoto}
                          alt={profile.fullName}
                        />
                        <AvatarFallback>
                          {profile.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center space-x-2">
                        <User className="text-orange-500" />
                        {isEditing ? (
                          <Input
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleChange}
                            className="flex-grow"
                          />
                        ) : (
                          <span>{profile.fullName}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="text-orange-500" />
                        <span>{profile.email}</span>{" "}
                        {/* Email should not be editable */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-orange-500" />
                        {isEditing ? (
                          <Input
                            name="country"
                            value={profile.country}
                            onChange={handleChange}
                            className="flex-grow"
                          />
                        ) : (
                          <span>{profile.country}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-orange-500" />
                        {isEditing ? (
                          <Input
                            name="dateOfBirth"
                            type="date"
                            value={profile.dateOfBirth}
                            onChange={handleChange}
                            className="flex-grow"
                          />
                        ) : (
                          <span>
                            {new Date(profile.dateOfBirth).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="bio" className="mb-2 block">
                          Bio
                        </Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            className="w-full"
                            rows={4}
                          />
                        ) : (
                          <p className="text-sm text-gray-600">{profile.bio}</p>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          onClick={handleSave}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="blogs" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">My Blogs</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {user.blogs.map((blog:any, index:any) => (
                      <BlogCard key={index} {...blog} />
                    ))}
                  </div>
                  {user.blogs.length === 0 && (
                    <p className="text-center text-gray-500">
                      You haven&apos;t written any blogs yet.
                    </p>
                  )}
                  <Button className="mt-6">Write a New Blog</Button>
                </TabsContent>
                <TabsContent value="saved" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Saved Blogs</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {user.savedBlogs.map((blog:any, index:any) => (
                      <BlogCard key={index} {...blog} />
                    ))}
                  </div>
                  {user.savedBlogs.length === 0 && (
                    <p className="text-center text-gray-500">
                      You haven&apos;t saved any blogs yet.
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Reading History
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {user.history.map((blog:any, index:any) => (
                      <BlogCard key={index} {...blog} />
                    ))}
                  </div>
                  {user.history.length === 0 && (
                    <p className="text-center text-gray-500">
                      No reading history yet.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
