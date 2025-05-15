"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect, Suspense, useRef } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { fetchOutcome, fetchOrgUser } from "@/api/assessment";
import { useUser } from "@/contexts/userContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DISEASE_REPORT_MAP: Record<string, {
  assessmentParameter: string;
  whatItMeans: string;
  howItFeels: string;
  whatCanHelp: string;
}> = {
  "Anxiety Disorders": {
    assessmentParameter: "Feeling Worried or Scared (Anxiety)",
    whatItMeans: "Sometimes feeling nervous or worried about things, even when you’re safe.",
    howItFeels: "You might feel like something bad might happen, even if everything is okay. It can make your tummy hurt or make it hard to focus.",
    whatCanHelp: "Deep breathing, drawing or coloring, and talking to someone who makes you feel safe."
  },
  "Depression": {
    assessmentParameter: "Feeling Sad or Hopeless (Depression)",
    whatItMeans: "Feeling really down or tired for a long time.",
    howItFeels: "You might feel like skipping things you love or wanting to be alone a lot.",
    whatCanHelp: "Listening to happy music, spending time with people who care about you, or writing your feelings in a journal."
  },
  "ADHD": {
    assessmentParameter: "Trouble Paying Attention or Sitting Still (ADHD)",
    whatItMeans: "Feeling like your thoughts are jumping around and it’s hard to focus or finish things.",
    howItFeels: "It might make you feel frustrated when tasks take longer or you forget things easily.",
    whatCanHelp: "Making short “to-do” lists, using fun timers, and taking lots of little breaks when you’re working."
  },
  "OCD": {
    assessmentParameter: "Feeling Stuck on Certain Thoughts (OCD)",
    whatItMeans: "Thoughts that keep coming back, or needing to do things in a certain way to feel better.",
    howItFeels: "You might feel like you need to keep checking things or repeating actions, and it can take a lot of your time.",
    whatCanHelp: "Talking about those stuck thoughts with someone you trust and practicing small changes like skipping one routine for a day."
  },
  "Eating Disorders": {
    assessmentParameter: "Difficulties with Eating (Eating Disorders)",
    whatItMeans: "Having a hard time eating enough or worrying too much about how you look.",
    howItFeels: "You might feel tired or avoid meals, or think about food a lot.",
    whatCanHelp: "Eating with friends or family, enjoying fun and healthy snacks, and asking for help when you need it."
  },
  "Stress & Burnout": {
    assessmentParameter: "Feeling Stressed or Worn Out (Stress & Burnout)",
    whatItMeans: "Feeling like everything is too much and you can’t find the energy to do things.",
    howItFeels: "You might feel tired all the time or just want to stop everything.",
    whatCanHelp: "Taking short breaks during busy times, doing something fun like playing games, or trying relaxing exercises."
  },
  "Self-Harm & Suicidal Ideation": {
    assessmentParameter: "Feeling Upset or Unsafe (Self-Harm & Suicidal Thoughts)",
    whatItMeans: "Thinking about hurting yourself or feeling very overwhelmed and scared.",
    howItFeels: "It might make life feel scary or like no one understands.",
    whatCanHelp: "Always, always tell a trusted adult or call someone who can help—you're never alone, and people care about you."
  }
};


export default function AssessmentReport() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WellBeingReport />
    </Suspense>
  );
}

function WellBeingReport() {
  const [downloading, setDownloading] = useState(false);
  const [outcome, setOutcome] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Child");
  const reportRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();
  const searchParams = useSearchParams();
  const outcomeId = searchParams.get("outcomeId");
  const [isOrgUserCheckDone, setIsOrgUserCheckDone] = useState(false);

  const [isValidOutcomeId, setIsValidOutcomeId] = useState(!!outcomeId);

  useEffect(() => {
    if (!outcomeId) {
      setIsValidOutcomeId(false);
    } else {
      setIsValidOutcomeId(true);
    }
  }, [outcomeId]);

  if (!isValidOutcomeId) return notFound();

  useEffect(() => {
    let isMounted = true;

    async function fetchReport() {
      try {
        const res = await fetchOutcome(outcomeId);
        const data = res.data;

        if (isMounted) {
          setOutcome(data);
          console.log(data);

          // Dynamically check outcome for organizationId
          const isOrgUser = !!data.organizationId;
          console.log(isOrgUser);

          let name = "Child";

          if (isOrgUser && data.userId) {
            const orgRes = await fetchOrgUser(data.userId); // In your model, orgUser is stored in userId
            if (isMounted) {
              name = orgRes?.data?.fullName || "Child";
            }
          } else if (user?.fullName) {
            if (isMounted) {
              name = user.fullName;
            }
          }

          if (isMounted) {
            setUserName(name);
          }
        }
      } catch (err) {
        console.error("Error fetching outcome or user:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsOrgUserCheckDone(true);
        }
      }
    }

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [outcomeId, user]);

  const handleDownload = async () => {
    if (!reportRef.current) return;

    setDownloading(true);

    try {
      // Hide download button before capturing
      if (downloadButtonRef.current) {
        downloadButtonRef.current.style.display = "none";
      }

      // Create PDF document with margins
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Define PDF dimensions with margins
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // 15mm margins
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      // Get all sections to process them individually for better pagination
      const sections = reportRef.current.querySelectorAll(".report-section");
      let currentY = margin;
      let pageNumber = 1;

      // Add header to first page
      const headerElement = reportRef.current.querySelector(".report-header");
      if (headerElement) {
        const headerCanvas = await html2canvas(headerElement as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#FFFFFF",
        });

        const headerImgData = headerCanvas.toDataURL("image/png");
        const headerImgWidth = contentWidth;
        const headerImgHeight =
          (headerCanvas.height * headerImgWidth) / headerCanvas.width;

        pdf.addImage(
          headerImgData,
          "PNG",
          margin,
          currentY,
          headerImgWidth,
          headerImgHeight
        );
        currentY += headerImgHeight + 10; // Add some space after header
      }

      // Process each section individually
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;

        // Create canvas from the section
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#FFFFFF",
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if this section needs to start on a new page
        if (currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          pageNumber++;
          currentY = margin;

          // Add page number at the bottom
          pdf.setFontSize(10);
          pdf.setTextColor(150, 150, 150);
          pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 5, {
            align: "center",
          });
        }

        // Add section to PDF
        pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10; // Add some space between sections

        // Add page number to the first page (we do it here to ensure it's done at least once)
        if (i === 0) {
          pdf.setFontSize(10);
          pdf.setTextColor(150, 150, 150);
          pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 5, {
            align: "center",
          });
        }
      }

      // Add footer with date on all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        const today = new Date().toLocaleDateString();
        pdf.text(`Generated on: ${today}`, margin, pageHeight - 5);
      }

      // Save the PDF
      pdf.save(`${userName}_WellBeing_Report.pdf`);

      toast({
        title: "Report Downloaded",
        description: "Your well-being report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description:
          "There was an error downloading your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Show download button again
      if (downloadButtonRef.current) {
        downloadButtonRef.current.style.display = "block";
      }
      setDownloading(false);
    }
  };

  useEffect(() => {
    // Add custom styles for PDF generation
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .report-section {
          page-break-inside: avoid;
          margin-bottom: 20px;
        }
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        thead {
          display: table-header-group;
        }
        tfoot {
          display: table-footer-group;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
      <div ref={downloadButtonRef} className="fixed bottom-6 right-6 z-10">
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
      <div
        ref={reportRef}
        id="report-content"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-10 report-header">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {userName}&apos;s Well-Being Report
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        {/* Introduction */}
        <div className="mb-12 max-w-6xl mx-auto report-section">
          <p className="text-lg font-medium text-gray-700">
            Hello, {userName}!
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
        <div className="mb-12 max-w-6xl mx-auto report-section">
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
                  yourself and remember that it&apos;s always okay to check in
                  again!
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
                    {outcome.results.map((item: any, index: number) => {
                      const diseaseKey = item.disease

                      const mapped = DISEASE_REPORT_MAP[diseaseKey] || {
                        assessmentParameter: item.assessmentParameter,
                        whatItMeans: item.reportText?.whatItMeans || "",
                        howItFeels: item.reportText?.howItFeels || "",
                        whatCanHelp: item.reportText?.whatCanHelp || "",
                      };
                      console.log(mapped)

                      return (
                        <tr
                          key={index}
                          className={index % 2 === 1 ? "bg-gray-50" : ""}
                        >
                          <td className="border-b border-gray-200 p-4">
                            {mapped.assessmentParameter}
                          </td>
                          <td className="border-b border-gray-200 p-4">
                            {mapped.whatItMeans}
                          </td>
                          <td className="border-b border-gray-200 p-4">
                            {item.severity}
                          </td>
                          <td className="border-b border-gray-200 p-4">
                            {mapped.howItFeels}
                          </td>
                          <td className="border-b border-gray-200 p-4">
                            {mapped.whatCanHelp}
                          </td>
                        </tr>
                      );
                    })}
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
        <div className="mb-16  py-12 px-6 rounded-xl report-section">
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
        <div className="mb-16 max-w-4xl mx-auto report-section">
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
        <div className="max-w-4xl mx-auto mb-12 report-section">
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

const LoadingScreen = () => {
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
};
