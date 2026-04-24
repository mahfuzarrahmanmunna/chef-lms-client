"use client";
import { useForm } from "react-hook-form";
import axios from "axios";

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  level: string;
  duration: string;
  thumbnail: string;
}

interface CourseFormProps {
  defaultValues?: Partial<CourseFormData & { id: string }>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CourseForm({ defaultValues = {}, onSuccess, onCancel }: CourseFormProps) {
  const { register, handleSubmit } = useForm<CourseFormData>({ defaultValues });

  const onSubmit = async (data: CourseFormData) => {
    if (defaultValues.id) {
      await axios.put(`/api/courses/${defaultValues.id}`, data);
    } else {
      await axios.post("/api/courses", data);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          {...register("description")}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Price"
          {...register("price")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Level"
          {...register("level")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Duration"
          {...register("duration")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="url"
          placeholder="Thumbnail URL"
          {...register("thumbnail")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save Course
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}