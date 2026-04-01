import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Features from "./components/Features/Features";
import Courses from "./components/Courses/Courses";
import FacebookFeed from "./components/FacebookFeed/FacebookFeed";
import Team from "./components/Team/Team";
import Recipes from "./components/Recipes/Recipes";

export default function Home() {
  return (
    <div className=" bg-white">
      <Banner />
      <Features />
      <Courses />
      <FacebookFeed />
      <Team />
      <Recipes />
      <div className="mt-24">bottom</div>
    </div>
  );
}
