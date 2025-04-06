"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { fetchOutcome, fetchOrgUser } from "@/api/assessment";
import { useUser } from "@/contexts/userContext";

export default function WellBeingReport() {
  const [downloading, setDownloading] = useState(false);
  const [outcome, setOutcome] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Child");

  const { user } = useUser();
  const searchParams = useSearchParams();
  const outcomeId = searchParams.get("outcomeId");


  if (!outcomeId) return notFound();

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetchOutcome(outcomeId);
        const data = res.data;
        setOutcome(data);
        console.log(data)
  
        // Dynamically check outcome for organizationId
        const isOrgUser = !!data.organizationId;
  
        if (isOrgUser && data.userId) {
          const orgRes = await fetchOrgUser(data.userId); // In your model, orgUser is stored in userId
          setUserName(orgRes?.data?.fullName || "Child");
        } else if (user?.fullName) {
          setUserName(user.fullName);
        }
      } catch (err) {
        console.error("Error fetching outcome or user:", err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchReport();
  }, [outcomeId, user]);

  const handleDownload = () => {
    setDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setDownloading(false);
      toast({
        title: "Report Downloaded",
        description: "Your well-being report has been downloaded successfully.",
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">
            Preparing your well-being report...
          </p>
        </div>
      </div>
    );
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
           {userName}&apos;s Well-Being Report
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        {/* Introduction */}
        <div className="mb-12 max-w-6xl mx-auto">
          <p className="text-lg font-medium text-gray-700">
            Hello,{userName}!
          </p>
          <p className="text-lg mt-3 text-gray-600 leading-relaxed text-justify">
            This report is here to help us understand how you&apos;re feeling
            and what might be affecting you. It&apos;s okay to sometimes feel
            like things are tough—you&apos;re not alone, and there are lots of
            ways to feel better. Let&apos;s go through what we found step by
            step!
          </p>
        </div>

        {/* How You're Feeling Section */}
        <div className="mb-12 max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-purple-500 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              How You&apos;re Feeling
            </h2>
          </div>

          <p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-6xl text-justify">
            We looked at a few areas to learn about your emotions, thoughts, and
            energy. Here&apos;s what we found and some ideas on how to help you
            feel more like your awesome self!
          </p>

          {/* Assessment Table */}
          <div className="w-full mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
            {/* Assessment Table or Healthy Message */}
            {outcome && outcome.results && outcome.results.length === 0 ? (
              <div className="text-center bg-green-50 border border-green-200 p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Great News! 🎉
                </h2>
                <p className="text-lg text-green-600">
                  Based on your responses, we did not find any significant
                  indicators of mental health concerns. Keep taking care of
                  yourself and remember that it’s always okay to check in again!
                </p>
              </div>
            ) : outcome && outcome.results ? (
              <div className="w-full mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse text-base">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                        Assessment Parameter
                      </th>
                      <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                        What it means
                      </th>
                      <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                        Your Result
                      </th>
                      <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                        How this feels
                      </th>
                      <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">
                        What can help
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcome.results.map((item:any, index:number) => (
                      <tr
                        key={index}
                        className={index % 2 === 1 ? "bg-gray-50" : ""}
                      >
                        <td className="border-b border-gray-200 p-4">
                          {item.assessmentParameter}
                        </td>
                        <td className="border-b border-gray-200 p-4">
                          {item.reportText.whatItMeans}
                        </td>
                        <td className="border-b border-gray-200 p-4">
                          {item.severity}
                        </td>
                        <td className="border-b border-gray-200 p-4">
                          {item.reportText.howItFeels}
                        </td>
                        <td className="border-b border-gray-200 p-4">
                          {item.reportText.whatCanHelp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                Loading report...
              </p>
            )}
          </div>
        </div>

        {/* Improvement Section */}
        <div className="mb-16  py-12 px-6 rounded-xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              How can I improve my well-being?
            </h2>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Important Reminder
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You are brave and amazing, and this report is just a way to make
              sure you&apos;re getting the right care and support. If things
              feel tough, remember there are always people ready to help you—you
              don&apos;t have to do it all alone.
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
            While this assessment is highly relevant for identifying mental
            health challenges, incorporating broader and more inclusive
            perspectives ensures it is comprehensive. Questions or social media
            usage beyond normal expectations will provide a well-rounded
            evaluation of modern challenges affecting pre-teens.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">
              Support Resources
            </h3>
            <p className="text-gray-600">
              [Add relevant contact details for counselors, helplines, or school
              nurse.]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
