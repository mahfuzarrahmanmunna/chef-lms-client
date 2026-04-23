"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  photo?: string;
  courseId: string;
}

interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  price: number;
  level: string;
  duration: string;
  thumbnail?: string;
  reviews?: Review[];
}

interface CourseFormProps {
  defaultValues?: CourseFormData;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function CourseForm({
  defaultValues,
  onSuccess,
  onCancel,
}: CourseFormProps) {
  const [form, setForm] = useState({
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    price: defaultValues?.price || "",
    level: defaultValues?.level || "beginner",
    duration: defaultValues?.duration || "",
    thumbnail: defaultValues?.thumbnail || "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [thumbError, setThumbError] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    if (type === "success") setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "thumbnail") setThumbError(false);
  };

  const handleLevelSelect = (level: string) => {
    setForm({ ...form, level });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.level ||
      !form.duration
    ) {
      showToast("Please fill in all required fields.", "error");
      setLoading(false);
      return;
    }

    try {
      const courseData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        level: form.level,
        duration: form.duration,
        thumbnail: form.thumbnail || "",
        reviews: defaultValues?.reviews || [],
      };

      if (defaultValues?.id) {
        await axios.put(`/api/courses/${defaultValues.id}`, courseData);
        showToast("Course updated successfully!", "success");
      } else {
        await axios.post("/api/courses", courseData);
        showToast("Course added successfully!", "success");
        setForm({
          title: "",
          description: "",
          price: "",
          level: "beginner",
          duration: "",
          thumbnail: "",
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving course:", error);
      showToast(
        `Failed to ${defaultValues?.id ? "update" : "add"} course. Please try again.`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.5A2.5 2.5 0 014.5 2h7A2.5 2.5 0 0114 4.5v7A2.5 2.5 0 0111.5 14h-7A2.5 2.5 0 012 11.5v-7z"
              stroke="#185FA5"
              strokeWidth="1.2"
            />
            <path
              d="M5.5 8h5M5.5 5.5h5M5.5 10.5h3"
              stroke="#185FA5"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
            {defaultValues?.id ? "Edit course" : "Add new course"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {defaultValues?.id
              ? "Update the course details below"
              : "Fill in the details to publish a new course"}
          </p>
        </div>
      </div>

      {/* Body */}
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
                <Image
                  src={form.thumbnail}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                  onError={() => setThumbError(true)}
                  width={500}
                  height={500}
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
                : "bg-red-50 text-[#ea393a] border border-red-100"
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
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-all active:scale-[0.98]"
          >
            {loading
              ? "Saving..."
              : defaultValues?.id
              ? "Update course"
              : "Add course"}
          </button>
        </div>
      </form>
    </div>
  );
}
