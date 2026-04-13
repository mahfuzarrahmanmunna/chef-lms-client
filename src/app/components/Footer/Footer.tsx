"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChefHat,
} from "lucide-react";
import {
  FaFacebookF,
  FaSquareInstagram,
  FaLinkedin,
  FaSquareTwitter,
} from "react-icons/fa6";


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans selection:bg-red-900 selection:text-white">
      {/* Top Section: Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <ChefHat className="w-8 h-8 text-red-600" />
              <span className="font-serif text-2xl font-bold tracking-tight">
                Chef<span className="text-red-600">LMS</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Shaping the future of gastronomy through world-class education,
              mentorship, and hands-on culinary experience.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-serif font-bold mb-3 uppercase text-xs tracking-widest">
                Stay Updated
              </h4>
              <div className="flex group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 w-full transition-colors placeholder-gray-500"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6 uppercase text-xs tracking-widest border-b border-gray-800 pb-2 inline-block">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Admissions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Alumni Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Campus Tour
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6 uppercase text-xs tracking-widest border-b border-gray-800 pb-2 inline-block">
              Programs
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Culinary Arts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Pastry & Baking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Food Entrepreneurship
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Sommelier Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Executive Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6 uppercase text-xs tracking-widest border-b border-gray-800 pb-2 inline-block">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-gray-400">
                  2nd floor, SA-23/Ka,
                  <br />
                  Adarsha Nagar Rd
                  <br />
                  Dhaka, Bangladesh, 1212
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a
                  href="tel:+8801886-880993
"
                  className="text-sm hover:text-white transition-colors"
                >
                  +880 1886-880993
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a
                  href="mailto:admissions@cheflms.com"
                  className="text-sm hover:text-white transition-colors"
                >
                  admissions@cheflms.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Section: Copyright & Socials */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          &copy; {currentYear} ChefLMS. All rights reserved. Designed with
          precision.
        </p>

        <div className="flex gap-6">
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">Facebook</span>
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">Instagram</span>
            <FaSquareInstagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">Twitter</span>
            <FaSquareTwitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="flex gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
