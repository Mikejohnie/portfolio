"use server";

import { prisma } from "@/lib/prisma";
import {
  ContactMessageSchemaType,
  contactMessageSchema,
} from "@/lib/zodValidation";
import { trackContactSubmit } from "./analyticsActions";

export async function sendContactMessage(values: ContactMessageSchemaType) {
  const parsed = contactMessageSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid form submission",
    };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
        source: "PORTFOLIO",
      },
    });

    await trackContactSubmit();

    return { success: true };
  } catch (error) {
    console.error("Contact message error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
