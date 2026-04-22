"use client";

import React from "react";
import { Award, Star, Quote, MapPin, Calendar, ChefHat } from "lucide-react";


/*  Team Data Interface  */
interface TeamMember {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  image: string;
  // Optional properties for the featured CEO
  quote?: string;
  signature?: string;
  stats?: { label: string; value: string; icon: React.ReactNode }[];
}

/*  Data Array  */
const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Md. Tanvir Hossain",
    title: "CEO & Visionary Founder",
    specialty: "Chief Executive Officer",
    bio: "BPSTI-এর driving force হিসেবে আমাদের CEO বাংলাদেশের vocational training সেক্টরকে বদলে দিতে অঙ্গীকারবদ্ধ। Industrial innovation এবং global partnerships-এর ওপর গুরুত্ব দিয়ে তিনি প্রতিটি স্টুডেন্টের জন্য 4-star hotel এবং international employment-এর সরাসরি পথ নিশ্চিত করছেন",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    quote:
      "True leadership is not just about building an institution, but about empowering the next generation.",
    signature: "Tanvir H.",
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
      { label: "Impact", value: "High", icon: <Star className="w-5 h-5" /> },
    ],
  },
  {
    id: 2,
    name: "Md. Farhan Ahmed",
    title: "Board Member & Strategic Lead",
    specialty: "Director of Operations",
    bio: "আমাদের ট্রেনিং ফ্যাসিলিটির প্রতিদিনের শ্রেষ্ঠত্ব তদারকি করেন তিনি। আমাদের Active Learning labs এবং internship programs যেন hospitality industry-র সর্বোচ্চ professional standards বজায় রাখে, তা নিশ্চিত করাই তার মূল লক্ষ্য।",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Md. Rakibul Islam",
    title: "Board Member & Career Strategist",
    specialty: "Head of International Relations",
    bio: "Global mobility বিশেষজ্ঞ হিসেবে আমাদের Head of International Relations মূলত language integration programs এবং Europe ও Middle East-এ ক্যারিয়ার গড়তে ইচ্ছুক স্টুডেন্টদের overseas job placements সমন্বয় করেন।",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Mr. Ariful Islam",
    title: "Board Member & Industry Liaison",
    specialty: "Head of Career Placement",
    bio: "স্টুডেন্ট এবং ইন্ডাস্ট্রির মধ্যে সেতুবন্ধন। তিনি ব্যক্তিগতভাবে Pan Pacific Sonargaon, InterContinental, এবং Radisson Blu-এর মতো 3 & 4-star hotels-এর সাথে সুসম্পর্ক বজায় রাখেন, যাতে প্রতিটি internship এবং জব প্লেসমেন্ট আমাদের স্টুডেন্টদের ক্যারিয়ার গোল পূরণ করে।",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ms. Sadia Sultana",
    title: "Board Member & Curriculum Strategist",
    specialty: "Director of Academic Excellence",
    bio: "আমাদের ট্রেনিং প্রোগ্রামগুলোকে আধুনিক রাখতে তিনি দায়বদ্ধ। Big 5 fast food mastery থেকে শুরু করে International Cuisine; প্রতিটি সেগমেন্ট যেন global professional certification-এর মানদণ্ড অতিক্রম করে, তা তিনি নিশ্চিত করেন।",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Mr. Kamal Hossain",
    title: "Board Member & Welfare Lead",
    specialty: "Student Success Coordinator",
    bio: "প্রতিটি শিক্ষার্থীর সফলতার কারিগর। আমাদের fast-track programs-এ ভর্তি থেকে শুরু করে overseas language training এবং international career-এ পদার্পণ পর্যন্ত সব ধরনের student support তিনি তদারকি করেন।",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
];

/*  Interfaces  */
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

/*  Sub-Component: Stat Card (Horizontal) */
const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="group relative bg-[#faf9f6] p-3 border border-gray-200 hover:border-blue-400 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="text-red-400">{icon}</div>
      <div className="text-right">
        <span className="block text-xl  font-bold text-gray-900 leading-none">
          {value}
        </span>
        <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-1">
          {label}
        </p>
      </div>
    </div>
  </div>
);

/*  Sub-Component: Small Mini Card (For Bottom Section) */
const SmallCard = ({ member }: { member: TeamMember }) => (
  <div className="group relative font-lato bg-[#faf9f6] border border-gray-200 hover:border-blue-400 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
    {/* Image Section - Very Compact */}
    <div className="relative w-full h-[140px] overflow-hidden bg-gray-100">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
      />

      {/* Specialty Tag - Top Left */}
      <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-2 py-1 border-r border-b border-gray-200 z-20">
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] font-lato text-gray-900 block">
          {member.specialty}
        </span>
      </div>
    </div>

    {/* Content Section - Compact */}
    <div className="p-3 flex-1 flex flex-col relative">
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-500"></div>

      <h3 className="text-sm  font-bold  text-gray-900 mb-0.5 group-hover:text-red-400 transition-colors">
        {member.name}
      </h3>
      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-red-400 mb-1">
        {member.title}
      </p>
      <p className="text-gray-500 text-xs leading-tight line-clamp-2">
        {member.bio}
      </p>
    </div>
  </div>
);

/*  Main Component  */
export default function Team() {
  const featuredMember = teamData[0]; // CEO
  const otherMembers = teamData.slice(1); // Rest

  return (
    <>
      <section className="font-lato">
        <div className=" mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 border-b border-gray-200 pb-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-8 bg-red-400"></div>
                <span className="text-red-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  Leadership
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl  font-bold text-gray-900">
                The Visionaries Behind The Institute
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md mt-6 md:mt-0 font-light leading-relaxed">
              পরিচয় হয়ে নিন সেইসব strategic minds-দের সাথে, যারা culinary
              education এবং global career success-এর মধ্যকার দূরত্ব ঘুচাতে নিরলস
              কাজ করে যাচ্ছেন।
            </p>
          </div>

          {/* SINGLE MEGA CARD CONTAINER */}
          <div className="bg-white border border-gray-200 shadow-xl overflow-hidden">
            {/* 1. TOP SECTION: Featured CEO (Big) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-200">
              {/* LEFT: CEO Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-full min-h-[400px] bg-gray-100 angel-shape-alt">
                  <img
                    src={featuredMember.image}
                    alt={featuredMember.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105"
                  />
                  {/* Floating Signature Tag */}
                  <div className="absolute bottom-0 right-0 p-6 bg-gradient-to-l from-black/80 to-transparent">
                    <p className=" text-white text-lg italic opacity-90">
                      {featuredMember.signature}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: CEO Content */}
              <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center">
                {/* Header Info */}
                <div className="mb-6">
                  <span className="text-red-400 font-bold tracking-widest text-[10px] uppercase block mb-2">
                    {featuredMember.specialty}
                  </span>
                  <h3 className="text-3xl md:text-4xl  font-bold text-gray-900 mb-2">
                    {featuredMember.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {featuredMember.title}
                  </p>
                </div>

                {/* Quote Block */}
                <div className="relative pl-8 border-l-2 border-blue-400 mb-6">
                  <Quote className="absolute top-0 left-0 -translate-x-1/2 -translate-y-2 text-red-400 w-6 h-6 bg-[#faf9f6] p-1" />
                  <p className="text-lg  text-gray-800 italic leading-relaxed">
                    &ldquo;{featuredMember.quote}&rdquo;
                  </p>
                </div>

                {/* Bio Area */}
                <div className="angel-shape bg-[#faf9f6] p-6 shadow-sm border border-gray-100 mb-6">
                  <p className="text-gray-600 leading-loose font-light text-sm">
                    {featuredMember.bio}
                  </p>
                </div>

                {/* Stats Grid (Horizontal) */}
                {featuredMember.stats && (
                  <div className="grid grid-cols-3 gap-3">
                    {featuredMember.stats.map((stat, idx) => (
                      <StatCard key={idx} {...stat} />
                    ))}
                  </div>
                )}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Board Members
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {otherMembers.map((member) => (
                    <SmallCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </div>

            {/* 2. BOTTOM SECTION: Rest of Team (Small Pieces Inside Card) */}
            <div className="p-6 bg-white"></div>
          </div>
        </div>
      </section>
    </>
  );
}