import Navbar from "@/components/layout/SiteNavbar";
import Footer from "@/components/layout/Footer";
import { CurrentUser } from "@/lib/currentUser";
import AdminNavbar from "@/components/layout/AdminNavbar";
import SiteNavbar from "@/components/layout/SiteNavbar";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await CurrentUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      {(!user || user.role === "USER") && <SiteNavbar />}

      {user?.role === "ADMIN" && <AdminNavbar />}

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-16">{children}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
