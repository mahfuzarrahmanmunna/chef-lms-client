"use client";

import React from "react";
import { MapPin, Mail, Phone, Clock, Send, ArrowRight } from "lucide-react";

/*  Sub-Components  */

const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
  linkHref?: string;
}> = ({ icon, label, value, isLink = false, linkHref = "#" }) => {
  return (
    <div className="flex gap-4 items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      <div className="bg-gray-50 p-3 border border-gray-200 text-gray-900">
        {icon}
      </div>
      <div>
        <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          {label}
        </span>
        {isLink ? (
          <a
            href={linkHref}
            className="text-lg font-serif font-bold text-gray-900 hover:text-red-700 transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-lg font-serif font-bold text-gray-900 block">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

/*  Main Page  */
export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO BANNER SECTION */}
      <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
            alt="Reception Area"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay: Left-heavy for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 w-full">
          <div className="max-w-3xl">
            <span className="block text-red-500 font-bold tracking-[0.25em] text-xs uppercase mb-6">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[0.9] mb-8">
              We are Here to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 italic">
                Help You.
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-2xl border-l-4 border-red-600 pl-6">
              Whether you have questions about our programs or want to schedule
              a campus tour, our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT COLUMN: Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reach out to us directly or fill out the form and we will get
                  back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <InfoItem
                  icon={<MapPin className="w-5 h-5" />}
                  label="Main Campus"
                  value="123 Culinary Avenue, Paris, France"
                />
                <InfoItem
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                  value="+33 1 23 45 67 89"
                  isLink
                  linkHref="tel:+33123456789"
                />
                <InfoItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value="admissions@chefacademy.com"
                  isLink
                  linkHref="mailto:admissions@chefacademy.com"
                />
              </div>

              {/* Hours Box */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-red-700" />
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 font-light">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Mon - Fri</span>
                    <span className="font-medium text-gray-900">
                      09:00 AM - 06:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sat - Sun</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-200 p-8 md:p-12 relative">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-red-700 group-hover:w-full transition-all duration-500"></div>

                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm text-gray-900 font-light placeholder-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm text-gray-900 font-light placeholder-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm text-gray-900 font-light placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Subject
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm text-gray-900 font-light">
                      <option>General Inquiry</option>
                      <option>Course Admission</option>
                      <option>Campus Visit</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-red-700 focus:bg-white transition-all text-sm text-gray-900 font-light placeholder-gray-400"
                      placeholder="Tell us more about your interest..."
                    ></textarea>
                  </div>

                  <button className="w-full bg-gray-900 hover:bg-red-700 text-white font-bold py-4 uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 group">
                    Send Message{" "}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <span className="text-red-700 font-bold tracking-[0.2em] text-xs uppercase block mb-4">
                Visit Us
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Find Our Campus
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                Located in the heart of the culinary district, our campus is
                easily accessible by public transport and offers ample parking
                for visitors.
              </p>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 hover:text-red-700 hover:border-red-700 transition-all">
                Get Directions <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="w-full h-[400px] bg-gray-200 border border-gray-300 relative overflow-hidden group">
                {/* Placeholder for Map (e.g., Google Maps iframe) */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Map Location"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                {/* Custom Pin Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-red-700 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
