"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import {
  createProjectSchema,
  createProjectSchemaType,
  updateProjectSchema,
  UpdateProjectSchemaType,
} from "@/lib/zodValidation";

export async function createProject(values: createProjectSchemaType) {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

  const parsed = createProjectSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid project data" };

  const {
    name,
    role,
    summary,
    description,
    liveUrl,
    repoUrl,
    isFlagship,
    featured,
    published,
    images,
  } = parsed.data;

  const keyFeaturesArray =
    values.keyFeatures
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  await prisma.project.create({
    data: {
      name,
      role,
      summary,
      description,
      liveUrl,
      repoUrl,
      isFlagship,
      featured,
      published,
      images,
      keyFeatures: keyFeaturesArray,
      techStack: values.techStack ?? [],
      createdById: user.id,
    },
  });

  revalidatePath("/dashboard/projects");
  return { success: true };
}

export async function updateProject(
  projectId: string,
  values: UpdateProjectSchemaType
) {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const parsed = updateProjectSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid project data" };
  }

  const {
    name,
    role,
    summary,
    description,
    liveUrl,
    repoUrl,
    isFlagship,
    featured,
    published,
  } = parsed.data;

  const keyFeaturesArray =
    values.keyFeatures
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  await prisma.project.update({
    where: { id: projectId },
    data: {
      name,
      role,
      summary,
      description,
      liveUrl,
      repoUrl,
      isFlagship,
      featured,
      published,
      keyFeatures: keyFeaturesArray,
      techStack: values.techStack ?? [],
      createdById: user.id,
    },
  });

  revalidatePath("/dashboard/projects");

  return { success: true };
}

export async function deleteProject(projectId: string) {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  revalidatePath("/dashboard/projects");
  return { success: true };
}
