import ProjectForm from "@/app/dashboard/_component/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
