import { prisma } from "@/lib/prisma";
import ProjectsCards from "../_component/ProjectsCards";
import ProjectsTable from "../_component/ProjectsTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  const normalized = projects.map((p) => ({
    ...p,
    images: p.images ?? [],
    keyFeatures: p.keyFeatures ?? [],
    techStack: (p.techStack ?? []) as { key: string; value: string }[],
  }));

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Link href={"/dashboard/projects/add"}>
          <Plus />
        </Link>
      </header>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <ProjectsTable projects={normalized} />
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <ProjectsCards projects={normalized} />
      </div>
    </div>
  );
}
