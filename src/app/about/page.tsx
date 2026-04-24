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
            A journey of culinary excellence and professional empowerment.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Collage */}
           

            {/* Right: Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                Our Mission
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                Our mission is to empower the youth of Bangladesh with world-class culinary education that directly helps secure a sustainable career for them. We are committed to bridging the gap between technical training and high-tier employment. Our curriculum is designed to give equal importance to advanced technical skills, soft skills, and linguistic fluency.

                Beyond the kitchen, our goal is to cultivate professional integrity and a global perspective in every student. This enables them to emerge as strong competitors not only in the local hospitality market but also for international luxury hotels and overseas culinary opportunities. By maintaining the quality of our 3 and 4-star hotel internship programs, we aim to become a platform from which chefs can lead and innovate in the global gastronomic landscape.
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
          </div>
        </div>
      </section>

      {/* IMPACT SECTION - Numbered Stats */}
      <section className="py-24 bg-gray-50">
        <div className="container px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-500">
              Three pillars that uphold the high standard of education at our academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Industry Partnership"
              description="We have direct partnerships with the country's leading 3 and 4-star hotels, ensuring guaranteed internship opportunities and real-world exposure for every student."
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="Specialized Expertise"
              description="From Master Barista techniques to International and Arabian cuisine, every curriculum of ours is designed keeping in mind the high-demand sectors of the modern food industry."
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="Global Career Mobility"
              description="Alongside kitchen training, we provide necessary language training for those aspiring to build careers abroad. This will help you establish a successful life and career in foreign markets and luxury hospitality."
            />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Philosophy
            </h2>
            <p className="text-gray-500">
              Three pillars that uphold the high standard of education at our academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Active Technical Mastery"
              description="We believe the kitchen is the best classroom. Our main focus is on Active Learning, where students continuously hone their skills through practice and direct hands-on mentorship. This makes every technical task become an ingrained habit for them."
            />
            <ValueCard
              icon={<BookOpen className="w-10 h-10" />}
              title="Commercial Logic & Ethics"
              description="A good chef must also be a skilled manager. We provide students with in-depth understanding of kitchen logistics, food safety, and professional ethics, preparing them to face the real challenges of a high-pressure commercial catering environment."
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="A Global Mindset"
              description="We see culinary arts as a universal language. Our philosophy is to prepare students for the global stage, where the pride of our traditional Bengali cuisine blends with international standards—essential for working in luxury hotels anywhere in the world."
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-8">
            <div>
              <span className="text-red-700 font-bold tracking-widest text-xs uppercase block mb-4">
                The Experience
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-900">
                Training Experience
              </h2>
            </div>
          </div>

          <div className="">
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              Training at BPSTI is an immersive experience that gives you a taste of a fully professional commercial kitchen. Whether you learn to perfect the Big 5 of fast food or master the art of making the perfect latte, our labs provide you with a high-pressure, high-reward environment. Here, you're not just learning to cook; under the guidance of industry masters, you're learning how to lead a team and prove yourself even in adverse conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-16">
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

      {/* MASTERMIND SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-xl mb-16">
            <ChefHat className="w-12 h-12 text-red-700 mb-6" />
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              The Vision Behind the Flavor
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              At BPSTI, we believe being a chef isn't just about learning recipes; it's about mastering discipline, timing, and the art of service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Technical Precision"
              description="From knife skills to temperature control, we instill in you every fundamental practice used in world-class kitchens."
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="Career Strategy"
              description="We don't just train students; we work as their career architects. By coordinating language training and hotel placements, we reduce the distance between the classroom and the industry."
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="Cultural Fusion"
              description="From Arabian delicacies to International Cuisine, we prepare our students to confidently lead in any kitchen around the world."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION - Updated */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 text-center">
          <ChefHat className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Take the first step towards your professional career.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light">
            Join our community to learn about deadlines for our upcoming courses and all the latest updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#EA393A] hover:bg-red-600 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-red-700">
              View Courses
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-white/30">
              Speak with Admissions Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}