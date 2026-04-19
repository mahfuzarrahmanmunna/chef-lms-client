"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  photo?: string;
  courseId: string;
}

interface ReviewForm {
  studentName: string;
  courseId: string;
  rating: number;
  comment: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<ReviewForm>({
    studentName: "",
    courseId: "",
    rating: 1,
    comment: "",
  });

  const fetchReviews = async () => {
    const res = await axios.get("/api/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    const loadReviews = async () => {
      await fetchReviews();
    };
    loadReviews();
  }, []);

  const submit = async () => {
    await axios.post("/api/reviews", form);
    setForm({
      studentName: "",
      courseId: "",
      rating: 1,
      comment: "",
    });
    await fetchReviews();
  };

  const remove = async (id: string) => {
    await axios.delete(`/api/reviews/${id}`);
    await fetchReviews();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reviews</h1>

      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Student Name"
          value={form.studentName}
          onChange={(e) => setForm({ ...form, studentName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Course ID"
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="Comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-white rounded-lg shadow-md border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-bold text-lg">{review.studentName}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-sm text-gray-500">({review.rating}/5)</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">Course ID: {review.courseId}</p>
              </div>
              <button
                onClick={() => remove(review.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-[#EA393A] transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
