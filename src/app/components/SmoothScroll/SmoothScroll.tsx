"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      // smoothTouch removed (not supported in current types)
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // --- FIX FOR "STUCK IN MIDDLE" ISSUE ---
    // ResizeObserver detects when the page content changes size (e.g., images loading)
    // and tells Lenis to update its limits immediately.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    // Observe the body to catch any height changes on the page
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
