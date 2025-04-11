"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/userContext"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EditProfileModal } from "@/components/profile/edit-profile-modal"
import { BlogCard } from "@/components/blog-card"
import {
  Calendar,
  Clock,
  FileText,
  PenSquare,
  User,
  BookOpen,
  BarChart3,
  CalendarIcon,
  Heart,
  Activity,
  Brain,
  Smile,
  Frown,
  Meh,
  BookMarked,
  Clock3,
  MessageSquare,
  PlusCircle,
  Pencil,
} from "lucide-react"

// Define types for our data structures
interface BlogPost {
  _id: string
  heading: string
  content: string
  author: string
  createdAt: string
  coverPhoto?: string
  slug: string
}

interface Assessment {
  _id: string
  date: string
  [key: string]: any
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user, isLoading, fetchUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Initialize any user-specific data here
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-purple-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl">Please log in to view your profile</p>
          <Button onClick={() => router.push("/login")} className="bg-purple-600 hover:bg-purple-700">
            Log In
          </Button>
        </div>
      </div>
    )
  }

  const getExcerpt = (content: string): string => {
    try {
      const parsedContent = JSON.parse(content)
      const firstParagraph = parsedContent.blocks.find((block: any) => block.type === "paragraph")
      return firstParagraph ? firstParagraph.data.text.slice(0, 150) + "..." : ""
    } catch (error) {
      console.error("Error parsing blog content:", error)
      return ""
    }
  }

  // const mentalHealthProgress = 65 // This would come from user data in a real app

  const moodData = [
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 4 },
    { day: "Wed", mood: 2 },
    { day: "Thu", mood: 3 },
    { day: "Fri", mood: 5 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 4 },
  ]

  const getMoodIcon = (mood: number) => {
    if (mood <= 2) return <Frown className="h-6 w-6 text-red-500" />
    if (mood === 3) return <Meh className="h-6 w-6 text-amber-500" />
    return <Smile className="h-6 w-6 text-green-500" />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
            </div>
            <div className="md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="dashboard">
                  <DashboardSection
                    user={user}
                    // mentalHealthProgress={mentalHealthProgress}
                    moodData={moodData}
                    getMoodIcon={getMoodIcon}
                    router={router}
                  />
                </TabsContent>
                <TabsContent value="profile">
                  <ProfileSection user={user} setActiveTab={setActiveTab} setIsEditModalOpen={setIsEditModalOpen} />
                </TabsContent>
                {/* <TabsContent value="edit-profile">
                  <EditProfileSection user={user} />
                </TabsContent> */}
                {/* <TabsContent value="journal">
                  <JournalSection />
                </TabsContent> */}
                <TabsContent value="write-blog">
                  <WriteBlogSection router={router} />
                </TabsContent>
                <TabsContent value="read-blogs">
                  <ReadBlogsSection user={user} getExcerpt={getExcerpt} />
                </TabsContent>
                <TabsContent value="take-assessment">
                  <TakeAssessmentSection />
                </TabsContent>
                <TabsContent value="assessment-reports">
                  <AssessmentReportsSection user={user} router={router} setActiveTab={setActiveTab} />
                </TabsContent>
                {/* <TabsContent value="therapy-sessions">
                  <TherapySessionsSection />
                </TabsContent> */}
                <TabsContent value="coping-strategies">
                  <CopingStrategiesSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  )
}

function ProfileSidebar({
  activeTab,
  setActiveTab,
  user,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
  user: any
}) {
  const menuItems = [
    // { id: "dashboard", label: "Dashboard", icon: <Activity className="h-5 w-5 mr-2" /> },
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5 mr-2" /> },
    // { id: "edit-profile", label: "Edit Profile", icon: <PenSquare className="h-5 w-5 mr-2" /> },
    // { id: "journal", label: "Mood Journal", icon: <BookMarked className="h-5 w-5 mr-2" /> },
    { id: "write-blog", label: "Write Blog", icon: <FileText className="h-5 w-5 mr-2" /> },
    { id: "read-blogs", label: "Read Blogs", icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { id: "take-assessment", label: "Take Assessment", icon: <FileText className="h-5 w-5 mr-2" /> },
    { id: "assessment-reports", label: "Assessment Reports", icon: <BarChart3 className="h-5 w-5 mr-2" /> },
    // { id: "therapy-sessions", label: "Therapy Sessions", icon: <MessageSquare className="h-5 w-5 mr-2" /> },
    { id: "coping-strategies", label: "Coping Strategies", icon: <Heart className="h-5 w-5 mr-2" /> },
  ]

  return (
    <Card className="h-full bg-gradient-to-b from-purple-50 to-white">
      <CardHeader>
        <CardTitle>{user.fullName}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <div className="flex justify-center mt-4">
          <Avatar className="h-24 w-24 border-4 border-purple-100">
            <AvatarImage src={user.profilePhoto || "/placeholder.svg?height=96&width=96"} alt="Profile" />
            <AvatarFallback className="bg-purple-100 text-purple-700">
              {user.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-2 text-center">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">30 Day Streak</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`justify-start ${activeTab === item.id ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
          <MessageSquare className="h-4 w-4 mr-2" />
          Take Assessment Now
        </Button>
      </CardFooter>
    </Card>
  )
}

function DashboardSection({
  user,
  // mentalHealthProgress,
  moodData,
  getMoodIcon,
  router,
}: {
  user: any
  // mentalHealthProgress: number
  moodData: Array<{ day: string; mood: number }>
  getMoodIcon: (mood: number) => React.ReactNode
  router: any
}) {
  const upcomingSessions = [
    { id: 1, type: "Therapy", with: "Dr. Emily Chen", date: "Tomorrow", time: "10:00 AM" },
    { id: 2, type: "Group Support", with: "Anxiety Management Group", date: "Friday", time: "6:00 PM" },
  ]

  const wellnessScores = [
    { name: "Sleep", score: 75 },
    { name: "Anxiety", score: 60 },
    { name: "Mood", score: 82 },
    { name: "Energy", score: 68 },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Welcome back, {user.fullName.split(" ")[0]}</CardTitle>
          <CardDescription>Your wellness journey at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-600" />
                  Weekly Mood Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end h-32 mt-2">
                  {moodData.map((day, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="bg-purple-100 rounded-full p-1 mb-1" style={{ height: `${day.mood * 20}%` }}>
                        {getMoodIcon(day.mood)}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  Wellness Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {wellnessScores.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50">
                      <div className="bg-white p-2 rounded-full">
                        {session.type === "Therapy" ? (
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Users className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{session.type}</p>
                        <p className="text-sm text-muted-foreground">{session.with}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.date} at {session.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Schedule New Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-purple-600" />
                  Journal Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full py-4">
                  <div className="text-5xl font-bold text-purple-600">30</div>
                  <p className="text-muted-foreground text-sm">days in a row</p>
                  <Button variant="outline" size="sm" className="mt-4 border-purple-200 text-purple-700 hover:bg-purple-50">
                    Journal Today
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-purple-600" />
                  Daily Affirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full py-4 text-center px-2">
                  <p className="italic text-purple-800">
                    "I am growing and healing at my own pace. Every step forward is progress."
                  </p>
                  <Button variant="ghost" size="sm" className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    New Affirmation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Mental Health Exercise Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mentalHealthProgress} className="h-4" />
              <p className="mt-2 text-center text-purple-700 font-medium">{mentalHealthProgress}% Complete</p>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/exercises")}>
                Continue Exercises
              </Button>
            </CardContent>
          </Card> */}
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Take Today's Check-in Assessment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ProfileSection({
  user,
  setActiveTab,
  setIsEditModalOpen,
}: {
  user: any
  setActiveTab: (tab: string) => void
  setIsEditModalOpen: (isOpen: boolean) => void
}) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-purple-800">Profile</CardTitle>
            <CardDescription>Your personal information and wellness journey</CardDescription>
          </div>
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Avatar className="h-32 w-32 border-4 border-purple-100">
                <AvatarImage src={user.profilePhoto || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {user.fullName.split(" ").map((n: string) => n[0])}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-800">{user.fullName}</h3>
                <p className="text-muted-foreground">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-700">Mindfulness</Badge>
                <Badge className="bg-purple-100 text-purple-700">Anxiety Management</Badge>
                <Badge className="bg-purple-100 text-purple-700">Sleep Improvement</Badge>
                <Badge className="bg-purple-100 text-purple-700">Journaling</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-800">About Me</h4>
            <p className="text-muted-foreground">{user.bio || "No bio provided yet."}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-800">Wellness Goals</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Reduce anxiety through daily mindfulness</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Improve sleep quality and duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Build a consistent journaling habit</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Develop healthy coping mechanisms</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-800">Personal Information</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Username:</span>
                  <span>{user.userName}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Gender:</span>
                  <span>{user.gender || "Not specified"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Country:</span>
                  <span>{user.country || "Not specified"}</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-lg font-semibold text-purple-800">Activity Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">{user.history?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Blogs Read</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">{user.blogs?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Blogs Written</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">{user.assessment?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Assessments</p>
              </div>
              {/* <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">30</p>
                <p className="text-sm text-muted-foreground">Journal Entries</p>
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
          onClick={() => setActiveTab("edit-profile")}
        >
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

function EditProfileSection({ user }: { user: any }) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Edit Profile</CardTitle>
        <CardDescription>Update your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <div>
                <Avatar className="h-32 w-32 border-4 border-purple-100">
                  <AvatarImage src={user.profilePhoto || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {user.fullName.split(" ").map((n: string) => n[0])}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-2 border-purple-200 text-purple-700 hover:bg-purple-50">
                  Change Avatar
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue={user.fullName}
                      className="border-purple-200 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">Username</Label>
                    <Input
                      id="userName"
                      defaultValue={user.userName}
                      className="border-purple-200 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue={user.bio}
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue={user.gender}>
                  <SelectTrigger className="border-purple-200 focus-visible:ring-purple-500">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  defaultValue={user.country}
                  className="border-purple-200 focus-visible:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  defaultValue={user.dateOfBirth?.split("T")[0]}
                  className="border-purple-200 focus-visible:ring-purple-500"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-800">Wellness Goals</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="goal1">Goal 1</Label>
                  <Input
                    id="goal1"
                    defaultValue="Reduce anxiety through daily mindfulness"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal2">Goal 2</Label>
                  <Input
                    id="goal2"
                    defaultValue="Improve sleep quality and duration"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal3">Goal 3</Label>
                  <Input
                    id="goal3"
                    defaultValue="Build a consistent journaling habit"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal4">Goal 4</Label>
                  <Input
                    id="goal4"
                    defaultValue="Develop healthy coping mechanisms"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-800">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="journalReminders"
                    className="rounded border-purple-300 text-purple-600"
                    defaultChecked
                  />
                  <Label htmlFor="journalReminders">Daily journal reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sessionReminders"
                    className="rounded border-purple-300 text-purple-600"
                    defaultChecked
                  />
                  <Label htmlFor="sessionReminders">Therapy session reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="assessmentReminders"
                    className="rounded border-purple-300 text-purple-600"
                    defaultChecked
                  />
                  <Label htmlFor="assessmentReminders">Weekly assessment reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newContent"
                    className="rounded border-purple-300 text-purple-600"
                    defaultChecked
                  />
                  <Label htmlFor="newContent">New content notifications</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-800">Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="border-purple-200 focus-visible:ring-purple-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="border-purple-200 focus-visible:ring-purple-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="border-purple-200 focus-visible:ring-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
          Cancel
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

function JournalSection() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMood, setCurrentMood] = useState(3)

  const moodOptions = [
    { value: 1, label: "Very Low", icon: <Frown className="h-6 w-6 text-red-500" /> },
    { value: 2, label: "Low", icon: <Frown className="h-6 w-6 text-orange-500" /> },
    { value: 3, label: "Neutral", icon: <Meh className="h-6 w-6 text-amber-500" /> },
    { value: 4, label: "Good", icon: <Smile className="h-6 w-6 text-green-500" /> },
    { value: 5, label: "Very Good", icon: <Smile className="h-6 w-6 text-emerald-500" /> },
  ]

  const recentEntries = [
    { date: "April 6, 2023", mood: 4, title: "Making progress" },
    { date: "April 5, 2023", mood: 3, title: "A balanced day" },
    { date: "April 4, 2023", mood: 2, title: "Struggling with anxiety" },
    { date: "April 3, 2023", mood: 4, title: "Therapy breakthrough" },
    { date: "April 2, 2023", mood: 3, title: "Mixed feelings" },
  ]

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Mood Journal</CardTitle>
        <CardDescription>Track your moods and reflect on your thoughts and feelings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-purple-600" />
                  Today's Journal Entry
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="journalTitle">Entry Title</Label>
                  <Input
                    id="journalTitle"
                    placeholder="Give your entry a title"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>How are you feeling today?</Label>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    {moodOptions.map((mood) => (
                      <div
                        key={mood.value}
                        className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${currentMood === mood.value ? "bg-purple-100" : ""}`}
                        onClick={() => setCurrentMood(mood.value)}
                      >
                        {mood.icon}
                        <span className="text-xs mt-1">{mood.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="journalContent">What's on your mind?</Label>
                  <Textarea
                    id="journalContent"
                    placeholder="Write about your thoughts, feelings, and experiences today..."
                    rows={8}
                    className="min-h-[200px] border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>What contributed to your mood today?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sleep" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="sleep" className="text-sm">
                        Sleep
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="exercise" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="exercise" className="text-sm">
                        Exercise
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="nutrition" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="nutrition" className="text-sm">
                        Nutrition
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="social" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="social" className="text-sm">
                        Social Interaction
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="work" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="work" className="text-sm">
                        Work/School
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="stress" className="rounded border-purple-300 text-purple-600" />
                      <Label htmlFor="stress" className="text-sm">
                        Stress
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gratitude">Three things you're grateful for today</Label>
                  <Textarea
                    id="gratitude"
                    placeholder="List three things you're grateful for..."
                    rows={3}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Journal Entry</Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock3 className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {recentEntries.map((entry, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white hover:bg-purple-50 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{entry.title}</p>
                            <p className="text-xs text-muted-foreground">{entry.date}</p>
                          </div>
                          <div>{moodOptions.find((m) => m.value === entry.mood)?.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  View All Entries
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  Journaling Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <p className="text-sm font-medium text-purple-800">
                      What are three things that brought you joy today?
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50">
                    <p className="text-sm font-medium text-purple-800">
                      Describe a challenge you faced today and how you handled it.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50">
                    <p className="text-sm font-medium text-purple-800">
                      What's one thing you'd like to improve about tomorrow?
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  Get New Prompts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WriteBlogSection({ router }: { router: any }) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Write a Blog</CardTitle>
        <CardDescription>Share your experiences and insights with the community</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="blogTitle">Title</Label>
            <Input
              id="blogTitle"
              placeholder="Enter blog title"
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blogCategory">Category</Label>
            <Select>
              <SelectTrigger className="border-purple-200 focus-visible:ring-purple-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxiety">Anxiety Management</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="mindfulness">Mindfulness & Meditation</SelectItem>
                <SelectItem value="sleep">Sleep Improvement</SelectItem>
                <SelectItem value="stress">Stress Management</SelectItem>
                <SelectItem value="selfcare">Self-Care</SelectItem>
                <SelectItem value="recovery">Recovery Journey</SelectItem>
                <SelectItem value="therapy">Therapy Experiences</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="blogContent">Content</Label>
            <Textarea
              id="blogContent"
              placeholder="Write your blog content here..."
              rows={12}
              className="min-h-[300px] border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blogTags">Tags (comma separated)</Label>
            <Input
              id="blogTags"
              placeholder="e.g., anxiety, coping strategies, personal story"
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-800">Privacy Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="public"
                  name="privacy"
                  className="rounded-full border-purple-300 text-purple-600"
                  defaultChecked
                />
                <Label htmlFor="public">Public - Share with the entire community</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="supportGroup"
                  name="privacy"
                  className="rounded-full border-purple-300 text-purple-600"
                />
                <Label htmlFor="supportGroup">Support Group Only - Share with your support group</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="private"
                  name="privacy"
                  className="rounded-full border-purple-300 text-purple-600"
                />
                <Label htmlFor="private">Private - Only visible to you and your therapist</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="publishImmediately" className="rounded border-purple-300 text-purple-600" />
            <Label htmlFor="publishImmediately">Publish immediately</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
          Save as Draft
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/upload")}>
          Continue to Editor
        </Button>
      </CardFooter>
    </Card>
  )
}

function ReadBlogsSection({
  user,
  getExcerpt,
}: {
  user: any
  getExcerpt: (content: string) => string
}) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Read Blogs</CardTitle>
        <CardDescription>Explore stories and insights from our community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input placeholder="Search blogs..." className="max-w-sm border-purple-200 focus-visible:ring-purple-500" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Latest
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Popular
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                For You
              </Button>
              <Select>
                <SelectTrigger className="w-[180px] h-9 text-sm border-purple-200 focus-visible:ring-purple-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="anxiety">Anxiety Management</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.history && user.history.length > 0 ? (
              user.history.map((post: BlogPost) => (
                <BlogCard
                  key={post._id}
                  heading={post.heading}
                  excerpt={getExcerpt(post.content)}
                  author={post.author}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  coverPhoto={post.coverPhoto || "/placeholder.svg?height=200&width=300"}
                  slug={post.slug}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground mb-4">You haven't read any blogs yet</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Explore Blogs</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TakeAssessmentSection() {
  const assessments = [
    {
      id: 1,
      title: "Anxiety Assessment (GAD-7)",
      description: "Evaluate your anxiety levels with this standardized assessment tool.",
      questions: 7,
      duration: "5 minutes",
      category: "Anxiety",
      frequency: "Weekly",
    },
    {
      id: 2,
      title: "Depression Screening (PHQ-9)",
      description: "Screen for depression symptoms and their severity.",
      questions: 9,
      duration: "5-10 minutes",
      category: "Depression",
      frequency: "Weekly",
    },
    {
      id: 3,
      title: "Sleep Quality Assessment",
      description: "Evaluate your sleep patterns and identify potential issues affecting your rest.",
      questions: 12,
      duration: "10 minutes",
      category: "Sleep",
      frequency: "Weekly",
    },
    {
      id: 4,
      title: "Daily Mood Check-in",
      description: "A quick check-in to track your mood and emotional state throughout the day.",
      questions: 5,
      duration: "2 minutes",
      category: "Mood Tracking",
      frequency: "Daily",
    },
    {
      id: 5,
      title: "Stress Level Evaluation",
      description: "Measure your current stress levels and identify potential stressors.",
      questions: 10,
      duration: "7 minutes",
      category: "Stress",
      frequency: "Weekly",
    },
    {
      id: 6,
      title: "Mindfulness Practice Assessment",
      description: "Evaluate your mindfulness practices and their effectiveness.",
      questions: 8,
      duration: "5 minutes",
      category: "Mindfulness",
      frequency: "Monthly",
    },
  ]

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Take an Assessment</CardTitle>
        <CardDescription>Track your mental health and measure your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search assessments..."
              className="max-w-sm border-purple-200 focus-visible:ring-purple-500"
            />
            <Select>
              <SelectTrigger className="w-[180px] border-purple-200 focus-visible:ring-purple-500">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="stress">Stress</SelectItem>
                <SelectItem value="mood">Mood Tracking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2 bg-purple-100 text-purple-700">{assessment.category}</Badge>
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span>{assessment.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span>Recommended: {assessment.frequency}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Assessment</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AssessmentReportsSection({
  user,
  router,
  setActiveTab,
}: {
  user: any
  router: any
  setActiveTab: (tab: string) => void
}) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Assessment Reports</CardTitle>
        <CardDescription>Review your assessment results and track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px] border-purple-200 focus-visible:ring-purple-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="stress">Stress</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] border-purple-200 focus-visible:ring-purple-500">
                  <SelectValue placeholder="Last 3 Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Export Reports
            </Button>
          </div>

          {user.assessment && user.assessment.length > 0 ? (
            <div className="space-y-6">
              {user.assessment
                .sort((a: Assessment, b: Assessment) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((assessment: Assessment) => (
                  <Card key={assessment._id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2 bg-purple-100 text-purple-700">Assessment</Badge>
                          <CardTitle>Mental Health Assessment</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(assessment.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Assessment Completed</div>
                          <div className="text-3xl font-bold text-purple-600">
                            {new Date(assessment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() => router.push(`/assessment-result?outcomeId=${assessment._id}`)}
                      >
                        View Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">You haven't taken any assessments yet</p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setActiveTab("take-assessment")}>
                Take an Assessment
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TherapySessionsSection() {
  const upcomingSessions = [
    {
      id: 1,
      type: "Individual Therapy",
      with: "Dr. Emily Chen",
      date: "April 10, 2023",
      time: "10:00 AM",
      duration: "50 minutes",
      location: "Video Call",

      notes: "Discuss progress with anxiety management techniques",
    },
    {
      id: 2,
      type: "Group Support",
      with: "Anxiety Management Group",
      date: "April 14, 2023",
      time: "6:00 PM",
      duration: "90 minutes",
      location: "Community Center, Room 204",
      notes: "Weekly support group meeting",
    },
  ]

  const pastSessions = [
    {
      id: 1,
      type: "Individual Therapy",
      with: "Dr. Emily Chen",
      date: "April 3, 2023",
      time: "10:00 AM",
      duration: "50 minutes",
      location: "Video Call",
      notes: "Discussed sleep improvement strategies and mindfulness techniques",
    },
    {
      id: 2,
      type: "Individual Therapy",
      with: "Dr. Emily Chen",
      date: "March 27, 2023",

      time: "10:00 AM",
      duration: "50 minutes",
      location: "Video Call",
      notes: "Worked on identifying anxiety triggers and coping mechanisms",
    },
    {
      id: 3,
      type: "Group Support",
      with: "Anxiety Management Group",
      date: "March 24, 2023",
      time: "6:00 PM",
      duration: "90 minutes",
      location: "Community Center, Room 204",
      notes: "Shared experiences with the group about managing work-related stress",
    },
  ]

  const therapists = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Anxiety & Depression",
      availability: "Mondays & Wednesdays",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Trauma & PTSD",
      availability: "Tuesdays & Thursdays",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Sarah Williams, LMFT",
      specialty: "Family Therapy",
      availability: "Fridays",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Therapy Sessions</CardTitle>
        <CardDescription>Manage your therapy appointments and sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="p-4 rounded-lg bg-white border border-purple-100">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                            <div>
                              <div className="flex items-center">
                                <Badge className="mr-2 bg-purple-100 text-purple-700">{session.type}</Badge>
                                <h4 className="font-medium">{session.with}</h4>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {session.date} at {session.time} ({session.duration})
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <span className="font-medium">Location:</span> {session.location}
                              </div>
                              {session.notes && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Notes:</span> {session.notes}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                              >
                                Reschedule
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-700 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Schedule a Session</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock3 className="h-5 w-5 mr-2 text-purple-600" />
                    Past Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {pastSessions.map((session) => (
                        <div key={session.id} className="p-4 rounded-lg bg-white border border-purple-100">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                            <div>
                              <div className="flex items-center">
                                <Badge className="mr-2 bg-gray-100 text-gray-700">{session.type}</Badge>
                                <h4 className="font-medium">{session.with}</h4>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {session.date} at {session.time} ({session.duration})
                                </span>
                              </div>
                              {session.notes && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Notes:</span> {session.notes}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                    Available Therapists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {therapists.map((therapist) => (
                      <div
                        key={therapist.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-purple-50 cursor-pointer"
                      >
                        <Avatar className="h-10 w-10 border border-purple-100">
                          <AvatarImage src={therapist.image} alt={therapist.name} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {therapist.name.split(" ").map((n: string) => n[0])}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{therapist.name}</p>
                          <p className="text-xs text-muted-foreground">{therapist.specialty}</p>
                          <p className="text-xs text-muted-foreground">Available: {therapist.availability}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Schedule a Session</Button>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Support Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white hover:bg-purple-50 cursor-pointer">
                      <p className="font-medium">Anxiety Management</p>
                      <p className="text-xs text-muted-foreground">Fridays at 6:00 PM</p>
                      <p className="text-xs text-muted-foreground">Community Center, Room 204</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white hover:bg-purple-50 cursor-pointer">
                      <p className="font-medium">Mindfulness Practice</p>
                      <p className="text-xs text-muted-foreground">Tuesdays at 7:00 PM</p>
                      <p className="text-xs text-muted-foreground">Online via Zoom</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white hover:bg-purple-50 cursor-pointer">
                      <p className="font-medium">Sleep Improvement</p>
                      <p className="text-xs text-muted-foreground">Wednesdays at 5:30 PM</p>
                      <p className="text-xs text-muted-foreground">Health Center, Room 105</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50">
                    View All Groups
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CopingStrategiesSection() {
  const strategies = [
    {
      id: 1,
      title: "Deep Breathing",
      category: "Anxiety",
      description: "A simple technique to reduce anxiety and stress by focusing on slow, deep breaths.",
      steps: [
        "Find a comfortable position sitting or lying down",
        "Place one hand on your chest and the other on your abdomen",
        "Breathe in slowly through your nose for 4 counts",
        "Hold your breath for 2 counts",
        "Exhale slowly through your mouth for 6 counts",
        "Repeat for 5-10 minutes",
      ],
      saved: true,
    },
    {
      id: 2,
      title: "Progressive Muscle Relaxation",
      category: "Stress",
      description: "Reduce physical tension by systematically tensing and relaxing different muscle groups.",
      steps: [
        "Find a quiet place where you won't be disturbed",
        "Start with your feet, tense the muscles for 5 seconds",
        "Release the tension and notice the feeling of relaxation",
        "Move up to your calves, then thighs, and continue upward",
        "Work through all major muscle groups ending with your face",
        "Focus on the contrast between tension and relaxation",
      ],
      saved: true,
    },
    {
      id: 3,
      title: "5-4-3-2-1 Grounding Technique",
      category: "Anxiety",
      description: "A mindfulness exercise to bring your attention to the present moment during anxiety or panic.",
      steps: [
        "Acknowledge 5 things you can see",
        "Acknowledge 4 things you can touch/feel",
        "Acknowledge 3 things you can hear",
        "Acknowledge 2 things you can smell",
        "Acknowledge 1 thing you can taste",
      ],
      saved: false,
    },
    {
      id: 4,
      title: "Thought Challenging",
      category: "Depression",
      description: "Identify and challenge negative thought patterns that contribute to depression.",
      steps: [
        "Identify the negative thought",
        "Evaluate the evidence for and against this thought",
        "Consider alternative interpretations or explanations",
        "Put the thought in perspective",
        "Generate a more balanced or helpful thought",
      ],
      saved: false,
    },
  ]

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-800">Coping Strategies</CardTitle>
        <CardDescription>Discover and save techniques to manage difficult emotions and situations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search strategies..."
                className="max-w-sm border-purple-200 focus-visible:ring-purple-500"
              />
              <Select>
                <SelectTrigger className="w-[180px] border-purple-200 focus-visible:ring-purple-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="stress">Stress</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Saved Strategies
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Recently Used
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-purple-100 text-purple-700">{strategy.category}</Badge>
                      <CardTitle className="text-lg">{strategy.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={strategy.saved ? "text-purple-600" : "text-muted-foreground"}
                    >
                      <Heart className="h-5 w-5" fill={strategy.saved ? "currentColor" : "none"} />
                      <span className="sr-only">{strategy.saved ? "Saved" : "Save"}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{strategy.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Steps:</h4>
                    <ol className="space-y-1 pl-5 list-decimal text-sm">
                      {strategy.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Learn More
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Create Your Personal Coping Plan
              </CardTitle>
              <CardDescription>Develop a personalized plan with strategies that work best for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input
                    id="planName"
                    placeholder="e.g., My Anxiety Management Plan"
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Strategies to Include</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {strategies.map((strategy) => (
                      <div key={strategy.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`strategy-${strategy.id}`}
                          className="rounded border-purple-300 text-purple-600"
                          defaultChecked={strategy.saved}
                        />
                        <Label htmlFor={`strategy-${strategy.id}`} className="text-sm">
                          {strategy.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="triggers">Common Triggers</Label>
                  <Textarea
                    id="triggers"
                    placeholder="List situations or thoughts that typically trigger difficult emotions for you..."
                    rows={3}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="earlyWarning">Early Warning Signs</Label>
                  <Textarea
                    id="earlyWarning"
                    placeholder="List physical sensations, thoughts, or behaviors that indicate you're becoming distressed..."
                    rows={3}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPeople">Support People</Label>
                  <Textarea
                    id="supportPeople"
                    placeholder="List people you can reach out to when you need support..."
                    rows={2}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Create Coping Plan</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

function Users({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
