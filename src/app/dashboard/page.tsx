"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardCard } from "@/app/components/dashboard/DashboardCard";

interface DashboardData {
  totalUsers: number;
  totalCourses: number;
  totalReviews: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    totalCourses: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    axios.get("/api/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <DashboardCard title="Users" value={data.totalUsers} />
      <DashboardCard title="Courses" value={data.totalCourses} />
      <DashboardCard title="Reviews" value={data.totalReviews} />
    </div>
  );
}