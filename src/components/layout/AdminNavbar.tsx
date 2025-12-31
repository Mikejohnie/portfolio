"use client";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  User,
  User2,
} from "lucide-react";
import { UserDTO } from "@/lib/types";
import { useLogout } from "@/hooks/useLogout";
import { useGetCurrentUserQuery } from "@/stores/useGetCurrentUserQuery";
import { Button } from "@/components/ui/button";

const mobileLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "About Me",
    href: "/dashboard/about",
    icon: User2,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: Mail,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export default function AdminNavbar({
  initialUser,
}: {
  initialUser: UserDTO | null;
}) {
  const logout = useLogout();
  const { data: user } = useGetCurrentUserQuery(initialUser);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LEFT: BRAND + MOBILE MENU */}
        <div className="flex items-center gap-3">
          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Admin Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2">
                {mobileLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9Du0BUsAYCqwSbDInhZT2MBG1Xz9W6v0y4Ogfrc"
              alt="Michael Nku"
              width={34}
              height={34}
              className="rounded-md object-contain"
            />
            <span className="font-semibold text-lg tracking-tight">
              Michael Nku
            </span>
          </Link>

          {/* ADMIN BADGE */}
          <span className="hidden sm:inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-600">
            Admin
          </span>
        </div>

        {/* RIGHT: ACCOUNT MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-muted transition">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}

              <span className="hidden md:block text-sm font-medium">
                {user?.name?.split(" ")[0] || "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard/account" className="flex gap-2">
                <Settings className="w-4 h-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="flex gap-2 text-red-500 focus:text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
