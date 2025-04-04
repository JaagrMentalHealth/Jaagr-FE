"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function WellBeingReport() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)

    // Simulate download process
    setTimeout(() => {
      setDownloading(false)
      toast({
        title: "Report Downloaded",
        description: "Your well-being report has been downloaded successfully.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Download Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          onClick={handleDownload}
          className="rounded-full shadow-lg px-6 bg-purple-600 hover:bg-purple-700"
          disabled={downloading}
        >
          <Download className="mr-2 h-4 w-4" />
          {downloading ? "Downloading..." : "Download Report"}
        </Button>
      </div>

      <Toaster />

      {/* Report Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">[Child&apos;s Name]&apos;s Well-Being Report</h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        {/* Introduction */}
        <div className="mb-12 max-w-6xl mx-auto">
          <p className="text-lg font-medium text-gray-700">Hello, [Child&apos;s Name]!</p>
          <p className="text-lg mt-3 text-gray-600 leading-relaxed text-justify">
            This report is here to help us understand how you&apos;re feeling and what might be affecting you. It&apos;s okay to
            sometimes feel like things are tough—you&apos;re not alone, and there are lots of ways to feel better. Let&apos;s go
            through what we found step by step!
          </p>
        </div>

        {/* How You're Feeling Section */}
        <div className="mb-12 max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-purple-500 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">How You&apos;re Feeling</h2>
          </div>

          <p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-6xl text-justify">
            We looked at a few areas to learn about your emotions, thoughts, and energy. Here&apos;s what we found and some
            ideas on how to help you feel more like your awesome self!
          </p>

          {/* Assessment Table */}
          <div className="w-full mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full border-collapse text-base">
              <thead className="bg-purple-50">
                <tr>
                  <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                    Assessment Parameter
                  </th>
                  <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">What it means</th>
                  <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">Your Result</th>
                  <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">How this feels</th>
                  <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">What can help</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-200 p-4">Feeling Worried or Scared (Anxiety)</td>
                  <td className="border-b border-gray-200 p-4">Sometimes feeling nervous or worried about things, even when you’re safe.</td>
                  <td className="border-b border-gray-200 p-4">Mild</td>
                  <td className="border-b border-gray-200 p-4">You might feel like something bad might happen, even if everything is okay. It can make your tummy hurt or make it hard to focus.</td>
                  <td className="border-b border-gray-200 p-4">Deep breathing, drawing or coloring, and talking to someone who makes you feel safe.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-b border-gray-200 p-4">Feeling Sad or Hopeless (Depression)</td>
                  <td className="border-b border-gray-200 p-4">Feeling really down or tired for a long time.</td>
                  <td className="border-b border-gray-200 p-4">Mild</td>
                  <td className="border-b border-gray-200 p-4">You might feel like skipping things you love or wanting to be alone a lot.</td>
                  <td className="border-b border-gray-200 p-4">Listening to happy music, spending time with people who care about you, or writing your feelings in a journal.</td>
                </tr>
                <tr>
                  <td className="border-b border-gray-200 p-4">Trouble Paying Attention or Sitting Still (ADHD)</td>
                  <td className="border-b border-gray-200 p-4">Feeling like your thoughts are jumping around and it&apos;s hard to focus or finish things.</td>
                  <td className="border-b border-gray-200 p-4">Mild</td>
                  <td className="border-b border-gray-200 p-4">It might make you feel frustrated when tasks take longer or you forget things easily.</td>
                  <td className="border-b border-gray-200 p-4">Making short “to-do” lists, using fun timers, and taking lots of little breaks when you&apos;re working</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Improvement Section */}
        <div className="mb-16  py-12 px-6 rounded-xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">How can I improve my well-being?</h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/infographic.svg" // Replace this with the actual image path
              alt="Well-being Tips"
              width={900} 
              height={500} 
            />
          </div>
        </div>

        {/* Important Reminder */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-purple-50 p-8 rounded-xl border-l-4 border-purple-500 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Important Reminder</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You are brave and amazing, and this report is just a way to make sure you&apos;re getting the right care and
              support. If things feel tough, remember there are always people ready to help you—you don&apos;t have to do it
              all alone.
            </p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-purple-500 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Conclusion</h2>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            While this assessment is highly relevant for identifying mental health challenges, incorporating broader and
            more inclusive perspectives ensures it is comprehensive. Questions or social media usage beyond normal
            expectations will provide a well-rounded evaluation of modern challenges affecting pre-teens.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">Support Resources</h3>
            <p className="text-gray-600">[Add relevant contact details for counselors, helplines, or school nurse.]</p>
          </div>
        </div>
      </div>
    </div>
  )
}

