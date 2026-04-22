"use client";

import React, { useRef, useState } from "react";

/* ICONS */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

/* FEATURES (simplified placeholders) */
const InternshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2l4 4-4 4-4-4 4-4zm0 10c4 0 8 2 8 6v2H4v-2c0-4 4-6 8-6z" />
  </svg>
);

const LanguageIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M4 5h16v2H4V5zm0 6h10v2H4v-2zm0 6h7v2H4v-2z" />
  </svg>
);

const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 2L3 14h7v8l10-12h-7z" />
  </svg>
);

const CertificateIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2l3 6 6 .9-4.5 4.4L17 20l-5-2.6L7 20l.5-6.7L3 8.9 9 8l3-6z" />
  </svg>
);

const features = [
  {
    icon: <InternshipIcon />,
    text: "Guaranteed Internships",
    desc: "আমরা শুধু শেখাই না, কর্মসংস্থানের ব্যবস্থা করি। প্রতিটি স্টুডেন্ট পাচ্ছে prestigious 3 and 4-star hotels-এ real-world experience অর্জনের জন্য নিশ্চিত internship সুযোগ।",
  },
  {
    icon: <LanguageIcon />,
    text: "Language Integration",
    desc: "যারা Europe, Middle East বা তার বাইরে abroad chef careers গড়ার স্বপ্ন দেখছেন, তাদের জন্য আমাদের curriculum-এ থাকছে বিশেষ language training যা আপনার communication gap দূর করবে।",
  },
  {
    icon: <SpeedIcon />,
    text: "Fast-Track Learning",
    desc: "আপনার সুবিধামতো বেছে নিন আমাদের intensive 3-month professional programs অথবা দ্রুত স্কিল অর্জনের জন্য 30-day basic short courses।",
  },
  {
    icon: <CertificateIcon />,
    text: "Professional Certification",
    desc: "এমন একটি credential নিয়ে গ্র্যাজুয়েশন সম্পন্ন করুন যা hospitality industry-তে স্বীকৃত; যা দেশে এবং abroad; উভয় জায়গার কিচেনেই আপনার জন্য সাফল্যের দরজা খুলে দেবে।",
  },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isSeeking, setIsSeeking] = useState(false);

  /* PLAY / PAUSE */
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* TIME UPDATE */
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);

    if (total) {
      setProgress((current / total) * 100);
    }
  };

  /* LOAD DURATION */
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  /* SEEK FUNCTION */
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    const newTime = percent * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  /* DRAG SEEK */
  const handleMouseDown = () => setIsSeeking(true);
  const handleMouseUp = () => setIsSeeking(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    handleSeek(e);
  };

  /* FORMAT TIME */
  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";

    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);

    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section className="bg-white py-2 px-4  max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* VIDEO */}
        <div
          className="relative w-full lg:w-[52%]  overflow-hidden"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src="/hero.mp4"
            className="w-full h-[360px] object-cover"
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* play/pause */}
          {showControls && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#E87722] hover:bg-[#d06a1a] flex items-center justify-center text-white shadow-lg">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </div>
            </button>
          )}

          {/* bottom controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 w-full px-3 pb-2">
              {/* SEEK BAR */}
              <div
                className="w-full h-1 bg-white/30 cursor-pointer"
                onClick={handleSeek}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="h-1 bg-[#E87722]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* TIME */}
              <div className="flex justify-between text-[10px] text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-[80%] flex flex-col gap-5">
          {/* <p className="text-xs font-semibold tracking-widest uppercase text-gray-600">
            The World&apos;s Premier Culinary College
          </p> */}

        

          {/* <p className="text-sm text-gray-700">
            Experience world-class culinary education and real industry exposure.
          </p> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="text-[#EA393A] flex-shrink-0 mt-1">
                  {f.icon}
                </div>

                <div className="flex flex-col">
                  {/* Title */}
                  <p className="text-sm font-semibold text-gray-800">
                    {f.text}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mt-1 leading-snug text-start">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="relative group overflow-hidden bg-[#EA393A] text-white px-6 py-3 text-sm font-semibold w-fit ml-36 mt-4 transition-all duration-300 ease-out hover:bg-white hover:text-[#EA393A] border border-transparent hover:border-[#EA393A] active:scale-95 shadow-md hover:shadow-red-100">
            <span className="relative z-10">Request More Info</span>

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></div>
          </button>
        </div>
      </div>
    </section>
  );
}