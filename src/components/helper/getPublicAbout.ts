import { prisma } from "@/lib/prisma";
import { AboutUI, UploadedFile } from "@/lib/types";

export async function getPublicAbout(): Promise<AboutUI | null> {
  const about = await prisma.about.findFirst({
    orderBy: { createdAt: "desc" },
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

    experience: about.experience as AboutUI["experience"],
    skills: about.skills as AboutUI["skills"],

    profileImage: about.profileImage as UploadedFile | undefined,
    heroImage: about.heroImage as UploadedFile | undefined,
    resume: about.resume as UploadedFile | undefined,

    createdAt: about.createdAt,
    updatedAt: about.updatedAt,
  };
}
