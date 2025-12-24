import ResumeButton from "@/components/home/ResumeButton";
import Image from "next/image";
import Link from "next/link";

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Prisma",
  "PostgreSQL",
  "Stripe",
  "Tailwind CSS",
  "shadcn/ui",
];

const timeline = [
  {
    year: "2024 — Present",
    title: "Full-Stack Web Developer",
    description:
      "Designing and building scalable full-stack applications with a focus on clean architecture, performance, and real-world use cases.",
  },
  {
    year: "2024",
    title: "Creator — NexaMart Marketplace",
    description:
      "Built a full-featured marketplace platform with role-based dashboards, product management, authentication, and payment integration.",
  },
  {
    year: "2023",
    title: "Frontend → Full-Stack Transition",
    description:
      "Expanded from frontend development into backend systems, databases, and API design using modern tools and best practices.",
  },
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 space-y-20">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">About Me</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          I’m <span className="font-medium text-foreground">Michael Nku</span>,
          a Full-Stack Web Developer building scalable, secure, and maintainable
          web applications.
        </p>
      </header>

      {/* PHOTO + BIO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="flex justify-center md:justify-start">
          <div className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-blue-500 to-purple-600">
            <div className="rounded-2xl bg-background p-2">
              <img
                src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9DuSas5xihcbumZ4adE9sqUPtXeSABHVgvi37Dl"
                alt="Michael Nku"
                width={260}
                height={320}
                className="rounded-xl object-cover"
                // priority
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I focus on building modern web systems that solve real business
            problems. My work spans both frontend and backend development, with
            attention to performance, security, and long-term maintainability.
          </p>

          <p>
            One of my flagship projects is{" "}
            <a
              href={"nexamart-store-red.vercel.app"}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-medium text-foreground">
                NexaMart Marketplace
              </span>
            </a>
            , a full-stack platform featuring authentication, role-based access,
            dashboards, and payment processing.
          </p>

          <p>
            I enjoy working on products that require thoughtful system design
            and clean engineering decisions.
          </p>

          <ResumeButton />
        </div>
      </section>

      {/* TECH STACK */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>

        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Experience & Journey</h2>

        <div className="space-y-6 border-l pl-6">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[10px] top-2 h-3 w-3 rounded-full bg-blue-500" />
              <p className="text-sm text-muted-foreground">{item.year}</p>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
