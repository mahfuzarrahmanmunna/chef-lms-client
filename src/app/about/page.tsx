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
            আমাদের গল্প
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200">
            Culinary শ্রেষ্ঠত্ব এবং পেশাদার ক্ষমতায়নের এক যাত্রা।
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Collage */}
           

         
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                আমাদের মিশন
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                আমাদের মিশন হলো বিশ্বমানের culinary education প্রদানের মাধ্যমে বাংলাদেশের তরুণ প্রজন্মকে দক্ষ করে তোলা, যা সরাসরি তাদের একটি sustainable career নিশ্চিত করতে সাহায্য করবে। আমরা কারিগরি প্রশিক্ষণ এবং high-tier employment-এর মধ্যকার দূরত্ব ঘুচাতে প্রতিশ্রুতিবদ্ধ। আমাদের curriculum এমনভাবে তৈরি করা হয়েছে যেখানে উন্নত technical skill-এর পাশাপাশি soft skills এবং linguistic fluency বা ভাষাগত দক্ষতার ওপর সমান গুরুত্ব দেওয়া হয়।

                কিচেনের গণ্ডি ছাড়িয়ে প্রতিটি শিক্ষার্থীর মধ্যে পেশাদার সততা এবং একটি global perspective তৈরি করাই আমাদের লক্ষ্য। এতে তারা শুধু স্থানীয় hospitality market-এই নয়, বরং আন্তর্জাতিক luxury hotels এবং overseas culinary opportunities-এর জন্য অত্যন্ত শক্তিশালী প্রতিযোগী হিসেবে গড়ে উঠবে। আমাদের 3 and 4-star hotel internship programs-এর মান বজায় রাখার মাধ্যমে আমরা এমন এক প্ল্যাটফর্ম হতে চাই, যেখান থেকে শেফরা গ্লোবাল gastronomic landscape-এ নেতৃত্ব দিতে এবং নতুনত্ব আনতে সক্ষম হবে।
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
   {/* Right: Text Content */}
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
          <div className=" mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              আমাদের প্রভাব
            </h2>
            <p className="text-gray-500">
              তিনটি স্তম্ভ যা আমাদের একাডেমির শিক্ষার মানকে উচ্চতায় ধরে রাখে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="ইন্ডাস্ট্রি পার্টনারশিপ"
              description="দেশের শীর্ষস্থানীয় 3 and 4-star hotels-এর সাথে আমাদের সরাসরি partnerships রয়েছে, যা আমাদের প্রতিটি স্টুডেন্টের জন্য নিশ্চিত internship opportunities এবং real-world exposure নিশ্চিত করে।"
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="স্পেশালাইজড এক্সপার্টাইজ"
              description="Master Barista techniques থেকে শুরু করে International and Arabian cuisine; আমাদের প্রতিটি curriculum আধুনিক ফুড ইন্ডাস্ট্রির high-demand sectors-গুলোর কথা মাথায় রেখেই ডিজাইন করা হয়েছে।"
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="গ্লোবাল ক্যারিয়ার মোবিলিটি"
              description="কিচেন ট্রেনিংয়ের পাশাপাশি, যারা বিদেশে ক্যারিয়ার গড়তে চান আমরা তাদের জন্য প্রয়োজনীয় language training প্রদান করি। এটি আপনাকে foreign markets এবং luxury hospitality-তে একটি সফল জীবন ও ক্যারিয়ার গড়তে সাহায্য করবে।"
            />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              আমাদের ফিলোসফি
            </h2>
            <p className="text-gray-500">
              তিনটি স্তম্ভ যা আমাদের একাডেমির শিক্ষার মানকে উচ্চতায় ধরে রাখে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Active Technical Mastery"
              description="আমরা বিশ্বাস করি কিচেনই হলো শ্রেষ্ঠ শ্রেণিকক্ষ। আমাদের মূল ফোকাস হলো Active Learning-এর ওপর, যেখানে শিক্ষার্থীরা ক্রমাগত প্র্যাকটিস এবং সরাসরি hands-on mentorship-এর মাধ্যমে তাদের দক্ষতা ঝালাই করে। এতে করে প্রতিটি টেকনিক্যাল কাজ তাদের সহজাত অভ্যাসে পরিণত হয়।"
            />
            <ValueCard
              icon={<BookOpen className="w-10 h-10" />}
              title="Commercial Logic & Ethics"
              description="একজন ভালো শেফকে অবশ্যই একজন দক্ষ ম্যানেজার হতে হয়। আমরা শিক্ষার্থীদের kitchen logistics, food safety, এবং পেশাদার নৈতিকতা সম্পর্কে গভীর ধারণা প্রদান করি, যা তাদের উচ্চ-চাপযুক্ত commercial catering environment-এর বাস্তব চ্যালেঞ্জগুলো মোকাবিলা করতে প্রস্তুত করে।"
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="A Global Mindset"
              description="আমরা culinary arts-কে একটি বিশ্বজনীন ভাষা হিসেবে দেখি। আমাদের দর্শন হলো শিক্ষার্থীদের বিশ্বমঞ্চের জন্য প্রস্তুত করা, যেখানে আমাদের ঐতিহ্যবাহী বাঙালি রান্নার গর্বের সাথে মিশে থাকবে আন্তর্জাতিক মান; যা বিশ্বের যেকোনো প্রান্তের luxury hotels-এ কাজের জন্য অপরিহার্য।"
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
                প্রশিক্ষণের অভিজ্ঞতা
              </h2>
            </div>
          </div>

          <div className="">
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              BPSTI-এর ট্রেনিং মানেই একটি immersive experience, যা আপনাকে একদম প্রফেশনাল commercial kitchen-এর স্বাদ দেবে। আপনি ফাস্ট ফুডের Big 5 নিখুঁত করা শিখুন কিংবা পারফেক্ট latte তৈরির কৌশল; আমাদের ল্যাবগুলো আপনাকে একটি high-pressure, high-reward environment প্রদান করবে। এখানে আপনি শুধু রান্না শিখছেন না; বরং ইন্ডাস্ট্রি মাস্টারদের নির্দেশনায় আপনি শিখছেন কীভাবে একটি টিমকে lead করতে হয় এবং প্রতিকূল পরিবেশেও নিজেকে সেরা প্রমাণ করতে হয়।
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
            <ChefHat className="w-12 h-12 text-red-700  mb-6" />
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              The Vision Behind the Flavor
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              BPSTI-তে আমরা বিশ্বাস করি, একজন শেফ হওয়া মানে শুধু রেসিপি শেখা নয়; এটি হলো discipline, timing, এবং art of service-এ পারদর্শী হয়ে ওঠা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" />}
              title="Technical Precision"
              description="Knife skills থেকে শুরু করে temperature control; আমরা বিশ্বমানের কিচেনগুলোতে ব্যবহৃত প্রতিটি মৌলিক অভ্যাস আপনার মাঝে গড়ে তুলি।"
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="Career Strategy"
              description="আমরা শুধু শিক্ষার্থীদের প্রশিক্ষণ দেই না, আমরা তাদের ক্যারিয়ারের রূপকার বা career architect হিসেবে কাজ করি। Language training এবং hotel placements-এর সমন্বয় ঘটিয়ে আমরা ক্লাসরুম এবং ইন্ডাস্ট্রির মধ্যকার দূরত্ব কমিয়ে আনি।"
            />
            <ValueCard
              icon={<Globe className="w-10 h-10" />}
              title="Cultural Fusion"
              description="Arabian delicacies থেকে শুরু করে International Cuisine; সবকিছু শেখানোর মাধ্যমে আমরা আমাদের স্টুডেন্টদের এমনভাবে প্রস্তুত করি যাতে তারা বিশ্বের যেকোনো কিচেনে আত্মবিশ্বাসের সাথে নেতৃত্ব দিতে পারে।"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION - Updated */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 text-center">
          <ChefHat className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            আপনার প্রফেশনাল ক্যারিয়ারের পথে প্রথম কদমটি বাড়ান।
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light">
            আমাদের কমিউনিটিতে যুক্ত হয়ে জেনে নিন আমাদের আগামী কোর্সগুলোর deadlines এবং সব লেটেস্ট আপডেট।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#EA393A] hover:bg-red-600 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-red-700">
              কোর্সগুলো দেখুন
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-12 uppercase tracking-widest text-xs transition-colors border border-white/30">
              অ্যাডমিশন টিমের সাথে কথা বলুন
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}