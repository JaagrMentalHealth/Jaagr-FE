"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { format } from "date-fns"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

// Mock data (in a real application, this would come from an API or database)
const userData = {
  name: "Jane Doe",
  assessmentDate: new Date(),
  overallScore: 65,
  symptoms: [
    { name: "Anxiety", value: 30 },
    { name: "Depression", value: 20 },
    { name: "Stress", value: 35 },
    { name: "OCD", value: 15 },
  ],
  trends: [
    { date: "2023-01-01", score: 50 },
    { date: "2023-02-01", score: 55 },
    { date: "2023-03-01", score: 60 },
    { date: "2023-04-01", score: 58 },
    { date: "2023-05-01", score: 65 },
  ],
  conditionBreakdown: [
    { condition: "Anxiety", mild: 20, moderate: 30, severe: 10 },
    { condition: "Depression", mild: 30, moderate: 15, severe: 5 },
    { condition: "Stress", mild: 25, moderate: 35, severe: 15 },
    { condition: "OCD", mild: 35, moderate: 10, severe: 5 },
  ],
  emotionalStates: [
    { date: "2023-05-01", happy: 60, neutral: 30, sad: 10 },
    { date: "2023-05-02", happy: 50, neutral: 40, sad: 10 },
    { date: "2023-05-03", happy: 70, neutral: 20, sad: 10 },
    { date: "2023-05-04", happy: 55, neutral: 35, sad: 10 },
    { date: "2023-05-05", happy: 65, neutral: 25, sad: 10 },
  ],
}

const recommendations = [
  {
    title: "Practice Mindfulness",
    description: "Try daily meditation or mindfulness exercises to reduce stress and anxiety.",
  },
  {
    title: "Stay Active",
    description: "Regular physical activity can significantly improve mood and overall mental well-being.",
  },
  {
    title: "Connect with Others",
    description: "Maintain strong social connections. Reach out to friends, family, or join support groups.",
  },
  {
    title: "Seek Professional Help",
    description: "Consider talking to a therapist or counselor for personalized support and guidance.",
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AssessmentResultPage() {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold text-purple-800">Mental Health Assessment Report</CardTitle>
                  <p className="text-gray-600">for {userData.name}</p>
                  <p className="text-sm text-gray-500">
                    Assessment Date: {format(userData.assessmentDate, "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-purple-500">{userData.overallScore}</p>
                  <p className="text-sm text-gray-500">Overall Score</p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Symptom Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userData.symptoms}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userData.symptoms.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userData.trends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Condition Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userData.conditionBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="condition" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mild" stackId="a" fill="#8884d8" />
                    <Bar dataKey="moderate" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="severe" stackId="a" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Emotional State Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userData.emotionalStates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="happy" stroke="#8884d8" />
                    <Line type="monotone" dataKey="neutral" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="sad" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white mr-2">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Link href="/mental-health-exercise">
              <Button className="bg-purple-500 text-white hover:bg-purple-600">
                Explore Mental Health Exercises <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button variant="outline">
              Download Report <Download className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

