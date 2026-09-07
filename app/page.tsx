import Hero from "@/components/Hero/Hero";
import TrustBar from "@/components/TrustBar/TrustBar";
import AboutUs from "@/components/AboutUs/AboutUs";
import ProblemSolution from "@/components/ProblemSolution/ProblemSolution";
import AIAdvisor from "@/components/AIAdvisor/AIAdvisor";
import FeatureGrid from "@/components/FeatureGrid/FeatureGrid";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Rewards from "@/components/Rewards/Rewards";
import ExpertsGrid from "@/components/ExpertsGrid/ExpertsGrid";
import Testimonials from "@/components/Testimonials/Testimonials";
import GetTheApp from "@/components/GetTheApp/GetTheApp";
import FinalCTA from "@/components/FinalCTA/FinalCTA";

/**
 * Homepage — design.md §8 site map, items 2-14b (Navbar and Footer are global chrome,
 * mounted once in app/layout.tsx, not repeated here).
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <AboutUs />
      <ProblemSolution />
      <AIAdvisor />
      <FeatureGrid />
      <HowItWorks />
      <Rewards />
      <ExpertsGrid />
      <Testimonials />
      <GetTheApp />
      <FinalCTA />
    </main>
  );
}
