import type { Metadata } from "next";
import { Raleway } from "next/font/google"; // Removed Lato and Allura
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import NavbarWrapper from "./components/NavbarWrapper/NavbarWrapper";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import FooterWrapper from "./components/FooterWraper/FooterWraper";

/*  Font Configuration - ONLY RALEWAY  */
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

/*  Metadata  */
export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",

  // 1. Fix the Icons (Browser Tabs)
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },

  // 2. Add Open Graph for Link Previews
  openGraph: {
    title: "Online Chef Courses | Learn Cooking from Experts",
    description:
      "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",
    url: "https://chef-project-seven.vercel.app",
    siteName: "BPSTI Chef Training Institute",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "BPSTI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
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
      className={`${raleway.variable} h-full antialiased`} // Removed lato and allura variables
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
