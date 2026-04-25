"use client";

import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Play, ArrowRight, ArrowLeft, X } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
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
    title: "Abdur Rahim",
    subtitle: "Senior Chef at a Five Star Hotel",
    type: "short",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: "2",
    title: "Farhana Akhtar",
    subtitle: "Success as a Pastry Chef",
    type: "short",
    videoId: "YE7VzlLtp-4",
  },
  {
    id: "3",
    title: "Tanvir Ahmed",
    subtitle: "Alumni Interview",
    type: "video",
    videoId: "M7lc1UVf-VE",
  },
  {
    id: "4",
    title: "Rakib Hasan",
    subtitle: "The Story of Building a Career Abroad",
    type: "short",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: "5",
    title: "Najma Begum",
    subtitle: "Proficient in Culinary Arts",
    type: "short",
    videoId: "YE7VzlLtp-4",
  },
];

/* ──────────────── SUB-COMPONENTS ──────────────── */

interface SwiperNavButtonProps {
  direction: "prev" | "next";
  onClick?: () => void;
}

const SwiperNavButton: React.FC<SwiperNavButtonProps> = ({
  direction,
  onClick,
}) => {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-red-700 hover:bg-red-600 hover:text-white transition-all duration-300 group ${
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

// --- VIDEO.JS PLAYER COMPONENT (FULL WIDTH) ---
interface InlineVideoPlayerProps {
  videoId: string;
  type: "short" | "video";
}

const InlineVideoPlayer: React.FC<InlineVideoPlayerProps> = ({ 
  videoId, 
  type 
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    // Prevent double init
    if (!videoRef.current || playerRef.current) return;

    // Delay initialization to ensure React DOM is ready
    const initTimer = setTimeout(() => {
      if (!videoRef.current || !videoRef.current.parentNode) return;

      const origin = typeof window !== "undefined" ? window.location.origin : "";

      const options: videojs.PlayerOptions = {
        controls: true,
        responsive: true,
        fluid: false, // We use absolute positioning
        autoplay: true,
        preload: "auto",
        fill: true, // Fills container
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

      // Handle Aspect Ratio
      if (type === "short") {
        player.aspectRatio("9:16");
      } else {
        player.aspectRatio("16:9");
      }

      playerRef.current = player;

    }, 50); // Short delay

    // Cleanup function
    return () => {
      clearTimeout(initTimer);
      if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          // Suppress crash
          console.warn("Error disposing player:", e);
        }
      }
      playerRef.current = null;
    };
  }, [videoId, type]);

  return (
    <div className="w-full h-full absolute inset-0 bg-black z-20">
      <div data-vjs-player className="w-full h-full">
        <div
          ref={videoRef}
          className="video-js vjs-default-skin vjs-big-play-centered w-full h-full"
        />
      </div>
    </div>
  );
};

// --- STORY CARD COMPONENT ---
interface StoryCardProps {
  story: VideoStory;
  isActive: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  isActive, 
  onPlay, 
  onStop 
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${story.videoId}/hqdefault.jpg`;

  return (
    <div
      className={`group relative h-[450px] w-full bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 ${
        isActive ? "ring-2 ring-red-600 z-10" : ""
      }`}
      // ANGEL SHAPE: Bottom right cut
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
      }}
    >
      {isActive ? (
        // --- PLAYER MODE (FULL WIDTH) ---
        <div className="absolute inset-0 z-30">
          <InlineVideoPlayer videoId={story.videoId} type={story.type} />

          {/* Close Button for Player */}
          <button
            onClick={onStop}
            className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center transition-all backdrop-blur-sm shadow-lg"
            aria-label="Close video"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        /* --- THUMBNAIL MODE --- */
        <>
          {/* Thumbnail Image */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          </div>

          {/* Type Badge */}
          <div className="absolute top-6 left-6 z-10">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm backdrop-blur-md shadow-sm ${
                story.type === "short"
                  ? "bg-red-600 text-white"
                  : "bg-white/20 text-white border border-white/30"
              }`}
            >
              {story.type === "short" ? "Shorts" : "Video"}
            </span>
          </div>

          {/* Play Button Area */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            onClick={() => onPlay(story.id)}
          >
            <div className="relative w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center pl-2 backdrop-blur-sm shadow-lg group-hover:bg-[#EA393A] group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </div>

          {/* Text Info (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full p-8 z-10">
            <h3 className="font-serif text-3xl text-white font-bold leading-tight mb-2 group-hover:text-red-500 transition-colors">
              {story.title}
            </h3>
            <div className="h-1 w-12 bg-red-600 mb-3 transition-all group-hover:w-20"></div>
            <p className="text-base text-gray-200 flex items-center gap-2">
              <FaYoutube className="w-4 h-4" />
              {story.subtitle}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

/* ──────────────── MAIN COMPONENT ──────────────── */

const SuccessStoriesSlider: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setActiveVideoId(id);
  };

  const handleStop = () => {
    setActiveVideoId(null);
  };

  const handleSlideChange = () => {
    // Stop video when sliding to prevent audio overlap
    setActiveVideoId(null);
  };

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Stories of <span className="text-[#ea393a]">Success</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our alumni are now working at the world's best hotels. Listen to their experiences and get inspired.
            </p>
          </div>

          <div className="mt-6 md:mt-0 hidden sm:block">
            <a
              href="#"
              className="text-sm font-bold text-red-700 hover:text-red-800 uppercase tracking-widest flex items-center gap-2 transition-colors group"
            >
              View All Stories{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            modules={[Navigation, Pagination]}
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
            // CRITICAL: loop={false} prevents removeChild crash with VideoJS
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
            className="!pb-12"
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

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
          background: #dc2626;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default SuccessStoriesSlider;