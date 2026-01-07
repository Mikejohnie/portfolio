"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AboutUI } from "@/lib/types";
import { useState } from "react";
import { HighlightKeywords } from "../ui/HighlightKeywords";

type Props = {
  about: AboutUI;
};

const Hero = ({ about }: Props) => {
  const skillsStack = about.skills?.map((s) => s.name) ?? [];

  const MOBILE_VISIBLE = 4;
  const [showAllMobile, setShowAllMobile] = useState(false);

  const visibleSkills = showAllMobile
    ? skillsStack
    : skillsStack.slice(0, MOBILE_VISIBLE);

  const remainingCount = skillsStack.length - visibleSkills.length;

  const highlightKeywords = [
    {
      text: "scalable",
      className: "font-semibold text-foreground",
    },
    {
      text: "architecture",
      className: "font-semibold text-foreground",
    },
    {
      text: "backend",
      className: "font-semibold text-foreground",
    },
  ];

  return (
    <section className="relative overflow-hidden py-6 mx-auto max-w-6xl px-6">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <span className="inline-block rounded-full border px-4 py-1 text-sm text-muted-foreground">
            👋 Hello, welcome to my portfolio
          </span>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              I’m <span className="text-blue-500">{about.fullName}</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
              {about.headline}
            </h2>
          </div>

          <p className="max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
            <HighlightKeywords
              content={about.shortBio}
              keywords={highlightKeywords}
            />
          </p>

          {/* TECH STACK */}
          <p className="text-sm text-muted-foreground">
            Tech stack: {/* MOBILE */}
            <span className="sm:hidden text-foreground/80 font-medium">
              {visibleSkills.join(" · ")}

              {skillsStack.length > MOBILE_VISIBLE && (
                <button
                  onClick={() => setShowAllMobile((prev) => !prev)}
                  className="ml-2 text-blue-500 hover:underline transition"
                >
                  {showAllMobile ? "Show less" : `+${remainingCount} more`}
                </button>
              )}
            </span>
            {/* DESKTOP */}
            <span className="hidden sm:inline text-foreground/80 font-medium">
              {skillsStack.join(" · ")}
            </span>
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#projects">
              <Button size="lg" className="px-8">
                View Projects
              </Button>
            </Link>

            <Link href="#contact">
              <Button size="lg" variant="outline" className="px-8">
                Contact Me
              </Button>
            </Link>
          </div>

          {/* TRUST SIGNAL */}
          {about.experience?.length > 0 && (
            <div className="pt-6 hidden md:block text-sm text-muted-foreground">
              🚀 Building production-ready full-stack systems
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          {about.heroImage?.url && (
            <div className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-blue-500 to-purple-600">
              <div className="rounded-2xl bg-background p-2">
                <Image
                  src={about.heroImage?.url}
                  alt={about.fullName}
                  width={340}
                  height={420}
                  className="rounded-xl object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
