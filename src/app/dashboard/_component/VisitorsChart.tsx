"use client";

import { AnalyticsUI } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: AnalyticsUI[];
};

export default function VisitorsChart({ data }: Props) {
  return (
    <div className="h-[320px] rounded-lg border p-4">
      <h2 className="mb-4 font-medium">Engagement Over Time</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="totalVisitors"
            stroke="#3c9ee0"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="resumeDownloads"
            stroke="#22c55e"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="contactSubmits"
            stroke="#a855f7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
