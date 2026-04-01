"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────── Keyframes & Global Styles ──────────────── */
const keyframes = `
@keyframes fadeSlideUp {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes lineExpand {
  0%   { width: 0; }
  100% { width: 60px; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
@keyframes pulseSlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  50%      { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); }
}
`;

/* ──────────────── Sub-Components ──────────────── */

const AccentLine: React.FC<{ color?: string; delay?: number }> = ({
  color = "bg-red-600",
  delay = 0,
}) => (
  <span
    className={`block h-1 ${color} mb-6`}
    style={{
      animation: `lineExpand 0.8s ease-out ${delay}s forwards`,
      width: 0,
    }}
  />
);

const CTAButton: React.FC<{
  text: string;
  variant: "red" | "blue";
  href: string;
  delay: number;
}> = ({ text, variant, href, delay }) => {
  const base =
    "relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-1 shadow-md hover:shadow-xl overflow-hidden";

  const variants: Record<string, string> = {
    red: "bg-red-600 hover:bg-red-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]}`}
      style={{
        animation: `fadeSlideUp 0.7s ease-out ${delay}s both`,
      }}
    >
      <span className="relative z-10">{text}</span>
    </a>
  );
};

const InteractiveCard: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <div
      className="absolute bottom-10 right-0 lg:right-10 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-100 max-w-xs z-30"
      style={{
        animation: `fadeSlideUp 0.8s ease-out ${delay}s both, float 6s ease-in-out ${delay + 2}s infinite`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 relative overflow-hidden">
          {/* Requires next.config.js whitelist for images.unsplash.com */}
          <Image
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=100&auto=format&fit=crop"
            alt="Chef"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif font-bold text-black text-sm">
            Start Your Journey
          </h4>
          <p className="text-xs text-gray-500 mt-1 mb-2">
            Join our upcoming semester and master the art of cooking.
          </p>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
            Apply Now
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ──────────────── Path Section Components ──────────────── */

const Icons = {
  Culinary: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  Baking: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  ),
  Entrepreneurship: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  ),
  PlantBased: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  ),
  Nutrition: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  ),
  Hospitality: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
};

/* ──────────────── REDESIGNED PROFESSIONAL PATH CARD ──────────────── */

const PathCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, icon, delay }) => {
  return (
    <a
      href="#"
      className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{
        animation: `fadeSlideUp 0.6s ease-out ${delay}s both`,
      }}
    >
      {/* Subtle Shine Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Icon Container */}
      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
        <div className="w-8 h-8">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight uppercase tracking-wide group-hover:text-red-700 transition-colors duration-300">
        {title}
      </h3>

      {/* Decorative Line */}
      <div className="w-12 h-0.5 bg-red-200 rounded-full mb-4 group-hover:w-16 group-hover:bg-red-500 transition-all duration-300" />

      {/* Reveal Text on Hover */}
      <span className="text-sm font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
        Explore Program
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </a>
  );
};

/* ──────────────── Fixed Path Section Component (Professional Glassmorphism) ──────────────── */

const PathSection: React.FC = () => {
  const paths = [
    { title: "CULINARY ARTS", icon: Icons.Culinary },
    { title: "BAKING & PASTRY ARTS", icon: Icons.Baking },
    { title: "FOOD ENTREPRENEURSHIP", icon: Icons.Entrepreneurship },
    { title: "PLANT-BASED CULINARY ARTS", icon: Icons.PlantBased },
    { title: "HOLISTIC NUTRITION & WELLNESS", icon: Icons.Nutrition },
    {
      title: "HOSPITALITY & RESTAURANT OPERATIONS MANAGEMENT",
      icon: Icons.Hospitality,
    },
  ];

  return (
    //
    // Container: Subtle gradient background to provide contrast for the glass cards.
    //
    <div className="relative z-20 bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 
         The Stacked Glass Waves Container 
         - absolute top-0: Aligns with the top of the white box.
         - transform translateY(-50%): Pulls the whole stack UP by 50% to overlap the video.
      */}
      <div
        className="absolute top-0 left-0 w-full h-40"
        style={{ transform: "translateY(-50%)" }}
      >
        {/* 
           Wave 3 (Bottom Layer - Deep Glass)
           - Slightly darker, more transparent.
        */}
        <div
          className="absolute top-[10px] left-0 w-full h-full bg-slate-200/30 backdrop-blur-sm border-b border-white/10"
          style={{
            borderBottomLeftRadius: "50% 100%",
            borderBottomRightRadius: "50% 100%",
          }}
        ></div>

        {/* 
           Wave 2 (Middle Layer - Frosted Glass)
           - Medium transparency, higher blur.
        */}
        <div
          className="absolute top-[5px] left-0 w-full h-full bg-slate-100/40 backdrop-blur-md border-b border-white/20"
          style={{
            borderBottomLeftRadius: "50% 100%",
            borderBottomRightRadius: "50% 100%",
          }}
        ></div>

        {/* 
           Wave 1 (Top Layer - Clear Glass)
           - Higher opacity, crisp blur, shadow for depth.
        */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-white/80 backdrop-blur-lg border-b border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          style={{
            borderBottomLeftRadius: "50% 100%",
            borderBottomRightRadius: "50% 100%",
          }}
        ></div>
      </div>

      {/* Section Content */}
      <section className="relative z-10 pt-32 pb-32 bg-transparent">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Choose Your Path
            </h2>
            <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full shadow-md" />
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              Select a specialized track to master your craft and launch your
              career.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paths.map((path, index) => (
              <PathCard
                key={index}
                title={path.title}
                icon={path.icon}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ──────────────── Main Banner Component ──────────────── */
const Banner: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ★★★ Hero Section (Video Background) ★★★ */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden font-sans selection:bg-black selection:text-white pb-20">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover scale-105"
            src="/banner1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* White Overlay to maintain readability */}
          <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text Content */}
            <div className="order-2 lg:order-1 flex flex-col items-start max-w-2xl">
              <div className="mb-6">
                <AccentLine color="bg-red-600" delay={mounted ? 0.2 : 0} />
                <span
                  className="text-white/90 tracking-[0.25em] text-xs font-bold uppercase mb-4 block drop-shadow-md"
                  style={{
                    animation: `fadeSlideUp 0.6s ease-out ${mounted ? 0.3 : 0}s both`,
                  }}
                >
                  The Culinary Institute
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-lg"
                style={{
                  animation: `fadeSlideUp 0.7s ease-out ${mounted ? 0.4 : 0}s both`,
                }}
              >
                YOUR CULINARY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-400">
                  FUTURE
                </span>{" "}
                STARTS HERE
              </h1>

              <div
                className="flex flex-wrap items-center gap-2 text-white/90 font-medium text-sm sm:text-base mb-10 border-l-4 border-white/50 pl-4 bg-white/10 py-2 pr-4 rounded-r-sm backdrop-blur-sm"
                style={{
                  animation: `fadeSlideUp 0.7s ease-out ${mounted ? 0.5 : 0}s both`,
                }}
              >
                <span>20,000+ Graduates</span>
                <span className="text-white/30">|</span>
                <span>#1 Ranked Culinary School in the World*</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <CTAButton
                  text="Request Info"
                  variant="red"
                  href="#request-info"
                  delay={mounted ? 0.7 : 0}
                />
                <CTAButton
                  text="Enroll Today"
                  variant="blue"
                  href="#enroll"
                  delay={mounted ? 0.8 : 0}
                />
              </div>

              <p
                className="text-xs font-semibold text-white/50 uppercase tracking-widest mt-2 flex items-center gap-2"
                style={{
                  animation: `fadeSlideUp 0.7s ease-out ${mounted ? 0.9 : 0}s both`,
                }}
              >
                Choose Your Path
                <span className="w-8 h-[1px] bg-white/50" />
              </p>
            </div>

            {/* Right Column: Visual Placeholder */}
            <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] flex items-center justify-center">
              {/* Decorative Circle behind */}
              <div className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Right Interactive Window */}
        <InteractiveCard delay={mounted ? 1.2 : 0} />

        {/* Global Styles */}
        <style jsx global>{`
          ${keyframes}
        `}</style>
      </section>

      {/* ★★★ New Section: Choose Your Path (Glassmorphism) ★★★ */}
      <PathSection />
    </>
  );
};

export default Banner;
