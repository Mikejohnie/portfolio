import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ProjectImage, ProjectUI } from "@/lib/types";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { FolderCode } from "lucide-react";

interface Props {
  projects: ProjectUI[];
}

export default function ProjectsCards({ projects }: Props) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          {/* HEADER */}
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <CardDescription className="text-xs">
                  {project.role}
                </CardDescription>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.isFlagship && (
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500">
                    Flagship
                  </Badge>
                )}
                {project.featured && <Badge variant="outline">Featured</Badge>}
              </div>
            </div>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{project.summary}</p>

            {/* KEY FEATURES */}
            {project.keyFeatures.length > 0 && (
              <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                {project.keyFeatures.slice(0, 2).map((feature, index) => (
                  <li key={`${project.id}-${index}`}>{feature}</li>
                ))}
              </ul>
            )}

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge
                  key={tech.key}
                  variant="secondary"
                  className="rounded-sm text-xs px-2 py-0.5"
                >
                  {tech.value}
                </Badge>
              ))}

              {project.techStack.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex items-center justify-between">
            <Badge variant={project.published ? "default" : "secondary"}>
              {project.published ? "Published" : "Draft"}
            </Badge>

            <div className="flex gap-2">
              <Link href={`/dashboard/projects/${project.id}/update`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>

              <DeleteProjectModal projectId={project.id} />
            </div>
          </CardFooter>
        </Card>
      ))}

      {projects.length === 0 && (
        <EmptyState
          icon={<FolderCode className="h-6 w-6" />}
          title="No projects yet"
          description="You haven’t added any projects yet. Start by creating your first project."
          actionLabel="Create Project"
          actionHref="/dashboard/projects/add"
        />
      )}
    </div>
  );
}
