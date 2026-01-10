import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [projectsCount, unreadMessagesCount, analytics] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count({
      where: { read: false },
    }),
    prisma.portfolioAnalytics.findFirst({
      orderBy: { date: "desc" },
    }),
  ]);

  return {
    projects: projectsCount,
    messages: unreadMessagesCount,
    visitors: analytics?.totalVisitors ?? 0,
    resumeDownloads: analytics?.resumeDownloads ?? 0,
  };
}
