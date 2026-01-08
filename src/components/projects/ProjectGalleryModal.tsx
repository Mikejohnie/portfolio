"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProjectImage } from "@/lib/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  images: ProjectImage[];
  startIndex: number;
  onIndexChange?: (i: number) => void;
};

export default function ProjectGalleryModal({
  open,
  onClose,
  images,
  startIndex,
  onIndexChange,
}: Props) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, index]);

  if (!open) return null;

  const next = () => {
    const i = (index + 1) % images.length;
    setIndex(i);
    onIndexChange?.(i);
  };

  const prev = () => {
    const i = (index - 1 + images.length) % images.length;
    setIndex(i);
    onIndexChange?.(i);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      {/* COUNTER */}
      <div className="absolute top-4 left-4 text-white text-sm">
        {index + 1} / {images.length}
      </div>

      {/* PREV */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 text-white/80 hover:text-white"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* IMAGE */}
      <div className="relative w-full max-w-5xl aspect-video">
        <Image
          src={images[index].url}
          alt={images[index].alt || "Project screenshot"}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* NEXT */}
      <button
        onClick={next}
        className="absolute right-3 md:right-6 text-white/80 hover:text-white"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}
