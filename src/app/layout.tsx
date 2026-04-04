import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import dynamic from "next/dynamic";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
// import SmoothScroll from "./components/SmoothScroll"; // <--- Import here

/*  Font Configuration  */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



/*  Metadata  */
export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs. Beginner to advanced level cooking classes available.",
  // ... (rest of your metadata)
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
        <Navbar />

        {/* <--- ADD SMOOTH SCROLL HERE ---> */}
        <SmoothScroll />

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
