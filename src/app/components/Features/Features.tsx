"use client";

import React from "react";
import { DollarSign, MapPin, TrendingUp, Award, Carrot } from "lucide-react";
import HeroSection from "../HeroSection";

/*  Keyframes & Fonts  */
const keyframes = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;800&display=swap');

@keyframes fadeSlideUp {
  0%   { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Apply Raleway globally for this component scope */
body {
  font-family: 'Raleway', sans-serif;
}
`;

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
      <style jsx global>{`
        ${keyframes}
      `}</style>

      {/* 
         CONTAINER:
         min-h-[300vh]: Makes the container 3x the height of the screen.
         This creates the scrollable space needed to reveal cards while the bg stays sticky.
      */}
      <section className="relative w-full min-h-[300vh] bg-black">
        {/* 
           STICKY BACKGROUND LAYER:
           sticky top-0: Pins the image to the top of the viewport.
           h-screen: Matches the viewport height.
           z-0: Stays behind content.
        */}
        <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop"
            alt="Chocolate Cake Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        {/* 
           SCROLLABLE CONTENT LAYER:
           relative z-10: Sits on top of the image.
           The natural flow of this div will cause it to scroll over the sticky background.
        */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-32">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight uppercase">
                Why Choose BPSTI
              </h2>
              {/* Sharp Decorative Line */}
              <div className="h-2 w-20 bg-red-600 mx-auto" />
            </div>

            {/* Cards Grid */}
          <HeroSection></HeroSection>

            {/* Spacer to ensure smooth scroll out of the sticky area */}
            <div className="h-32 flex items-center justify-center mt-12">
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase animate-pulse">
                Continue Scrolling
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}