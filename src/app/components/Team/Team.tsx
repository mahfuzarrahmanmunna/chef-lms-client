"use client";

import React, { useEffect, useState } from "react";
import { Award, ChefHat } from "lucide-react";
import ReviewSection from "../ReviewSection";

/* Types */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  awards: string[];
}

/* Data - English Translation */
const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Md. Tanvir Hossain",
    role: "Chief Executive Officer",
    specialty: "Visionary Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "As the driving force behind BPSTI, our CEO is committed to transforming Bangladesh's vocational training sector. Focusing on industrial innovation and global partnerships, he ensures every student has a direct path to 4-star hotels and international employment.",
    awards: ["Industrial Innovation Award 2023"]
  },
  {
    id: 2,
    name: "Md. Farhan Ahmed",
    role: "Operations Director",
    specialty: "Strategic Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    bio: "He oversees the day-to-day excellence of our training facilities. His main goal is to ensure that our Active Learning labs and internship programs maintain the highest professional standards of the hospitality industry.",
    awards: ["Operational Excellence Award"]
  },
  {
    id: 3,
    name: "Md. Rakibul Islam",
    role: "Head of International Relations",
    specialty: "Career Strategist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "As a global mobility specialist, our Head of International Relations primarily coordinates language integration programs and overseas job placements for students aspiring to build careers in Europe and the Middle East.",
    awards: ["Global Partnership Excellence"]
  },
  {
    id: 4,
    name: "Mr. Ariful Islam",
    role: "Head of Career Placement",
    specialty: "Industry Liaison",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    bio: "The bridge between students and the industry. He personally maintains strong relationships with 3 & 4-star hotels like Pan Pacific Sonargaon, InterContinental, and Radisson Blu, ensuring every internship and job placement fulfills our students' career goals.",
    awards: ["Industry Relations Leadership"]
  },
  {
    id: 5,
    name: "Ms. Sadiya Sultana",
    role: "Director of Academic Excellence",
    specialty: "Curriculum Strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    bio: "She is responsible for keeping our training programs modern. From Big 5 fast food mastery to International Cuisine, she ensures every segment exceeds global professional certification standards.",
    awards: ["Curriculum Innovation Award"]
  },
  {
    id: 6,
    name: "Mr. Kamal Hossain",
    role: "Student Success Coordinator",
    specialty: "Welfare Lead",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop",
    bio: "The architect of every student's success. From enrollment in our fast-track programs to overseas language training and embarking on international careers, he oversees all types of student support.",
    awards: ["Student Welfare Excellence"]
  }
];

/* Sub-Component: Professional Team Card */
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

/* Main Component */
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
        {/* Section Header - Left Aligned Editorial Style - English */}
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
            Get to know the strategic minds who are tirelessly working to bridge the gap between culinary education and global career success.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {team?.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>

      <ReviewSection />
    </section>
  );
}