"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectImage } from "@/lib/types";
import ProjectGalleryModal from "./ProjectGalleryModal";

type Props = {
  images: ProjectImage[];
};

export default function ProjectScreenshots({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) return null;

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <section className="space-y-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Screenshots</h3>
        <span className="text-sm text-muted-foreground">
          {activeIndex + 1}/{sorted.length}
        </span>
      </div>

      {/* IMAGE */}
      <button
        onClick={() => setOpen(true)}
        className="relative aspect-video w-full overflow-hidden rounded-lg border hover:opacity-95 transition"
      >
        <Image
          src={sorted[activeIndex].url}
          alt={sorted[activeIndex].alt || "Project screenshot"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </button>

      {/* MODAL */}
      <ProjectGalleryModal
        open={open}
        onClose={() => setOpen(false)}
        images={sorted}
        startIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
