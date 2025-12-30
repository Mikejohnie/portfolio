import ProjectForm from "@/app/dashboard/_component/ProjectForm";
import { getProjectForEdit } from "@/components/helper/data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const projectId = (await params).id;

  const project = await getProjectForEdit(projectId);

  if (!project) redirect("/dashboard/projects");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Update Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
