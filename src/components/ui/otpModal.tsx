"use client";

import { useState, useEffect } from "react";
import { verifyOTP, sendOTP } from "@/api/otpAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  verify: () => void;
  email: string;
}

export function OTPModal({ isOpen, onClose, verify, email }: OTPModalProps) {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (isOpen) {
      setIsResendDisabled(true);
      setTimer(30);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isOpen]);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const res: any = await verifyOTP(email, otp);
      console.log(res);
      if (res.status == 200) {
        verify();
        onClose();
      } else {
        setVerified(false);
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResendDisabled(true);
    setTimer(30);
    try {
      await sendOTP(email);
      toast.success("OTP Resent Successfully");
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>
          <div className="flex justify-end text-sm text-blue-500">
            <button
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className="disabled:text-gray-400 cursor-pointer"
            >
              {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
