"use client";

import React, { useEffect, useState } from "react";

/*  Shared Styles for Fonts & Animations */
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

:root {
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Manrope', sans-serif;
  --font-great: 'Great Vibes', cursive; 
  --color-red: #b91c1c; 
  --color-red-hover: #dc2626; 
  --color-dark: #111827;
}

@keyframes slowFadeIn {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

/*  Sub-Components  */

const MinimalButton: React.FC<{
  text: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  delay: number;
}> = ({ text, onClick, variant = "primary", delay }) => {
  const base =
    "relative px-10 py-4 overflow-hidden transition-all duration-500 ease-out shadow-sm";

  const styles = {
    primary: "bg-red-700 text-white hover:bg-red-600 hover:shadow-md",
    outline:
      "bg-transparent border border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
      style={{
        animation: `slowFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <span className="relative z-10 font-medium tracking-widest text-xs uppercase font-bold">
        {text}
      </span>
    </button>
  );
};

const StatsBar: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <div
      className="hidden md:flex items-center gap-10 bg-white/20 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-10 py-5 rounded-sm"
      style={{
        animation: `slowFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <div className="flex flex-col">
        <span className="text-red-700 font-serif text-3xl italic font-bold">
          No. 1
        </span>
        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
          Global Ranking
        </span>
      </div>
      <div className="w-px h-8 bg-gray-200"></div>
      <div className="flex flex-col">
        <span className="text-gray-900 font-serif text-3xl italic font-bold">
          20k+
        </span>
        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
          Alumni Network
        </span>
      </div>
      <div className="w-px h-8 bg-gray-200"></div>
      <div className="flex flex-col">
        <span className="text-gray-900 font-serif text-3xl italic font-bold">
          98%
        </span>
        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
          Employment Rate
        </span>
      </div>
    </div>
  );
};

/*  Main Component  */
const Banner: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix for setState warning
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>
        {globalStyles}
      </style>

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
            src="/banner1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/25 border-t border-l border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            {/* Label */}
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.2 : 0}s forwards`,
                opacity: 0,
              }}
            >
              <span className="w-8 h-[1px] bg-red-700"></span>
              <span className="text-red-700 text-xs font-bold tracking-[0.3em] uppercase">
                Est. 1995
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-great text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-[0.95] mb-8"
              style={{
                animation: `slowFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 0.4 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Crafting the <br />
              <span className="italic text-red-700">Extraordinary.</span>
            </h1>

            {/* Description */}
            <p
              className="text-gray-600 text-lg md:text-xl max-w-lg font-light leading-relaxed mb-12"
              style={{
                animation: `slowFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 0.6 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Join the elite cohort of chefs shaping the future of global
              gastronomy. Precision. Passion. Perfection.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <MinimalButton
                text="Apply for Semester"
                variant="primary"
                delay={mounted ? 0.8 : 0}
              />
              <MinimalButton
                text="View Programs"
                variant="outline"
                delay={mounted ? 0.9 : 0}
              />
            </div>
          </div>

          {/* Floating Stats Bar */}
          <div className="absolute bottom-10 left-6 md:left-auto md:right-10 md:bottom-20">
            <StatsBar delay={mounted ? 1.2 : 0} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-gray-900">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gray-900 to-transparent"></div>
        </div>
      </section>
    </>
  );
};

export default Banner;
