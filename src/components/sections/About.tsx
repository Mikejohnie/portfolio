"use client";

import Image from "next/image";
import ResumeButton from "@/components/home/ResumeButton";
import { AboutUI } from "@/lib/types";
import { motion, easeOut, type Variants } from "framer-motion";

type Props = {
  about: AboutUI;
  resumeUrl?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export default function AboutSection({ about, resumeUrl }: Props) {
  return (
    <motion.section
      className="mx-auto max-w-5xl px-6 space-y-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* ===== INTRO / POSITIONING ===== */}
      <motion.header
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
      >
        {/* PROFILE IMAGE */}
        {about.profileImage?.url && (
          <div className="flex justify-center md:justify-start">
            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-blue-500 to-purple-600">
              <div className="rounded-full bg-background p-2">
                <Image
                  src={about.profileImage.url}
                  alt={about.fullName}
                  width={220}
                  height={220}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* NAME + SUMMARY */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{about.fullName}</h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {about.subHeadline}
          </p>

          <div className="pt-2">
            {resumeUrl && (
              <ResumeButton
                resumeUrl={resumeUrl}
                fullName={about.fullName}
                resumeName={about.fullName}
              />
            )}
          </div>
        </div>
      </motion.header>

      {/* ===== PROFESSIONAL BIO ===== */}
      <motion.section
        variants={sectionVariants}
        className="space-y-6 max-w-3xl"
      >
        <h2 className="text-2xl font-semibold">Professional Summary</h2>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {about.longBio
            ?.split("\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      </motion.section>

      {/* ===== TECH STACK ===== */}
      {about.skills.length > 0 && (
        <motion.section variants={sectionVariants} className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Skills</h2>

          <div className="flex flex-wrap gap-3">
            {about.skills.map((skill) => (
              <span
                key={skill.name}
                className="
                  rounded-full border px-4 py-2 text-sm
                  text-muted-foreground
                  hover:text-foreground
                  hover:border-foreground/30
                  transition
                  hover:shadow-md
                "
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {about.experience.length > 0 && (
        <motion.section variants={sectionVariants} className="space-y-10">
          <h2 className="text-2xl font-semibold">
            Experience & Career Journey
          </h2>

          <div className="space-y-8 border-l pl-6">
            {about.experience.map((item, index) => (
              <div key={index} className="relative space-y-2">
                <span className="absolute -left-[10px] top-2 h-3 w-3 rounded-full bg-blue-500" />

                <p className="text-xs text-muted-foreground">{item.year}</p>

                <h3 className="font-medium">
                  {item.title}
                  {item.context && (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      — {item.context}
                    </span>
                  )}
                </h3>

                <p className="text-sm text-muted-foreground max-w-2xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.section>
  );
}
