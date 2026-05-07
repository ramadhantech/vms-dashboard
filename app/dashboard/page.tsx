"use client";

import { useEffect, useState } from "react";
import DashboardChart from "@/components/dashboard/DashboardChart";
import Card from "@/components/dashboard/Card";
import { getDashboardSummary, getDailySummary } from "@/lib/api";

type ChartItem = {
  name: string;
  visitors: number;
};

type SummaryType = {
  totalVisitors: number;
  checkedIn: number;
  checkedOut: number;
  pending: number;
};

export default function DashboardPage() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [summary, setSummary] = useState<SummaryType>({
    totalVisitors: 0,
    checkedIn: 0,
    checkedOut: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [summaryRes, chartRes] = await Promise.all([
          getDashboardSummary(),
          getDailySummary(),
        ]);

        setSummary({
          totalVisitors: summaryRes?.totalVisitors ?? 0,
          checkedIn: summaryRes?.checkedIn ?? 0,
          checkedOut: summaryRes?.checkedOut ?? 0,
          pending: summaryRes?.pending ?? 0,
        });

        const mapped: ChartItem[] = Array.isArray(chartRes)
          ? chartRes.map((item: any) => ({
              name: item?.date
                ? new Date(item.date).toLocaleDateString()
                : "-",
              visitors: item?.total ?? 0,
            }))
          : [];

        setChartData(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Visitors" value={summary.totalVisitors} />
        <Card title="Checked In" value={summary.checkedIn} />
        <Card title="Checked Out" value={summary.checkedOut} />
        <Card title="Pending" value={summary.pending} />
      </div>

      <DashboardChart data={chartData} />
    </div>
  );
}