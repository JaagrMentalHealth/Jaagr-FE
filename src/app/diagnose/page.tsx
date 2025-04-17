"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DiagnoseForm from "./diagnosis-form";
import { Loader2, ArrowRight, Info, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/userContext";
import axios from "axios";
import { fetchOrgUser } from "@/api/assessment";

export default function DiagnosePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SelfAssessmentFlow />
    </Suspense>
  );
}

function SelfAssessmentFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const organizationId = searchParams.get("organizationId") || null;
  const orgUserId = searchParams.get("orgUserId") || null;
  const assessmentId = searchParams.get("assessmentId") || null;
  const token = Cookies.get("token");

  const [allowed, setAllowed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [orgUserData, setOrgUserData] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (token || (orgUserId && organizationId)) {
      setAllowed(true);
      if (orgUserId) {
        setLoadingUserData(true);
        fetchOrgUser(orgUserId)
          .then((res) => setOrgUserData(res.data))
          .catch((err) => console.error("Error fetching org user", err))
          .finally(() => setLoadingUserData(false));
      }
    } else {
      router.replace("/login");
    }
  }, [token, orgUserId, organizationId, router]);

  if (!allowed || (orgUserId && loadingUserData)) return <LoadingScreen />;

  if (showInstructions) {
    const isOrgUser = !!orgUserId && !!organizationId;
    const data = isOrgUser ? orgUserData : user;

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg border-purple-100">
          <CardHeader className="bg-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">
              Mental Health Assessment
            </CardTitle>
            <p className="text-purple-100 mt-2">
              Complete this brief assessment to help us understand your mental
              wellbeing
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-900">
                Welcome to Your Assessment
              </h2>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">
                      Before You Begin
                    </h3>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>This assessment takes approximately 5 minutes to complete</li>
                      <li>Answer questions honestly for the most accurate results</li>
                      <li>You can skip any question you're not comfortable answering</li>
                      <li>Your responses are confidential and protected</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={data?.fullName?.split(" ")[0] || ""}
                  disabled
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={data?.fullName?.split(" ").slice(-1)[0] ==data?.fullName?.split(" ")[0]? "":data?.fullName?.split(" ").slice(-1)[0]}
                  disabled
                />
                <InputField
                  label="Email"
                  name="email"
                  value={data?.email || ""}
                  type="email"
                  disabled
                />
                {isOrgUser && (
                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={data?.phone || ""}
                    type="tel"
                    disabled
                  />
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-100">
              <PrivacySection />
              <UsageSection />
            </div>

            <div className="flex items-start space-x-2 pt-4 border-t border-purple-100">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-1"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-purple-900"
                >
                  I agree to the terms and conditions
                </Label>
                <p className="text-xs text-purple-600">
                  By checking this box, you agree to our {" "}
                  <a href="#" className="underline hover:text-purple-800">
                    Terms of Service
                  </a>{" "}
                  and {" "}
                  <a href="#" className="underline hover:text-purple-800">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-purple-50 px-6 py-4 border-t border-purple-100">
            <Button
              onClick={() => setShowInstructions(false)}
              disabled={!acceptedTerms}
              className={`w-full sm:w-auto rounded-lg ${
                acceptedTerms ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-300"
              }`}
            >
              Begin Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <DiagnoseForm
      orgUserId={orgUserId}
      organizationId={organizationId}
      assessmentId={assessmentId}
    />
  );
}

function InputField({ label, name, value, onChange, type = "text", disabled = false }: any) {
  return (
    <div className="space-y-3">
      <Label htmlFor={name} className="text-purple-900">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
      />
    </div>
  );
}

function PrivacySection() {
  return (
    <div className="flex items-start space-x-3 mb-4">
      <Lock className="h-5 w-5 text-purple-600 mt-0.5" />
      <div>
        <h3 className="font-medium text-purple-900">Privacy & Confidentiality</h3>
        <p className="text-sm text-purple-700 mt-1">
          Your data is encrypted and stored securely. We follow HIPAA guidelines and industry best practices.
        </p>
      </div>
    </div>
  );
}

function UsageSection() {
  return (
    <div className="flex items-start space-x--3">
      <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
      <div>
        <h3 className="font-medium text-purple-900">How We Use Your Data</h3>
        <p className="text-sm text-purple-700 mt-1">
          Your responses help us provide personalized recommendations and resources.
        </p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Loader2 className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          Preparing your Questions...
        </p>
      </div>
    </div>
  );
}
