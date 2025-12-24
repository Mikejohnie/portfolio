import Link from "next/link";
import { Button } from "@/components/ui/button";
import ResumeButton from "@/components/home/ResumeButton";

const ContactSection = () => {
  return (
    <section className="mx-auto max-w-4xl px-6  space-y-16">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Interested in working together or learning more about my work? I’m
          open to full-time roles, contract work, and collaborative projects.
        </p>
      </header>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT — MESSAGE */}
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I enjoy working on meaningful products that require thoughtful
            system design, clean architecture, and modern web technologies.
          </p>

          <p>
            If you’re a recruiter, hiring manager, or founder looking for a
            Full-Stack Developer, feel free to reach out. I’m happy to discuss
            how my skills and experience could fit your team.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <ResumeButton />
            <Button asChild variant="outline">
              <Link href="mailto:your@email.com">Email Me</Link>
            </Button>
          </div>
        </div>

        {/* RIGHT — CONTACT DETAILS */}
        <div className="rounded-2xl border p-8 space-y-6">
          <h2 className="text-xl font-semibold">Contact Details</h2>

          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="text-sm">Email</p>
              <a
                href="mailto: nkumichael1@gmail.com"
                className="font-medium text-foreground hover:underline"
              >
                nkumichael1@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm">LinkedIn</p>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                linkedin.com/in/yourprofile
              </a>
            </div>

            <div>
              <p className="text-sm">GitHub</p>
              <a
                href="https://github.com/michaelnku
"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                github.com/michaelnku
              </a>
            </div>

            <div>
              <p className="text-sm">Location</p>
              <p className="font-medium text-foreground">
                📍 Nigeria · Open to Remote & International Roles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <div className="border-t pt-10 text-center space-y-4">
        <p className="text-muted-foreground">Prefer a quick overview?</p>
        <ResumeButton />
      </div>
    </section>
  );
};

export default ContactSection;
