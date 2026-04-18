// app/layout.tsx
import type { Metadata } from "next";
import { Raleway, Lato, Allura } from "next/font/google"; // 1. Import Great Vibes
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import NavbarWrapper from "./components/NavbarWrapper/NavbarWrapper";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import FooterWrapper from "./components/FooterWraper/FooterWraper";

/*  Font Configuration  */
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

// 2. Initialize Great Vibes Font
const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura", // This creates the CSS variable
  display: "swap",
});

/*  Metadata  */
export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",
  icons: {
    icon: [{ url: "/logo.jpeg", type: "logo/jpeg" }],
    apple: [
      { url: "/logo.jpeg", sizes: "180x180", type: "logo/jpeg" },
    ],
  },
};

/*  Root Layout  */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 3. Add the new variable to the className
      className={`${raleway.variable} ${lato.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
        <AuthProvider>
          <NavbarWrapper />
          <SmoothScroll />
          <div className="flex-1">{children}</div>
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}