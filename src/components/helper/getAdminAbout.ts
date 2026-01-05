import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { AboutUI, UploadedFile } from "@/lib/types";

export async function getAdminAbout(): Promise<AboutUI | null> {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  const about = await prisma.about.findUnique({
    where: {
      createdById: user.id,
    },
  });

  if (!about) return null;

  return {
    id: about.id,
    fullName: about.fullName,
    headline: about.headline,
    subHeadline: about.subHeadline,
    shortBio: about.shortBio,
    longBio: about.longBio,
    portfolioStartYear: about.portfolioStartYear,

    profileImage: about.profileImage as UploadedFile | undefined,
    heroImage: about.heroImage as UploadedFile | undefined,
    resume: about.resume as UploadedFile | undefined,

    experience: about.experience as AboutUI["experience"],
    skills: about.skills as { name: string }[],

    createdAt: about.createdAt,
    updatedAt: about.updatedAt,
  };
}
