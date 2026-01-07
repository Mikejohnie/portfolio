"use client";

import { ProjectUI } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { easeOut, motion } from "framer-motion";

type Props = {
  project: ProjectUI;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
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

const ProjectCard = ({ project }: Props) => {
  return (
    <motion.article
      variants={cardVariants}
      className="rounded-2xl border p-8 space-y-10"
    >
      {/* TITLE + META */}
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold">{project.name}</h2>

          {project.isFlagship && (
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600 hover:animate-pulse hover:shadow">
              Flagship Project
            </span>
          )}

          {!project.isFlagship && project.featured && (
            <span className="rounded-full border px-3 py-1 text-sm">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Role: <span className="font-medium">{project.role}</span>
        </p>
      </header>

      {/* OVERVIEW */}
      <section className="space-y-2">
        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
          Overview
        </h3>

        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {project.summary}
        </p>
      </section>

      {/* KEY CONTRIBUTIONS */}
      {project.keyFeatures.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
            Key Contributions
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {project.keyFeatures.map((feature, index) => (
              <li key={`${project.id}-${index}`}>• {feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* TECH STACK */}
      {project.techStack.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
            Technology Stack
          </h3>

          <ul className="flex flex-wrap gap-2 text-sm">
            {project.techStack.map((tech) => (
              <li
                key={tech.key}
                className="rounded-full border px-4 py-1 text-muted-foreground hover:shadow-md"
              >
                {tech.value}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ACTIONS */}
      <footer className="flex flex-wrap gap-4 pt-4">
        {project.liveUrl && (
          <Button asChild>
            <Link
              href={
                project.liveUrl.startsWith("http")
                  ? project.liveUrl
                  : `https://${project.liveUrl}`
              }
              target="_blank"
              rel="noreferrer"
            >
              View Live Project
            </Link>
          </Button>
        )}

        <Button variant="outline" asChild>
          <Link href="#contact">Discuss This Project</Link>
        </Button>
      </footer>
    </motion.article>
  );
};

export default ProjectCard;
