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
import { motion } from "framer-motion";

// Fallback mock data for when API is unavailable
const FALLBACK_DATA: WeeklyReportItem[] = [
  { day: "Mon", kwh: 42 },
  { day: "Tue", kwh: 38 },
  { day: "Wed", kwh: 55 },
  { day: "Thu", kwh: 48, current: true },
  { day: "Fri", kwh: 35 },
  { day: "Sat", kwh: 28 },
  { day: "Sun", kwh: 32 },
];

export function DetailedReportWidget() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [data, setData] = useState<WeeklyReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get<WeeklyReportItem[]>("/energy/report")
      .then(setData)
      .catch(() => {
        setData(FALLBACK_DATA);
      })
      .finally(() => setIsLoading(false));
  }, [period]);

  const displayData = data.length > 0 ? data : FALLBACK_DATA;

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
        {isLoading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-full flex items-center justify-center text-text-secondary"
          >
            Loading...
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayData} barSize={32}>
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value) =>
                    value !== undefined ? [`${value} kWh`, "Consumption"] : [""]
                  }
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#808080", fontSize: 12 }}
                  dy={10}
                />
                <Bar dataKey="kwh" radius={[4, 4, 4, 4]}>
                  {displayData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.current ? "#FFFFFF" : "#2A2A2A"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
