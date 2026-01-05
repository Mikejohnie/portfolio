"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { aboutSchema, AboutSchemaType } from "@/lib/zodValidation";
import {
  deleteAbout,
  deleteFileAction,
  saveAbout,
} from "@/actions/aboutActions";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { AboutUI } from "@/lib/types";

type Props = {
  initialData?: AboutUI | null;
};

export default function CreateAboutForm({ initialData }: Props) {
  const [isPending, startTransition] = useTransition();

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const [hydrated, setHydrated] = useState(false);

  const isEditMode = Boolean(initialData);

  const form = useForm<AboutSchemaType>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      fullName: initialData?.fullName ?? "",
      headline: initialData?.headline ?? "",
      subHeadline: initialData?.subHeadline ?? "",
      shortBio: initialData?.shortBio ?? "",
      longBio: initialData?.longBio ?? "",

      experience: initialData?.experience ?? [],
      skills: initialData?.skills ?? [],

      portfolioStartYear: initialData?.portfolioStartYear ?? undefined,

      profileImage: initialData?.profileImage ?? undefined,
      heroImage: initialData?.heroImage ?? undefined,
      resume: initialData?.resume ?? undefined,
    },
  });

  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray<AboutSchemaType, "skills">({
    control: form.control,
    name: "skills",
  });

  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { control, handleSubmit, setValue, getValues, reset } = form;

  useEffect(() => {
    if (!initialData) {
      setHydrated(true);
      return;
    }

    reset({
      fullName: initialData.fullName,
      headline: initialData.headline,
      subHeadline: initialData.subHeadline,
      shortBio: initialData.shortBio,
      longBio: initialData.longBio,
      portfolioStartYear: initialData.portfolioStartYear,

      experience: initialData.experience ?? [],
      skills: initialData.skills ?? [],

      profileImage: initialData.profileImage ?? undefined,
      heroImage: initialData.heroImage ?? undefined,
      resume: initialData.resume ?? undefined,
    });

    setHydrated(true);
  }, [initialData, reset]);

  const onSubmit = (values: AboutSchemaType) => {
    startTransition(async () => {
      await saveAbout(values).then((res) => {
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        toast.success("About saved successfully");
      });
    });
  };

  const handleAboutReset = () => {
    startTransition(async () => {
      await deleteAbout().then((res) => {
        if (res?.error) {
          toast.error(res.error);
          return;
        }

        form.reset();
        toast.success("About reset successfully");
      });
    });
  };

  const deleteSingleFile = async (
    field: "profileImage" | "heroImage" | "resume"
  ) => {
    const file = getValues(field);
    if (!file || !file?.key) return;

    if (deletingKeys.has(file.key)) return;

    setDeletingKeys((prev) => new Set(prev).add(file.key));

    try {
      await deleteFileAction(file.key);
      setValue(field, undefined);
      toast.success("File deleted");
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeletingKeys((prev) => {
        const next = new Set(prev);
        next.delete(file.key);
        return next;
      });
    }
  };

  const watchedProfileImage = form.watch("profileImage");
  const watchedHeroImage = form.watch("heroImage");
  const watchedResume = form.watch("resume");

  return (
    <main className="space-y-12 max-w-xl mx-auto">
      <div className="flex justify-between">
        <h1 className="font-medium text-xl">About Me</h1>
        <Button type="button" variant="destructive" onClick={handleAboutReset}>
          {isPending ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            " Reset About"
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8  rounded-lg shadow-md p-6"
        >
          {/* NAME */}
          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* HEADLINE */}
          <FormField
            control={control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline (Hero)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Full-Stack Developer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* subHEADLINE */}
          <FormField
            control={control}
            name="subHeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SubHeadline</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="I'm a full-stack web dev..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SHORT BIO */}
          <FormField
            control={control}
            name="shortBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Bio (Hero)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="I design and build scalable apps..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*longBio*/}
          <FormField
            control={control}
            name="longBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="I focus on building systems..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="portfolioStartYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Start Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    placeholder="1900"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* experience */}
          <FormItem>
            <FormLabel>Experience Highlights</FormLabel>

            <div className="space-y-3">
              {experienceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2"
                >
                  <Input
                    {...form.register(`experience.${index}.year`)}
                    placeholder="e.g 3+ years"
                  />

                  <Input
                    {...form.register(`experience.${index}.title`)}
                    placeholder="Front-end engineer"
                  />
                  <Input
                    {...form.register(`experience.${index}.context`)}
                    placeholder="creator - app/web"
                  />

                  <Input
                    {...form.register(`experience.${index}.description`)}
                    placeholder="built for marketplace..."
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeExperience(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  addExperience({
                    year: "",
                    title: "",
                    context: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add Highlight
              </Button>
            </div>

            <FormMessage />
          </FormItem>

          {/* SKILLS */}
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <div className="space-y-3">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...form.register(`skills.${index}.name`)}
                    placeholder="Tech(e.g. Next.js)"
                    className="w-52"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeSkill(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => addSkill({ name: "" })}
              >
                <Plus className="h-4 w-4" /> Add Skill
              </Button>
            </div>
          </FormItem>

          {/* profile image */}
          <section className="border-t">
            <h2 className="font-semibold text-xl pt-2">Profile Image</h2>
            <UploadButton
              endpoint="profileImage"
              className="
    ut-button:bg-blue-500/10
    ut-button:text-blue-600
    ut-button:border
    ut-button:border-blue-500/30
    ut-button:rounded-full
    ut-button:px-5
    ut-button:py-2
    ut-button:text-sm
    hover:ut-button:bg-blue-500/20
  "
              onClientUploadComplete={(res) => {
                const file = res[0];
                setValue("profileImage", { url: file.url, key: file.key });
                toast.success("Profile image uploaded");
              }}
            />

            {watchedProfileImage?.url && (
              <div className="relative w-32 h-32">
                <Image
                  src={watchedProfileImage.url}
                  alt="Profile image"
                  fill
                  className="rounded-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => deleteSingleFile("profileImage")}
                  disabled={deletingKeys.has(watchedProfileImage.key)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full disabled:opacity-50"
                >
                  {deletingKeys.has(watchedProfileImage.key) ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </section>

          {/* hero image */}
          <section className="border-t">
            <h2 className="font-semibold text-xl pt-2">Hero Image</h2>
            <UploadButton
              endpoint="heroImage"
              className="
    ut-button:bg-black
    ut-button:text-white
    ut-button:rounded-lg
    ut-button:px-6
    ut-button:py-3
    ut-button:text-sm
    ut-button:font-medium
    hover:ut-button:bg-black/90
  "
              onClientUploadComplete={(res) => {
                const file = res[0];
                setValue("heroImage", { url: file.url, key: file.key });
                toast.success("Hero image uploaded");
              }}
            />

            {watchedHeroImage?.url && (
              <div className="relative w-40 h-40">
                <Image
                  src={watchedHeroImage.url}
                  alt="Hero image"
                  fill
                  className="object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => deleteSingleFile("heroImage")}
                  disabled={deletingKeys.has(watchedHeroImage.key)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full disabled:opacity-50"
                >
                  {deletingKeys.has(watchedHeroImage.key) ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </section>

          {/* resume */}
          <section className="border-t">
            <h2 className="font-semibold text-xl pt-2">Resume</h2>

            <UploadButton
              endpoint="resume"
              className="
    ut-button:bg-muted
    ut-button:text-foreground
    ut-button:border
    ut-button:border-border
    ut-button:rounded-md
    ut-button:px-4
    ut-button:py-2
    ut-button:text-sm
    hover:ut-button:bg-muted/70
  "
              onClientUploadComplete={(res) => {
                const file = res[0];
                setValue("resume", { url: file.url, key: file.key });
                toast.success("Resume uploaded");
              }}
            />

            {watchedResume?.url && (
              <div className=" flex items-center gap-3">
                <a
                  href={watchedResume.url}
                  target="_blank"
                  className="text-sm text-blue-600 underline"
                >
                  View resume
                </a>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSingleFile("resume")}
                  disabled={deletingKeys.has(watchedResume.key)}
                  className="bg-red-600 text-white p-2 rounded-full disabled:opacity-50"
                >
                  {deletingKeys.has(watchedResume.key) ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    " Remove File"
                  )}
                </Button>
              </div>
            )}
          </section>

          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saving..."
              : isEditMode
              ? "Update About"
              : "Create About"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
