"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveContact, deleteContact } from "@/actions/contactActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ContactSchemaType, contactSchema } from "@/lib/zodValidation";
import { ContactUI } from "@/lib/types";
import { useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  initialData?: ContactUI | null;
};

export default function ContactForm({ initialData }: Props) {
  const [isPending, startTransition] = useTransition();

  const isEditMode = Boolean(initialData);

  const router = useRouter();

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
      location: initialData?.location ?? "",

      github: initialData?.github ?? "",
      linkedin: initialData?.linkedin ?? "",
      twitter: initialData?.twitter ?? "",
      website: initialData?.website ?? "",

      openToRelocation: initialData?.openToRelocation ?? false,
      availableForWork: initialData?.availableForWork ?? false,
    },
  });

  const { control, handleSubmit, setValue, getValues, reset } = form;

  useEffect(() => {
    if (!initialData) return;

    reset({
      email: initialData.email,
      phone: initialData.phone,
      location: initialData.location,

      github: initialData.github ?? "",
      linkedin: initialData.linkedin ?? "",
      twitter: initialData.twitter ?? "",
      website: initialData.website ?? "",

      openToRelocation: initialData.openToRelocation,
      availableForWork: initialData.availableForWork,
    });
  }, [initialData, reset]);

  const onSubmit = (values: ContactSchemaType) => {
    startTransition(async () => {
      const res = await saveContact(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Contact updated");
    });
  };

  const handleContactReset = () => {
    try {
      startTransition(async () => {
        await deleteContact().then((res) => {
          if (res?.error) {
            toast.error(res.error);
            return;
          }

          form.reset();
          toast.success("Contact reset successfully");
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      // router.refresh();
      window.location.reload();
    }
  };

  return (
    <main className="space-y-12 max-w-xl mx-auto">
      <h1 className="font-medium text-xl">Contact Form</h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="you@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+1 (234) 567 890" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="location"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="state, country..." />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="github"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="github.com/username" />
                  </FormControl>
                </FormItem>
              )}
            />{" "}
            <FormField
              name="linkedin"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn url</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="twitter"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="twitter.com/yourprofile" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="website"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="yourwebsite.com" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-6">
            <FormField
              name="availableForWork"
              control={control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Open to work</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              name="openToRelocation"
              control={control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    Open to relocation
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEditMode ? "Update Contact" : "Save"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleContactReset}
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Reset"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
