import SiteNavbar from "@/components/layout/SiteNavbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
