"use client";

import React from "react";


/*  Sub-Component: Path Card  */
const PathCard: React.FC<{
  title: string;
  subtitle: string;
  imageUrl: string;
  index: number;
}> = ({ title, subtitle, imageUrl, index }) => {
  return (
    <div
      className="group relative h-[550px] w-full overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-700"
      style={{
        animation: `slowFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.15}s forwards`,
        opacity: 0,
      }}
    >
      <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span className="absolute top-6 right-6  text-5xl text-white/10 font-bold italic group-hover:text-white/20 transition-colors duration-500">
          0{index + 1}
        </span>

        <div className="w-12 h-[2px] bg-[#EA393A] mb-4 group-hover:w-full transition-all duration-500 ease-in-out"></div>

        <h3 className=" text-2xl md:text-3xl text-white font-medium mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>

        <p className="text-gray-200 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {subtitle}
        </p>

        <div className="mt-6 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 delay-200">
          <span className="text-xs uppercase tracking-widest font-semibold">
            Explore Program
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

/*  Main Component  */
const DisciplinesSection: React.FC = () => {
  const paths = [
    {
      title: "Culinary Arts",
      subtitle:
        "Master classical techniques and modern innovation in our professional kitchens.",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Pâtisserie & Baking",
      subtitle: "The science and art of precision pastry and chocolate work.",
      imageUrl:
        "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Food Entrepreneurship",
      subtitle: "From concept to execution in the global hospitality business.",
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Plant-Based Cuisine",
      subtitle:
        "Sustainable, ethical, and flavor-forward cooking for the modern palate.",
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Sommelier & Beverage",
      subtitle:
        "The art of wine pairing and high-end beverage service management.",
      imageUrl:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Executive Management",
      subtitle:
        "Leading world-class kitchens and operations with strategy and vision.",
      imageUrl:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* We include the style tag here to ensure animations work even if HeroBanner is not present */}

      <section className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="container mx-auto mb-20 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-8">
          <div>
            <h2 className=" text-3xl md:text-4xl text-gray-900 mb-2">
              Disciplines of Excellence
            </h2>
            <p className="text-gray-500 font-light max-w-md">
              Choose a specialization designed to refine your skills and
              accelerate your career in the culinary arts.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-red-700 text-xs tracking-widest uppercase font-bold">
              01 — 06
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <PathCard
              key={index}
              index={index}
              title={path.title}
              subtitle={path.subtitle}
              imageUrl={path.imageUrl}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="container mx-auto mt-24 flex justify-center">
          <button className="group relative px-12 py-5 border border-gray-300 text-gray-900 text-sm tracking-widest uppercase hover:border-red-700 hover:text-red-700 transition-all duration-500">
            View Full Prospectus
          </button>
        </div>
      </section>
    </>
  );
};

export default DisciplinesSection;
