import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

import { getPublicAbout } from "@/components/helper/getPublicAbout";
import { getPublicContact } from "@/components/helper/getPublicContact";
import { getPublicProjects } from "@/components/helper/getPublicProjects";
import { Reveal } from "@/components/animations/Reveal";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/sections/AboutSection";

const HomeContent = async () => {
  const about = await getPublicAbout();
  const contact = await getPublicContact();
  const project = await getPublicProjects();
  if (!project) return null;

  if (!about) return null;

  if (!contact) return null;
  return (
    <>
      <section id="home">
        <Reveal>
          <Hero about={about} />
        </Reveal>
      </section>

      <section id="about" className="section-spacing">
        <Reveal delay={0.1}>
          <AboutSection
            about={about}
            resumeUrl={about?.resume?.url}
            project={project}
          />
        </Reveal>
      </section>

      <section id="projects" className="section-spacing">
        <Reveal delay={0.2}>
          <ProjectsSection project={project} />
        </Reveal>
      </section>

      <section id="contact" className="section-spacing">
        <Reveal delay={0.3}>
          <ContactSection contact={contact} resumeUrl={about?.resume?.url} />
        </Reveal>
      </section>
    </>
  );
};

export default HomeContent;
