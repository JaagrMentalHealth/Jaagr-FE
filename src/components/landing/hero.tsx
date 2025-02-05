"use client";

import { Button } from "@/components/landing/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

export function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const handleStartWriting = () => {
    // if (user) {
    //   router.push("/upload");
    // } else {
    //   router.push("/login?redirect=/upload");
    // }
    router.push("/self-assessment");
  };

  return (
    <section className="w-full bg-gradient-to-b from-purple-50 to-white py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6 text-center md:text-left mx-auto md:mx-0 max-w-md md:max-w-none">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Be more aware{" "}
            <span className="inline-block w-[118px] h-[45px] sm:w-[142px] sm:h-[54px] md:w-[140px] md:h-[72px] lg:w-[150] lg:h-[60px]  relative">
              <Image
                src="/logoHero.svg"
                alt="Jaagr Logo"
                fill
                className="object-contain mt-2"
                priority
              />
            </span>{" "}
            about your thoughts
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Bringing mental health experts to your palm
          </p>
          <div className="flex flex-col gap-4 sm:justify-center md:justify-start">
            <Button
              onClick={handleStartWriting}
              className="w-full sm:w-fit sm:px-16 bg-purple-500 text-white hover:bg-purple-600  text-lg py-6 px-8"
            >
              Take Assessment Yourself
            </Button>
            <div className="flex text-xl text-secondary-foreground md:text-2xl">
              Want to read something?
              <Link href={"/blogs"} className="font-bold">
                Read Here
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:order-last mx-auto">
          <div className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px]">
            <Image
              src="/images/hero.png"
              alt="Mental Health Illustration"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
