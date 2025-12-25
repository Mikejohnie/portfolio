import { redirect } from "next/navigation";
import { CurrentUser } from "@/lib/currentUser";
import AdminNavbar from "@/components/layout/AdminNavbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await CurrentUser();

  if (!user) redirect("/auth/admin/login");
  if (user.role === "USER") redirect("/");

  return (
    <div>
      {/* TOP NAVBAR */}
      <AdminNavbar />
      {/* <AdminNavbar initialUser={user} /> */}

      <div className="flex max-w-full overflow-x-hidden">
        {/* LEFT SIDEBAR */}
        {/* <DashboardSidebar initialUser={user} /> */}
        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full max-w-full px-4 md:px-6 py-4 md:ml-64 overflow-x-hidden">
          {/*global Currency rate*/}
          {children}
        </main>
      </div>
    </div>
  );
}
