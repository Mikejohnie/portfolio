import { getDashboardStats } from "@/components/helper/getDashboardStats";
import DashboardStats from "./_component/DashboardStats";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <DashboardStats stats={stats} />;
}
