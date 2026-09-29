import { notFound } from "next/navigation";
import type { Metadata } from "next";
import projectsData from "@/data/projects.json";
import { getPageMetadata, type StandardPageKey } from "@/lib/seo";

import ProjectHero from "@/components/project/ProjectHero";
import ProjectLocation from "@/components/project/ProjectLocation";
import ProjectMasterplan from "@/components/project/ProjectMasterplan";
import ProjectPricingPhases from "@/components/project/ProjectPricingPhases";
import ProjectPhasesShowcase from "@/components/project/ProjectPhasesShowcase";
import ProjectDelivered from "@/components/project/ProjectDelivered";
import ProjectFAQ from "@/components/project/ProjectFAQ";
import ProjectLeadSection from "@/components/project/ProjectLeadSection";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getPageMetadata("en", slug as StandardPageKey);
}

export default async function ProjectPageEn({ params }: PageProps) {
  const { slug } = await params;
  type ProjectItem = (typeof projectsData)[keyof typeof projectsData];
  const project = (projectsData as Record<string, ProjectItem>)[slug];

  if (!project) {
    notFound();
  }

  // Collect fallback images from units for delivered communities
  const fallbackImages = (project.units as { image?: string }[])
    .map((u) => u.image)
    .filter((img): img is string => Boolean(img));

  return (
    <div className="flex-1 flex flex-col">
      <ProjectHero project={project} isEn={true} />
      <ProjectLocation
        projectName={project.name}
        locationSection={project.locationSection}
        isEn={true}
      />
      <ProjectMasterplan project={project} isEn={true} />
      <ProjectPricingPhases
        projectSlug={slug}
        projectName={project.name}
        pricingSection={project.pricingSection}
        phases={project.phases}
        units={project.units}
        isEn={true}
      />
      <ProjectPhasesShowcase
        projectName={project.name}
        phases={project.phases}
        units={project.units}
        isEn={true}
      />
      <ProjectDelivered
        projectName={project.name}
        deliveredTrackRecord={project.deliveredTrackRecord}
        fallbackImages={fallbackImages}
        isEn={true}
      />
      <ProjectFAQ faqs={project.projectFaqs} isEn={true} />
      <ProjectLeadSection
        projectName={project.name}
        projectSlug={slug}
        isEn={true}
      />
      <Footer isEn={true} />
      <FloatingActionBar isEn={true} />
    </div>
  );
}
