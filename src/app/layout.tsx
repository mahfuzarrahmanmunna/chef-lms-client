import type { Metadata } from "next";
import { Raleway, Lato, Allura } from "next/font/google";
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

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
  display: "swap",
});

/*  Metadata  */
export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",

  // 1. Fix the Icons (Browser Tabs)
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }], // Fixed type
    apple: [{ url: "/logo.jpeg", sizes: "180x180", type: "image/jpeg" }],
  },

  // 2. Add Open Graph for Link Previews (WhatsApp, FB, LinkedIn)
  openGraph: {
    title: "Online Chef Courses | Learn Cooking from Experts",
    description:
      "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",
    url: "https://chef-project-seven.vercel.app",
    siteName: "BPSTI Chef Training Institute",
    images: [
      {
        url: "/logo.jpeg", // This is the image that will show in chat previews
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
