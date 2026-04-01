"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Users, Flame, ChefHat, Utensils } from "lucide-react";

/* ──────────────── Types ──────────────── */
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

/* ──────────────── Sub-Component: Difficulty Badge ──────────────── */
const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  let colorClass = "bg-gray-100 text-gray-600";
  if (level === "Easy") colorClass = "bg-green-100 text-green-700";
  if (level === "Medium") colorClass = "bg-yellow-100 text-yellow-700";
  if (level === "Hard") colorClass = "bg-red-100 text-red-700";

  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${colorClass}`}
    >
      {level}
    </span>
  );
};

/* ──────────────── Sub-Component: Recipe Card ──────────────── */
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Difficulty Badge Overlay */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-white/50">
          <DifficultyBadge level={recipe.difficulty} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header: Title & Chef */}
        <div className="mb-4">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-[#c9a96e] transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ChefHat className="w-3 h-3" />
            <span>{recipe.chef}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-1">
          {recipe.description}
        </p>

        {/* Meta Data (Time, Servings, Calories) */}
        <div className="grid grid-cols-3 gap-2 mb-6 border-t border-b border-gray-100 py-3">
          <div className="flex flex-col items-center justify-center text-center">
            <Clock className="w-4 h-4 text-gray-400 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">
              {recipe.time}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-gray-100">
            <Users className="w-4 h-4 text-gray-400 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">
              {recipe.servings} Serves
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Flame className="w-4 h-4 text-gray-400 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">
              {recipe.calories} Kcal
            </span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-6">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Key Ingredients
          </h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ing, i) => (
              <span
                key={i}
                className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded"
              >
                {ing}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded">
                +{recipe.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button className="w-full cursor-pointer py-2.5 text-sm font-bold uppercase tracking-widest text-white bg-gray-900 hover:bg-[#c9a96e] transition-colors duration-300 rounded flex items-center justify-center gap-2">
            <Utensils className="w-4 h-4" />
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

/* ──────────────── Main Component ──────────────── */
export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
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
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a96e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-bold">
        Error loading recipes: {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 skew-x-12 transform translate-x-1/4 z-0"></div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c9a96e] font-bold tracking-widest text-xs uppercase mb-2 block">
            From Our Kitchen
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Featured Recipes
          </h2>
          <div className="w-24 h-1 bg-[#c9a96e] mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our curated collection of signature dishes. From quick
            weeknight meals to gourmet centerpieces.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-block px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-sm">
            View All Recipes
          </button>
        </div>
      </div>
    </section>
  );
}
