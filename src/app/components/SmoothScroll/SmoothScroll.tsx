"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Longer duration = heavier glide
      lerp: 0.08, // Lower lerp = heavier drag
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),


      smoothWheel: true,
      wheelMultiplier: 0.7, // Lower = heavier feel
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
