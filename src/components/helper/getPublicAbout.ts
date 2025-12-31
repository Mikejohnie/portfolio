import { prisma } from "@/lib/prisma";
import { AboutUI } from "@/lib/types";

export async function getPublicAbout(): Promise<AboutUI | null> {
  const about = await prisma.about.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!about) return null;

  return {
    ...about,
    highlights: (about.highlights as string[]) ?? [],
    skills: (about.skills as { label: string; value: string }[]) ?? [],
  };
}
