"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle } from "lucide-react";
import { FaUniversity } from "react-icons/fa";

/*  Types  */
interface Course {
  id: number;
  title: string;
  type: "Professional" | "Short Course";
  description: string;
  duration: string;
  image: string;
  region: string;
  city: string;
  price?: number;
  oldPrice?: number;
  currency: string;
  hasCertificate: boolean;
  priceLabel?: string;
}

/*  Card Component  */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Link href={`/course-details/${course.id}`} className="block group h-full">
      <div className="h-full flex flex-col border border-gray-200 hover:border-black transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Top Left Tag */}
          <div
            className={`absolute top-0 left-0 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest z-20 ${
              course.type === "Professional" ? "bg-black" : "bg-gray-600"
            }`}
          >
            {course.type === "Professional" ? "প্রফেশনাল" : "শর্ট কোর্স"}
          </div>

          {/* Certificate Badge (Top Right) */}
          {course.hasCertificate && (
            <div className="absolute top-0 right-0 bg-[#EA393A] text-white px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide z-20">
              <CheckCircle className="w-3 h-3" />
              <span>ফ্রি সার্টিফিকেট</span>
            </div>
          )}

          {/* Floating Duration Badge (Bottom Right) */}
          <div className="absolute bottom-0 right-0 bg-white border-t border-l border-gray-100 p-2 z-20">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 relative bg-white">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
            {course.description}
          </p>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 my-4"></div>

          {/* Footer: Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              {course.price ? (
                <>
                  {course.oldPrice && (
                    <span className="block text-[10px] text-gray-400 line-through font-bold">
                      {course.currency}
                      {course.oldPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="block text-2xl font-bold text-gray-900">
                    {course.currency}
                    {course.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                  {course.priceLabel}
                </span>
              )}
            </div>

            {/* Angel Shape Button */}
            <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white text-gray-900 group-hover:bg-[#EA393A] group-hover:border-red-700 group-hover:text-white transition-all duration-300 angel-shape">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/*  Main Component  */
export default function CourseCollections() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Ensure courses.json is placed in the 'public' folder
        const response = await fetch("/courses.json");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center min-h-[400px] bg-white">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section id="courses">
      <div className="container mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-1 h-8 bg-red-400"></div>
            <span className="text-red-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
              <FaUniversity className="w-4 h-4" />
              Course Collections
            </span>
          </div>
          <div className="flex justify-between ">
            <h2 className="text-2xl md:text-3xl -luxury font-bold text-gray-900 mb-3 leading-12">
              আপনার স্কিল এবং Culinary Arts <br className="md:flex hidden" />{" "}
              ক্যারিয়ারকে আরও সমৃদ্ধ করতে <br className="md:flex hidden" /> বেছে
              নিন আমাদের বিশেষায়িত কোর্সগুলো
            </h2>
            <p className="text-gray-600 text-end flex items-end font-light leading-relaxed text-lg">
              স্পেশালাইজড প্রোগ্রাম যা আপনার দক্ষতা বাড়াতে এবং{" "}
              <br className="md:flex hidden" /> Culinary Arts ক্যারিয়ারকে এগিয়ে
              নিতে ডিজাইন করা হয়েছে।
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 my-5" />

        {/* SINGLE SECTION: ALL COURSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
