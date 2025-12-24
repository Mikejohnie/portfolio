import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* BRAND */}
          <div className="space-y-3 max-w-sm">
            <h3 className="text-lg font-semibold">Michael Nku </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Web Developer focused on building scalable
              marketplaces, secure web applications, and clean system
              architectures.
            </p>
            <p className="text-sm hidden text-muted-foreground">
              🚀 Creator of NexaMart Marketplace
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h4 className="font-medium">Navigation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#home"
                    className="hover:text-foreground transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-foreground transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="hover:text-foreground transition"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-foreground transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Projects</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    NexaMart
                  </Link>
                </li>
                <li className="opacity-60">More coming soon</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="mailto:nkumichael1@gmail.com"
                    className="hover:text-foreground transition"
                  >
                    Email Me
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/michaelnku"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Michael Nku. All rights reserved.
          </span>
          <span className="text-blue-500">
            Built with Next.js & Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
