import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

if (!process.env.ACCELERATE_URL) {
  throw new Error("ACCELERATE_URL is not set");
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.ACCELERATE_URL,
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
