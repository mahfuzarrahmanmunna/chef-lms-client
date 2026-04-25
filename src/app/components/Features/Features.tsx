"use client";

import React from "react";
import { DollarSign, MapPin, TrendingUp, Award, Carrot } from "lucide-react";
import HeroSection from "../HeroSection";



/*  Data & Icons  */
const features = [
  {
    title: "Guaranteed Internships",
    subtitle:
      "We don’t just teach; we place. Every student gets the opportunity to gain real-world experience through internships at prestigious 3 and 4-star hotels.",
    icon: <DollarSign className="w-7 h-7" />,
    accent: "bg-blue-600",
  },
  {
    title: "Language Integration",
    subtitle:
      "For students eyeing abroad chef careers in Europe, the Middle East, or beyond, our curriculum includes dedicated language training to bridge the communication gap.",
    icon: <MapPin className="w-7 h-7" />,
    accent: "bg-red-600",
  },
  {
    title: "Fast-Track Learning",
    subtitle:
      "Choose between our intensive 3-month professional programs or our 30-day basic short courses designed for quick skill acquisition.",
    icon: <TrendingUp className="w-7 h-7" />,
    accent: "bg-purple-600",
  },
  {
    title: "Professional Certification",
    subtitle:
      "Graduate with a credential that is recognized by the hospitality industry, opening doors to kitchens both in Bangladesh and abroad.",
    icon: <Award className="w-7 h-7" />,
    accent: "bg-yellow-500",
  },
  {
    title: "Farm To Table Experience",
    subtitle: "Explore food growing and sustainable practices.",
    icon: <Carrot className="w-7 h-7" />,
    accent: "bg-green-600",
  },
];

/*  Main Component  */
export default function Features() {
  return (
    <>
      <section className=" text-black">
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-20 ">
           <h1 className="text-3xl lg:text-[2.4rem] font-bold text-red-700 mt-8">
          Beyond the Plate: <br></br> The BPSTI Advantage
          </h1>
             
              {/* Sharp Decorative Line */}
              <div className="h-2 w-30 mt-2 bg-red-600 " />
            </div>

            {/* Cards Grid */}
          <HeroSection></HeroSection>
          </div>
        </div>
      </section>
    </>
  );
}