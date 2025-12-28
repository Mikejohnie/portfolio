"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  updateProjectSchema,
  UpdateProjectSchemaType,
} from "@/lib/zodValidation";
import { updateProject } from "@/actions/actions";
import { ProjectUI } from "@/lib/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type ProjectFormProps = {
  project: ProjectUI;
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
      role: project.role,
      summary: project.summary,
      techStack: project.techStack,
      keyFeatures: project.keyFeatures,
      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      isFlagship: project.isFlagship,
      featured: project.featured,
      published: project.published,
    },
  });

  function onSubmit(values: UpdateProjectSchemaType) {
    startTransition(async () => {
      const res = await updateProject(project.id, values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Project updated");
      router.push("/dashboard/projects");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Role</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Summary</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyFeatures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  value={field.value.join("\n")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split("\n")
                        .map((f) => f.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Update Project"}
        </Button>
      </form>
    </Form>
  );
}
