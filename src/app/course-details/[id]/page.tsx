"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// Note: We keep the import for lucide-react icons
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
  DollarSign,
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
}

/*  Component  */
export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("/courses.json");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Course[] = await response.json();

        // Find the specific course by ID
        const foundCourse = data.find((c) => c.id === Number(params.id));
        setCourse(foundCourse || null);
      } catch (error) {
        console.error("Error loading course details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <button
          onClick={() => router.push("/courses")}
          className="text-red-600 hover:underline"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const isProfessional = course.type === "Professional";

  return (
    <div className="bg-gray-50 min-h-screen py-20 pb-20">
      

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isProfessional
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {course.type}
                </span>
                {isProfessional && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                    Career Track
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="font-medium">
                    {course.city}, {course.region}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-gray-400" />
                  <span>Master Chef {course.chef.split(" ")[1]}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              {/* CHANGED: Used standard <img> instead of Next.js <Image> to fix config error */}
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-gray-600">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                About this Course
              </h3>
              <p className="leading-relaxed text-lg">{course.description}</p>
              <p className="leading-relaxed mt-4">
                {isProfessional
                  ? "This comprehensive 3-month program is designed to take your culinary skills to a professional level. With a blend of theoretical knowledge and intensive practical sessions, you will be ready for the demands of a professional kitchen."
                  : "This intensive 1-month workshop is perfect for food enthusiasts who want to master specific techniques in a short period of time. Focus is on flavor, technique, and having fun in the kitchen."}
              </p>
            </div>

            {/* Curriculum / Core Topics */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-red-600" />
                What You Will Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.coreTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Info */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              {/* CHANGED: Used standard <img> instead of Next.js <Image> to fix config error */}
              <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden relative border-4 border-gray-700 flex-shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.chef)}&background=random&color=fff`}
                  alt={course.chef}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-1">{course.chef}</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Expert Chef Instructor
                </p>
                <p className="text-gray-300 text-sm max-w-md">
                  Learn directly from a master with years of experience in{" "}
                  {course.region} cuisine.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar / Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      {course.priceLabel}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 flex items-center gap-1">
                      <DollarSign className="w-6 h-6 text-gray-400" />
                      {course.price}
                    </p>
                  </div>
                  {isProfessional && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                      Certification
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Duration
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Schedule
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.schedule}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Difficulty
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.difficulty}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-red-200 mb-3">
                  {isProfessional ? "Apply for Admission" : "Book This Class"}
                </button>

                <button className="w-full bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-700 font-bold py-3 rounded-xl transition-colors">
                  Download Syllabus
                </button>
              </div>

              {/* Professional Features Box */}
              {isProfessional && (
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-blue-300" />
                    <h3 className="font-bold text-lg">Career Support</h3>
                  </div>

                  {course.features.internshipIncluded && (
                    <div className="mb-4 pb-4 border-b border-blue-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        <div>
                          <p className="font-bold text-sm">
                            Mandatory Internship
                          </p>
                          <p className="text-xs text-blue-200 mt-1">
                            Hands-on experience in a partnered kitchen to
                            complete your certification.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {course.features.placementSupport && (
                    <div>
                      <p className="text-xs font-bold uppercase text-blue-300 mb-3 tracking-wider">
                        Job Placement Tracks
                      </p>
                      <div className="space-y-3">
                        {course.features.placementTracks?.map((track, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-800/50 p-3 rounded-lg border border-blue-700/50"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {track.type.includes("Foreign") ? (
                                <Globe className="w-4 h-4 text-blue-300" />
                              ) : (
                                <MapPin className="w-4 h-4 text-blue-300" />
                              )}
                              <p className="font-bold text-sm">{track.type}</p>
                            </div>
                            <p className="text-xs text-blue-100 pl-6">
                              {track.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Short Course Note */}
              {!isProfessional && course.features.note && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                  <p className="text-sm text-yellow-800 font-medium text-center">
                    ⚠️ {course.features.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
