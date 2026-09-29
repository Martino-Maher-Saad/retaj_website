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

export const metadata: Metadata = getPageMetadata("ar", "home");

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero isEn={false} />
      <ProjectsShowcase isEn={false} />
      <ButterflySpotlight isEn={false} />
      <WhyMadinetMasr isEn={false} />
      <TrackRecord isEn={false} />
      <LifestyleFeatures isEn={false} />
      <Footer isEn={false} />
      <FloatingActionBar isEn={false} />
    </div>
  );
}
