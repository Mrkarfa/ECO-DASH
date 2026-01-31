import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { apiClient, type WeeklyReportItem } from "@/api/client";

export function DetailedReportWidget() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [data, setData] = useState<WeeklyReportItem[]>([]);

  useEffect(() => {
    // In a real app, query based on period
    apiClient
      .get<WeeklyReportItem[]>("/energy/report")
      .then(setData)
      .catch(console.error);
  }, [period]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            Detailed report
          </CardTitle>
          <p className="text-sm text-text-secondary">
            Graphs of energy consumption
          </p>
        </div>
        <div className="flex bg-background-dark-secondary rounded-lg p-1">
          {["week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p as "week" | "month")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all",
                period === p
                  ? "bg-white text-text-dark shadow-sm"
                  : "text-text-secondary hover:text-white",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: any) => [`${value} kWh`, "Consumption"]}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#808080", fontSize: 12 }}
              dy={10}
            />
            <Bar dataKey="kwh" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.current ? "#FFFFFF" : "#2A2A2A"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
