import Banner from "./components/Banner/Banner";
import Features from "./components/Features/Features";
import Courses from "./components/Courses/Courses";
import FacebookFeed from "./components/FacebookFeed/FacebookFeed";
import Team from "./components/Team/Team";
import VideoSection from "./components/VideoSection/VideoSection";
import ContactCTA from "./components/CTA/CTA";
import SuccessStories from "./components/SuccessStories/SuccessStories";
import EmployerSection from "./components/EmployerSection/EmployerSection";
import CoursesSection from "./components/CoursesSection";

export default function Home() {
  return (
    <div className="bg-white space-y-20">
      <Banner />
      {/* <FeatureCourse/> */}
      <CoursesSection/>
      <Features />
      <Courses />
      {/* <FacebookFeed /> */}
      <Team />
      <VideoSection/>
      <EmployerSection/>
      <SuccessStories/>
      <ContactCTA/>
      {/* <FeaturedCourses /> */}
      {/* <div className="mt-24">bottom</div> */}
    </div>
  );
}
