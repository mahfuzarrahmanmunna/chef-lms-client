"use client";

import React from "react";
import { DollarSign, MapPin, TrendingUp, Award, Carrot } from "lucide-react";

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
    title: "Financial Aid",
    subtitle: "Available for those who qualify to start your journey.",
    icon: <DollarSign className="w-7 h-7" />,
    accent: "bg-blue-600",
  },
  {
    title: "Largest In The USA",
    subtitle: "Escoffier is the largest culinary school brand nationwide.",
    icon: <MapPin className="w-7 h-7" />,
    accent: "bg-red-600",
  },
  {
    title: "Business-Focused Curriculum",
    subtitle: "Curriculum includes business & entrepreneurship skills.",
    icon: <TrendingUp className="w-7 h-7" />,
    accent: "bg-purple-600",
  },
  {
    title: "Best Online Schools",
    subtitle: "Newsweek 5-star award, Top Online Schools 2026.",
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
                Why Choose Us
              </h2>
              {/* Sharp Decorative Line */}
              <div className="h-2 w-20 bg-red-600 mx-auto" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    // ANGEL SHAPE: Cuts the bottom-right corner (30px)
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
                    animation: `fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s both`,
                  }}
                >
                  {/* Left Accent Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${feature.accent}`} />
                  
                  {/* Content Layout */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-5 mb-4">
                      {/* Icon Box - Square & Sharp */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <div className={`text-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-normal">
                          {feature.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Bottom Triangle matching the cut */}
                    <div className={`absolute bottom-0 right-0 w-[30px] h-[30px] ${feature.accent} opacity-20`} />
                  </div>
                </div>
              ))}
            </div>
            
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