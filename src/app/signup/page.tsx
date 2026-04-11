"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* LEFT COLUMN: Visual / Branding (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop"
          alt="Chef Academy"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full p-12 xl:p-20">
          <div className="max-w-lg">
            <span className="text-red-500 font-bold tracking-[0.3em] text-xs uppercase mb-6 block">
              Join the Elite
            </span>
            <h1 className="text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.1] mb-8">
              Define Your <br />
              <span className="italic text-gray-300">Culinary Future.</span>
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-10 border-l-4 border-red-600 pl-6">
              Join a global community of aspiring chefs. Master the art,
              science, and business of gastronomy with world-class mentors.
            </p>

            {/* Trust Indicators */}
            <div className="flex gap-8">
              <div>
                <span className="block text-3xl font-serif font-bold text-white mb-1">
                  20k+
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Students
                </span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold text-white mb-1">
                  15
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Campuses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Registration Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 xl:p-20">
        <div className="w-full max-w-md">
          {/* Mobile Only Header */}
          <div className="md:hidden mb-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Start your culinary journey today.
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Register Student
            </h2>
            <p className="text-gray-500">
              Fill in the details below to secure your spot.
            </p>
          </div>

          <form className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                placeholder="+1 234 567 890"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-red-700 transition-colors text-sm text-gray-900 font-light placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 border-gray-300 text-red-700 focus:ring-red-700 rounded-none"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 leading-relaxed"
              >
                I agree to the{" "}
                <a href="#" className="text-red-700 hover:underline font-bold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-red-700 hover:underline font-bold">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 uppercase tracking-widest text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              Create Account{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already a student?{" "}
              <Link
                href="/login"
                className="text-red-700 font-bold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>

          {/* Social Divider */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Buttons (Static) */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-3 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-xs font-bold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-3 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-xs font-bold text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
