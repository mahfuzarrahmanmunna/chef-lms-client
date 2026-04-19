import React from "react";
import {
  FaUtensils,
  FaBreadSlice,
  FaLeaf,
  FaHeartbeat,
  FaStore,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

/* ================= TYPES ================= */

export interface PathModule {
  title: string;
  description: string;
}

export interface PathHighlight {
  label: string;
  description: string;
}

export type PathType = "In-Person" | "Hybrid" | "Online";

export type TagType =
  | "Flagship"
  | "Popular"
  | "New"
  | "Trending"
  | "Specialist"
  | "Professional";

export interface Path {
  id: string;
  label: string;
  tag: TagType;
  type: PathType;
  duration: string;
  durationEn: string;
  certification: string;
  price: number | null;
  discountPrice?: number | null;
  headline: string;
  subHeadline: string;
  image: string;
  modules: PathModule[];
  highlights: PathHighlight[];
  icon: React.ReactNode;
}

/* ================= DATA ================= */

export const paths: Path[] = [
  {
    id: "culinary-arts",
    label: "Culinary Arts",
    tag: "Flagship",
    type: "In-Person",
    duration: "৬ মাস",
    durationEn: "6 Months",
    certification: "Professional Culinary Certificate",
    price: 85000,
    discountPrice: null,
    image: "/images/culinary-arts.jpg",
    icon: <FaUtensils className="w-9 h-9" />,

    headline: "পেশাদার শেফ হওয়ার সম্পূর্ণ যাত্রা শুরু হোক এখানেই",
    subHeadline:
      "আন্তর্জাতিক মানের কারিকুলাম অনুসরণ করে এই কোর্সটি আপনাকে একজন দক্ষ ও আত্মবিশ্বাসী প্রফেশনাল শেফ হিসেবে গড়ে তুলবে।",

    modules: [
      {
        title: "Knife Skills & Kitchen Safety",
        description: "প্রফেশনাল কিচেনের মৌলিক দক্ষতা এবং সেফটি প্রোটোকল।",
      },
      {
        title: "Classic French Techniques",
        description: "ফ্রেঞ্চ রন্ধনশৈলীর মূল কৌশল ও সস তৈরির পদ্ধতি।",
      },
    ],

    highlights: [
      {
        label: "Industry Expert Instructors",
        description: "অভিজ্ঞ শেফদের কাছ থেকে সরাসরি শেখার সুযোগ।",
      },
      {
        label: "Hands-On Learning",
        description: "প্রতিটি ক্লাস সম্পূর্ণ প্র্যাকটিক্যাল।",
      },
    ],
  },

  {
    id: "baking-pastry",
    label: "Baking & Pastry Arts",
    tag: "Popular",
    type: "In-Person",
    duration: "৪ মাস",
    durationEn: "4 Months",
    certification: "Pastry Arts Certificate",
    price: 65000,
    discountPrice: null,
    image: "/images/baking-pastry.jpg",
    icon: <FaBreadSlice className="w-9 h-9" />,

    headline: "বেকিং ও পেস্ট্রির জগতে পেশাদারিত্বের ছোঁয়া আনুন",
    subHeadline:
      "ব্রেড থেকে শুরু করে এলিট ডেজার্ট — সব কিছু শিখবেন হাতে-কলমে।",

    modules: [
      {
        title: "Bread & Dough Fundamentals",
        description: "সব ধরনের ব্রেড তৈরির কৌশল।",
      },
      {
        title: "Cake Design & Decoration",
        description: "ফন্ডেন্ট ও কেক ডেকোরেশন।",
      },
    ],

    highlights: [
      {
        label: "Modern Bakery Lab",
        description: "প্রফেশনাল ইকুইপমেন্ট সহ ল্যাব।",
      },
      {
        label: "Portfolio Development",
        description: "নিজস্ব পোর্টফোলিও তৈরি।",
      },
    ],
  },

  {
    id: "food-entrepreneurship",
    label: "Food Entrepreneurship",
    tag: "New",
    type: "Hybrid",
    duration: "৩ মাস",
    durationEn: "3 Months",
    certification: "Food Business Certificate",
    price: 45000,
    discountPrice: null,
    image: "/images/food-entrepreneurship.jpg",
    icon: <FaStore className="w-9 h-9" />,

    headline: "আপনার ফুড বিজনেস শুরু করুন স্মার্টভাবে",
    subHeadline:
      "ব্র্যান্ডিং, মার্কেটিং ও প্রফিটেবল ব্যবসার কৌশল শিখুন।",

    modules: [
      {
        title: "Business Model",
        description: "ফুড বিজনেসের ভিত্তি।",
      },
      {
        title: "Digital Marketing",
        description: "সোশ্যাল মিডিয়া গ্রোথ।",
      },
    ],

    highlights: [
      {
        label: "Mentorship",
        description: "সফল উদ্যোক্তাদের গাইডেন্স।",
      },
      {
        label: "Demo Day",
        description: "লাইভ পিচ করার সুযোগ।",
      },
    ],
  },

  {
    id: "plant-based",
    label: "Plant-Based Culinary Arts",
    tag: "Trending",
    type: "In-Person",
    duration: "৩ মাস",
    durationEn: "3 Months",
    certification: "Plant-Based Certificate",
    price: 55000,
    discountPrice: null,
    image: "/images/plant-based.jpg",
    icon: <FaLeaf className="w-9 h-9" />,

    headline: "Healthy + Sustainable Cooking",
    subHeadline: "ভেগান ও প্ল্যান্ট-বেসড রান্নার সম্পূর্ণ গাইড।",

    modules: [
      {
        title: "Plant Proteins",
        description: "টোফু ও লেগিউম।",
      },
    ],

    highlights: [
      {
        label: "Global Demand",
        description: "বিশ্বব্যাপী চাহিদা বাড়ছে।",
      },
    ],
  },

  {
    id: "holistic-nutrition",
    label: "Holistic Nutrition & Wellness",
    tag: "Specialist",
    type: "Hybrid",
    duration: "৪ মাস",
    durationEn: "4 Months",
    certification: "Nutrition Certificate",
    price: 60000,
    discountPrice: null,
    image: "/images/holistic-nutrition.jpg",
    icon: <FaHeartbeat className="w-9 h-9" />,

    headline: "Food + Health Connection",
    subHeadline: "পুষ্টি ও লাইফস্টাইল শেখার কোর্স।",

    modules: [
      {
        title: "Nutrition Basics",
        description: "ম্যাক্রো ও মাইক্রো।",
      },
    ],

    highlights: [
      {
        label: "Science Based",
        description: "রিসার্চ ভিত্তিক কারিকুলাম।",
      },
    ],
  },

  {
    id: "hospitality",
    label: "Hospitality & Restaurant Operations Management",
    tag: "Professional",
    type: "In-Person",
    duration: "৬ মাস",
    durationEn: "6 Months",
    certification: "Hospitality Certificate",
    price: 90000,
    discountPrice: null,
    image: "/images/hospitality.jpg",
    icon: <MdRestaurantMenu className="w-9 h-9" />,

    headline: "Hospitality Career Build",
    subHeadline: "Hotel & restaurant management skill develop korun.",

    modules: [
      {
        title: "Operations",
        description: "Daily management system।",
      },
    ],

    highlights: [
      {
        label: "Internship",
        description: "Hotel internship।",
      },
    ],
  },
];