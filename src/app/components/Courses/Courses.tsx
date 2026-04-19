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
    title: "প্রফেশনাল শেফ কোর্স",
    type: "Professional",
    description:
      "প্রফেশনাল কিচেনের basic and advanced techniques-এ দক্ষ হয়ে উঠুন। এই comprehensive 3-month journey আপনাকে একজন home cook থেকে সরাসরি workplace-ready professional হিসেবে তৈরি করবে।",
    duration: "৩ মাস",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    price: 40000,
    oldPrice: 45000,
    currency: "৳",
    hasCertificate: true,
  },
  {
    id: 2,
    title: "বেসিক শর্ট কোর্স",
    type: "Short Course",
    description:
      "যারা একদম শুরু থেকে শিখছেন (beginners) অথবা শখের বশে (hobbyists) প্রফেশনাল পরিবেশে রান্নার বেসিক শিখতে চান, তাদের জন্য এই কোর্সটি পারফেক্ট।",
    duration: "৩০ দিন",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop",
    region: "Local",
    city: "Dhaka",
    price: 3500,
    oldPrice: 5000,
    currency: "৳",
    hasCertificate: true,
  },
  {
    id: 3,
    title: "ইন্টারন্যাশনাল ও আরবিয়ান কিউজিন",
    type: "Professional",
    description:
      "বিশ্বের সব জনপ্রিয় স্বাদ নিয়ে কাজ করুন। Mediterranean classics থেকে শুরু করে Arabian food-এর সমৃদ্ধ ঐতিহ্য; শিখুন সেইসব রেসিপি এবং presentation styles যা বড় বড় high-end hotels-এর ডিমান্ড।",
    duration: "২ মাস",
    image:
      "https://images.unsplash.com/photo-1544025162-d76690b68f4d?q=80&w=1000&auto=format&fit=crop",
    region: "Middle East",
    city: "Dubai/Doha",
    currency: "৳",
    hasCertificate: true,
    priceLabel: "দাম জানতে যোগাযোগ করুন",
  },
  {
    id: 4,
    title: "প্রফেশনাল বারিস্তা কোর্স",
    type: "Professional",
    description:
      "কফি কালচারের আধুনিক দুনিয়ায় পা রাখুন। একজন certified barista হতে ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে শিখুন bean selection, milk texturing, এবং latte art।",
    duration: "১ মাস",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    currency: "৳",
    hasCertificate: true,
    priceLabel: "দাম জানতে যোগাযোগ করুন",
  },
  {
    id: 5,
    title: "ফাস্ট ফুড ও বেকিং মাস্টারি",
    type: "Professional",
    description:
      "মডার্ন ক্যাফেগুলোর Big 5 নিয়ে আমাদের এই স্পেশাল কোর্স: Pizza, Burgers, Pasta, Sandwiches, এবং সাথে থাকছে প্রফেশনাল Baking techniques।",
    duration: "২ মাস",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    region: "International",
    city: "Dhaka",
    currency: "৳",
    hasCertificate: true,
    priceLabel: "দাম জানতে যোগাযোগ করুন",
  },
  {
    id: 6,
    title: "কেটারিং ও বিরিয়ানি স্পেশালিস্ট",
    type: "Professional",
    description:
      "Bulk catering এবং অথেনটিক বিরিয়ানি তৈরির নিখুঁত কৌশল শিখুন। যারা নিজস্ব catering business শুরু করতে চান বা কমার্শিয়াল কিচেনে লিড দিতে চান, তাদের জন্য এটি আইডিয়াল কোর্স।",
    duration: "১.৫ মাস",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
    region: "Local",
    city: "Dhaka",
    currency: "৳",
    hasCertificate: true,
    priceLabel: "দাম জানতে যোগাযোগ করুন",
  },
  {
    id: 7,
    title: "বিদেশ ক্যারিয়ার ও ভাষা প্রশিক্ষণ",
    type: "Professional",
    description:
      "বিদেশে কাজ করার পরিকল্পনা আছে? আমরা প্রফেশনাল শেফ ট্রেনিংয়ের সাথে প্রয়োজনীয় ভাষা শিক্ষা একত্রিত করেছি যাতে আপনি আন্তর্জাতিক জব মার্কেটের জন্য সম্পূর্ণ প্রস্তুত থাকেন।",
    duration: "৩ মাস",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    region: "Global",
    city: "Dhaka",
    currency: "৳",
    hasCertificate: true,
    priceLabel: "দাম জানতে যোগাযোগ করুন",
  },
];

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
          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-3 h-3 text-red-700" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              {course.city}, {course.region}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl  font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
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
                  <span className="block text-2xl  font-bold text-gray-900">
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
      {/* <style jsx global>
        {styles}
      </style> */}

      <section id="courses" className="py-24 ">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* SECTION HEADER - Updated Bengali */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-red-700 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
             Course Collections
            </span>
            <h2 className="text-4xl md:text-5xl  font-bold text-gray-900 mb-6">
              Explore and Select Courses
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              স্পেশালাইজড প্রোগ্রাম যা আপনার দক্ষতা বাড়াতে এবং Culinary Arts ক্যারিয়ারকে এগিয়ে নিতে ডিজাইন করা হয়েছে।
            </p>
          </div>

          {/* SECTION 1: PROFESSIONAL COURSES */}
          {professionalCourses.length > 0 && (
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-2xl  font-bold text-gray-900">
                    Professional Programs
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    ক্যারিয়ার উন্নয়নের জন্য বিস্তৃত প্রশিক্ষণ।
                  </p>
                </div>
                <div className="hidden md:block w-12 h-1 bg-[#EA393A]"></div>
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
                  <h3 className="text-2xl  font-bold text-gray-900">
                    Short Courses
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    উৎসুকদের জন্য দ্রুত দক্ষতা অর্জন।
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