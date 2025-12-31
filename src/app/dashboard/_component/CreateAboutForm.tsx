"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { aboutSchema, AboutSchemaType } from "@/lib/zodValidation";
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

export default function CreateAboutForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AboutSchemaType>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      fullName: "",
      headline: "",
      subHeadline: "",

      shortBio: "",
      longBio: "",

      profileImage: "",
      heroImage: "",
      location: "",
      email: "",
      phone: "",

      highlights: "",
      skills: [],
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

  const onSubmit = (values: AboutSchemaType) => {
    startTransition(() => {
      async () => {
        const res = await saveAbout(values);
        if (res?.error) return toast.error(res.error);
        toast.success("About created!");
      };
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
                <Input {...field} placeholder="John Doe" />
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
          control={form.control}
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
          control={form.control}
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

        {/* LONG BIO */}
        <FormField
          control={form.control}
          name="longBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell your journey, achievements, etc."
                  {...field}
                />
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
                <Input {...field} placeholder="https://your-photo.jpg" />
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
                <Input {...field} placeholder="https://banner-image.png" />
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
                <Input {...field} placeholder="City, Country" />
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
                <Input type="email" {...field} placeholder="you@email.com" />
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
                <Input {...field} placeholder="+1 555-555-5555" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HIGHLIGHTS */}
        <FormField
          control={form.control}
          name="highlights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highlights</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={`work experience
`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SKILLS */}
        <FormItem>
          <FormLabel>Skills</FormLabel>
          <div className="space-y-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...form.register(`skills.${index}.label`)}
                  placeholder="Category (e.g. Frontend)"
                />
                <Input
                  {...form.register(`skills.${index}.value`)}
                  placeholder="Value (e.g. Next.js)"
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
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>
        </FormItem>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Create About"}
        </Button>
      </form>
    </Form>
  );
}
