"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { unstable_noStore as noStore } from "next/cache";

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

export default function AddCoursePage() {
  noStore();

  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CourseFormInputs>({
    defaultValues: {
      title: "",
      type: "Short Course",
      description: "",
      price: 0,
      oldPrice: 0,
      currency: "৳",
      duration: "",
      region: "Local",
      city: "",
      image: "",
      hasCertificate: false,
    },
  });

  const [toast, setToast] = useState<Toast | null>(null);
  const [thumbError, setThumbError] = useState<boolean>(false);

  const watchedImage = watch("image");
  const watchedType = watch("type");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, authLoading, isAdmin, router]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    if (type === "success") {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const onSubmit = async (data: CourseFormInputs) => {
    setToast(null);
    try {
      await axios.post("/api/courses", data);
      showToast("Course added successfully!", "success");
      reset();
      setTimeout(() => {
        router.push("/dashboard/managecourses");
      }, 2000);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) showToast("Unauthorized.", "error");
      else if (error.response?.status === 403) showToast("Forbidden.", "error");
      else showToast("Failed to add course.", "error");
    }
  };

  useEffect(() => {
    if (watchedImage) setThumbError(false);
  }, [watchedImage]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new learning module for students.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Main Layout: 2/3 Content, 1/3 Sidebar */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: General Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                General Information
              </h2>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Course Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="e.g. Advanced Pastry Arts"
                  className={`w-full text-sm border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${errors.title ? "border-red-300 ring-red-100" : "border-gray-200"}`}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Type Selection - Pill Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Course Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Professional", "Short Course"].map((type) => (
                    <label key={type} className="cursor-pointer relative">
                      <input
                        {...register("type")}
                        type="radio"
                        value={type}
                        className="peer sr-only"
                      />
                      <div
                        className={`text-center py-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                          watchedType === type
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
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
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Course Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Provide a detailed overview of the curriculum..."
                  rows={6}
                  className={`w-full text-sm border rounded-lg px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-none leading-relaxed ${errors.description ? "border-red-300 ring-red-100" : "border-gray-200"}`}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Pricing & Location */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Pricing & Logistics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Currency */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Currency
                </label>
                <select
                  {...register("currency")}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-600 transition-all"
                >
                  <option value="৳">BDT (৳)</option>
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Current Price
                </label>
                <input
                  {...register("price", { required: true, min: 0 })}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full text-sm border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${errors.price ? "border-red-300" : "border-gray-200"}`}
                />
              </div>

              {/* Old Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Original Price (Optional)
                </label>
                <input
                  {...register("oldPrice")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-600 transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Duration
                </label>
                <input
                  {...register("duration", { required: true })}
                  type="text"
                  placeholder="e.g. 3 Months"
                  className={`w-full text-sm border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${errors.duration ? "border-red-300" : "border-gray-200"}`}
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Region
                </label>
                <select
                  {...register("region", { required: true })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-600 transition-all"
                >
                  <option value="Local">Local</option>
                  <option value="Global">Global</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  placeholder="e.g. Dhaka"
                  className={`w-full text-sm border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${errors.city ? "border-red-300" : "border-gray-200"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar & Media */}
        <div className="space-y-6">
          {/* Card 3: Media Upload */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
              <div className="w-1 h-4 bg-green-600 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Course Cover
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Image URL
                </label>
                <input
                  {...register("image")}
                  type="text"
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-all"
                />
              </div>

              {/* Live Preview Box */}
              <div className="relative w-full aspect-video rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden group">
                {watchedImage && !thumbError ? (
                  <img
                    src={watchedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setThumbError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-8 h-8 mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Recommended size: 1200x800px. JPG or PNG.
              </p>
            </div>
          </div>

          {/* Card 4: Settings */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
              <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Free Certificate
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Include certificate upon completion
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("hasCertificate")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Processing...
              </>
            ) : (
              "Publish Course"
            )}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 animate-bounce-in z-50 ${
            toast.type === "success"
              ? "bg-white text-green-600 border-l-4 border-green-500"
              : "bg-white text-red-600 border-l-4 border-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <div className="bg-green-100 p-1 rounded-full">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="bg-red-100 p-1 rounded-full">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}
