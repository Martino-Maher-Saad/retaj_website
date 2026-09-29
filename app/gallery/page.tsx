import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import GalleryView from "@/components/gallery/GalleryView";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("ar", "gallery");
}

export default function GalleryPage() {
  return (
    <div className="flex-1 flex flex-col pt-16 sm:pt-20">
      <GalleryView isEn={false} />
      <Footer isEn={false} />
      <FloatingActionBar isEn={false} />
    </div>
  );
}
