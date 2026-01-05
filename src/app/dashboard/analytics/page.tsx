import { getAdminAnalytics } from "@/components/helper/getAdminAnalytics";
import AnalyticsCards from "../_component/AnalyticsCards";
import VisitorsChart from "../_component/VisitorsChart";

export default async function AnalyticsPage() {
  const analytics = await getAdminAnalytics();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Portfolio Analytics</h1>
        <p className="text-muted-foreground">
          Engagement and hiring signals from your portfolio visitors.
        </p>
      </header>

      <AnalyticsCards data={analytics} />
      <VisitorsChart data={analytics} />
    </div>
  );
}
