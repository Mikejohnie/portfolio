"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDTO } from "@/lib/types";
import { updateUserProfile } from "@/actions/user";
import { updateUserSchema, updateUserSchemaType } from "@/lib/zodValidation";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { deleteFileAction } from "@/actions/aboutActions";
import { Camera, Loader2, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  user: UserDTO;
};

export default function ProfileForm({ user }: Props) {
  const [isPending, startTransition] = useTransition();

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const form = useForm<updateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      profileImage: user.profileImage ?? undefined,
    },
  });

  const { control, handleSubmit, setValue, getValues, reset } = form;

  const onSubmit = (values: updateUserSchemaType) => {
    startTransition(async () => {
      const res = await updateUserProfile(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Profile updated");
    });
  };

  const deleteProfileImage = async () => {
    const image = getValues("profileImage");
    if (!image?.key) return;

    if (deletingKeys.has(image.key)) return;

    setDeletingKeys((p) => new Set(p).add(image.key));

    try {
      await deleteFileAction(image.key);
      setValue("profileImage", undefined, { shouldDirty: true });
      toast.success("Profile image removed");
    } catch {
      toast.error("Failed to remove image");
    } finally {
      setDeletingKeys((p) => {
        const next = new Set(p);
        next.delete(image.key);
        return next;
      });
    }
  };

  const avatar =
    form.watch("profileImage")?.url ??
    user.profileImage?.url ??
    user.image ??
    null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* profile image */}

            <section className="border-t pt-6">
              <div className="flex flex-col items-center gap-4">
                {/* AVATAR */}
                <div className="relative w-32 h-32">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Profile image"
                      fill
                      className="rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border flex items-center justify-center text-sm text-muted-foreground">
                      No photo
                    </div>
                  )}

                  {/* DROPDOWN TRIGGER */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="absolute bottom-1 right-1 rounded-full bg-white p-2 shadow hover:shadow-md transition"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">
                      {/* GALLERY (UPLOADTHING) */}
                      <DropdownMenuItem asChild>
                        <div className="w-full">
                          <UploadButton
                            endpoint="profileImage"
                            onClientUploadComplete={async (res) => {
                              const file = res[0];
                              setValue("profileImage", {
                                url: file.url,
                                key: file.key,
                              });
                              toast.success("Profile image updated");
                              await updateUserProfile({
                                profileImage: { url: file.url, key: file.key },
                              });
                            }}
                            className="
                  ut-button:bg-transparent
                  ut-button:text-left
                  ut-button:w-full
                  ut-button:justify-start
                  ut-button:text-sm
                  ut-button:text-foreground
                  ut-button:px-2
                  ut-button:py-1
                  hover:ut-button:bg-muted
                "
                          />
                        </div>
                      </DropdownMenuItem>

                      {/* REMOVE */}
                      {form.watch("profileImage") && (
                        <DropdownMenuItem
                          disabled={deletingKeys.has(
                            form.watch("profileImage")?.key ?? ""
                          )}
                          className="text-red-600 cursor-pointer"
                          onClick={deleteProfileImage}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </section>

            <FormField
              control={control}
              name="name"
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

            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Email: <span className="font-medium">{user.email}</span>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
