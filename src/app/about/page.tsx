"use client";

import React from "react";
import {
  Award,
  Users,
  Globe,
  BookOpen,
  ChefHat,
  ArrowRight,
  Target,
  Lightbulb,
  Leaf,
} from "lucide-react";

/*  Components  */

const StatItem: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="border-l border-gray-200 pl-8">
    <span className="block text-4xl font-serif font-bold text-gray-900">
      {value}
    </span>
    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
      {label}
    </span>
  </div>
);

const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="group p-8 border border-gray-200 hover:border-red-700 transition-colors duration-300 bg-white relative">
    <div className="mb-6 text-red-700">{icon}</div>
    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed font-light">
      {description}
    </p>

    {/* Sharp Corner Accent */}
    <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-red-700 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

/*  Main Page  */
export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop"
            alt="Chef creating a dish"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <span className="block text-red-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">
            Est. 1995
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] mb-8">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200">
            Defining the future of gastronomy through tradition, discipline, and
            relentless innovation.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                  alt="Plating"
                  className="w-full h-64 object-cover border border-gray-200"
                />
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop"
                  alt="Kitchen"
                  className="w-full h-64 object-cover border border-gray-200 translate-y-12"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-50 -z-10 border border-red-100"></div>
            </div>

            {/* Right: Text Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-red-700"></div>
                <span className="text-red-700 font-bold tracking-widest text-xs uppercase">
                  Our Mission
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                We Don&rdquo;t Just Teach Cooking.
                <br />
                We Teach <span className="italic text-red-700">Artistry.</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                Founded in 1995, our academy was born from a simple belief: that
                cooking is more than a skill—it is a language. From our humble
                beginnings as a small workshop to becoming a globally recognized
                institution, we have remained committed to one thing:
                excellence.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                Our curriculum is designed not just to follow recipes, but to
                understand the &rdquo;why&rdquo; behind every flavor. We bridge
                the gap between rustic tradition and modern science, empowering
                our students to become the leaders of tomorrow&lsquo;s culinary
                landscape.
              </p>

              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-900">
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-700" />
                  Award Winning
                </span>
                <span className="w-1 h-1 bg-gray-300"></span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-red-700" />
                  Global Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
            <StatItem value="28+" label="Years of Excellence" />
            <StatItem value="20,000+" label="Alumni Worldwide" />
            <StatItem value="45" label="Master Chefs" />
            <StatItem value="15" label="International Campuses" />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Philosophy
            </h2>
            <p className="text-gray-500">
              Three pillars that uphold the standard of education at our
              academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Precision"
              description="We believe that culinary mastery lies in the details. From knife skills to molecular gastronomy, accuracy is our religion."
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="Innovation"
              description="The kitchen is a laboratory. We encourage students to experiment, break rules, and discover new techniques that define future trends."
            />
            <ValueCard
              icon={<Leaf className="w-10 h-10" />}
              title="Sustainability"
              description="We teach responsible sourcing and waste management. Great food begins with respect for the planet and its produce."
            />
          </div>
        </div>
      </section>

      {/* CAMPUS TOUR SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
            <div>
              <span className="text-red-700 font-bold tracking-widest text-xs uppercase block mb-2">
                The Experience
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-900">
                World-Class Facilities
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700 hover:underline mt-4 md:mt-0">
              Take a Virtual Tour <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              {
                title: "Professional Kitchens",
                img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&q=80",
              },
              {
                title: "The Library",
                img: "https://images.unsplash.com/photo-1507842217158-e9f967d34756?w=600&q=80",
              },
              {
                title: "Tasting Room",
                img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
              },
              {
                title: "Pastry Lab",
                img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end">
                  <div className="p-4 w-full border-t border-white/20 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-serif font-bold text-lg block">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 text-center">
          <ChefHat className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Write Your Own Story?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light">
            Join a community of passionate creators. The next semester starts
            soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-red-700">
              Apply Now
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-white/30">
              Download Prospectus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
