import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs. Beginner to advanced level cooking classes available.",
  keywords: [
    "chef course",
    "online cooking course",
    "learn cooking",
    "chef training",
    "culinary course",
    "baking course",
    "professional chef training",
    "cooking classes online",
  ],
  authors: [{ name: "Chef Academy" }],
  creator: "Chef Academy",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Online Chef Courses | Learn Cooking from Experts",
    description:
      "Learn cooking from professional chefs. Join online chef courses today.",
    url: "https://yourdomain.com",
    siteName: "Chef Academy",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        cz-shortcut-listen="true"
        className="min-h-full flex flex-col bg-white"
      >
        <Navbar />
        {/* <AnimatedCursor
          showSystemCursor={true}
          color="#fff"
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          outerStyle={{
            border: "2px solid rgba(0,150,255,0.8)",
            backgroundColor: "transparent",
            borderRadius: "50%",
          }}
          innerStyle={{
            backgroundColor: "rgba(0,150,255,1)",
            borderRadius: "50%",
          }}
        /> */}

        {children}
      </body>
    </html>
  );
}
