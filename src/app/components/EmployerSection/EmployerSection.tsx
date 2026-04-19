"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Added Autoplay
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

// --- DATA ---
const employers = [
  {
    id: 1,
    name: "Nothing Cakes",
    // Note: Replace with <img src="/logos/nothing-cakes.png" /> if you have file
    initials: "NC",
  },
  {
    id: 2,
    name: "Disney Culinary",
    initials: "DC",
  },
  {
    id: 3,
    name: "Hyatt",
    initials: "HY",
  },
  {
    id: 4,
    name: "Whole Foods Market",
    initials: "WF",
  },
  {
    id: 5,
    name: "Sodexo",
    initials: "SD",
  },
  {
    id: 6, // Repeated for continuous loop
    name: "Nothing Cakes",
    initials: "NC",
  },
  {
    id: 7,
    name: "Disney Culinary",
    initials: "DC",
  },
  {
    id: 8,
    name: "Hyatt",
    initials: "HY",
  },
];

/* ──────────────── SUB-COMPONENTS ──────────────── */

const SwiperNavButton = ({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick?: () => void;
}) => {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-gray-900 hover:border-red-600 hover:text-red-600 transition-all duration-300 ${
        isPrev ? "left-4 md:-left-6" : "right-4 md:-right-6"
      }`}
    >
      {isPrev ? (
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      ) : (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      )}
    </button>
  );
};

const LogoCard: React.FC<{ employer: (typeof employers)[0] }> = ({
  employer,
}) => {
  return (
    <div className="group h-24 w-full flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:border-red-200 transition-all duration-300 cursor-default">
      {/* Text Logo (Clean, Reliable) */}
      <h3 className="font-serif text-2xl md:text-3xl text-gray-300 font-medium group-hover:text-gray-800 transition-colors tracking-wide">
        {employer.initials}
      </h3>

      {/* Real Logo Implementation Example:
      <img 
        src={`/logos/${employer.name.toLowerCase().replace(/ /g, '-')}.svg`} 
        alt={employer.name}
        className="h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
      /> 
      */}

      <p className="absolute bottom-2 text-[10px] uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {employer.name}
      </p>
    </div>
  );
};

/* ──────────────── MAIN COMPONENT ──────────────── */

const EmployerSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Red Accent Line */}
          <div className="w-16 h-1 bg-red-700 mx-auto mb-6"></div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight max-w-4xl mx-auto">
            Some Esteemed Employers that Have Hired{" "}
            <br className="hidden md:inline" /> BSPTI
          </h2>

          <p className="text-gray-500 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Our alumni have gone on to build careers at some of the world&apos;s most
            prestigious hospitality and culinary brands.
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative py-10 group/swiper">
          <div className="swiper-button-prev custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="prev" />
          </div>
          <div className="swiper-button-next custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="next" />
          </div>

          <Swiper
            modules={[Navigation, Autoplay]} // Added Autoplay module
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            // --- AUTOPLAY CONFIGURATION ---
            autoplay={{
              delay: 3000, // Wait 3 seconds before sliding to next
              disableOnInteraction: false, // Keep playing even if user clicks arrows
              pauseOnMouseEnter: true, // Pause when user hovers over it
            }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            grabCursor={false}
            className="!pb-0"
          >
            {employers.map((employer) => (
              <SwiperSlide key={employer.id}>
                <LogoCard employer={employer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Decorative Background Elements (Subtle) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default EmployerSection;
