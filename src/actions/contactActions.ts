"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { ContactSchemaType, contactSchema } from "@/lib/zodValidation";

export async function saveContact(values: ContactSchemaType) {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid contact data" };
  }

  const {
    email,
    phone,
    location,

    openToRelocation,
    availableForWork,
  } = parsed.data;

  await prisma.contact.upsert({
    where: { createdById: user.id },
    create: {
      email,
      phone,
      location,

      github: values.github || null,
      linkedin: values.linkedin || null,
      twitter: values.twitter || null,
      website: values.website || null,

      openToRelocation,
      availableForWork,
      createdById: user.id,
    },
    update: {
      email,
      phone,
      location,

      github: values.github || null,
      linkedin: values.linkedin || null,
      twitter: values.twitter || null,
      website: values.website || null,

      openToRelocation,
      availableForWork,
    },
  });

  revalidatePath("/dashboard/contact");
  revalidatePath("/");

  return { success: true };
}

export async function deleteContact() {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.contact.delete({
    where: { createdById: user.id },
  });

  revalidatePath("/dashboard/contact");
  revalidatePath("/");

  return { success: true };
}
