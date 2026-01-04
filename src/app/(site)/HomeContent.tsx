import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import AboutSection from "@/components/sections/About";
import Hero from "@/components/hero/h";
import { getPublicAbout } from "@/components/helper/getPublicAbout";
import { getPublicContact } from "@/components/helper/getPublicContact";
import { getPublicProjects } from "@/components/helper/getPublicProjects";

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
        <Hero about={about} />
      </section>

      <section id="about" className="section-spacing">
        <AboutSection about={about} project={project} />
      </section>

      <section id="projects" className="section-spacing">
        <ProjectsSection project={project} />
      </section>

      <section id="contact" className="section-spacing">
        <ContactSection contact={contact} resumeUrl={about?.resume?.url} />
      </section>
    </>
  );
};

export default HomeContent;
