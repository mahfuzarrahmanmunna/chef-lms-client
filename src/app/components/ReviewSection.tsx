"use client";

import React from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  initials: string;
  role: string;
  workplace: string;
  rating: number;
  comment: string;
  avatarColor: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rayan Ahmed",
    initials: "RA",
    role: "Professional Pastry Arts Graduate",
    workplace: "Radisson Blu Dhaka Water Garden",
    rating: 5,
    comment:
      "I always had a passion for baking, কিন্তু প্রফেশনাল গাইডেন্সের অভাব ছিল। BPSTI-তে ভর্তি হওয়ার পর আমার দৃষ্টিভঙ্গি পুরোপুরি বদলে গেছে। Hands-on training এবং মেন্টরদের সাপোর্ট ছিল অসাধারণ। BPSTI truly gave me the wings to fly!",
    avatarColor: "bg-red-50 text-red-700",
  },
  {
    id: 2,
    name: "Maria Sultana",
    initials: "MS",
    role: "Culinary Arts & Kitchen Management",
    workplace: "InterContinental Dhaka",
    rating: 5,
    comment:
      "রান্না আমার কাছে সবসময় একটা আর্ট ছিল, কিন্তু সেটাকে ক্যারিয়ারে রূপান্তর করতে BPSTI শিখিয়েছে। Kitchen management ও food safety-র গভীর জ্ঞান আমাকে আজ একজন আত্মবিশ্বাসী উদ্যোক্তা হিসেবে গড়ে তুলেছে।",
    avatarColor: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 3,
    name: "Tamim Iqbal",
    initials: "TI",
    role: "Professional Cookery Alumni",
    workplace: "Pan Pacific Sonargaon",
    rating: 5,
    comment:
      "BPSTI-এর অত্যাধুনিক ল্যাব এবং ইন্ডাস্ট্রি-স্ট্যান্ডার্ড কারিকুলাম আমাকে প্রতিটি ধাপে সাহায্য করেছে। বিশেষ করে ইন্টার্নশিপ প্রোগ্রামটি ছিল game-changer। If you want to master culinary arts with international standards, BPSTI is the best place.",
    avatarColor: "bg-amber-50 text-amber-700",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    initials: "NJ",
    role: "Hospitality Management Graduate",
    workplace: "Renaissance Dhaka Gulshan Hotel",
    rating: 5,
    comment:
      "এখানকার শিক্ষকরা কেবল থিওরি নয়, বাস্তব অভিজ্ঞতা থেকেও অনেক কিছু শিখিয়েছেন। Today, I am working in a leading hotel, and I owe my success to the foundation built here. স্বপ্ন যখন আকাশ ছোঁয়ার, সঠিক ট্রেনিং তখন জরুরি।",
    avatarColor: "bg-blue-50 text-blue-700",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5 mt-1.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 fill-current ${
          i < rating ? "text-amber-400" : "text-gray-200"
        }`}
      />
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-red-700 transition-colors duration-300 flex flex-col gap-4">
    <div className="flex items-start gap-3">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${review.avatarColor}`}
      >
        {review.initials}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-[15px] leading-tight">
          {review.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{review.role}</p>
        <span className="inline-block mt-1.5 text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
          {review.workplace}
        </span>
        <StarRating rating={review.rating} />
      </div>
    </div>
    <div className="border-l-2 border-red-100 pl-3">
      <p className="text-[13px] text-gray-500 leading-relaxed italic">
        "{review.comment}"
      </p>
    </div>
  </div>
);

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-red-700 mb-2">
            Graduate success stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-3">
            Real stories, real success
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
            At BPSTI, our mission is to turn passion into profession.
            আমাদের শিক্ষার্থীদের সাফল্যই আমাদের মূল সার্থকতা — দেখুন কীভাবে
            আমাদের কোর্সগুলো সম্পন্ন করে তারা দেশ ও বিদেশে নিজেদের ক্যারিয়ার
            গড়ে তুলছেন।
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl font-bold text-gray-900">4.9</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-current text-amber-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">(4 verified reviews)</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-serif font-bold text-gray-900 text-xl leading-snug">
              আপনার সফলতার গল্প কি এখান থেকেই শুরু হবে?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Join our community of successful professionals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <button className="bg-[#EA393A] hover:bg-red-800 text-white font-bold py-3 px-5 text-xs uppercase tracking-widest transition-colors">
              Browse our courses
            </button>
            <button className="border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold py-3 px-5 text-xs uppercase tracking-widest transition-all">
              Talk to an advisor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}