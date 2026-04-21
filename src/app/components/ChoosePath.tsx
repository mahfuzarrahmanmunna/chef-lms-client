"use client"; // 

import React from "react";
import { useRouter } from "next/navigation"; 
import { FaHeartbeat } from "react-icons/fa";
import { FaBreadSlice, FaLeaf, FaStore, FaUtensils } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";

const paths = [
  { id: "culinary-arts", label: "Culinary Arts", icon: <FaUtensils className="w-6 h-6" /> },
  { id: "baking-pastry", label: "Baking & Pastry Arts", icon: <FaBreadSlice className="w-6 h-6" /> },
  { id: "food-entrepreneurship", label: "Food Entrepreneurship", icon: <FaStore className="w-6 h-6" /> },
  { id: "plant-based", label: "Plant-Based Culinary Arts", icon: <FaLeaf className="w-6 h-6" /> },
  { id: "holistic-nutrition", label: "Holistic Nutrition & Wellness", icon: <FaHeartbeat className="w-6 h-6" /> },
  { id: "hospitality", label: "Hospitality & Restaurant Operations Management", icon: <MdRestaurantMenu className="w-6 h-6" /> },
];

const ArrowIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
  >
    <circle cx="11.5" cy="11.5" r="11.5" className="arrow-fill transition-all duration-300" fill="transparent" />
    <path
      className="arrow-ring transition-all duration-300"
      d="M11.5 23C5.15901 23 0 17.841 0 11.5C0 5.15901 5.15901 0 11.5 0C17.841 0 23 5.15901 23 11.5C23 17.841 17.841 23 11.5 23ZM11.5 1.4375C5.95143 1.4375 1.4375 5.95143 1.4375 11.5C1.4375 17.0486 5.95143 21.5625 11.5 21.5625C17.0486 21.5625 21.5625 17.0486 21.5625 11.5C21.5625 5.95143 17.0486 1.4375 11.5 1.4375Z"
      fill="#BB1133"
    />
    <path
      className="arrow-icon transition-all duration-300"
      d="M16.3207 12.0082C16.6015 11.7273 16.6015 11.2725 16.3207 10.9918L12.7269 7.39809C12.5866 7.25776 12.4026 7.1875 12.2188 7.1875C12.0349 7.1875 11.8509 7.25776 11.7106 7.39809C11.4297 7.67894 11.4297 8.13373 11.7106 8.41441L14.0774 10.7812H7.1875C6.79057 10.7812 6.46875 11.1027 6.46875 11.5C6.46875 11.8973 6.79057 12.2188 7.1875 12.2188H14.0774L11.7106 14.5856C11.4297 14.8664 11.4297 15.3212 11.7106 15.6019C11.9914 15.8826 12.4462 15.8828 12.7269 15.6019L16.3207 12.0082Z"
      fill="#BB1133"
    />
  </svg>
);

interface PathCardProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const PathCard = ({ label, icon, onClick }: PathCardProps) => (
  <button
    onClick={onClick}
    className="
      group
      flex items-center gap-3 w-full
      bg-white border border-[#e0d5cc] rounded-xl
      px-4 py-[18px] cursor-pointer text-left
      transition-all duration-300 ease-out
      hover:border-[#BB1133]
      hover:-translate-y-1
      hover:shadow-[0_8px_24px_rgba(187,17,51,0.15)]
      [&:hover_.arrow-fill]:fill-[#BB1133]
      [&:hover_.arrow-ring]:fill-[#BB1133]
      [&:hover_.arrow-icon]:fill-white
    "
  >
    <span className="text-[#8B6347] flex-shrink-0">{icon}</span>
    <span className="flex-1 text-sm font-bold uppercase tracking-wider text-[#3a2a1e] leading-snug">
      {label}
    </span>
    <ArrowIcon />
  </button>
);

export default function ChoosePath() {
  const router = useRouter(); 

  return (
    <section className="w-full px-4 py-10 mt-20">
      <h2 className=" text-center text-3xl font-bold text-gray-900 mb-6">
        Choose Your Path
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {paths.map((path) => (
          <PathCard
            key={path.id}
            label={path.label}
            icon={path.icon}
            onClick={() => router.push(`/ChoosePath/${path.id}`)} 
          />
        ))}
      </div>
    </section>
  );
}