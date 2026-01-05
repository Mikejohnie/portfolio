import Link from "next/link";
import { getPublicAbout } from "@/components/helper/getPublicAbout";
import { getPublicContact } from "@/components/helper/getPublicContact";
import { getPublicProjects } from "@/components/helper/getPublicProjects";


export default async function Footer() {
  const [about, contact, projects] = await Promise.all([
    getPublicAbout(),
    getPublicContact(),
    getPublicProjects(),
  ]);

  const flagship = projects?.find((p) => p.isFlagship);

  const startYear = about?.portfolioStartYear;
const currentYear = new Date().getFullYear();

const yearText =
  startYear === currentYear
    ? `${startYear}`
    : `${startYear}–${currentYear}`;




  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 space-y-12">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND / SUMMARY */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-semibold">
              {about?.fullName ?? "Michael Nku"}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {about?.shortBio ??
                "Full-Stack Web Developer focused on building reliable, scalable, and secure web applications."}
            </p>

            {about?.headline && (
              <p className="text-xs text-muted-foreground">{about.headline}</p>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#home" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* FEATURED PROJECT */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Featured Work</h4>

            {flagship ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="font-medium text-foreground">{flagship.name}</li>
                <li>{flagship.summary}</li>
                {flagship.liveUrl && (
                  <li>
                    <Link
                      href={
                        flagship.liveUrl.startsWith("http")
                          ? flagship.liveUrl
                          : `https://${flagship.liveUrl}`
                      }
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      View project →
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Case studies coming soon.
              </p>
            )}
          </div>

          {/* CONTACT */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-foreground"
                  >
                    {contact.email}
                  </a>
                </li>
              )}

              {contact?.location && <li>{contact.location}</li>}

              {contact?.linkedin && (
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
              )}

              {contact?.github && (
                <li>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6 text-xs text-muted-foreground">
          <span>
            © {yearText} {about?.fullName}. All rights reserved.
          </span>

          <span>Built with Next.js · TypeScript · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
