"use client";

import React, { useEffect, useState, useRef } from "react";

/* --- Sub-Components --- */

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
    "relative px-8 py-3 overflow-hidden transition-all duration-500 ease-out shadow-lg group border border-transparent";

  const styles = {
    filled:
      "bg-red-600 text-white hover:bg-red-500 border-[#d43737] shadow-red-900/40",
    outline:
      "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} rounded-sm`}
      style={{
        animation: `slowFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <span className="relative z-10 font-semibold tracking-[0.2em] text-sm uppercase">
        {text}
      </span>
    </button>
  );
};

/*  Main Component  */
const Banner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const scrollToCTA = () => {
    const ctaSection = document.getElementById("ctaCard");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCourses = () => {
    const courseSection = document.getElementById("courses");
    if (courseSection) {
      courseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Global Keyframes */}
      <style jsx global>{`
        @keyframes slowFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(212, 55, 55, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(212, 55, 55, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(212, 55, 55, 0);
          }
        }
      `}</style>

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* --- Video Background Layer --- */}
        <div className="absolute inset-0 z-0 w-full h-full bg-gray-900">
          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] z-10"></div>
          <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay z-10"></div>

          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            src="/herobackground.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
        </div>

        {/* --- Hero Content --- */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center py-20">
          <div className="w-full max-w-6xl mx-auto">
            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl text-white font-black leading-tight mb-6 tracking-tight"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.4 : 0}s forwards`,
                opacity: 0,
                textShadow: "0 4px 30px rgba(0,0,0,0.6)",
              }}
            >
              আপনার Culinary <br />
              <span className="text-red-600 italic drop-shadow-lg">
                ক্যারিয়ার শুরু হোক এখানেই
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed border-l-2 border-[#d43737] pl-6 backdrop-blur-sm"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.6 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Global cuisine master করুন আমাদের expert training-এর মাধ্যমে। সাথে
              <span className="block text-white/60 mt-2 text-base">
                থাকছে guaranteed internships দেশের সবচাইতে prestigious hotels-এ,
                যেমন: Pan Pacific Sonargaon, InterContinental, এবং Radisson Blu.
              </span>
            </p>

            {/* Consultation Form */}
            <div
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.8 : 0}s forwards`,
                opacity: 0,
              }}
            >
              {/* <ConsultForm /> */}
            </div>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-6 mt-12"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 1.0 : 0}s forwards`,
                opacity: 0,
              }}
            >
              <MinimalButton
                text="View Programs"
                variant="outline"
                delay={0}
                onClick={scrollToCourses}
              />
              <MinimalButton
                text="Enroll Now"
                variant="filled"
                delay={0.1}
                onClick={scrollToCTA}
              />
            </div>
          </div>
        </div>

        {/* --- Sound Toggle Button (Absolute - Only in Banner) --- */}
        {/* Changed from 'fixed' to 'absolute' to stay within this section */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:border-[#d43737]/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group shadow-2xl"
          aria-label="Toggle Sound"
        >
          {/* Pulse animation when sound is active (not muted) */}
          {!isMuted && (
            <span className="absolute inset-0 rounded-full animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-[#d43737] z-[-1] opacity-50"></span>
          )}

          {isMuted ? (
            <svg
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[#d43737] opacity-100 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-10 z-20 hidden md:flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white">
            Scroll Down
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#d43737] to-transparent"></div>
        </div> */}
      </section>
    </>
  );
};

export default Banner;
