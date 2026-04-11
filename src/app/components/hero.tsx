"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { JSX, useRef, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const SLIDE_DELAY = 6000;

const slides = [
  {
    type: "video",
    src: "/hero.mp4",
    poster: "/video-poster.jpg",
    tag: "Welcome to Culinary Excellence",
    title: ["Do You Want", "To Be A"],
    highlight: "Chef?",
    sub: "Master the art of cooking with world-class chefs and transform your passion into a profession.",
    ctas: [
      { label: "Get Started", primary: true },
      { label: "Watch Demo", primary: false },
    ],
    accent: "#f97316",
  },
  {
    type: "image",
    src: "/Website.png",
    alt: "Website Image",
    tag: "",
    title: [],
    highlight: "",
    sub: "",
    ctas: [],
    accent: "#f97316",
  },
];

const stats = [
  { value: "5,000+", label: "Graduates" },
  { value: "120+", label: "Expert Chefs" },
  { value: "98%", label: "Placement Rate" },
  { value: "25+", label: "Awards Won" },
];

export default function HeroCarousel(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedProgressRef = useRef(0);

  const startProgress = (fromValue = 0) => {
    setProgress(fromValue);
    if (progressInterval.current) clearInterval(progressInterval.current);
    const step = 100 / (SLIDE_DELAY / 50);
    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval.current!);
          return 100;
        }
        pausedProgressRef.current = p + step;
        return p + step;
      });
    }, 50);
  };

  const handlePlayPause = () => {
    if (!swiperRef.current) return;
    if (isPaused) {
      swiperRef.current.autoplay.start();
      startProgress(pausedProgressRef.current);
      if (activeIndex === 0 && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      setIsPaused(false);
    } else {
      swiperRef.current.autoplay.stop();
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (videoRef.current) videoRef.current.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    if (!isPaused) startProgress();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    if (videoRef.current) {
      swiper.realIndex === 0
        ? videoRef.current.play().catch(() => {})
        : videoRef.current.pause();
    }
    
    if (swiper.realIndex !== 0 && isPaused) {
      setIsPaused(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
      startProgress(0);
    }
  };

  const isVideoSlide = activeIndex === 0;

  return (
    <div className="hero-carousel-root">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: ".hero-btn-next",
          prevEl: ".hero-btn-prev",
        }}
        pagination={false}
        autoplay={{
          delay: SLIDE_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={false}
        speed={1200}
        className="hero-swiper"
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="slide-inner">
              {/* Media */}
              {slide.type === "video" ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.poster}
                  className="slide-media"
                >
                  <source src={slide.src} type="video/mp4" />
                  <source src="/hero.webm" type="video/webm" />
                </video>
              ) : (
                <div className="image-wrapper">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="slide-image-custom"
                  />
                </div>
              )}

              {/* Overlays */}
              <div className={`overlay-base ${i === 1 ? 'overlay-light' : ''}`} />
              <div className={`overlay-vignette ${i === 1 ? 'overlay-light' : ''}`} />
              <div className={`overlay-bottom ${i === 1 ? 'overlay-light' : ''}`} />

              <div className="grain" />

              {/* Content - Only for video slide */}
              {i === 0 && (
                <div className="slide-content">
                  <div className="tag-pill">
                    <span className="tag-dot" />
                    {slide.tag}
                  </div>

                  <h1 className="slide-title">
                    {slide.title.map((line, j) => (
                      <span key={j} className="title-line">
                        {line}
                      </span>
                    ))}
                    <br />
                    <span className="title-highlight">{slide.highlight}</span>
                  </h1>

                  <p className="slide-sub">{slide.sub}</p>

                  <div className="cta-row">
                    {slide.ctas.map((cta, k) =>
                      cta.primary ? (
                        <button key={k} className="cta-primary">
                          <span>{cta.label}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      ) : (
                        <button key={k} className="cta-ghost">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7 6.5l4.5 2.5L7 11.5V6.5z" fill="currentColor" />
                          </svg>
                          {cta.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {i === 0 && (
                <div className="scroll-indicator">
                  <div className="scroll-mouse">
                    <div className="scroll-dot" />
                  </div>
                  <span>Scroll</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <button className="hero-btn-prev hero-nav-btn" aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="hero-btn-next hero-nav-btn" aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Play/Pause button */}
      {isVideoSlide && (
        <button
          className="hero-playpause-btn"
          onClick={handlePlayPause}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
      )}

      {/* Slide counter */}
      <div className="slide-counter">
        <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="counter-track">
          <div className="counter-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="counter-total">{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Dot navigation */}
      <div className="dot-nav">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? "dot-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats strip */}
      <div className="stats-strip">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hero-carousel-root {
          position: relative;
          height: 100vh;
          width: 100%;
          margin-top: 0;
          overflow: hidden;
          background: #0a0a0a;
        }

        .hero-swiper {
          height: 100%;
          width: 100%;
        }

        .slide-inner {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
          transition: transform 8s ease-out;
        }

        :global(.swiper-slide-active) .slide-media {
          transform: scale(1);
        }

        /* Image wrapper and custom size */
        .image-wrapper {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .slide-image-custom {
          width: 60%;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: fadeInScale 0.8s ease-out;
          position: relative;
          z-index: 10;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Overlays */
        .overlay-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.2) 100%);
          z-index: 1;
        }

        .overlay-base.overlay-light {
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%);
        }

        .overlay-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
          z-index: 2;
        }

        .overlay-vignette.overlay-light {
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%);
        }

        .overlay-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          z-index: 3;
        }

        .overlay-bottom.overlay-light {
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%);
        }

        /* Grain */
        .grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
          pointer-events: none;
        }

        /* Content */
        .slide-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding: 0 6% 180px;
          max-width: 900px;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.4);
          color: #fb923c;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
          width: fit-content;
          backdrop-filter: blur(8px);
          opacity: 0;
          transform: translateY(20px);
          animation: none;
        }

        :global(.swiper-slide-active) .tag-pill {
          animation: slideUp 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 6px #f97316;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .slide-title {
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          text-transform: uppercase;
        }

        .title-line {
          display: block;
          opacity: 0;
          transform: translateY(40px);
          animation: none;
        }

        :global(.swiper-slide-active) .title-line:nth-child(1) {
          animation: slideUp 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        :global(.swiper-slide-active) .title-line:nth-child(2) {
          animation: slideUp 0.7s 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .title-highlight {
          color: #f97316;
          display: inline-block;
          opacity: 0;
          transform: translateY(40px);
          animation: none;
          position: relative;
        }

        .title-highlight::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 3px;
          background: #f97316;
          transform: scaleX(0);
          transform-origin: left;
          border-radius: 2px;
        }

        :global(.swiper-slide-active) .title-highlight {
          animation: slideUp 0.7s 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        :global(.swiper-slide-active) .title-highlight::after {
          animation: lineExpand 0.6s 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes lineExpand {
          to { transform: scaleX(1); }
        }

        .slide-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(255,255,255,0.72);
          max-width: 520px;
          line-height: 1.7;
          margin: 0 0 36px;
          opacity: 0;
          transform: translateY(20px);
          animation: none;
        }

        :global(.swiper-slide-active) .slide-sub {
          animation: slideUp 0.7s 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          animation: none;
        }

        :global(.swiper-slide-active) .cta-row {
          animation: slideUp 0.7s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #f97316;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }

        .cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-100%);
          transition: transform 0.3s;
        }

        .cta-primary:hover::before {
          transform: translateX(0);
        }

        .cta-primary:hover {
          background: #ea6d0d;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(249, 115, 22, 0.45);
        }

        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 24px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.25s;
        }

        .cta-ghost:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-2px);
        }

        .hero-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          cursor: pointer;
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s;
        }

        .hero-nav-btn:hover {
          background: #f97316;
          border-color: #f97316;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
        }

        .hero-btn-prev { left: 28px; }
        .hero-btn-next { right: 28px; }

        .hero-playpause-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 25;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(249, 115, 22, 0.85);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: #fff;
          cursor: pointer;
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 0 40px rgba(249, 115, 22, 0.5);
          animation: fadeInScale 0.5s ease-out;
        }

        .hero-playpause-btn:hover {
          background: #f97316;
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 0 60px rgba(249, 115, 22, 0.8);
          border-color: rgba(255, 255, 255, 0.7);
        }

        .slide-counter {
          position: absolute;
          bottom: 160px;
          right: 40px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          font-variant-numeric: tabular-nums;
        }

        .counter-current {
          color: #fff;
          font-size: 16px;
        }

        .counter-track {
          width: 60px;
          height: 2px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .counter-fill {
          height: 100%;
          background: #f97316;
          border-radius: 2px;
          transition: width 0.05s linear;
        }

        .dot-nav {
          position: absolute;
          bottom: 130px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          gap: 10px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .dot-active {
          width: 28px;
          border-radius: 3px;
          background: #f97316;
        }

        .stats-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 18px 12px;
          border-right: 1px solid rgba(255,255,255,0.08);
          gap: 2px;
        }

        .stat-item:last-child {
          border-right: none;
        }

        .stat-value {
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: #f97316;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 90px;
          left: 6%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.4);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }

        .scroll-dot {
          width: 3px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 2px;
          animation: scrollAnim 1.8s ease-in-out infinite;
        }

        @keyframes scrollAnim {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .slide-content {
            padding: 0 5% 160px;
          }

          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-item:nth-child(2) {
            border-right: none;
          }

          .hero-nav-btn {
            width: 42px;
            height: 42px;
          }

          .hero-btn-prev { left: 14px; }
          .hero-btn-next { right: 14px; }

          .slide-counter {
            right: 20px;
            bottom: 190px;
          }

          .hero-playpause-btn {
            width: 60px;
            height: 60px;
          }

          .slide-image-custom {
            width: 85%;
            max-height: 60vh;
          }
        }
      `}</style>
    </div>
  );
}