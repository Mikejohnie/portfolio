"use client";

import { useState, useTransition } from "react";
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

import { Minus, Plus } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { deleteFileAction } from "@/actions/aboutActions";

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

  const { control, handleSubmit, setValue, getValues } = form;

  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({ control, name: "techStack" });

  const { fields: imageFields, update: updateImage } = useFieldArray({
    control,
    name: "images",
  });

  const deleteImage = async (key: string, index: number) => {
    if (deletingKeys.has(key)) return;

    setDeletingKeys((p) => new Set(p).add(key));

    try {
      await deleteFileAction(key);

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
              />
            )}

            {imageFields.map((img, i) => (
              <div key={img.key} className="flex gap-4 border p-3">
                <Image src={img.url} width={120} height={80} alt="" />
                <div className="flex-1 space-y-2">
                  <FormField
                    control={control}
                    name={`images.${i}.alt`}
                    render={({ field }) => <Input {...field} />}
                  />
                  <Checkbox
                    checked={img.isCover}
                    onCheckedChange={() =>
                      imageFields.forEach((_, idx) =>
                        updateImage(idx, {
                          ...imageFields[idx],
                          isCover: idx === i,
                        })
                      )
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={deletingKeys.has(img.key)}
                  onClick={() => deleteImage(img.key, i)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </FormItem>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Update Project"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
