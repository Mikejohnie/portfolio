"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { AboutSchemaType, aboutSchema } from "@/lib/zodValidation";

export async function saveAbout(values: AboutSchemaType) {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

  const parsed = aboutSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid About data" };

  const {
    fullName,
    headline,
    subHeadline,
    shortBio,
    email,
    phone,
    location,
    longBio,
    profileImage,
    heroImage,
  } = parsed.data;

  const highlightsArray =
    values.highlights
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  await prisma.about.create({
    data: {
      fullName,
      subHeadline,
      headline,
      shortBio,
      email,
      phone,
      location,
      longBio,
      profileImage,
      heroImage,
      highlights: highlightsArray,
      skills: values.skills ?? [],
      createdById: user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/about");

  return { success: true };
}
