"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  MapPin,
  ChefHat,
  CheckCircle,
  ArrowLeft,
  Globe,
  Briefcase,
  Users,
  Calendar,
  Award,
  Download,
  Star,
  Quote,
  BookOpen,
  Monitor,
} from "lucide-react";

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
  specialty?: string; // <--- ADDED THIS TO FIX ERROR
}

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

/*  Sub-Components  */

// Breadcrumb
const Breadcrumbs: React.FC = () => (
  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
    <button
      onClick={() => window.history.back()}
      className="hover:text-[#ea393a] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
    <span>/</span>
    <span className="hover:text-[#ea393a] cursor-pointer">Courses</span>
    <span>/</span>
    <span className="text-gray-900">Details</span>
  </div>
);

// Review Card
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="border border-gray-200 p-8 hover:border-red-700 transition-colors duration-300 bg-white">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 object-cover border border-gray-200"
        />
        <div>
          <h4 className=" font-bold text-gray-900 text-lg">
            {review.name}
          </h4>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
            {review.role} • {review.date}
          </p>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 fill-current ${
                  i < review.rating ? "text-yellow-500" : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative pl-4 border-l-2 border-gray-100">
        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-200" />
        <p className="text-gray-600 leading-relaxed italic">
          "{review.comment}"
        </p>
      </div>
    </div>
  );
};

// Similar Course Mini Card
const SimilarCourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <a
      href={`/course-details/${course.id}`}
      className="group block h-full border border-gray-200 hover:border-red-700 transition-all duration-300"
    >
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 right-0 bg-white p-2 border-t border-l border-gray-200">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {course.duration}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className=" font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
          {course.title}
        </h4>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{course.city}</span>
          <span className="font-bold text-gray-900">${course.price}</span>
        </div>
      </div>
    </a>
  );
};

/*  Main Component  */
export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Courses
        const courseRes = await fetch("/courses.json");
        if (!courseRes.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await courseRes.json();

        setAllCourses(data);
        const foundCourse = data.find((c) => c.id === Number(params.id));
        setCourse(foundCourse || null);

        // Mock Reviews Data (In a real app, fetch from API)
        setReviews([
          {
            id: 1,
            name: "Elena Rodriguez",
            role: "Executive Chef",
            rating: 5,
            date: "Oct 2023",
            comment:
              "The techniques I learned here completely transformed my approach to French pastry. The instructors are incredibly knowledgeable and the facilities are world-class.",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          },
          {
            id: 2,
            name: "James Chen",
            role: "Sous Chef",
            rating: 5,
            date: "Sep 2023",
            comment:
              "A rigorous but rewarding program. The internship placement was the highlight, giving me real-world experience in a Michelin-star kitchen.",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          },
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white flex-col gap-4">
        <h2 className="text-2xl  font-bold text-gray-900">
          Course not found
        </h2>
        <button
          onClick={() => router.push("/courses")}
          className="text-[#ea393a] hover:underline font-bold uppercase tracking-widest text-xs"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const isProfessional = course.type === "Professional";
  const similarCourses = allCourses
    .filter((c) => c.id !== course.id && c.type === course.type)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-6 pt-12">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* LEFT COLUMN: Content (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Header Section */}
            <div className="border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest">
                  {course.type}
                </span>
                {isProfessional && (
                  <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest border border-red-100">
                    Career Track
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl  font-bold text-gray-900 mb-6 leading-[1.1]">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ea393a]" />
                  {course.city}, {course.region}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ea393a]" />
                  Max 12 Students
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#ea393a]" />
                  English / Spanish
                </div>
              </div>
            </div>

            {/* Hero Image - Full Width */}
            <div className="w-full aspect-video bg-gray-100 relative overflow-hidden border border-gray-200">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl  font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                Overview
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                {course.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light mt-4">
                {isProfessional
                  ? "This program is designed for aspiring professionals. It combines intensive kitchen practice with theoretical management skills, ensuring you are ready for the demands of high-end hospitality."
                  : "A focused workshop designed for enthusiasts. Dive deep into specific techniques, master flavor profiles, and enjoy the art of cooking without the pressure of a career curriculum."}
              </p>
            </div>

            {/* Curriculum */}
            <div>
              <h3 className="text-2xl  font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                Curriculum Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.coreTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border border-gray-100 hover:border-red-200 transition-colors"
                  >
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-red-700" />
                    </div>
                    <span className="font-medium text-gray-800">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {isProfessional && (
              <div className="bg-gray-900 text-white p-6 border-l-4 border-red-600">
                <h3 className=" font-bold text-lg mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-red-500" />
                  Career Guarantee
                </h3>

                {course.features.internshipIncluded && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-bold">
                        3-Month Internship
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 pl-6">
                      Mandatory placement in partner hotels.
                    </p>
                  </div>
                )}

                {course.features.placementSupport && (
                  <div className="">
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-wider">
                      Job Tracks
                    </p>
                    <ul className="space-y-2">
                      {course.features.placementTracks?.map((track, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-300 border-l border-gray-700 pl-3"
                        >
                          {track.type}:{" "}
                          <span className="text-white">
                            {track.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <img src="" alt="" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chef Instructor */}
            <div className="bg-gray-50 border border-gray-200 p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.chef)}&background=random&color=fff`}
                  alt={course.chef}
                  className="w-24 h-24 object-cover border-2 border-white shadow-sm"
                />
                <div className="text-center md:text-left">
                  <p className="text-red-700 text-xs font-bold uppercase tracking-widest mb-2">
                    Your Instructor
                  </p>
                  <h4 className="text-2xl  font-bold text-gray-900">
                    {course.chef}
                  </h4>
                  <p className="text-gray-500 mb-4 text-sm">
                    Master Chef • 15 Years Experience
                  </p>
                  <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                    Chef {course.chef.split(" ")[1]} brings a wealth of
                    knowledge from the top restaurants in {course.region}.
                    Specializing in {course.specialty || "modern cuisine"}, they
                    are dedicated to mentoring the next generation.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h3 className="text-2xl  font-bold text-gray-900">
                  Student Reviews
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-900 font-bold text-lg ml-2">
                    4.9
                  </span>
                  <span className="text-gray-400 text-sm">(42 Reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Total Cost
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl  font-bold text-gray-900">
                      ${course.price}
                    </span>
                    <span className="text-sm text-gray-500">/ course</span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Duration
                      </p>
                      <p className="font-medium text-gray-900">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Schedule
                      </p>
                      <p className="font-medium text-gray-900">
                        {course.schedule}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Class Size
                      </p>
                      <p className="font-medium text-gray-900">
                        12 Students Max
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Level
                      </p>
                      <p className="font-medium text-gray-900">
                        {course.difficulty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <button className="w-full bg-[#EA393A] hover:bg-red-800 text-white font-bold py-4 uppercase tracking-widest text-xs transition-colors">
                    {isProfessional ? "Apply Now" : "Book Class"}
                  </button>

                  <button className="w-full border border-gray-200 hover:border-gray-900 hover:text-gray-900 text-gray-600 font-bold py-3 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Syllabus
                  </button>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gray-50 border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this course?
                </p>
                <button className="text-xs font-bold uppercase tracking-widest text-red-700 hover:underline">
                  Contact Admissions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Courses Section */}
        {similarCourses.length > 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <h2 className="text-3xl  font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarCourses.map((c) => (
                <SimilarCourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
