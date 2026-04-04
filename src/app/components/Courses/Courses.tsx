"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // <--- Added Link import
import { Clock, MapPin, ArrowRight, Briefcase } from "lucide-react";
// Removed: import Image from "next/image";

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

/*  Minimal Card Component  */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const isProfessional = course.type === "Professional";

  return (
    // Link wraps the whole card for navigation
    <Link href={`/course-details/${course.id}`} className="block group h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          {/* CHANGED: Used standard <img> instead of Next.js <Image> */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Left Tag: Type */}
          <div
            className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm bg-opacity-90 ${isProfessional ? "bg-blue-900" : "bg-gray-800"}`}
          >
            {course.type}
          </div>

          {/* Bottom Right Tag: Duration */}
          <div className="absolute bottom-4 right-4 bg-white/95 text-gray-900 text-xs font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3" /> {course.duration}
          </div>
        </div>

        {/* Content Section - Minimal */}
        <div className="p-5 flex flex-col flex-1">
          {/* Location Row */}
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {course.city}, {course.region}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug group-hover:text-blue-900 transition-colors">
            {course.title}
          </h3>

          {/* Footer: Price & Action */}
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                {course.priceLabel}
              </p>
              <p className="text-xl font-bold text-gray-900">${course.price}</p>
            </div>

            {/* Changed from <button> to <div> to avoid nesting interactive elements inside <Link> */}
            <div className="bg-gray-900 group-hover:bg-red-600 text-white p-2.5 rounded-lg transition-colors duration-200 cursor-pointer">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Subtle indicator for placement (Optional) */}
          {isProfessional && (
            <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
              <p className="flex items-center gap-1.5 text-[10px] text-blue-600 font-semibold uppercase tracking-wide">
                <Briefcase className="w-3 h-3" />
                {course.features.placementSupport
                  ? "Placement Support Available"
                  : "Professional Certification"}
              </p>
            </div>
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

  // Filter data for the two sections
  const foreignProfessionalCourses = courses.filter(
    (course) => course.type === "Professional",
  );

  const shortCourses = courses.filter(
    (course) => course.type === "Short Course",
  );

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* SECTION 1: Featured Professional Courses (Foreign) */}
        {foreignProfessionalCourses.length > 0 && (
          <div className="mb-24">
            <div className="mb-10">
              <span className="text-red-600 font-bold tracking-widest text-[10px] uppercase mb-2 block">
                Career Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                International Culinary Careers
              </h2>
              <p className="text-gray-500 text-sm">
                3-Month Programs with Internship & Placement Support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foreignProfessionalCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Short Courses */}
        {shortCourses.length > 0 && (
          <div>
            <div className="mb-10">
              <span className="text-gray-400 font-bold tracking-widest text-[10px] uppercase mb-2 block">
                For Enthusiasts
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                Short Courses
              </h2>
              <p className="text-gray-500 text-sm">
                1-Month Skill Building Workshops.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
