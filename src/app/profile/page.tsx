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
import { useUser } from "@/contexts/userContext";
import toast from "react-hot-toast";

interface UserProfile {
  fullName: string;
  email: string;
  userName: string;
  bio: string;
  dateOfBirth: string;
  country: string;
  gender: string;
}
// import { useUser } from "@/contexts/userContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser, isLoading, fetchUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
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
  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    setPendingUpdates((prevUpdates) => ({ ...prevUpdates, [name]: value }));
  };
  const router = useRouter();

  const logOut = () => {
    try {
      setUser(null);
      Cookies.remove("token");
      router.push("/");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Could not log out");
    }
  };

  const handleSave = () => {
    try {
      if (user) {
        const updatedUser = {
          ...user,
          ...pendingUpdates,
        };
        setUser(updatedUser);
        setIsEditing(false);
        setPendingUpdates({});
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      // Revert the changes in local state
      setProfile((prevProfile) => ({ ...prevProfile, ...user }));
    }
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
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  variant="ghost"
                  className="text-orange-800"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  variant="ghost"
                  className="text-orange-800"
                >
                  <Save className="mr-2 h-4 w-4" /> Save Changes
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
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-orange-500" />
                        {isEditing ? (
                          <Input
                            name="country"
                            value={profile.country?profile.country: 'N/A'}
                            onChange={handleChange}
                            className="flex-grow"
                          />
                        ) : (
                          <span>{profile.country?profile.country: 'N/A'}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-orange-500" />
                        {isEditing ? (
                          <Input
                            name="dateOfBirth"
                            type={profile.dateOfBirth?'date':'text'}
                            value={profile.dateOfBirth?profile.dateOfBirth:'N/A'}
                            onChange={handleChange}
                            className="flex-grow"
                          />
                        ) : (
                          <span>
                            {profile.dateOfBirth?new Date(profile.dateOfBirth).toLocaleDateString():'N/A'}
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
                          <p className="text-sm text-gray-600">{profile.bio || 'N/A'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="blogs" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">My Blogs</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {user.blogs.map((blog: any, index: any) => (
                      <BlogCard key={index} user={user.fullName} {...blog} />
                    ))}
                  </div>
                  {user.blogs.length === 0 && (
                    <p className="text-center text-gray-500">
                      You haven&apos;t written any blogs yet.
                    </p>
                  )}
                  <Button
                    onClick={() => {
                      router.push("/upload");
                    }}
                    className="mt-6"
                  >
                    Write a New Blog
                  </Button>
                </TabsContent>
                <TabsContent value="saved" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Saved Blogs</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {user.savedBlogs.map((blog: any, index: any) => (
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
                    {user.history.map((blog: any, index: any) => (
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
              <div className="flex justify-end">
                <button
                  onClick={logOut}
                  className="px-6 py-2 bg-orange-50 text-[#262b33] font-semibold rounded-lg shadow-md hover:bg-orange-60 border-orange-500 border-2 transition-all"
                >
                  Log Out
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
