"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Briefcase } from "lucide-react";

/*  Types  */
interface PlacementTrack {
  type: string;
  description: string;
}

interface CourseFeatures {
  internshipIncluded: boolean;
  placementSupport: boolean;
  placementTracks?: PlacementTrack[];
  note?: string;
}

interface Course {
  id: number;
  title: string;
  region: string;
  city: string;
  price: number;
  priceLabel: string;
  image: string;
  tag: string;
  description: string;
  duration: string;
  schedule: string;
  difficulty: string;
  type: "Professional" | "Short Course";
  coreTopics: string[];
  chef: string;
  features: CourseFeatures;
}

/*  Professional Sharp Card Component  */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const isProfessional = course.type === "Professional";

  return (
    <Link href={`/course-details/${course.id}`} className="block group h-full">
      <div className="h-full flex flex-col bg-white border border-gray-200 hover:border-red-700 transition-all duration-300 relative overflow-hidden">
        {/* Image Section - Full Width, Sharp Edges */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Top Left Tag: Square Design */}
          <div
            className={`absolute top-0 left-0 text-white text-[10px] font-bold px-3 py-2 uppercase tracking-widest z-10 ${
              isProfessional ? "bg-gray-900" : "bg-gray-600"
            }`}
          >
            {course.type}
          </div>

          {/* Bottom Right Badge: Duration (Floating Square) */}
          <div className="absolute bottom-0 right-0 bg-white border-t border-l border-gray-100 p-2 z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Content Section - Clean Structure */}
        <div className="p-6 flex flex-col flex-1 relative">
          {/* Location - Small Caps */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-3 h-3 text-red-700" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              {course.city}, {course.region}
            </span>
          </div>

          {/* Title - Serif Font */}
          <h3 className="text-xl  font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
            {course.title}
          </h3>

          {/* Description (Optional preview) - Small text */}
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Spacer to push footer down */}
          <div className="flex-1"></div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-100 my-4"></div>

          {/* Footer: Price & Arrow */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {course.priceLabel}
              </span>
              <span className="block text-2xl font-bold text-gray-900 ">
                ${course.price}
              </span>
            </div>

            {/* Sharp Square Button */}
            <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white text-gray-900 group-hover:bg-red-700 group-hover:border-red-700 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Placement Indicator - Bottom Accent */}
          {isProfessional && course.features.placementSupport && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-900 group-hover:bg-red-700 transition-colors duration-300"></div>
          )}
        </div>
      </div>
    </Link>
  );
};

/*  Main Component  */
export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const foreignProfessionalCourses = courses.filter(
    (course) => course.type === "Professional",
  );

  const shortCourses = courses.filter(
    (course) => course.type === "Short Course",
  );

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-bold">
        Error loading courses: {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* SECTION 1: Professional Courses */}
        {foreignProfessionalCourses.length > 0 && (
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 border-b border-gray-200 pb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-1 h-8 bg-red-700"></div>
                  <span className="text-red-700 font-bold tracking-[0.2em] text-xs uppercase">
                    Career Programs
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl  font-bold text-gray-900">
                  International Culinary Careers
                </h2>
              </div>
              <p className="text-gray-500 text-sm max-w-md mt-4 md:mt-0 font-light">
                Comprehensive 3-Month Programs including Internship & Placement
                Support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {foreignProfessionalCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Short Courses */}
        {shortCourses.length > 0 && (
          <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 border-b border-gray-200 pb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-1 h-8 bg-gray-400"></div>
                  <span className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase">
                    Skill Building
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl  font-bold text-gray-900">
                  Short Courses
                </h2>
              </div>
              <p className="text-gray-500 text-sm max-w-md mt-4 md:mt-0 font-light">
                Focused 1-Month Workshops for enthusiasts and hobbyists.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {shortCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
