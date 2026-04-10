// app/courses/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface CourseForm {
  title: string;
  description: string;
  price: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  thumbnail: string;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

export default function AddCoursePage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  
  const [form, setForm] = useState<CourseForm>({
    title: "",
    description: "",
    price: "",
    level: "beginner",
    duration: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [thumbError, setThumbError] = useState<boolean>(false);

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

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    if (type === "success") {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "thumbnail") setThumbError(false);
  };

  const handleLevelSelect = (level: "beginner" | "intermediate" | "advanced") => {
    setForm({ ...form, level });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    if (!form.title || !form.description || !form.price || !form.level || !form.duration) {
      showToast("Please fill in all required fields.", "error");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/courses", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        level: form.level,
        duration: form.duration,
        thumbnail: form.thumbnail,
        reviews: [],
      });

      showToast("Course added successfully!", "success");
      setForm({
        title: "",
        description: "",
        price: "",
        level: "beginner",
        duration: "",
        thumbnail: "",
      });
      setThumbError(false);
      
      // Redirect to courses page after 2 seconds
      setTimeout(() => {
        router.push('/courses');
      }, 2000);
      
    } catch (error: any) {
      console.error("Error adding course:", error);
      
      if (error.response?.status === 401) {
        showToast("Please login to add courses.", "error");
        setTimeout(() => router.push('/login'), 2000);
      } else if (error.response?.status === 403) {
        showToast("You don't have permission to add courses.", "error");
        setTimeout(() => router.push('/'), 2000);
      } else {
        showToast("Failed to add course. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const levels: Array<"beginner" | "intermediate" | "advanced"> = ["beginner", "intermediate", "advanced"];

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-10 mt-24"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="w-full max-w-xl">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Add new course
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details below to publish a new course.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  Course title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Complete React Developer Course"
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what students will learn from this course..."
                  rows={4}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Price <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl pl-7 pr-3.5 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    Duration <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 10 hours"
                    className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Level Pills */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  Level <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleLevelSelect(lvl)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${
                        form.level === lvl
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500"
                      }`}
                    >
                      {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  Thumbnail URL{" "}
                  <span className="normal-case font-normal tracking-normal text-gray-300">
                    — optional
                  </span>
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
                {form.thumbnail && !thumbError && (
                  <div className="mt-1 rounded-xl overflow-hidden border border-gray-100 h-28 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={() => setThumbError(true)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Toast */}
            {toast && (
              <div
                className={`mx-6 mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                  toast.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
              >
                {toast.type === "success" ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="#15803d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#dc2626" strokeWidth="1.2" />
                    <path
                      d="M7 4.5v3M7 9.5v.5"
                      stroke="#dc2626"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {toast.message}
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-all active:scale-[0.98]"
              >
                {loading ? "Adding course..." : "Add course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}