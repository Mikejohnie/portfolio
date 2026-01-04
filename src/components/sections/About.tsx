import Image from "next/image";
import ResumeButton from "@/components/home/ResumeButton";
import { AboutUI, ProjectUI } from "@/lib/types";
type Props = {
  about: AboutUI;
  project: ProjectUI[];
};

const AboutSection = ({ about, project }: Props) => {
  const keyWords = [
    { text: about.fullName, highlightStyle: "" },
    { text: about.headline, highlightStyle: "" },
    // { text: project.name, highlightStyle: "" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 space-y-20">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">About Me</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {/* <span className="font-medium text-foreground">Michael Nku</span>, */}
          {about.subHeadline}
        </p>
      </header>

      {/* PHOTO + BIO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* IMAGE */}
        {about.profileImage?.url && (
          <div className="flex justify-center md:justify-start">
            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-blue-500 to-purple-600">
              <div className="rounded-full bg-background p-2">
                <Image
                  src={about.profileImage.url}
                  alt={about.fullName}
                  width={260}
                  height={260} // 👈 make it square
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* <a
              href={"nexamart-store-red.vercel.app"}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-medium text-foreground">
                NexaMart Marketplace
              </span>
            </a> */}

        {/* BIO */}
        <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
          {about.longBio
            ?.split("\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

          {about.resume?.url && <ResumeButton resumeUrl={about?.resume?.url} />}
        </div>
      </section>

      {/* TECH STACK */}
      {about.skills.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Tech Stack</h2>

          <div className="flex flex-wrap gap-3">
            {about.skills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-full border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE TIMELINE */}
      {about.experience.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Experience & Journey</h2>

          <div className="space-y-6 border-l pl-6">
            {about.experience.map((item, index) => (
              <div key={index} className="relative space-y-1">
                <span className="absolute -left-[10px] top-2 h-3 w-3 rounded-full bg-blue-500" />

                <p className="text-xs text-muted-foreground">{item.year}</p>
                <h3 className="font-medium text-sm">
                  {item.title}
                  {item.context && (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      — {item.context}
                    </span>
                  )}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default AboutSection;
