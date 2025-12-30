"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AboutSchemaType, aboutSchema } from "@/lib/zodValidation";
import { saveAbout } from "@/actions/aboutActions";

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
import { Minus, Plus } from "lucide-react";
import { AboutUI } from "@/lib/types";

type Props = {
  about: AboutUI | null;
};

export default function AboutForm({ about }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AboutSchemaType>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      fullName: about?.fullName ?? "",
      headline: about?.headline ?? "",
      shortBio: about?.shortBio ?? "",
      longBio: about?.longBio ?? "",

      profileImage: about?.profileImage ?? "",
      heroImage: about?.heroImage ?? "",
      location: about?.location ?? "",
      email: about?.email ?? "",
      phone: about?.phone ?? "",

      highlights: about?.highlights ?? [],
      skills: about?.skills ?? [],
    },
  });

  const {
    fields: highlightFields,
    append: addHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control: form.control, name: "highlights" });

  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });

  const onSubmit = (values: AboutSchemaType) => {
    startTransition(() => {
      (async () => {
        const res = await saveAbout(values);

        if (res?.error) {
          toast.error(res.error);
          return;
        }

        toast.success("About saved!");
      })();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        {/* NAME */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HEADLINE */}
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SHORT BIO */}
        <FormField
          control={form.control}
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LONG BIO */}
        <FormField
          control={form.control}
          name="longBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Bio</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGES */}
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LOCATION + CONTACT */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HIGHLIGHTS */}
        <FormItem>
          <FormLabel>Highlights</FormLabel>
          <div className="space-y-3">
            {highlightFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...form.register(`highlights.${index}.label`)}
                  placeholder="Label"
                />
                <Input
                  {...form.register(`highlights.${index}.value`)}
                  placeholder="Value"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeHighlight(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addHighlight({ label: "", value: "" })}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </FormItem>

        {/* SKILLS */}
        <FormItem>
          <FormLabel>Skills</FormLabel>
          <div className="space-y-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...form.register(`skills.${index}`)}
                  placeholder="Skill..."
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
              onClick={() => addSkill({ label: "", value: "" })}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </FormItem>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save About"}
        </Button>
      </form>
    </Form>
  );
}
