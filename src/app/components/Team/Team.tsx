"use client";

import React, { useEffect, useState } from "react";
import { Award, ChefHat } from "lucide-react";
import ReviewSection from "../ReviewSection";



/*  Types  */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  awards: string[];
}

/*  Data - Updated with Bengali content  */
const teamData: TeamMember[] = [
  {
    id: 1,
    name: "মোঃ তানভীর হোসেন",
    role: "প্রধান নির্বাহী কর্মকর্তা",
    specialty: "Visionary Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "BPSTI-এর driving force হিসেবে আমাদের CEO বাংলাদেশের vocational training সেক্টরকে বদলে দিতে অঙ্গীকারবদ্ধ। Industrial innovation এবং global partnerships-এর ওপর গুরুত্ব দিয়ে তিনি প্রতিটি স্টুডেন্টের জন্য 4-star hotel এবং international employment-এর সরাসরি পথ নিশ্চিত করছেন।",
    awards: ["Industrial Innovation Award 2023"]
  },
  {
    id: 2,
    name: "মোঃ ফারহান আহমেদ",
    role: "অপারেশনস পরিচালক",
    specialty: "Strategic Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    bio: "আমাদের ট্রেনিং ফ্যাসিলিটির প্রতিদিনের শ্রেষ্ঠত্ব তদারকি করেন তিনি। আমাদের Active Learning labs এবং internship programs যেন hospitality industry-র সর্বোচ্চ professional standards বজায় রাখে, তা নিশ্চিত করাই তার মূল লক্ষ্য।",
    awards: ["Operational Excellence Award"]
  },
  {
    id: 3,
    name: "মোঃ রকিবুল ইসলাম",
    role: "আন্তর্জাতিক সম্পর্ক প্রধান",
    specialty: "Career Strategist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "Global mobility বিশেষজ্ঞ হিসেবে আমাদের Head of International Relations মূলত language integration programs এবং Europe ও Middle East-এ ক্যারিয়ার গড়তে ইচ্ছুক স্টুডেন্টদের overseas job placements সমন্বয় করেন।",
    awards: ["Global Partnership Excellence"]
  },
  {
    id: 4,
    name: "মি. আরিফুল ইসলাম",
    role: "ক্যারিয়ার প্লেসমেন্ট প্রধান",
    specialty: "Industry Liaison",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    bio: "স্টুডেন্ট এবং ইন্ডাস্ট্রির মধ্যে সেতুবন্ধন। তিনি ব্যক্তিগতভাবে Pan Pacific Sonargaon, InterContinental, এবং Radisson Blu-এর মতো 3 & 4-star hotels-এর সাথে সুসম্পর্ক বজায় রাখেন, যাতে প্রতিটি internship এবং জব প্লেসমেন্ট আমাদের স্টুডেন্টদের ক্যারিয়ার গোল পূরণ করে।",
    awards: ["Industry Relations Leadership"]
  },
  {
    id: 5,
    name: "মিস সাদিয়া সুলতানা",
    role: "একাডেমিক এক্সিলেন্স পরিচালক",
    specialty: "Curriculum Strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    bio: "আমাদের ট্রেনিং প্রোগ্রামগুলোকে আধুনিক রাখতে তিনি দায়বদ্ধ। Big 5 fast food mastery থেকে শুরু করে International Cuisine; প্রতিটি সেগমেন্ট যেন global professional certification-এর মানদণ্ড অতিক্রম করে, তা তিনি নিশ্চিত করেন।",
    awards: ["Curriculum Innovation Award"]
  },
  {
    id: 6,
    name: "মি. কামাল হোসেন",
    role: "স্টুডেন্ট সাকসেস কোঅর্ডিনেটর",
    specialty: "Welfare Lead",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop",
    bio: "প্রত্যেকটি শিক্ষার্থীর সফলতার কারিগর। আমাদের fast-track programs-এ ভর্তি থেকে শুরু করে overseas language training এবং international career-এ পদার্পণ পর্যন্ত সব ধরনের student support তিনি তদারকি করেন।",
    awards: ["Student Welfare Excellence"]
  }
];

/*  Sub-Component: Professional Team Card  */
const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  return (
    <div className="group relative bg-white border border-gray-200 hover:border-red-700 transition-all duration-300 flex flex-col h-full">
      {/* Image Section - Vertical Portrait, Sharp Edges */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={member?.image}
          alt={member?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />

        {/* Sharp Specialty Tag - Top Left */}
        <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-4 py-2 border-r border-b border-gray-200 z-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 block">
            {member.specialty}
          </span>
        </div>

        {/* Always Visible Social Bar - Bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 flex items-center justify-center gap-6 py-3 z-20">
          {/* LinkedIn SVG */}
          <a
            href="#"
            className="text-white hover:text-red-500 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Instagram SVG */}
          <a
            href="#"
            className="text-white hover:text-red-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Content Section - Left Aligned, Editorial Style */}
      <div className="p-8 flex-1 flex flex-col relative">
        {/* Top Accent Line - Visible on Hover */}
        <div className="absolute top-0 left-0 w-0 h-1 bg-red-700 group-hover:w-full transition-all duration-500 ease-out"></div>

        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">
          {member.name}
        </h3>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-6">
          {member.role}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
          {member.bio}
        </p>

        {/* Awards / Footer */}
        <div className="pt-6 border-t border-gray-100">
          {member.awards.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 border border-gray-100 text-gray-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                  Recognition
                </span>
                <span className="text-xs font-medium text-gray-800 leading-tight">
                  {member.awards[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/*  Main Component  */
export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Using local data instead of fetch for reliability
    const timer = setTimeout(() => {
      setTeam(teamData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center bg-white min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-bold bg-white">
        Error loading team: {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header - Left Aligned Editorial Style - Updated Bengali */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 border-b border-gray-200 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-8 bg-red-700"></div>
              <span className="text-red-700 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
             Meet the BPSTI Leaders
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              The Visionaries Behind the Institute
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md mt-6 md:mt-0 font-light leading-relaxed">
            পরিচয় হয়ে নিন সেইসব strategic minds-দের সাথে, যারা culinary education এবং global career success-এর মধ্যকার দূরত্ব ঘুচাতে নিরলস কাজ করে যাচ্ছেন।
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {team?.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>

<ReviewSection></ReviewSection>
    </section>
    
  );
}