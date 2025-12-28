import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectUI } from "@/lib/types";
import { DeleteProjectModal } from "./DeleteProjectModal";
import Link from "next/link";

interface Props {
  projects: ProjectUI[];
}

export default function ProjectsCards({ projects }: Props) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div className="rounded-xl border p-4 space-y-3" key={project.id}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-xs text-muted-foreground">{project.role}</p>
            </div>

            <div className="flex gap-1">
              {project.isFlagship && (
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500">
                  Flagship
                </Badge>
              )}
              {project.featured && <Badge variant="outline">Featured</Badge>}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{project.summary}</p>

          <ul className="text-xs text-muted-foreground list-disc pl-4">
            {project.keyFeatures.slice(0, 2).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded bg-muted px-2 py-0.5 text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {project.published ? (
              <Badge>Published</Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}

            <div className="flex gap-2">
              <Link href={`/dashboard/projects/${project.id}/update`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              <DeleteProjectModal projectId={project.id} />
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No projects yet
        </p>
      )}
    </div>
  );
}
