"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  updateProjectSchema,
  UpdateProjectSchemaType,
} from "@/lib/zodValidation";
import { updateProject } from "@/actions/projectActions";
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

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { deleteProjectImageAction } from "@/actions/aboutActions";

type Props = {
  project: ProjectUI;
};

export default function UpdateProjectForm({ project }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
      role: project.role,
      summary: project.summary,
      description: project.description ?? "",

      keyFeatures: project.keyFeatures.join("\n"),
      techStack: project.techStack ?? [],

      images: project.images ?? [],

      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",

      isFlagship: project.isFlagship,
      featured: project.featured,
      published: project.published,
    },
  });

  const { control, handleSubmit, setValue, getValues, reset } = form;

  useEffect(() => {
    if (!project) return;

    reset({
      name: project.name,
      role: project.role,
      summary: project.summary,
      description: project.description ?? "",
      keyFeatures: project.keyFeatures.join("\n"),
      techStack: project.techStack ?? [],
      images: project.images ?? [],
      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      isFlagship: project.isFlagship,
      featured: project.featured,
      published: project.published,
    });
  }, [project, reset]);

  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({ control, name: "techStack" });

  const { fields: imageFields, update: updateImage } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (values: UpdateProjectSchemaType) => {
    startTransition(async () => {
      const res = await updateProject(project.id, values);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Project updated");
      router.push("/dashboard/projects");
    });
  };

  const deleteImage = async (key: string, index: number) => {
    if (deletingKeys.has(key)) return;

    setDeletingKeys((p) => new Set(p).add(key));

    try {
      await deleteProjectImageAction(key);

      const remaining = getValues("images").filter((_, i) => i !== index);

      if (!remaining.some((img) => img.isCover) && remaining.length > 0) {
        remaining[0].isCover = true;
      }

      setValue(
        "images",
        remaining.map((img, i) => ({ ...img, order: i })),
        { shouldValidate: true }
      );

      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeletingKeys((p) => {
        const next = new Set(p);
        next.delete(key);
        return next;
      });
    }
  };

  const watchedImages = form.watch("images");

  return (
    <main className="space-y-12 max-w-xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 shadow p-6"
        >
          <h1 className="text-lg font-medium">Update Project</h1>

          {/* NAME */}
          <FormField
            control={control}
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

          {/* ROLE */}
          <FormField
            control={control}
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

          {/* SUMMARY */}
          <FormField
            control={control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* KEY FEATURES */}
          <FormField
            control={control}
            name="keyFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Features</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TECH STACK */}
          <FormItem>
            <FormLabel>Tech Stack</FormLabel>
            {techFields.map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <FormField
                  control={control}
                  name={`techStack.${i}.key`}
                  render={({ field }) => <Input {...field} />}
                />
                <FormField
                  control={control}
                  name={`techStack.${i}.value`}
                  render={({ field }) => <Input {...field} />}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeTech(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addTech({ key: "", value: "" })}
            >
              Add Tech
            </Button>
          </FormItem>

          {/* IMAGES */}
          <FormItem>
            <FormLabel>Project Images (max 5)</FormLabel>

            {imageFields.length < 5 && (
              <UploadButton
                endpoint="projectImage"
                onClientUploadComplete={(res) => {
                  const existing = getValues("images");

                  const uploaded = res.map((f, i) => ({
                    url: f.url,
                    key: f.key,
                    alt: "",
                    order: existing.length + i,
                    isCover: existing.length === 0 && i === 0,
                  }));

                  setValue("images", [...existing, ...uploaded], {
                    shouldValidate: true,
                  });
                }}
                className="ut-button:bg-[var(--brand-blue)] ut-button:px-8 ut-button:text-white ut-button:rounded-lg"
              />
            )}

            <div className="space-y-4">
              {imageFields.map((field, index) => {
                const img = watchedImages?.[index];

                if (!img) return null;

                return (
                  <div
                    key={field.id}
                    className="flex gap-4 items-start border rounded-lg p-3"
                  >
                    {/* PREVIEW */}
                    <div className="relative w-32 h-20 rounded-md overflow-hidden border">
                      <Image
                        src={img.url}
                        alt={img.alt || "Project image"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* META */}
                    <div className="flex-1 space-y-2">
                      <FormField
                        control={control}
                        name={`images.${index}.alt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Alt text</FormLabel>
                            <Input {...field} />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`images.${index}.isCover`}
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                imageFields.forEach((_, i) => {
                                  updateImage(i, {
                                    ...imageFields[i],
                                    isCover:
                                      i === index ? Boolean(checked) : false,
                                  });
                                });
                              }}
                            />
                            <FormLabel className="text-sm">
                              Cover image
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* DELETE */}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={deletingKeys.has(img.key)}
                      onClick={() => deleteImage(img.key, index)}
                    >
                      {deletingKeys.has(img.key) ? "Deleting…" : "Remove"}
                    </Button>
                  </div>
                );
              })}
            </div>

            <FormMessage />
          </FormItem>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Update Project"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
