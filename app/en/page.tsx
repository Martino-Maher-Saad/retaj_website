import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ButterflySpotlight from "@/components/ButterflySpotlight";
import WhyMadinetMasr from "@/components/WhyMadinetMasr";
import TrackRecord from "@/components/TrackRecord";
import LifestyleFeatures from "@/components/LifestyleFeatures";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("en", "home");

export default function HomeEn() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero isEn={true} />
      <ProjectsShowcase isEn={true} />
      <ButterflySpotlight isEn={true} />
      <WhyMadinetMasr isEn={true} />
      <TrackRecord isEn={true} />
      <LifestyleFeatures isEn={true} />
      <Footer isEn={true} />
      <FloatingActionBar isEn={true} />
    </div>
  );
}
