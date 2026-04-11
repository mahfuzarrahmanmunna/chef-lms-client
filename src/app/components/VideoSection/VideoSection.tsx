"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Play, ArrowRight, ArrowLeft, X } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

/* ──────────────── DATA ──────────────── */
const videos = [
  {
    id: 1,
    title: "Mastering the French Knife Cut",
    chef: "Chef Alexander",
    youtubeId: "Kqc52QJX2Y8",
    duration: "12:05",
    category: "Technique",
  },
  {
    id: 2,
    title: "Art of Sourdough Bread",
    chef: "Chef Isabella",
    youtubeId: "DpFPFzV0X14",
    duration: "08:30",
    category: "Baking",
  },
  {
    id: 3,
    title: "Plating for Fine Dining",
    chef: "Chef Marcus",
    youtubeId: "w5IhP3Y6dXQ",
    duration: "15:20",
    category: "Presentation",
  },
  {
    id: 4,
    title: "Sustainable Sourcing 101",
    chef: "Chef Elena",
    youtubeId: "Y5aR3k5z8P0",
    duration: "10:15",
    category: "Business",
  },
  {
    id: 5,
    title: "Secrets of Wagyu Beef",
    chef: "Chef Kenji",
    youtubeId: "V0xM8x5M9O1",
    duration: "14:45",
    category: "Ingredients",
  },
  {
    id: 6,
    title: "Pastry Cream Perfection",
    chef: "Chef Sophie",
    youtubeId: "L2p4x5N6Q7R",
    duration: "09:50",
    category: "Pastry",
  },
];

/* ──────────────── SUB-COMPONENTS ──────────────── */

const SwiperNavButton = ({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick?: () => void;
}) => {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition-all duration-300 group ${
        isPrev ? "left-4 md:-left-6" : "right-4 md:-right-6"
      }`}
    >
      {isPrev ? (
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      ) : (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      )}
    </button>
  );
};

const VideoCard: React.FC<{
  video: (typeof videos)[0];
  onOpen: (id: string) => void;
}> = ({ video, onOpen }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    // Added cursor-pointer and removed rounded-xl for rectangle shape
    <div
      onClick={() => onOpen(video.youtubeId)}
      className="group relative h-[400px] w-full bg-gray-100 rounded-none overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center pl-1 backdrop-blur-sm shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
          <Play className="w-6 h-6 text-white fill-current" />
        </div>
      </div>

      {/* Content Info */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-white/10 backdrop-blur-md px-2 py-1 rounded-sm">
            {video.category}
          </span>
          <span className="text-xs font-medium text-gray-300 bg-black/40 px-2 py-1 rounded-sm backdrop-blur-sm">
            {video.duration}
          </span>
        </div>

        <h3 className="font-serif text-xl text-white font-bold leading-tight mb-1 group-hover:text-red-500 transition-colors">
          {video.title}
        </h3>

        <p className="text-sm text-gray-400 flex items-center gap-1">
          <FaYoutube className="w-3 h-3" />
          {video.chef}
        </p>
      </div>
    </div>
  );
};

/* ──────────────── MAIN COMPONENT ──────────────── */

const VideoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const openModal = (id: string) => {
    setSelectedVideoId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedVideoId("");
  };

  return (
    <section className="relative w-full py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest mb-4">
              Culinary TV
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Watch. Learn. Cook.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Dive into our library of instructional videos featuring
              masterclasses, kitchen tours, and exclusive interviews with
              world-renowned chefs.
            </p>
          </div>

          <div className="mt-6 md:mt-0 hidden sm:block">
            <a
              href="#"
              className="text-sm font-bold text-red-700 hover:text-red-800 uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              View All Videos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative py-10 group/swiper">
          <div className="swiper-button-prev custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="prev" />
          </div>
          <div className="swiper-button-next custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="next" />
          </div>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            className="!pb-12"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoCard video={video} onOpen={openModal} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 !mt-0 z-20"></div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* VIDEO MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={closeModal} // Close on backdrop click
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-50 p-2 bg-white/10 rounded-full hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Iframe Container */}
          <div
            className="w-full max-w-5xl aspect-video bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-bullet {
          width: 10px;
          height: 10px;
          background: #e5e7eb;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          width: 30px;
          background: #b91c1c;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
