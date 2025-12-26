"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderKanban, Mail, BarChart3, FileText } from "lucide-react";

const stats = [
  {
    label: "Projects",
    value: "—",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    label: "Messages",
    value: "—",
    icon: Mail,
    href: "/dashboard/messages",
  },
  {
    label: "Analytics",
    value: "—",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Resume Downloads",
    value: "—",
    icon: FileText,
    href: "/dashboard/analytics",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6 space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your portfolio activity and content.
        </p>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl border p-5 hover:bg-muted transition"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <p className="mt-4 text-2xl font-semibold">{item.value}</p>
            </Link>
          );
        })}
      </section>

      {/* QUICK ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/dashboard/projects">Manage Projects</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard/messages">View Messages</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics">View Analytics</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
