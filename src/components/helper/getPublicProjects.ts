import { prisma } from "@/lib/prisma";
import { ProjectUI } from "@/lib/types";

export async function getPublicProjects(): Promise<ProjectUI[]> {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { isFlagship: "desc" },
      { featured: "desc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      name: true,
      role: true,
      summary: true,
      images: true,
      description: true,
      keyFeatures: true,
      techStack: true,
      isFlagship: true,
      featured: true,
      published: true,
      liveUrl: true,
      repoUrl: true,
      createdAt: true,
    },
  });

  return projects.map((p) => ({
    ...p,
    images: p.images as ProjectUI["images"],
    techStack: (p.techStack ?? []) as { key: string; value: string }[],
  }));
}
