// app/layout.tsx
import type { Metadata } from "next";
import { Raleway, Lato, Great_Vibes } from "next/font/google"; // 1. Import Great Vibes
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
<<<<<<< HEAD
import NavbarWrapper from "./components/NavbarWrapper/NavbarWrapper";
import Footer from "./components/Footer/Footer";
=======
import { AuthProvider } from "@/hooks/useAuth"; // Add this import
>>>>>>> 4f3bfc80650d8e2c5453d196eec07d5916afcc1a

/*  Font Configuration  */
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

<<<<<<< HEAD
// 2. Initialize Great Vibes Font
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes", // This creates the CSS variable
  display: "swap",
});

=======
>>>>>>> 4f3bfc80650d8e2c5453d196eec07d5916afcc1a
/*  Metadata  */
export const metadata: Metadata = {
  title: "Online Chef Courses | Learn Cooking from Experts",
  description:
<<<<<<< HEAD
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs.",
=======
    "Join professional chef courses online. Learn cooking, baking, and culinary skills from expert chefs. Beginner to advanced level cooking classes available.",
>>>>>>> 4f3bfc80650d8e2c5453d196eec07d5916afcc1a
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
      // 3. Add the new variable to the className
      className={`${raleway.variable} ${lato.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
<<<<<<< HEAD
        <NavbarWrapper />
        <SmoothScroll />
        <div className="flex-1">{children}</div>
        <Footer />
=======
        <AuthProvider> {/* Wrap everything with AuthProvider */}
          <Navbar />
          <SmoothScroll />
          <div className="flex-1">{children}</div>
        </AuthProvider>
>>>>>>> 4f3bfc80650d8e2c5453d196eec07d5916afcc1a
      </body>
    </html>
  );
}