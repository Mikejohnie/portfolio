import { CurrentUser } from "@/lib/currentUser";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminAbout } from "@/components/helper/getAdminAbout";
import { getAdminContact } from "@/components/helper/getAdminContact";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await CurrentUser();
  if (!user) return null;

  const about = await getAdminAbout();
  const contact = await getAdminContact();

  const avatar = user?.profileImage?.url ?? user?.image ?? null;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal account information and security.
        </p>
      </header>

      {/* PROFILE CARD */}
      <Card>
        <CardContent className="pt-6 flex flex-col md:flex-row gap-6 items-start">
          {avatar && (
            <Image
              src={avatar}
              alt={about?.fullName ?? user.name ?? "Profile image"}
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              {about?.fullName ?? user.name ?? "—"}
            </h2>
            <p className="text-muted-foreground">
              {about?.headline ?? "Professional profile"}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="rounded-full border px-3 py-1 text-sm">
                {user.role}
              </span>

              {contact?.availableForWork && (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600">
                  Open to work
                </span>
              )}
              {contact?.openToRelocation && (
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600">
                  Open to relocation
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ACCOUNT INFO */}
      <Card>
        <CardContent className="pt-6 space-y-2">
          <h3 className="font-medium">Account Information</h3>

          <p className="text-sm">
            <span className="text-muted-foreground">Email:</span> {user.email}
          </p>

          <p className="text-sm">
            <span className="text-muted-foreground">Role:</span> {user.role}
          </p>
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-medium">Actions</h3>

          <Button asChild>
            <Link href="/dashboard/profile/update">
              Update Profile & Password
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
