"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { unstable_noStore as noStore } from "next/cache";
import { Image as ImageIcon } from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface CourseFormInputs {
  title: string;
  type: "Professional" | "Short Course";
  description: string;
  price: number;
  oldPrice?: number;
  currency: string;
  duration: string;
  region: string;
  city: string;
  image: string;
  hasCertificate: boolean;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

// Shared Styles for Luxury Branding
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  .font-serif { font-family: 'Playfair Display', serif; }
  .font-sans-luxury { font-family: 'Manrope', sans-serif; }

  /* The Angel Shape */
  .angel-shape {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  }
`;

export default function EditCoursePage() {
  noStore();

  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CourseFormInputs>();

  const [toast, setToast] = useState<Toast | null>(null);
  const [thumbError, setThumbError] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const watchedImage = watch("image");
  const watchedType = watch("type");

  // --- AUTH CHECK ---
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/signin");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, authLoading, isAdmin, router]);

  // --- FETCH COURSE DATA TO PRE-FILL FORM ---
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        router.push("/dashboard/managecourses");
        return;
      }
      try {
        // Note: Since a GET /api/courses/[id] wasn't provided in your snippet,
        // we fetch the full list and find the specific ID.
        const response = await axios.get("/api/courses");
        const course = response.data.find((c: any) => c.id === courseId);

        if (course) {
          reset(course);
        } else {
          showToast("Course not found", "error");
          router.push("/dashboard/managecourses");
        }
      } catch (error) {
        console.error("Failed to fetch course", error);
        showToast("Failed to load course data", "error");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user && isAdmin && courseId) {
      fetchCourseData();
    }
  }, [courseId, user, isAdmin, reset, router]);

  // --- TOAST LOGIC ---
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    if (type === "success") {
      setTimeout(() => setToast(null), 3000);
    }
  };

  // --- SUBMIT (UPDATE) LOGIC ---
  const onSubmit = async (data: CourseFormInputs) => {
    if (!courseId) return;

    setToast(null);
    try {
      await axios.put(`/api/courses/${courseId}`, data);
      showToast("Course updated successfully!", "success");
      setTimeout(() => {
        router.push("/dashboard/managecourses");
      }, 1500);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) showToast("Unauthorized.", "error");
      else if (error.response?.status === 403) showToast("Forbidden.", "error");
      else showToast("Failed to update course.", "error");
    }
  };

  // --- IMAGE PREVIEW HANDLER ---
  useEffect(() => {
    if (watchedImage) setThumbError(false);
  }, [watchedImage]);

  if (authLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <>
      <style jsx global>
        {globalStyles}
      </style>

      <div className="min-h-screen bg-[#faf9f6] font-sans-luxury text-gray-900 p-4 md:p-8">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Edit Course
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
              Update course details and pricing.
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Main Layout: 2/3 Content, 1/3 Sidebar */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN: Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Card 1: General Information */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm p-8 relative overflow-hidden">
              {/* Decorative Red Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#EA393A]"></div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                  General Information
                </h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Basic Details
                </p>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Course Title
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    placeholder="e.g. Advanced Pastry Arts"
                    className={`w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 transition-all ${errors.title ? "border-red-300" : ""}`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-700 mt-2 font-medium">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Type Selection - Pill Style */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Course Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Professional", "Short Course"].map((type) => (
                      <label
                        key={type}
                        className="cursor-pointer relative group"
                      >
                        <input
                          {...register("type")}
                          type="radio"
                          value={type}
                          className="peer sr-only"
                        />
                        <div
                          className={`text-center py-4 text-sm font-medium border border-gray-200 transition-all duration-300 ${
                            watchedType === type
                              ? "bg-[#EA393A] border-red-700 text-white"
                              : "bg-white text-gray-500 group-hover:border-red-200"
                          }`}
                        >
                          {type}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Course Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Provide a detailed overview of the curriculum..."
                    rows={6}
                    className={`w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 transition-all resize-none leading-relaxed ${errors.description ? "border-red-300" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Pricing & Logistics */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm p-8 relative overflow-hidden">
              {/* Decorative Black Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                  Pricing & Logistics
                </h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Fees & Location
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Currency */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Currency
                  </label>
                  <select
                    {...register("currency")}
                    className="w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all"
                  >
                    <option value="৳">BDT (৳)</option>
                    <option value="$">USD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Current Price
                  </label>
                  <input
                    {...register("price", { required: true, min: 0 })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all ${errors.price ? "border-red-300" : ""}`}
                  />
                </div>

                {/* Old Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Original Price (Optional)
                  </label>
                  <input
                    {...register("oldPrice")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Duration
                  </label>
                  <input
                    {...register("duration", { required: true })}
                    type="text"
                    placeholder="e.g. 3 Months"
                    className={`w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all ${errors.duration ? "border-red-300" : ""}`}
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Region
                  </label>
                  <select
                    {...register("region", { required: true })}
                    className="w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all"
                  >
                    <option value="Local">Local</option>
                    <option value="Global">Global</option>
                    <option value="International">International</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    City
                  </label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    placeholder="e.g. Dhaka"
                    className={`w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 focus:outline-none focus:border-red-700 transition-all ${errors.city ? "border-red-300" : ""}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar & Media */}
          <div className="space-y-8">
            {/* Card 3: Media Upload */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                  Course Cover
                </h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Visuals
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Image URL
                  </label>
                  <input
                    {...register("image")}
                    type="text"
                    placeholder="https://..."
                    className="w-full text-sm font-medium bg-[#faf9f6] border-b-2 border-gray-200 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 transition-all"
                  />
                </div>

                {/* Live Preview Box */}
                <div className="relative w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-300 overflow-hidden">
                  {watchedImage && !thumbError ? (
                    <img
                      src={watchedImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setThumbError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={32} className="opacity-30 mb-2" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Recommended size: 1200x800px. High-quality JPG or PNG.
                </p>
              </div>
            </div>

            {/* Card 4: Settings */}
            <div className="bg-[#1a1a1a] text-white p-8">
              <h2 className="text-2xl font-serif font-bold mb-1">Settings</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
                Options
              </p>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <p className="text-sm font-serif font-medium">
                    Free Certificate
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-sans">
                    Include certificate upon completion
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register("hasCertificate")}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA393A]"></div>
                </label>
              </div>
            </div>

            {/* Submit Action - Angel Shape Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full py-4 px-6 text-sm font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-[#EA393A] transition-all shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed angel-shape flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  Update Course
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toast Notification - Minimalist */}
        {toast && (
          <div
            className={`fixed bottom-8 right-8 px-8 py-4 shadow-2xl text-sm font-bold tracking-wide flex items-center gap-3 animate-bounce-in z-50 border-l-4 ${
              toast.type === "success"
                ? "bg-white text-green-800 border-green-600"
                : "bg-white text-red-800 border-red-600"
            }`}
          >
            {toast.type === "success" ? (
              <span className="text-green-600">✔</span>
            ) : (
              <span className="text-[#ea393a]">✖</span>
            )}
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}
