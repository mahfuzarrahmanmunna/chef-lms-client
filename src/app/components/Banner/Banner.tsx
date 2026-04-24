"use client";

import React, { useEffect, useState } from "react";
// Removed duplicate import below

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
    "relative px-8 py-3 overflow-hidden transition-all duration-500 ease-out shadow-lg group border border-transparent";

  const styles = {
    filled: "bg-red-600 text-white hover:bg-red-500 border-[#D4AF37]", // Gold filled
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
      <span className="relative z-10 font-sans font-semibold tracking-[0.15em] text-sm uppercase">
        {text}
      </span>
    </button>
  );
};

const StatsBar: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <div
      className="absolute hidden bottom-10 right-10 z-20 md:flex flex-col items-end gap-2 text-white/80"
      style={{
        animation: `slowFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Stat 1 */}
      <div className="flex flex-col border-r border-white/30 pr-8">
        <span className="text-[#ea393a] font-serif text-3xl italic font-bold">
          100%
        </span>
        <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mt-1">
          Internship Support
        </span>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col border-r border-white/30 pr-8">
        <span className="text-[#ea393a] font-serif text-3xl italic font-bold">
          3-4
        </span>
        <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mt-1">
          Placements in Star Hotels
        </span>
        <span className="text-sm font-bold italic">3-4 Star Hotels</span>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col">
        <span className="text-[#ea393a] font-serif text-3xl italic font-bold">
          No.1
        </span>
        <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mt-1">
          Global Career Pathway
        </span>
        <span className="text-sm font-bold italic">No. 1 Career Pathway</span>
      </div>
    </div>
  );
};

/*  ConsultForm Component - Fixed Layout (Single Definition) */
const ConsultForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bannerlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      console.log("Success:", data);
      setSuccess(true); // This disables inputs and changes button text to "SENT"

      // Optional: Reset form after success
      // setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 relative z-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 items-stretch"
      >
        {/* Input 1 */}
        <div className="flex-1">
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="YOUR NAME"
            className="w-full h-14 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/60 px-6 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
            disabled={success}
          />
        </div>

        {/* Input 2 */}
        <div className="flex-1">
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="PHONE NUMBER"
            className="w-full h-14 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/60 px-6 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
            disabled={success}
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="group relative h-16 px-12 bg-transparent text-white font-extrabold tracking-[0.2em] uppercase transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center rounded-xl overflow-visible isolate scale-100 hover:scale-105 active:scale-95"
        >
          {/* 1. ALWAYS ON - OUTER BREATHING GLOW (Stays at back) */}
          <div className="absolute inset-[-4px] rounded-xl bg-[#EA393A]/60 blur-xl animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] -z-20"></div>

          {/* 2. EXTRA LAYER FOR INTENSE GLOW (For more glow) */}
          <div className="absolute inset-0 rounded-xl bg-[#EA393A]/30 blur-md -z-20"></div>

          {/* 3. GLOWING BORDER LAYER (Moving Gradient - Always active) */}
          <div className="absolute inset-0 rounded-xl overflow-hidden -z-10 p-[2px]">
            <div
              className="absolute inset-[-400%] animate-[spin_3s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, #FF0000 0%, #FFFFFF 10%, #FF0000 20%, transparent 40%, transparent 60%, #FF0000 80%, #FFFFFF 90%, #FF0000 100%)",
              }}
            ></div>
          </div>

          {/* 4. MAIN SOLID BACKGROUND */}
          <div className="absolute inset-[1.5px] bg-gradient-to-br from-[#FF2B2C] via-[#EA393A] to-[#8E0E10] rounded-[10px] -z-10 transition-all duration-500 group-hover:from-slate-900 group-hover:to-slate-950"></div>

          {/* 5. LIGHT STREAK EFFECT (Subtle reflection) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 rounded-xl -z-10"></div>

          {/* 6. CONTENT LAYER */}
          <div className="relative z-10 flex items-center gap-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {loading ? (
              <div className="flex gap-1.5 items-center">
                <span className="w-1 h-5 bg-white rounded-full animate-[bounce_1s_infinite]"></span>
                <span className="w-1 h-5 bg-white rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
                <span className="w-1 h-5 bg-white rounded-full animate-[bounce_1s_infinite_0.4s]"></span>
              </div>
            ) : success ? (
              <div className="flex items-center gap-2.5 text-green-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-black">SENT</span>
              </div>
            ) : (
              <>
                <span className="bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-transparent group-hover:tracking-[0.25em] transition-all duration-300">
                  Get Consult
                </span>
                <svg
                  className="w-5 h-5 text-white animate-[bounce_2s_infinite_horizontal] transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </div>
        </button>
      </form>
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
      {/* Injecting keyframes directly here to fix the visibility issue */}
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
      `}</style>

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 z-10"></div>

          <video
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            src="/banner1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center py-20">
          <div className="w-full max-w-6xl mx-auto">
            {/* Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-tight mb-6"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.4 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Start your culinary career <br />
              <span className="text-[#ea393a] italic">right here</span>
            </h1>

            {/* Description */}
            <p
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed border-l-4 border-[#D4AF37] pl-6"
              style={{
                animation: `slowFadeIn 1s ease-out ${mounted ? 0.6 : 0}s forwards`,
                opacity: 0,
              }}
            >
              Master global cuisine through our expert training. Guaranteed
              internships at the country's best prestigious hotels.
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
            {/* <div className="flex flex-wrap gap-6 mt-12">
              <MinimalButton
                text="View Programs"
                variant="filled"
                delay={mounted ? 1.0 : 0}
                onClick={scrollToCourses}
              />
              <MinimalButton
                text="Enroll Now"
                variant="outline"
                delay={mounted ? 1.1 : 0}
                onClick={scrollToCTA}
              />
            </div> */}
          </div>
        </div>

        {/* Stats Bar - Small, Bottom Right */}
        {/* <StatsBar delay={mounted ? 1.2 : 0} /> */}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-10 z-20 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-white font-sans">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>
      {/* <ChoosePath></ChoosePath> */}
    </>
  );
};

export default Banner;