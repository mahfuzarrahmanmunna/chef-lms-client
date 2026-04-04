"use client";

import React, { useEffect, useState } from "react";
import { Award, ChefHat } from "lucide-react";

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

/*  Sub-Component: Team Card  */
const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        {/* CHANGED: Used standard <img> instead of Next.js <Image> */}
        <img
          src={member?.image}
          alt={member?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay on Hover for Social Icons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href="#"
            className="p-2 bg-white rounded-full text-gray-900 hover:text-red-600 transition-colors transform hover:scale-110"
          >
            {/* <Instagram className="w-5 h-5" /> */}
          </a>
          <a
            href="#"
            className="p-2 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            {/* <Linkedin className="w-5 h-5" /> */}
          </a>
        </div>

        {/* Specialty Tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
            {member.specialty}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col items-center text-center">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
          {member.role}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {member.bio}
        </p>

        {/* Awards List */}
        {member.awards.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100 w-full">
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wide">
              <Award className="w-3 h-3" />
              {member.awards[0]}
            </div>
          </div>
        )}
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
    const fetchTeam = async () => {
      try {
        const response = await fetch("/team.json");
        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a96e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-bold">
        Error loading team: {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block flex items-center justify-center gap-2">
            <ChefHat className="w-4 h-4" />
            Expert Faculty
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Meet Our Masters
          </h2>
          <div className="w-24 h-1 bg-[#c9a96e] mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Learn from world-class chefs who have dedicated their lives to the
            culinary arts.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team?.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
