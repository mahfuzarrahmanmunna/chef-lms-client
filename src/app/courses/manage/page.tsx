"use client";
import { useState, useEffect } from "react";
import axios from "axios";
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

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Course | null>(null);

  const refreshCourses = async () => {
    const res = await axios.get("/api/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    const loadCourses = async () => {
      await refreshCourses();
    };
    loadCourses();
  }, []);

  const deleteCourse = async (id: string) => {
    await axios.delete(`/api/courses/${id}`);
    await refreshCourses();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Courses</h1>

      <CourseForm
        defaultValues={editing || {}}
        onSuccess={() => {
          setEditing(null);
          refreshCourses();
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${course.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => setEditing(course)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}