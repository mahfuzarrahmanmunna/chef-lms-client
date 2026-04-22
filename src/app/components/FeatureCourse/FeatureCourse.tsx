"use client";

import React from "react";
import Link from "next/link";
import { Clock, Globe, ArrowRight, Award, CheckCircle } from "lucide-react";
import HeroSection from "../HeroSection";

/*  Styles  */
const globalStyles = `
  /* Relying on Layout for Allura, but ensuring Serif/Sans here for fallback */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  . { font-family: 'Playfair Display', serif; }
  .font-sans-luxury { font-family: 'Manrope', sans-serif; }

  /* The Angel Shape (Cut Bottom-Right - More Aggressive Cut for Modern Look) */
  .angel-shape {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
  }

  /* Angel Shape Button Variant */
  .angel-btn {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
  }
`;

/*  Main Component  */
export default function FeatureCourse() {
  return (
    <>
      <style jsx global>
        {globalStyles}
      </style>

      <section className="mt-20 bg-white relative overflow-hidden border-t border-gray-100">
        {/* Subtle Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-0" />

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* LEFT COLUMN: Image (Span 5) */}
            <div className="lg:col-span-5 relative group order-2 lg:order-1">
              {/* Decorative Offset Border - Subtle & Elegant */}
              <div className="absolute top-6 left-6 w-full h-full border border-red-900/10 z-0 hidden lg:block" />

              {/* Main Image Container */}
              <div className="relative z-10 angel-shape shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2000&auto=format&fit=crop"
                  alt="Professional Chef Training"
                  className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Floating Badge: Best Value - Minimalist */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm border border-gray-100 px-5 py-3 flex flex-col shadow-lg z-20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
                    Exclusive
                  </span>
                  <span className=" text-2xl font-bold text-gray-900 italic">
                    Top Pick
                  </span>
                </div>

                {/* Bottom Accent Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

            {/* RIGHT COLUMN: Content (Span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 lg:pl-10">
              {/* Pre-Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#EA393A]"></div>
                <span className="text-red-700 font-sans-luxury font-bold tracking-[0.25em] text-[10px] uppercase">
                  Premium Promotion
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-5xl md:text-6xl  font-bold text-gray-900 mb-2 leading-[1.1]">
                Professional Chef Course
              </h2>

              {/* Allura Font Application Here */}
              <div className="mb-8">
                <span className="font-['var(--font-allura)] text-5xl text-red-700">
                  (with Language Training)
                </span>
              </div>

              {/* Price & Duration Box - Modern Card Style */}
              <div className="flex flex-wrap items-center gap-8 bg-gray-50 border border-gray-100 p-6 mb-8">
                <div className="flex-1 min-w-[150px]">
                  <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Full Package Price
                  </span>
                  <span className="text-4xl  font-bold text-gray-900">
                    Tk. 45,000
                  </span>
                </div>

                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-red-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      Duration
                    </span>
                    <span className="text-lg  font-bold">
                      3 Months
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-sans-luxury font-light leading-relaxed mb-10 text-lg border-l-2 border-red-100 pl-6">
                This comprehensive bundle includes professional chef courses
                along with specialized language training, specifically designed
                for students preparing to go abroad.
              </p>

              {/* Features List - Clean Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <FeatureItem
                  icon={<Globe className="w-5 h-5" />}
                  text="Specialized Language Training"
                />
                <FeatureItem
                  icon={<Award className="w-5 h-5" />}
                  text="Professional Chef Certification"
                />
                <FeatureItem
                  icon={<CheckCircle className="w-5 h-5" />}
                  text="Career Abroad Support"
                />
                <FeatureItem
                  icon={<ArrowRight className="w-5 h-5" />}
                  text="Fast Track Enrollment"
                />
              </div>

              {/* CTA Button - High Contrast */}
              <Link
                href="/apply"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-sans-luxury font-bold tracking-[0.2em] text-xs uppercase transition-all duration-300 hover:bg-[#EA393A] hover:shadow-xl hover:shadow-red-700/30 angel-btn"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
   
    </>
  );
}

/*  Sub-Component: Feature Item  */
const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-800 bg-white transition-all group-hover:border-red-700 group-hover:text-red-700">
        {icon}
      </div>
      <span className="text-gray-700 font-sans-luxury font-medium group-hover:text-red-700 transition-colors">
        {text}
      </span>
     
       </div>
  
  );
};
