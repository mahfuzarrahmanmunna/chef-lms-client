"use client";

import React, { useEffect, useState } from "react";
import { Clock, Award, CheckCircle, ChevronRight, Sparkles } from "lucide-react";

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

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const isFlagship = course.tag === "Flagship";

  return (
    <div
      className={`group relative bg-white border flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isFlagship
          ? "border-red-200 hover:border-red-700"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      {/* Tag Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
            isFlagship
              ? "bg-red-700 text-white"
              : "bg-gray-900 text-white"
          }`}
        >
          {course.tag}
        </span>
      </div>

      {/* Image */}
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-5">

        {/* Title & Meta */}
        <div>
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              {course.duration}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-red-600" />
              {course.certification}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-gray-900 leading-snug mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {course.subHeadline}
          </p>
        </div>

      {/* Modules */}
<div>
  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
    Core Modules
  </p>
          <ul className="space-y-2">
            {course.modules.map((mod, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    {mod.title}:{" "}
                  </span>
                  <span className="text-sm text-gray-500">{mod.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      {/* Highlights */}
<div className={`p-4 border-l-4 ${isFlagship ? "border-red-700 bg-red-50" : "border-gray-300 bg-gray-50"}`}>
  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
    Our Specialties
  </p>
          <ul className="space-y-2">
            {course.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Sparkles className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="font-bold text-gray-800">{h.label}: </span>
                  <span className="text-gray-600">{h.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            {course.price ? (
              <>
             
<p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">
  Course Fee
</p>
                <p className="text-xl font-serif font-bold text-gray-900">
                  ৳{course.price.toLocaleString()}
                  {course.priceAlt && (
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      / ৳{course.priceAlt.toLocaleString()}
                    </span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-gray-500">
                Contact Us
              </p>
            )}
          </div>

          
      <a
  href={`/single-course-details/${course.id}`}
  className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest px-5 py-3 transition-colors ${
    isFlagship
      ? "bg-red-700 hover:bg-red-800 text-white"
      : "bg-gray-900 hover:bg-gray-700 text-white"
  }`}
>
  View Details
  <ChevronRight className="w-3.5 h-3.5" />
</a>
        </div>
      </div>
    </div>
  );
};

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/course.json")
      .then((res) => res.json())
      .then((data: Course[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <section className="mt-32 bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">

        {/* Section Header */}
        <div className="mb-12">
        {/* Section Header */}
<p className="text-[11px] p-4 font-bold uppercase tracking-widest text-red-700 mb-2">
  Our Courses
</p>

<h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
  Choose the right course <br className="hidden md:block" />
  based on your goals.
</h2>

<p className="text-sm text-gray-500 max-w-xl leading-relaxed">
  Each of our courses is designed with industry-standard curriculum — helping you grow from beginner to expert.
</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}