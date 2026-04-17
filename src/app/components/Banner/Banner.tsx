"use client";

import React, { useEffect, useState } from "react";

/*  Shared Styles for Fonts & Animations  */
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

:root {
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Manrope', sans-serif;
  --color-black: #000000;
  --color-dark-gray: #1a1a1a;
  --color-white: #ffffff;
  --color-light-gray: #f4f4f4;
}

@keyframes slowFadeIn {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* The Angel Shape (Sharp Cut Corner) */
.angel-shape {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}
`;

/*  Sub-Components  */

interface MinimalButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "filled" | "outline";
  delay: number;
}

const MinimalButton: React.FC<MinimalButtonProps> = ({
  text,
  onClick,
  variant = "filled",
  delay,
}) => {
  const base =
    "angel-shape relative px-10 py-4 overflow-hidden transition-all duration-500 ease-out shadow-lg group";

  // Filled: Black bg, White text
  // Outline: Transparent/White border, White text
  const styles = {
    filled:
      "bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white",
    outline:
      "bg-transparent border border-white text-white hover:bg-white hover:text-black",
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
      <span className="relative z-10 font-sans font-semibold tracking-[0.2em] text-xs uppercase">
        {text}
      </span>
    </button>
  );
};

const StatsBar: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <div
      className="hidden md:flex items-center gap-8 bg-white/90 backdrop-blur-sm px-8 py-6 shadow-2xl angel-shape"
      style={{
        animation: `slowFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Stat 1 */}
      <div className="flex flex-col border-r border-gray-300 pr-8">
        <span className="text-black font-serif text-3xl italic font-bold">
          No. 1
        </span>
        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">
          Global Ranking
        </span>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col border-r border-gray-300 pr-8">
        <span className="text-black font-serif text-3xl italic font-bold">
          20k+
        </span>
        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">
          Alumni Network
        </span>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col">
        <span className="text-black font-serif text-3xl italic font-bold">
          98%
        </span>
        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">
          Employment
        </span>
      </div>
    </div>
  );
};

/*  Main Component  */
const Banner: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Video Background - Grayscale for B&W Luxury Feel */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover  "
            src="/banner1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Subtle Texture/Grain Overlay (Optional for luxury feel) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            {/* Label */}
            {/* <div
              className="flex items-center gap-4 mb-8"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.2 : 0}s forwards`,
                opacity: 0,
              }}
            >
              <span className="w-12 h-[1px] bg-white"></span>
              <span className="text-white/80 text-xs font-bold tracking-[0.4em] uppercase font-sans">
                Est. 1995
              </span>
            </div> */}

            {/* Headline - High Contrast Serif */}
            <h1
              className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-10"
              style={{
                animation: `slowFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 0.4 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Your Culinary Career Starts Here. <br />
              <span className="italic text-white/90 font-light"></span>
            </h1>

            {/* Description */}
            <p
              className="text-gray-300 text-lg md:text-xl max-w-lg font-light leading-relaxed mb-12 font-sans border-l-2 border-white/30 pl-6"
              style={{
                animation: `slowFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 0.6 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Master global cuisine with expert training and guaranteed
              internships at prestigious hotels like Pan Pacific Sonargaon,
              InterContinental, and Radisson Blu.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <MinimalButton
                text="View Our Programs"
                variant="filled"
                delay={mounted ? 0.8 : 0}
              />
              <MinimalButton
                text="Enroll Today"
                variant="outline"
                delay={mounted ? 0.9 : 0}
              />
            </div>
          </div>

          {/* Floating Stats Bar - Bottom Right */}
          <div className="absolute bottom-10 left-6 md:left-auto md:right-10 md:bottom-20">
            <StatsBar delay={mounted ? 1.2 : 0} />
          </div>
        </div>

        {/* Scroll Indicator - Minimalist */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-white font-sans">
            Scroll
          </span>
          {/* Angel Shape Scroll Arrow */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>
    </>
  );
};

export default Banner;
