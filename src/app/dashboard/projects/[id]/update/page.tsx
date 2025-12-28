import ProjectForm from "@/app/dashboard/_component/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const projectId = (await params).id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Update Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
