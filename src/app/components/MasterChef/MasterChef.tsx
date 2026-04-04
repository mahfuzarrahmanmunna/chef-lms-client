"use client";

import React, { useEffect, useState } from "react";
import {
  Award,
  Globe,
  MapPin,
  Quote,
  Clock,
  Users,
  Star,
  ChefHat,
  Briefcase,
  ArrowRight,
} from "lucide-react";

/*  Types  */
interface Highlight {
  year: string;
  title: string;
  description: string;
}

interface MasterChefData {
  id: number;
  name: string;
  role: string;
  quote: string;
  shortBio: string;
  stats: Array<{ label: string; value: string }>;
  specialties: string[];
  countries: string[];
  highlights: Highlight[];
  image: string;
  signature: string;
}

/*  Sub-Component: Stat Item  */
const StatItem: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
}> = ({ value, label, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-2.5 bg-red-50 rounded-lg text-red-600">{icon}</div>
      <div>
        <p className="text-2xl font-serif font-bold text-blue-900">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
};

/*  Main Component  */
export default function MasterChef() {
  const [chef, setChef] = useState<MasterChefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChefData = async () => {
      try {
        const response = await fetch("/masterchef.json");
        if (!response.ok) throw new Error("Failed to fetch chef data");
        const data: MasterChefData = await response.json();
        setChef(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchChefData();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !chef) {
    return (
      <div className="py-20 text-center text-gray-400 bg-white">
        <p>Profile unavailable.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Image, Bio, Stats */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 flex flex-col gap-8">
            {/* Decorative Offset Border */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-100 rounded-2xl hidden lg:block" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600/5 rounded-2xl hidden lg:block" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100 group">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Info Card */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-white">
                      <Star className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                        Michelin Starred
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-white font-serif italic text-lg">
                    {chef.signature}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Section (Moved to Left) */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-3 flex items-center gap-2">
                <ChefHat className="w-3 h-3 text-red-600" />
                About
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {chef.shortBio}
              </p>
            </div>

            {/* Stats Grid (Moved to Left) */}
            <div className="grid grid-cols-2 gap-4">
              <StatItem
                icon={<Clock className="w-5 h-5" />}
                value={chef.stats[0].value}
                label={chef.stats[0].label}
              />
              <StatItem
                icon={<Globe className="w-5 h-5" />}
                value={chef.stats[1].value}
                label={chef.stats[1].label}
              />
              <StatItem
                icon={<Award className="w-5 h-5" />}
                value={chef.stats[2].value}
                label={chef.stats[2].label}
              />
              <StatItem
                icon={<Users className="w-5 h-5" />}
                value={chef.stats[3].value}
                label={chef.stats[3].label}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Header, Quote, Info, Timeline, CTA */}
          <div className="lg:col-span-7 flex flex-col gap-10 order-1 lg:order-2">
            {/* Header Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-12 h-[1px] bg-red-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-900">
                  The Mastermind
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-2 leading-tight">
                {chef.name}
              </h2>
              <p className="text-lg text-red-600 font-medium tracking-wide">
                {chef.role}
              </p>
            </div>

            {/* Quote Section */}
            <div className="relative pl-6 border-l-4 border-red-100 bg-blue-50/30 py-6 pr-6 rounded-r-xl">
              <Quote className="absolute top-6 left-0 -translate-x-1.5 -translate-y-1.5 w-6 h-6 text-red-600 bg-white p-1 rounded-full shadow-sm" />
              <p className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed">
                {chef.quote}
              </p>
            </div>

            {/* Info Columns: Countries & Specialties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-4">
                  <Globe className="w-4 h-4 text-red-600" />
                  Global Experience
                </h4>
                <div className="flex flex-wrap gap-2">
                  {chef.countries.map((country, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-red-300 hover:text-red-600 transition-all shadow-sm"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-4">
                  <Star className="w-4 h-4 text-red-600" />
                  Mastery
                </h4>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-700 hover:bg-red-100 transition-all shadow-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-900 mb-8">
                <Briefcase className="w-4 h-4 text-red-600" />
                Professional Journey
              </h4>

              <div className="space-y-8 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-200" />

                {chef.highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-6 relative">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-white border-4 border-red-600 shadow-sm" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {item.year}
                        </span>
                        <h5 className="text-lg font-bold text-gray-900 leading-tight">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="group flex items-center gap-3 px-8 py-3 bg-blue-900 text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-200">
                View Full Curriculum
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
