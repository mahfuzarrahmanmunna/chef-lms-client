"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Clock,
  Globe,
  Award,
  ChevronRight,
  BookOpen,
  Star,
} from "lucide-react";

/*  1. UPDATED JSON DATA (6 COURSES)  */
const coursesData = [
  {
    id: 1,
    title: "Professional Chef Course",
    type: "Professional", // 3 Months
    duration: "3 Months",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800&auto=format&fit=crop",
    featured: true,
    internship: "Local & International",
    description:
      "Comprehensive training in classical and modern culinary techniques, kitchen management, and menu planning.",
    price: "$2,499",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Professional Seafood",
    type: "Professional", // 3 Months
    duration: "3 Months",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=800&auto=format&fit=crop",
    featured: true,
    internship: "Local & International",
    description:
      "Master the art of selecting, preparing, and cooking seafood from around the world. Includes sushi and shellfish mastery.",
    price: "$2,199",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Professional Catering Biryani",
    type: "Professional", // 3 Months
    duration: "3 Months",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
    featured: true,
    internship: "Local Only",
    description:
      "Specialized focus on large-scale catering, spice blends, and the regional variations of Biryani preparation.",
    price: "$1,899",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Thai and Chinese Cuisine",
    type: "Short", // 1 Month
    duration: "1 Month",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop",
    featured: false,
    internship: null,
    description:
      "An intensive introduction to the vibrant flavors of Thai and Chinese stir-fry techniques and noodle dishes.",
    price: "$599",
    rating: 4.7,
  },
  {
    id: 5,
    title: "Artisan Pizza Making",
    type: "Short", // 1 Month
    duration: "1 Month",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    featured: false,
    internship: null,
    description:
      "Learn dough fermentation, sauce recipes, and wood-fired baking techniques to create restaurant-quality pizza.",
    price: "$499",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Cake & Pastry Fundamentals",
    type: "Short", // 1 Month
    duration: "1 Month",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    featured: false,
    internship: null,
    description:
      "Master the basics of baking cakes, making pastries, and professional decoration techniques for desserts.",
    price: "$549",
    rating: 4.8,
  },
];

/*  SUB-COMPONENTS  */

// Removed 'React.FC<>' and ': string' type annotation
const CourseTypeBadge = ({ type }) => {
  const isPro = type === "Professional";
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
        isPro
          ? "bg-amber-100 text-amber-800 border-amber-200"
          : "bg-blue-50 text-blue-700 border-blue-100"
      }`}
    >
      {type} Course
    </span>
  );
};

// Removed 'React.FC<>' and ': "featured" | "grid"' type annotation
const CourseCard = ({ course, layout = "grid" }) => {
  const isFeaturedLayout = layout === "featured";

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isFeaturedLayout ? "h-full" : ""
      }`}
    >
      {/* Image Area */}
      <div
        className={`relative ${isFeaturedLayout ? "h-72" : "h-48"} overflow-hidden bg-gray-100`}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          <CourseTypeBadge type={course.type} />
          {course.featured && (
            <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              Featured
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-800">
            {course.rating}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            {course.level}
          </div>
        </div>

        <h3
          className={`font-serif font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors ${isFeaturedLayout ? "text-2xl" : "text-xl"}`}
        >
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Internship Highlight */}
        {course.internship && (
          <div className="mb-6 p-3 bg-green-50/50 border border-green-100 rounded-lg flex items-start gap-3">
            <div className="bg-green-100 p-1.5 rounded-md text-green-700">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-green-800 uppercase tracking-wide">
                Internship Opportunity
              </p>
              <p className="text-xs text-green-700">{course.internship}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase">
              Total Fee
            </span>
            <span className="text-lg font-bold text-gray-900">
              {course.price}
            </span>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-red-700 hover:text-red-800 uppercase tracking-wider transition-colors">
            View Details
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

/*  MAIN LMS COMPONENT  */
export default function FeaturedCourses() {
  // Removed <Course[]> generic type
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching
      setTimeout(() => {
        setCourses(coursesData);
        setLoading(false);
      }, 800);
    };
    fetchData();
  }, []);

  const featuredCourses = courses.filter((c) => c.featured);
  const shortCourses = courses.filter((c) => !c.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white p-2 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
              Chef<span className="text-[#ea393a]">LMS</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-600 uppercase tracking-wider">
            <a href="#" className="hover:text-[#ea393a] transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-[#ea393a]">
              Courses
            </a>
            <a href="#" className="hover:text-[#ea393a] transition-colors">
              Mentors
            </a>
            <a href="#" className="hover:text-[#ea393a] transition-colors">
              Certifications
            </a>
          </nav>
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase hover:bg-gray-800 transition-colors">
            Student Login
          </button>
        </div>
      </header>

      {/* Hero Title */}
      <section className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest mb-4">
            Learning Management System
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
            Master the Art of{" "}
            <span className="text-[#ea393a]">Professional Cooking</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our intensive 3-month professional programs with
            international internships, or fast-track your skills with our
            1-month specialty courses.
          </p>
        </div>
      </section>

      {/* 1. Featured Professional Courses (3 items) */}
      {featuredCourses.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-500" />
                  Featured Professional Programs
                </h2>
                <p className="text-gray-500 mt-2 ml-11">
                  Comprehensive 3-month courses with internship opportunities.
                </p>
              </div>
            </div>

            {/* Grid for 3 Professional Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} layout="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Short Courses (3 items) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-10 border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
              Short Courses
            </h2>
            <p className="text-gray-500 mt-2">
              Skill-specific 1-month training modules.
            </p>
          </div>

          {/* Grid for 3 Short Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shortCourses.map((course) => (
              <CourseCard key={course.id} course={course} layout="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Enroll today in our Professional Chef Course and secure your spot
            for the upcoming international internship batch.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-red-600 hover:bg-[#EA393A] text-white font-bold uppercase tracking-widest rounded-lg transition-colors">
              Enroll Now
            </button>
            <button className="px-8 py-3 border border-gray-600 hover:border-white text-white font-bold uppercase tracking-widest rounded-lg transition-colors">
              Download Syllabus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
