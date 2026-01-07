import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Download,
  Twitter,
} from "lucide-react";
import ResumeButton from "../home/ResumeButton";
import { ContactUI } from "@/lib/types";

type Props = {
  contact: ContactUI;
  resumeUrl?: string;
};

export default function ContactSection({ contact, resumeUrl }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-6 space-y-16">
      {/* HEADER */}
      <header className="space-y-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">Let’s work together</h2>
        <p className="text-muted-foreground text-lg">
          I’m open to full-time roles, contract work, and collaborative
          projects. If you’re hiring or have an opportunity, I’d love to hear
          from you.
        </p>
      </header>

      {/* AVAILABILITY */}
      <div className="flex flex-wrap gap-3">
        {contact.availableForWork && (
          <span className="rounded-full bg-green-500/10 text-green-600 px-4 py-1 text-sm hover:shadow-md">
            Open to work
          </span>
        )}

        {contact.openToRelocation && (
          <span className="rounded-full bg-blue-500/10 text-blue-600 px-4 py-1 text-sm hover:shadow-md">
            Open to relocation
          </span>
        )}

        {contact.location && (
          <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm text-muted-foreground hover:shadow-md">
            <MapPin className="h-4 w-4" />
            {contact.location}
          </span>
        )}
      </div>

      {/* CONTACT METHODS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EMAIL */}
        <div className="rounded-xl border p-6 space-y-4 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium text-lg">Email</h3>
          </div>

          <p className="text-muted-foreground text-sm">
            Best way to reach me for roles, interviews, or collaboration.
          </p>

          <Link
            href={`mailto:${contact.email}`}
            className="text-blue-600 font-medium hover:underline"
          >
            {contact.email}
          </Link>
        </div>

        {/* LOCATION */}
        <div className="rounded-xl border p-6 space-y-4 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-purple-500" />
            <h3 className="font-medium text-lg">Location</h3>
          </div>

          <p className="text-muted-foreground text-sm">Currently based in:</p>

          <p className="font-medium">{contact.location}</p>
        </div>
      </div>

      {/* CTA BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href={`mailto:${contact.email}`}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Link>
        </Button>

        {resumeUrl && <ResumeButton resumeUrl={resumeUrl} />}
      </div>

      {/* SOCIAL LINKS */}
      <div className="flex flex-wrap gap-6 pt-6">
        {contact.github && (
          <Link
            href={contact.github}
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <Github className="h-5 w-5" />
            GitHub
          </Link>
        )}

        {contact.linkedin && (
          <Link
            href={contact.linkedin}
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </Link>
        )}

        {contact.twitter && (
          <Link
            href={contact.twitter}
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <Twitter className="h-5 w-5" />
            Twitter
          </Link>
        )}

        {contact.website && (
          <Link
            href={contact.website}
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <Globe className="h-5 w-5" />
            Website
          </Link>
        )}
      </div>
    </section>
  );
}
