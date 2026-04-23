"use client";

import React from "react";
import { MapPin, Phone, ChefHat, Mail, Link as LinkIcon } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 font-sans border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#ea393a] rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  BPSTI
                </h3>
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  Chef Training Institute
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              We are committed to building the next generation of culinary
              experts through world-class training and real-world industry
              experience.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#ea393a] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  2nd floor, SA-23/Ka, Adarsha Nagar Rd <br />
                  <span className="text-gray-500">
                    (Opposite Badda Link Road)
                  </span>
                  ,<br />
                  Dhaka, Bangladesh, 1212
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[#ea393a] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  01886-880993
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[#ea393a] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  01796-853789
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#ea393a] transition-colors"
                >
                  <LinkIcon className="w-4 h-4 opacity-50" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#ea393a] transition-colors"
                >
                  <LinkIcon className="w-4 h-4 opacity-50" />
                  About BPSTI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#ea393a] transition-colors"
                >
                  <LinkIcon className="w-4 h-4 opacity-50" />
                  Culinary Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#ea393a] transition-colors"
                >
                  <LinkIcon className="w-4 h-4 opacity-50" />
                  Admission Process
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Tagline */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
              Connect
            </h4>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center mb-6">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
                Visit Our Community
              </p>
              <a
                href="https://www.facebook.com/bpsti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ea393a] text-white hover:bg-red-600 transition-all hover:shadow-[0_0_15px_rgba(234,57,58,0.5)]"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <p className="mt-3 text-xs italic text-gray-400">
                "দক্ষতা অর্জন। নিশ্চিত ভবিষ্যৎ।"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} BPSTI Chef Training Institute. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
