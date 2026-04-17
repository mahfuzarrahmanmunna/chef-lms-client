"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";
// import Navbar from "./Navbar/Navbar";

export default function FooterWrapper() {
  const pathname = usePathname();

  // List of routes where we DON'T want to show the navbar
  const hiddenRoutes = ["/signin", "/signup", "/dashboard"];

  // Check if the current path starts with any of the hidden routes
  const isHidden = hiddenRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // If hidden, render nothing. Otherwise, render the Navbar.
  if (isHidden) {
    return null;
  }

  return <Footer />;
}
