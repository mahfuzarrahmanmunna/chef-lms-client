"use client";

import React, { useEffect, useState } from "react";
// Removed: import Image from "next/image";
import {
  Clock,
  Users,
  Flame,
  ChefHat,
  Utensils,
  ArrowRight,
} from "lucide-react";

/*  Types  */
interface Recipe {
  id: number;
  title: string;
  chef: string;
  difficulty: string;
  time: string;
  servings: number;
  calories: number;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

/*  Utilities  */
const getDifficultyStyles = (level: string) => {
  switch (level) {
    case "Easy":
      return "bg-emerald-50/90 text-emerald-700 border-emerald-100";
    case "Medium":
      return "bg-amber-50/90 text-amber-700 border-amber-100";
    case "Hard":
      return "bg-rose-50/90 text-rose-700 border-rose-100";
    default:
      return "bg-gray-50/90 text-gray-600 border-gray-100";
  }
};

/*  Sub-Component: Difficulty Badge  */
const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-sm shadow-sm transition-transform hover:scale-105 ${getDifficultyStyles(
        level,
      )}`}
    >
      {level}
    </span>
  );
};

/*  Sub-Component: Recipe Card  */
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Image Section with Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {/* CHANGED: Used standard <img> instead of Next.js <Image> */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Difficulty Badge Overlay */}
        <div className="absolute top-4 right-4 z-10">
          <DifficultyBadge level={recipe.difficulty} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header: Title & Chef */}
        <div className="mb-3">
          <h3 className="text-xl font-serif font-bold text-gray-900 tracking-tight leading-snug mb-2 group-hover:text-[#c9a96e] transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <ChefHat className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wide">{recipe.chef}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {recipe.description}
        </p>

        {/* Meta Data (Cleaner Layout) */}
        <div className="flex items-center justify-between py-4 mb-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{recipe.servings} Servings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{recipe.calories} kcal</span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-6">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Key Ingredients
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.slice(0, 3).map((ing, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100"
              >
                {ing}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-[11px] font-medium bg-gray-50 text-gray-400 px-2 py-1 rounded-md border border-gray-100">
                +{recipe.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <button className="w-full group/btn flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-widest text-white bg-gray-900 rounded-lg hover:bg-[#c9a96e] transition-colors duration-300">
            <span>View Recipe</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

/*  Main Component  */
export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col justify-center items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-[#c9a96e]" />
        <p className="text-sm text-gray-500 font-medium animate-pulse">
          Loading culinary masterpieces...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center px-6">
        <div className="inline-block p-4 rounded-full bg-red-50 text-red-600 mb-4">
          <Utensils className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Oops!</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/40 -skew-x-12 transform translate-x-1/4 z-0 hidden lg:block" />

      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a96e] via-gray-200 to-transparent z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest mb-4 border border-red-100">
            From Our Kitchen
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Featured Recipes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
            <div className="h-px w-12 bg-gray-300" />
          </div>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Explore our curated collection of signature dishes. From quick
            weeknight meals to gourmet centerpieces crafted with passion.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <button className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 border-2 border-gray-900 rounded-lg overflow-hidden transition-all hover:text-white hover:border-[#c9a96e] hover:bg-[#c9a96e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9a96e]">
            <span className="relative z-10 flex items-center gap-2">
              View All Recipes
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
