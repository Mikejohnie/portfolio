import { prisma } from "@/lib/prisma";
import { ProjectDB } from "@/lib/types";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export async function getProjectForEdit(id: string): Promise<ProjectDB | null> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!project) return null;

  return {
    id: project.id,
    name: project.name,
    role: project.role,
    summary: project.summary,
    description: project.description,
    keyFeatures: project.keyFeatures ?? [],
    images: project.images ?? [],
    techStack: (project.techStack ?? []) as { key: string; value: string }[],
    isFlagship: project.isFlagship,
    featured: project.featured,
    published: project.published,
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    createdAt: project.createdAt,
  };
}
