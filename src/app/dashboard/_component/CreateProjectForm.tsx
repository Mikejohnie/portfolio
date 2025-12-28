"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createProject } from "@/actions/actions";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/lib/zodValidation";

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

export default function CreateProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      role: "Full-Stack Developer",
      summary: "",
      techStack: [],
      keyFeatures: [],
      liveUrl: "",
      repoUrl: "",
      isFlagship: false,
      featured: false,
      published: false,
    },
  });

  function onSubmit(values: createProjectSchemaType) {
    startTransition(async () => {
      const res = await createProject(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Project created successfully");
      router.push("/dashboard/projects");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl shadow rounded p-6"
      >
        <h1 className="font-medium text-lg">Add Your Project</h1>
        {/* PROJECT NAME */}
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
                <Input placeholder="Full-Stack Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
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
                  placeholder={`Role-based access\nStripe payments\nAdmin dashboard`}
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

        {/* TECH STACK */}
        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <Input
                  placeholder="Next.js, TypeScript, Prisma"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LIVE URL */}
        <FormField
          control={form.control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL</FormLabel>
              <FormControl>
                <Input placeholder="https://…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* REPO URL */}
        <FormField
          control={form.control}
          name="repoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFlagship"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Flagship Project</FormLabel>
            </FormItem>
          )}
        />

        {/* FEATURED */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Featured project</FormLabel>
            </FormItem>
          )}
        />

        {/* PUBLISHED */}
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Publish immediately</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}
