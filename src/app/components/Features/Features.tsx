"use client";

import React from "react";
import { DollarSign, MapPin, TrendingUp, Award, Carrot } from "lucide-react";

/* ──────────────── Keyframes ──────────────── */
const keyframes = `
@keyframes fadeSlideUp {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

/* ──────────────── Data & Icons ──────────────── */
const features = [
  {
    title: "Financial Aid",
    subtitle: "Available for those who qualify",
    icon: <DollarSign className="w-6 h-6 text-blue-600" />,
    accentColor: "text-blue-600",
  },
  {
    title: "Largest In The USA",
    subtitle: "Escoffier is the largest culinary school brand",
    icon: <MapPin className="w-6 h-6 text-red-600" />,
    accentColor: "text-red-600",
  },
  {
    title: "Business-Focused Curriculum",
    subtitle: "Curriculum includes business & entrepreneurship",
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    accentColor: "text-purple-600",
  },
  {
    title: "Best Online Schools",
    subtitle: "Newsweek 5-star award, Top Online Schools 2026",
    icon: <Award className="w-6 h-6 text-yellow-600" />,
    accentColor: "text-yellow-600",
  },
  {
    title: "Farm To Table Experience",
    subtitle: "Explore food growing and sustainable practices",
    icon: <Carrot className="w-6 h-6 text-green-600" />,
    accentColor: "text-green-600",
  },
];

/* ──────────────── Main Component ──────────────── */
export default function Features() {
  return (
    <>
      <style jsx global>{`
        ${keyframes}
      `}</style>

      <section className="relative w-full min-h-screen py-12 sm:py-24 bg-gray-900 overflow-hidden flex items-center">
        {/* Background Image (Cake) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop"
            alt="Chocolate Cake Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            {/* LEFT COLUMN: The 2-Column Grid of Cards */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
                  Why Choose Us
                </h2>
                <div className="w-24 h-1 bg-red-600 rounded-full" />
              </div>

              {/* 
                 GRID:
                 - grid-cols-2: Strictly 2 columns on ALL devices as requested.
                 - gap-4: Spacing between cards.
                 - This naturally creates a Left Column (3 cards) and Right Column (2 cards) flow.
              */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center h-full"
                    style={{
                      animation: `fadeSlideUp 0.6s ease-out ${0.2 + index * 0.1}s both`,
                    }}
                  >
                    {/* Icon Container */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100 mb-3">
                      {feature.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 leading-tight mb-1 sm:mb-2 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-tight line-clamp-3">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Empty (Shows the cake image clearly) */}
            <div className="hidden lg:block h-full"></div>
          </div>
        </div>
      </section>
    </>
  );
}
