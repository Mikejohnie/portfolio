"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { AboutSchemaType, aboutSchema } from "@/lib/zodValidation";
import { AboutUI } from "@/lib/types";

export async function getAbout(): Promise<AboutUI | null> {
  const user = await CurrentUser();
  if (!user) return null;

  const data = await prisma.about.findUnique({
    where: { createdById: user.id },
  });

  if (!data) return null;

  return {
    ...data,
    highlights: Array.isArray(data.highlights)
      ? (data.highlights as { label: string; value: string }[])
      : [],
    skills: Array.isArray(data.skills) ? (data.skills as string[]) : [],
  };
}

export async function saveAbout(values: AboutSchemaType) {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

  const parsed = aboutSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid About data" };

  await prisma.about.upsert({
    where: { createdById: user.id },
    create: {
      ...parsed.data,
      createdById: user.id,
    },
    update: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/dashboard/about");

  return { success: true };
}
