import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { CurrentUser } from "@/lib/currentUser";

export default async function AccountPage() {
  const user = await CurrentUser();
  if (!user) return null;

  const [about, contact, projects] = await Promise.all([
    prisma.about.findUnique({ where: { createdById: user.id } }),
    prisma.contact.findUnique({ where: { createdById: user.id } }),
    prisma.project.findMany({
      where: { createdById: user.id, published: true },
      select: { id: true },
    }),
  ]);

  const readiness = [
    { label: "About profile completed", done: !!about },
    { label: "Resume uploaded", done: !!about?.resume },
    { label: "Contact information added", done: !!contact },
    { label: "Published project", done: projects.length > 0 },
  ];

  const completenessItems = [
    { done: !!about, weight: 20 },
    { done: !!about?.resume, weight: 20 },
    { done: !!contact, weight: 20 },
    { done: projects.length > 0, weight: 30 },
    { done: !!about?.profileImage, weight: 10 },
  ];

  const profileCompleteness = completenessItems.reduce(
    (acc, item) => acc + (item.done ? item.weight : 0),
    0
  );

  return (
    <div className="space-y-8 max-w-5xl">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-semibold">Account Overview</h1>
        <p className="text-muted-foreground">
          Manage your portfolio profile and account settings
        </p>
      </header>

      {/* PROFILE SNAPSHOT */}
      <Card>
        <CardContent className="pt-6 space-y-2">
          <h2 className="font-medium">Profile</h2>

          <p className="text-sm">
            <span className="text-muted-foreground">Name:</span>{" "}
            {about?.fullName ?? "—"}
          </p>

          <p className="text-sm">
            <span className="text-muted-foreground">Headline:</span>{" "}
            {about?.headline ?? "—"}
          </p>

          <p className="text-sm">
            <span className="text-muted-foreground">Email:</span> {user.email}
          </p>

          <p className="text-sm">
            <span className="text-muted-foreground">Role:</span> {user.role}
          </p>
        </CardContent>
      </Card>

      {/* QUICK ACTIONS */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-medium">Quick Actions</h2>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/dashboard/about">Edit About</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/contact">Edit Contact</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/projects">Manage Projects</Link>
            </Button>

            <Button asChild>
              <Link href="/dashboard/analytics">View Analytics</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PROFILE COMPLETENESS */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-medium">Profile Completeness</h2>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Complete your profile to improve recruiter trust
            </span>
            <span className="font-semibold">{profileCompleteness}%</span>
          </div>

          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* READINESS */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-medium">Portfolio Readiness</h2>

          <ul className="space-y-2">
            {readiness.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                {item.done ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
                {item.label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
