"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { unstable_noStore as noStore } from "next/cache";
import {
  Trash2,
  Edit,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Interface updated to match API response (id instead of _id)
interface Course {
  id: string;
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
  createdAt?: string;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

// Shared Styles for Luxury Branding (Identical to Add Course)
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  . { font-family: 'Playfair Display', serif; }
  . { font-family: 'Manrope', sans-serif; }

  /* The Angel Shape */
  .angel-shape {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  }
`;

export default function ManageCoursesPage() {
  noStore();

  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  // --- FETCH COURSES ---
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      showToast("Failed to load courses.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) fetchCourses();
  }, [user, isAdmin]);

  // --- TOAST LOGIC ---
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    if (type === "success") {
      setTimeout(() => setToast(null), 3000);
    }
  };

  // --- DELETE COURSE ---
  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this course? This action cannot be undone.",
      )
    )
      return;

    setDeletingId(id);
    try {
      // The API expects the string ID
      await axios.delete(`/api/courses/${id}`);
      showToast("Course deleted successfully.", "success");
      setCourses((prev) => prev.filter((c) => c.id !== id)); // Filter by 'id'
    } catch (error: any) {
      console.error(error);
      showToast("Failed to delete course.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // --- REDIRECT TO EDIT ---
  const handleEdit = (id: string) => {
    router.push(`/dashboard/editcourses?id=${id}`);
  };

  if (authLoading || (!user && !authLoading)) {
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

      <div className="min-h-screen bg-[#faf9f6]  text-gray-900 p-4 md:p-8">
        {/* Header Section - Luxury Serif Font */}
        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl  font-bold text-gray-900 tracking-tight">
              Manage Courses
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
              View, edit, or remove available courses.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/addcourses")}
            className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-[#EA393A] transition-all shadow-md angel-shape flex items-center gap-2"
          >
            Add New
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="w-full h-64 flex items-center justify-center bg-white border border-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-none">
              <ImageIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-gray-900">
                No Courses Found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new course.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/dashboard/addcourses")}
                  className="text-sm font-bold uppercase tracking-widest text-red-700 hover:text-black transition-colors"
                >
                  Create Course
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                <div className="col-span-6 md:col-span-5">Course Details</div>
                <div className="hidden md:block md:col-span-2">Logistics</div>
                <div className="hidden md:block md:col-span-2">Price</div>
                <div className="col-span-6 md:col-span-3 text-right">
                  Actions
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <div
                    key={course.id} // FIXED: Changed from course._id to course.id
                    className="grid grid-cols-12 items-center py-5 px-6 hover:bg-[#faf9f6] transition-colors duration-200 group"
                  >
                    {/* 1. Image & Info */}
                    <div className="col-span-6 md:col-span-5 flex items-start gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 border border-gray-200 overflow-hidden rounded-sm">
                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/100x100?text=No+Img";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className=" text-lg font-bold text-gray-900 truncate">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border ${
                              course.type === "Professional"
                                ? "bg-white text-black border-black"
                                : "bg-gray-100 text-gray-600 border-gray-300"
                            }`}
                          >
                            {course.type}
                          </span>
                          {course.hasCertificate && (
                            <div
                              className="flex items-center gap-1 text-green-700"
                              title="Certificate Included"
                            >
                              <CheckCircle size={12} />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 truncate line-clamp-1">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* 2. Logistics (Hidden Mobile) */}
                    <div className="hidden md:block md:col-span-2 text-sm text-gray-600">
                      <p className="font-medium">{course.duration}</p>
                      <p className="text-xs text-gray-400 uppercase mt-0.5">
                        {course.city}, {course.region}
                      </p>
                    </div>

                    {/* 3. Price (Hidden Mobile) */}
                    <div className="hidden md:block md:col-span-2 text-sm">
                      <p className=" font-bold text-lg text-gray-900">
                        {course.currency} {course.price.toLocaleString()}
                      </p>
                      {course.oldPrice && course.oldPrice > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                          {course.currency} {course.oldPrice.toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* 4. Actions */}
                    <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3 pl-4 md:pl-0">
                      <button
                        onClick={() => handleEdit(course.id)} // FIXED: Changed from course._id
                        className="w-9 h-9 flex items-center justify-center rounded-sm border border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-white transition-all"
                        title="Edit Course"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)} // FIXED: Changed from course._id
                        disabled={deletingId === course.id}
                        className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#EA393A] text-white hover:bg-red-900 transition-all disabled:opacity-50 disabled:cursor-wait shadow-sm"
                        title="Delete Course"
                      >
                        {deletingId === course.id ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toast Notification - Minimalist (Same as Add Course) */}
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
