import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import FAQView from "@/components/faq/FAQView";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "faq");
}

export default function FAQPageEn() {
  return (
    <div className="flex-1 flex flex-col pt-16 sm:pt-20">
      <FAQView isEn={true} />
      <Footer isEn={true} />
      <FloatingActionBar isEn={true} />
    </div>
  );
}
