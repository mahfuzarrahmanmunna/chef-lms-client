import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Features from "./components/Features/Features";
import Courses from "./components/Courses/Courses";
import FacebookFeed from "./components/FacebookFeed/FacebookFeed";
import Team from "./components/Team/Team";
import Recipes from "./components/Recipes/Recipes";
import FeaturedCourses from "./components/FeaturedCourse/FeaturedCourse";
import MasterChef from "./components/MasterChef/MasterChef";
import VideoSection from "./components/VideoSection/VideoSection";
import DisciplinesSection from "./components/Banner/DisciplinesSection";
import FeatureCourse from "./components/FeatureCourse/FeatureCourse";
import ContactCTA from "./components/CTA/CTA";

export default function Home() {
  return (
    <div className=" bg-white">
      <Banner />
      <FeatureCourse/>
      <Features />
      <Courses />
      <DisciplinesSection/>
      <FacebookFeed />
      <Team />
      {/* <Recipes /> */}
      <VideoSection/>
      <ContactCTA/>
      {/* <FeaturedCourses /> */}
      <div className="mt-24">bottom</div>
    </div>
  );
}
