"use client";

import React from "react";
import { MapPin, Phone, ChefHat } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans">

      {/* Main */}
      <div className="container mx-auto px-6 py-10 text-center">

        {/* Logo + Title */}
        <div className="flex justify-center items-center gap-2 text-white mb-2">
          <ChefHat className="w-6 h-6 text-red-600" />
          <span className="font-serif text-lg font-bold">
            BPSTI Chef Training Institute
          </span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-sm mb-6">
          দক্ষতা অর্জন। নিশ্চিত ভবিষ্যৎ।
        </p>

        {/* Address */}
        <div className="flex justify-center items-start gap-2 text-xs text-gray-400 mb-3 max-w-xl mx-auto">
          <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
          <span className="leading-relaxed">
            2nd floor, SA-23/Ka, Adarsha Nagar Rd (বাড্ডা লিঙ্ক রোডের বিপরীতে), 
            Dhaka, Bangladesh, 1212
          </span>
        </div>

        {/* Phones */}
        <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mb-3 flex-wrap">
          <Phone className="w-4 h-4 text-red-600" />
          <span>
            01886-880993, 01796-853789, 01886-880996
          </span>
        </div>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/bpsti"
          target="_blank"
          className="flex justify-center items-center gap-2 text-xs text-gray-400 hover:text-white transition"
        >
          <FaFacebookF className="w-4 h-4 text-red-600" />
          <span>আমাদের সাফল্য দেখতে ভিজিট করুন</span>  https://www.facebook.com/bpsti
        
        
        </a>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        &copy; {currentYear} BPSTI Chef Training Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
