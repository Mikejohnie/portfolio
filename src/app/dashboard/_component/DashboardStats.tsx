"use client";

import Link from "next/link";
import { FolderKanban, Mail, BarChart3, FileText } from "lucide-react";

type Props = {
  stats: {
    projects: number;
    messages: number;
    visitors: number;
    resumeDownloads: number;
  };
};

const cards = [
  {
    label: "Projects",
    key: "projects",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    label: "Unread Messages",
    key: "messages",
    icon: Mail,
    href: "/dashboard/messages",
  },
  {
    label: "Visitors",
    key: "visitors",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Resume Downloads",
    key: "resumeDownloads",
    icon: FileText,
    href: "/dashboard/analytics",
  },
] as const;

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6 space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your portfolio activity and content.
        </p>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item) => {
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

              <p className="mt-4 text-2xl font-semibold">{stats[item.key]}</p>
            </Link>
          );
        })}
      </section>

      {/* QUICK ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/projects"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Manage Projects
          </Link>

          <Link
            href="/dashboard/messages"
            className="rounded-md border px-4 py-2"
          >
            View Messages
          </Link>

          <Link
            href="/dashboard/analytics"
            className="rounded-md border px-4 py-2"
          >
            View Analytics
          </Link>
        </div>
      </section>
    </div>
  );
}
