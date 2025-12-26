import SiteNavbar from "@/components/layout/SiteNavbar";
import AdminNavbar from "@/components/layout/AdminNavbar";
import Footer from "@/components/layout/Footer";
import { CurrentUser } from "@/lib/currentUser";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await CurrentUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      {isAdmin ? <AdminNavbar initialUser={user} /> : <SiteNavbar />}

      {/* PAGE CONTENT */}
      <main className={`flex-1 ${isAdmin ? "pt-16" : "pt-16"}`}>
        {children}
      </main>

      {/* FOOTER (PUBLIC ONLY) */}
      {!isAdmin && <Footer />}
    </div>
  );
}
