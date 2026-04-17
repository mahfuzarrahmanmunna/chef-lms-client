"use client";

import React from "react";
import { Award, Star, Quote, MapPin, Calendar } from "lucide-react";

/*  Typography & Styles  */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap');

  .font-serif-luxury {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans-luxury {
    font-family: 'Raleway', sans-serif;
  }

  /* The Angel Shape Clip Path */
  .angel-shape {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);
  }

  /* Angel Shape Variant (Cut Top-Right) */
  .angel-shape-alt {
    clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%);
  }
`;

/*  Updated Data: CEO Profile  */
const chefData = {
  name: "Md. Tanvir Hossain",
  role: "CEO & Visionary Founder",
  quote:
    "True leadership is not just about building an institution, but about empowering the next generation to redefine industry standards globally.",
  bio: "As the driving force behind BPSTI, our CEO is committed to transforming vocational training in Bangladesh. With a focus on industrial innovation and global partnerships, they ensure that every student has a direct pathway to 4-star hotel environments and international employment.",
  signature: "Tanvir H.",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
  stats: [
    {
      label: "Years Exp.",
      value: "12+",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Global Partners",
      value: "50+",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "Students Placed",
      value: "2k+",
      icon: <Star className="w-5 h-5" />,
    },
  ],
};

/*  Interface for Props  */
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

/*  Sub-Component: Angel Card Stat  */
const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="group relative bg-white p-5 shadow-md border-t-4 border-[#D4AF37] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
    <div className="angel-shape bg-gray-50 p-4 h-full border border-gray-100 group-hover:bg-[#faf9f6] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[#D4AF37]">{icon}</div>
        <span className="text-3xl font-serif-luxury font-bold text-gray-900">
          {value}
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
    </div>
  </div>
);

/*  Main Component  */
export default function MasterChef() {
  return (
    <>
      <style jsx global>
        {styles}
      </style>

      <section className="relative py-24 bg-[#faf9f6] font-sans-luxury overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-200/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Meet The Visionary
            </span>
            <h2 className="text-5xl md:text-7xl font-serif-luxury font-bold text-gray-900 mb-2">
              {chefData.name}
            </h2>
            <p className="text-lg text-gray-600 italic font-serif-luxury">
              {chefData.role}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN: Image & Visuals */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Gold Border Offset */}
              <div className="absolute top-4 left-4 w-full h-full border-2 border-[#D4AF37]/30 z-0 angel-shape hidden md:block" />

              {/* Main Image Container */}
              <div className="relative z-10 shadow-2xl">
                <div className="relative overflow-hidden angel-shape bg-white aspect-[4/5]">
                  <img
                    src={chefData.image}
                    alt={chefData.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105"
                  />

                  {/* Floating Signature Tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-serif-luxury text-white text-xl italic opacity-90">
                      {chefData.signature}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Content & Stats */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Quote Block */}
              <div className="relative pl-8 border-l-2 border-[#D4AF37]">
                <Quote className="absolute top-0 left-0 -translate-x-1/2 -translate-y-2 text-[#D4AF37] w-6 h-6 bg-[#faf9f6] p-1" />
                <p className="text-2xl md:text-3xl font-serif-luxury text-gray-800 italic leading-relaxed mb-6">
                  &ldquo;{chefData.quote}&ldquo;
                </p>
              </div>

              {/* Bio Card (Angel Shape) */}
              <div className="angel-shape bg-white p-8 shadow-lg border border-gray-100 relative">
                {/* Top Right decorative corner fill */}
                <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-[#D4AF37]/10" />

                <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Vision
                </h3>
                <p className="text-gray-600 leading-loose text-justify font-light">
                  {chefData.bio}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {chefData.stats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
