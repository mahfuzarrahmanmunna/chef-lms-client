"use client";

import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Play, ArrowRight, X, Volume2, ArrowLeft } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

// --- TYPES ---
interface VideoStory {
  id: string;
  title: string;
  subtitle: string;
  type: "short" | "video";
  videoId: string;
}

// --- DATA ---
const stories: VideoStory[] = [
  {
    id: "1",
    title: "আব্দুর রহিম",
    subtitle: "পাঁচ তারকা হোটেলের সিনিয়র শেফ",
    type: "short",
    videoId: "j19HFPplMQ0",
  },
  {
    id: "2",
    title: "ফারহানা আক্তার",
    subtitle: "পেস্ট্রি শেফ হিসেবে সাফল্য",
    type: "short",
    videoId: "VrydNMFT8f4",
  },
  {
    id: "3",
    title: "তানভীর আহমেদ",
    subtitle: "প্রাক্তন শিক্ষার্থী - সাক্ষাৎকার",
    type: "video",
    videoId: "qgwHxIXuyvQ",
  },
  {
    id: "4",
    title: "রাকিব হাসান",
    subtitle: "বিদেশে ক্যারিয়ার গড়ার গল্প",
    type: "short",
    videoId: "lVfNStAU178",
  },
  {
    id: "5",
    title: "নাজমা বেগম",
    subtitle: "কুকিং আর্টে পারদর্শী",
    type: "short",
    videoId: "YYsg_vZEDng",
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
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-[#ea393a] hover:text-white transition-all duration-300 ${
        isPrev ? "left-0 md:-left-6" : "right-0 md:-right-6"
      }`}
    >
      {isPrev ? (
        <ArrowLeft className="w-5 h-5" />
      ) : (
        <ArrowRight className="w-5 h-5" />
      )}
    </button>
  );
};

// --- VIDEO.JS PLAYER COMPONENT ---
const InlineVideoPlayer: React.FC<{
  videoId: string;
  type: "short" | "video";
}> = ({ videoId, type }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Prevent double init
    if (!videoRef.current || playerRef.current) return;

    const initTimer = setTimeout(() => {
      if (!videoRef.current || !videoRef.current.parentNode) return;

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";

      const options = {
        controls: true,
        responsive: true,
        fluid: false,
        autoplay: true,
        preload: "auto",
        fill: true, // Ensures it fills the parent
        techOrder: ["youtube"],
        sources: [
          {
            src: `https://www.youtube.com/watch?v=${videoId}`,
            type: "video/youtube",
          },
        ],
        youtube: {
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          origin: origin,
        },
      };

      const player = videojs(videoRef.current, options);

      // Enforce Aspect Ratio
      if (type === "short") {
        player.aspectRatio("9:16");
      } else {
        player.aspectRatio("16:9");
      }

      playerRef.current = player;

      return () => {
        if (playerRef.current && !playerRef.current.isDisposed()) {
          try {
            playerRef.current.dispose();
          } catch (e) {
            // Suppress crash
          }
        }
        playerRef.current = null;
      };
    }, 50);

    return () => {
      clearTimeout(initTimer);
    };
  }, [videoId, type]);

  return (
    <div className="absolute inset-0 bg-black z-30">
      <div data-vjs-player className="w-full h-full">
        <div
          ref={videoRef}
          className="video-js vjs-default-skin vjs-big-play-centered w-full h-full"
        />
      </div>
    </div>
  );
};

// --- STORY CARD COMPONENT (9:16 Shorts Style) ---
const StoryCard: React.FC<{
  story: VideoStory;
  isActive: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
}> = ({ story, isActive, onPlay, onStop }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${story.videoId}/maxresdefault.jpg`; // Higher quality

  return (
    <div
      className={`
        group relative w-full bg-gray-900 shadow-xl transition-all duration-500 ease-out
        aspect-[9/16]  overflow-hidden cursor-pointer
        ${isActive ? "ring-4 ring-red-600 scale-[0.98]" : "hover:scale-[1.02]"}
      `}
      onClick={() => !isActive && onPlay(story.id)}
    >
      {isActive ? (
        // --- PLAYER MODE ---
        <>
          <InlineVideoPlayer videoId={story.videoId} type={story.type} />

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStop();
            }}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/50 hover:bg-white text-white hover:text-black backdrop-blur flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        // --- THUMBNAIL MODE ---
        <>
          {/* Image */}
          <img
            src={thumbnailUrl}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay (Darker at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />

          {/* Top Left Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              {story.type === "short" ? "Short" : "Video"}
            </span>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-[#ea393a] group-hover:scale-110 group-hover:border-[#ea393a] transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 w-full p-5 z-10">
            <div className="flex items-center gap-2 mb-2">
              <FaYoutube className="text-red-600 w-4 h-4" />
              <span className="text-xs text-gray-300 font-medium uppercase tracking-wide">
                Success Story
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">
              {story.title}
            </h3>
            <p className="text-sm text-gray-300 font-light line-clamp-2">
              {story.subtitle}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

/* ──────────────── MAIN COMPONENT ──────────────── */

const SuccessStoriesSlider = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setActiveVideoId(id);
  };

  const handleStop = () => {
    setActiveVideoId(null);
  };

  const handleSlideChange = () => {
    setActiveVideoId(null);
  };

  return (
    <section className=" relative w-full py-24 bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[#ea393a] font-bold tracking-[0.2em] text-xs uppercase mb-3">
              <div className="w-8 h-[1px] bg-[#ea393a]"></div>
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl  font-bold text-gray-900 mb-4 leading-tight">
              সফলতার <span className="text-[#ea393a]">গল্প</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              আমাদের প্রাক্তন শিক্ষার্থীদের অভিজ্ঞতা এবং সাফল্যের গল্প দেখুন।
              তারা কিভাবে প্রফেশনাল কুকিং শিখে নিজেদের ক্যারিয়ার গড়েছেন।
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-bold text-gray-900 border-b-2 border-transparent hover:border-[#ea393a] pb-1 transition-all"
            >
              সব গল্প দেখুন
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative group/swiper">
          {/* Navigation */}
          <div className="swiper-button-prev custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="prev" />
          </div>
          <div className="swiper-button-next custom-swiper-btn opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300">
            <SwiperNavButton direction="next" />
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            loop={false}
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
            onSlideChange={handleSlideChange}
            className="!pb-16"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <StoryCard
                  story={story}
                  isActive={activeVideoId === story.id}
                  onPlay={handlePlay}
                  onStop={handleStop}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 !mt-0 z-20"></div>
        </div>
      </div>

      <style jsx global>{`
        .custom-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          width: 24px;
          background: #ea393a;
          border-radius: 4px;
        }
        /* Hide videojs default big play button since we have our own overlay */
        .vjs-big-play-button {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default SuccessStoriesSlider;
