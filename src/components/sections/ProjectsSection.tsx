"use client";

import { ProjectUI } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
  EmptyContent,
} from "@/components/ui/empty";
import ProjectCard from "../projects/ProjectCard";

type Props = {
  project: ProjectUI[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const ProjectsSection = ({ project }: Props) => {
  return (
    <section className="mx-auto max-w-5xl px-6 space-y-20">
      {/* HEADER */}
      <header className="space-y-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold">Selected Projects</h1>

        <p className="text-muted-foreground text-lg">
          A curated selection of production-ready projects demonstrating my
          experience designing, building, and scaling modern web applications.
        </p>
      </header>

      {/* PROJECT LIST */}
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {project.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* EMPTY STATE */}
      {project.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen className="h-8 w-8" />
            </EmptyMedia>

            <EmptyTitle>Selected projects in progress</EmptyTitle>

            <EmptyDescription>
              I focus on quality over quantity. A curated selection of
              production-grade projects will appear here shortly.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button asChild>
              <Link href="#contact">Contact me</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
};

export default ProjectsSection;
