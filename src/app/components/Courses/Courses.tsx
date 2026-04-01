"use client";

import React, { useEffect, useState } from "react";
import { Clock, MapPin, User } from "lucide-react";
import Image from "next/image";

/* ──────────────── Types ──────────────── */
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
  difficulty: string;
  ingredients: string[];
  chef: string;
}

/* ──────────────── Sub-Component: Course Card ──────────────── */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* LIVE Tag */}
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
          {course.tag}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {course.city}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {course.duration}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          {course.description}
        </p>

        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {course.priceLabel}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${course.price}{" "}
                <span className="text-sm font-normal text-gray-500">
                  /person
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 cursor-pointer bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold py-3 rounded-lg transition-colors duration-200">
              EXPLORE
            </button>
            <button className="flex-1 cursor-pointer border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-sm font-bold py-3 rounded-lg transition-colors duration-200">
              GIFT IT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────── Main Component ──────────────── */
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
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">
            Culinary Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Private Cooking Classes
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Join our expert chefs live from around the world. Master new skills
            in your own kitchen with intimate, interactive sessions.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
