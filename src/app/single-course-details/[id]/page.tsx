"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Award,
  CheckCircle,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Users,
  BookOpen,
  Phone,
  Calendar,
} from "lucide-react";

interface Module {
  title: string;
  description: string;
}

interface Highlight {
  label: string;
  description: string;
}

interface Course {
  id: number;
  title: string;
  titleBn: string;
  certification: string;
  duration: string;
  durationEn: string;
  type: string;
  price: number | null;
  priceAlt: number | null;
  headline: string;
  subHeadline: string;
  modules: Module[];
  highlights: Highlight[];
  tag: string;
  image: string;
}

export default function SingleCourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/course.json")
      .then((res) => res.json())
      .then((data: Course[]) => {
        const found = data.find((c) => c.id === Number(params.id));
        setCourse(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Course not found
        </h2>
        <button
          onClick={() => router.push("/")}
          className="text-red-700 hover:underline font-bold uppercase tracking-widest text-xs"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isFlagship = course.tag === "Flagship";
  const accentBorder = isFlagship ? "border-red-700" : "border-gray-900";
  const accentBg = isFlagship ? "bg-[#EA393A]" : "bg-gray-900";
  const accentText = isFlagship ? "text-red-700" : "text-gray-900";
  const accentLight = isFlagship ? "bg-red-50" : "bg-gray-50";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[380px] md:h-[480px] overflow-hidden bg-gray-900">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-24 pb-12">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-6 sm:left-10 lg:left-24 flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${accentBg} text-white`}
            >
              {course.tag}
            </span>
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30">
              {course.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3 max-w-3xl">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4" /> {course.certification}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Max 15 Students
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: Content */}
          <div className="lg:col-span-8 space-y-14">

            {/* Overview */}
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${accentText} mb-2`}>
                কোর্স পরিচিতি
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 leading-snug">
                {course.headline}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed">
                {course.subHeadline}
              </p>
            </div>

            {/* Modules */}
            <div>
              <div className={`border-l-4 ${accentBorder} pl-4 mb-6`}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  কারিকুলাম
                </p>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  মূল মডিউলসমূহ
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.modules.map((mod, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 border border-gray-100 hover:${accentBorder} transition-colors`}
                  >
                    <CheckCircle className={`w-5 h-5 ${accentText} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-0.5">
                        {mod.title}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <div className={`border-l-4 ${accentBorder} pl-4 mb-6`}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  কেন এই কোর্স?
                </p>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  আমাদের বিশেষত্ব
                </h3>
              </div>
              <div className="space-y-4">
                {course.highlights.map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-5 ${accentLight} border-l-4 ${accentBorder}`}
                  >
                    <Sparkles className={`w-5 h-5 ${accentText} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">
                        {h.label}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is this for */}
            <div className="bg-gray-50 border border-gray-200 p-8">
              <p className={`text-[11px] font-bold uppercase tracking-widest ${accentText} mb-2`}>
                লক্ষ্য শিক্ষার্থী
              </p>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                এই কোর্সটি কাদের জন্য?
              </h3>
              <ul className="space-y-3">
                {[
                  "যারা হোটেল বা রেস্তোরাঁয় প্রফেশনাল ক্যারিয়ার শুরু করতে চান",
                  "নতুন উদ্যোক্তা যারা নিজের ফুড বিজনেস শুরু করতে চান",
                  "যারা আন্তর্জাতিক মানের রান্নার দক্ষতা অর্জন করতে চান",
                  "শৌখিন রাঁধুনি যারা প্রফেশনাল লেভেলে উন্নীত হতে চান",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <ChevronRight className={`w-4 h-4 ${accentText} mt-0.5 flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">

              {/* Booking Card */}
              <div className="bg-white border border-gray-200 shadow-sm">
                {/* Price Header */}
                <div className={`p-6 border-b border-gray-100 ${accentLight}`}>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    কোর্স ফি
                  </p>
                  {course.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif font-bold text-gray-900">
                        ৳{course.price.toLocaleString()}
                      </span>
                      {course.priceAlt && (
                        <span className="text-sm text-gray-400">
                          / ৳{course.priceAlt.toLocaleString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg font-serif font-bold text-gray-900">
                      যোগাযোগ করুন
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        সময়কাল
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {course.duration} ({course.durationEn})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        সার্টিফিকেশন
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {course.certification}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        ক্লাস সাইজ
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        সর্বোচ্চ ১৫ জন
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        ধরন
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {course.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="p-6 pt-0 space-y-3">
                  <button
                    className={`w-full ${accentBg} hover:opacity-90 text-white font-bold py-4 uppercase tracking-widest text-xs transition-opacity`}
                  >
                    {isFlagship ? "এখনই আবেদন করুন" : "ক্লাস বুক করুন"}
                  </button>
                  <button className="w-full border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-gray-900 font-bold py-3 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    যোগাযোগ করুন
                  </button>
                </div>
              </div>

              {/* Quick Note */}
              <div className={`p-5 border-l-4 ${accentBorder} bg-white border border-gray-100`}>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  দ্রষ্টব্য
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isFlagship
                    ? "আসন সংখ্যা সীমিত। দ্রুত আবেদন করুন এবং আপনার স্বপ্নের ক্যারিয়ার শুরু করুন।"
                    : "এই কোর্সটি rolling basis-এ চলে। যেকোনো সময় যোগ দিতে পারবেন।"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}