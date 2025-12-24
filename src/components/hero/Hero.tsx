import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              I’m <span className="text-blue-500">Michael Nku</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
              Full-Stack Web Developer
            </h2>
          </div>

          <p className="max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
            I design and build{" "}
            <span className="text-foreground font-medium">
              scalable marketplaces
            </span>
            , dashboards, and secure web applications with a focus on
            performance, clean architecture, and real-world business needs.
          </p>

          <p className="text-sm text-muted-foreground">
            Tech stack: Next.js · React · TypeScript · Prisma · PostgreSQL ·
            Stripe
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={"#projects"}>
              <Button size="lg" className="px-8">
                View Projects
              </Button>
            </Link>

            <Link href={"#contact"}>
              <Button size="lg" variant="outline" className="px-8">
                Contact Me
              </Button>
            </Link>
          </div>

          {/* TRUST SIGNAL */}
          <div className="pt-6 hidden text-sm text-muted-foreground">
            🚀 Creator of{" "}
            <span className="font-medium text-foreground">
              NexaMart Marketplace
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-blue-500 to-purple-600">
            <div className="rounded-2xl bg-background p-2">
              <img
                src="https://j1ruac0eqa.ufs.sh/f/3IGtMbPoM9DuSas5xihcbumZ4adE9sqUPtXeSABHVgvi37Dl"
                alt="Michael Nku"
                width={340}
                height={420}
                className="rounded-xl object-cover"
                // priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
