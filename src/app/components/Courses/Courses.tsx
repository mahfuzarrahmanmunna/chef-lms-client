"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Award, CheckCircle } from "lucide-react";
import CoursesSection from "../CoursesSection";


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

/*  Data: Updated with Bengali content  */
const coursesData: Course[] = [
  {
    id: 1,
    title: "Professional Chef Course",
    type: "Professional",
    description:
      "Master basic and advanced techniques in professional kitchens. This comprehensive 3-month journey will transform you from a home cook to a workplace-ready professional.",
    duration: "3 Months",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    price: 40000,
    oldPrice: 45000,
    currency: "$",
    hasCertificate: true,
  },
  {
    id: 2,
    title: "Basic Short Course",
    type: "Short Course",
    description:
      "Perfect for those just starting out (beginners) or hobbyists who want to learn cooking basics in a professional environment.",
    duration: "30 Days",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop",
    region: "Local",
    city: "Dhaka",
    price: 3500,
    oldPrice: 5000,
    currency: "$",
    hasCertificate: true,
  },
  {
    id: 3,
    title: "International & Arabian Cuisine",
    type: "Professional",
    description:
      "Work with the world's most popular flavors. From Mediterranean classics to the rich heritage of Arabian food; learn the recipes and presentation styles demanded by high-end hotels.",
    duration: "2 Months",
    image:
      "https://images.unsplash.com/photo-1544025162-d76690b68f4d?q=80&w=1000&auto=format&fit=crop",
    region: "Middle East",
    city: "Dubai/Doha",
    currency: "$",
    hasCertificate: true,
    priceLabel: "Contact for Price",
  },
  {
    id: 4,
    title: "Professional Barista Course",
    type: "Professional",
    description:
      "Step into the modern world of coffee culture. Learn bean selection, milk texturing, and latte art from industry experts to become a certified barista.",
    duration: "1 Month",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    currency: "$",
    hasCertificate: true,
    priceLabel: "Contact for Price",
  },
  {
    id: 5,
    title: "Fast Food & Baking Mastery",
    type: "Professional",
    description:
      "Our special course on the Big 5 of modern cafes: Pizza, Burgers, Pasta, Sandwiches, along with professional baking techniques.",
    duration: "2 Months",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    region: "International",
    city: "Dhaka",
    currency: "$",
    hasCertificate: true,
    priceLabel: "Contact for Price",
  },
  {
    id: 6,
    title: "Catering & Biryani Specialist",
    type: "Professional",
    description:
      "Learn the perfect techniques for bulk catering and authentic Biryani preparation. Ideal for those who want to start their own catering business or lead in commercial kitchens.",
    duration: "1.5 Months",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
    region: "Local",
    city: "Dhaka",
    currency: "$",
    hasCertificate: true,
    priceLabel: "Contact for Price",
  },
  {
    id: 7,
    title: "Overseas Career & Language Training",
    type: "Professional",
    description:
      "Planning to work abroad? We've combined professional chef training with essential language education so you're fully prepared for the international job market.",
    duration: "3 Months",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    currency: "$",
    hasCertificate: true,
    priceLabel: "Contact for Price",
  },
];

/*  Shared Styles  */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  .font-serif-luxury { font-family: 'Playfair Display', serif; }
  .font-sans-luxury { font-family: 'Manrope', sans-serif; }

  /* The Angel Shape (Cut Bottom-Right) */
  .angel-shape {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  }
`;

/*  Card Component  */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Link href={`/course-details/${course.id}`} className="block group h-full">
      <div className="h-full flex flex-col bg-white border border-gray-200 hover:border-black transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
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
            {course.type === "Professional" ? "Professional" : "Short Course"}
          </div>

          {/* Certificate Badge (Top Right) */}
          {course.hasCertificate && (
            <div className="absolute top-0 right-0 bg-red-700 text-white px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide z-20">
              <CheckCircle className="w-3 h-3" />
              <span>Free Certificate</span>
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
          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-3 h-3 text-red-700" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              {course.city}, {course.region}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif-luxury font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 font-sans-luxury font-light leading-relaxed mb-6 line-clamp-3">
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
                  <span className="block text-2xl font-serif-luxury font-bold text-gray-900">
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
            <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white text-gray-900 group-hover:bg-red-700 group-hover:border-red-700 group-hover:text-white transition-all duration-300 angel-shape">
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
    const timer = setTimeout(() => {
      setCourses(coursesData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const professionalCourses = courses.filter((c) => c.type === "Professional");
  const shortCourses = courses.filter((c) => c.type === "Short Course");

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center min-h-[400px] bg-white">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>
        {styles}
      </style>

      <section id="courses" className="-mt-32 bg-[#faf9f6] font-sans-luxury">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* SECTION HEADER - Updated Bengali */}
          <div className=" max-w-xl mb-10">
            <span className="text-red-700 p-2 font-bold tracking-[0.3em] text-xs uppercase mb-2 block">
             Course Collections
            </span>
            <h2 className="text-2xl md:text-3xl font-serif-luxury font-bold text-gray-900 mb-3 leading-12">
              Choose our specialized courses to enrich your skills and Culinary Arts career
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Specialized programs designed to enhance your skills and advance your Culinary Arts career.
            </p>
          </div>

          {/* SECTION 1: PROFESSIONAL COURSES */}
          {professionalCourses.length > 0 && (
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-gray-900">
                    Professional Programs
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Comprehensive training for career advancement.
                  </p>
                </div>
                <div className="hidden md:block w-12 h-1 bg-red-700"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {professionalCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: SHORT COURSES */}
          {shortCourses.length > 0 && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-gray-900">
                    Short Courses
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Quick skill acquisition for enthusiasts.
                  </p>
                </div>
                <div className="hidden md:block w-12 h-1 bg-gray-900"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shortCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
       <CoursesSection></CoursesSection>
      </section>
    </>
  );
}