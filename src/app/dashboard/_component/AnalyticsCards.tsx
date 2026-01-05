import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsUI } from "@/lib/types";

type Props = {
  data: AnalyticsUI[];
};

export default function AnalyticsCards({ data }: Props) {
  const totals = data.reduce(
    (acc, d) => ({
      visitors: acc.visitors + d.totalVisitors,
      resumes: acc.resumes + d.resumeDownloads,
      contacts: acc.contacts + d.contactSubmits,
    }),
    { visitors: 0, resumes: 0, contacts: 0 }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className="hover:shadow-md">
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totals.visitors}
        </CardContent>
      </Card>

      <Card className="hover:shadow-md">
        <CardHeader>
          <CardTitle>Resume Downloads</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totals.resumes}
        </CardContent>
      </Card>

      <Card className="hover:shadow-md">
        <CardHeader>
          <CardTitle>Hire Requests</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totals.contacts}
        </CardContent>
      </Card>
    </div>
  );
}
