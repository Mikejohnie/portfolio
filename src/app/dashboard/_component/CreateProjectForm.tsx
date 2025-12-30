"use client";

import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createProject } from "@/actions/projectActions";
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
import { Minus, Plus } from "lucide-react";

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
      keyFeatures: "",

      liveUrl: "",
      repoUrl: "",
      isFlagship: false,
      featured: false,
      published: false,
    },
  });

  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({
    control: form.control,
    name: "techStack",
  });

  const onSubmit = (values: createProjectSchemaType) => {
    startTransition(async () => {
      const res = await createProject(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Project created successfully");
      router.push("/dashboard/projects");
    });
  };

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
                  placeholder={`Modern dashboard UI
Role-based access
Permission-based access
`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TECH STACK */}
        <FormItem>
          <FormLabel>Tech Stack</FormLabel>

          <div className="space-y-3">
            {techFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-4 items-center"
              >
                <FormField
                  control={form.control}
                  name={`techStack.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Label</FormLabel>
                      <Input {...field} placeholder="e.g. frontend" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`techStack.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Value</FormLabel>
                      <Input {...field} placeholder="e.g. Next.js" />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeTech(index)}
                >
                  <Minus className="mr-2 h-4 w-4" /> Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => addTech({ key: "", value: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add technology
            </Button>
          </div>

          <FormMessage />
        </FormItem>

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
