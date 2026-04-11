"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import CourseForm from "@/app/components/CourseForm";

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  photo?: string;
  courseId: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  duration: string;
  thumbnail?: string;
  reviews: Review[];
}

const levelColors: Record<string, string> = {
  beginner: "bg-green-50 text-green-700 border-green-100",
  intermediate: "bg-amber-50 text-amber-700 border-amber-100",
  advanced: "bg-red-50 text-red-600 border-red-100",
};

export default function ManageCoursesPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Protect route - redirect if not admin
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, authLoading, isAdmin, router]);

  const refreshCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  const handleFormSuccess = async () => {
    await refreshCourses();
    setEditingCourse(null);
    setShowAddForm(false);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`/api/courses/${id}`);
      await refreshCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mt-24">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Manage Courses
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {courses.length} course{courses.length !== 1 ? "s" : ""} published
            </p>
          </div>
          {!showAddForm && !editingCourse && (
            <button
              onClick={() => { setShowAddForm(true); setEditingCourse(null); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add course
            </button>
          )}
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-6">
            <CourseForm
              onSuccess={handleFormSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Edit Form */}
        {editingCourse && (
          <div className="mb-6">
            <CourseForm
              defaultValues={editingCourse}
              onSuccess={handleFormSuccess}
              onCancel={() => setEditingCourse(null)}
            />
          </div>
        )}

        {/* Courses Table */}
        {courses.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="#d1d5db" strokeWidth="1.4" />
                <path d="M7 7h6M7 10h6M7 13h4" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-400">No courses yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Add your first course
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Course
                  </th>
                  <th className="text-left px-4 py-3.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Level
                  </th>
                  <th className="text-left px-4 py-3.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Duration
                  </th>
                  <th className="text-left px-4 py-3.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Price
                  </th>
                  <th className="text-left px-4 py-3.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Reviews
                  </th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Course Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4.5A2.5 2.5 0 014.5 2h7A2.5 2.5 0 0114 4.5v7A2.5 2.5 0 0111.5 14h-7A2.5 2.5 0 012 11.5v-7z" stroke="#185FA5" strokeWidth="1.2" />
                              <path d="M5.5 8h5M5.5 5.5h5M5.5 10.5h3" stroke="#185FA5" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 leading-tight">
                            {course.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                            {course.description ?? "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-lg border ${
                          levelColors[course.level] ?? "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                      >
                        {course.level}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {course.duration}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ${course.price}
                      </span>
                    </td>

                    {/* Reviews */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M6 1l1.4 3h3.1l-2.5 1.8.9 3L6 7l-2.9 1.8.9-3L1.5 4H4.6L6 1z"
                            fill={course.reviews?.length ? "#f59e0b" : "#e5e7eb"}
                          />
                        </svg>
                        <span className="text-sm text-gray-500">
                          {course.reviews?.length || 0}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ">
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowAddForm(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          disabled={deletingId === course.id}
                          className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deletingId === course.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
