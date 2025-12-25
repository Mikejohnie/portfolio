"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function SiteNavbar() {
  const activeSection = useActiveSection(navLinks.map((l) => l.id));
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9Du0BUsAYCqwSbDInhZT2MBG1Xz9W6v0y4Ogfrc"
            alt="Michael Nku"
            width={36}
            height={36}
            className="rounded-md object-contain"
            //priority
          />
          <span className="font-semibold text-lg tracking-tight">
            Michael Nku
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden sm:inline-flex">
            Hire Me
          </Button>

          {/* MOBILE MENU */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-base font-medium transition-colors",
                        isActive
                          ? "text-blue-500"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-6 border-t">
                  <Button className="w-full" onClick={() => setOpen(false)}>
                    Hire Me
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
