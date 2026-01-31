import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useState } from "react";
import { motion } from "framer-motion";

const data = [
  { name: "Week 1", current: 420, previous: 480 },
  { name: "Week 2", current: 380, previous: 450 },
  { name: "Week 3", current: 450, previous: 420 },
  { name: "Week 4", current: 520, previous: 510 },
];

const monthlyData = [
  { name: "Aug", current: 1650, previous: 1800 },
  { name: "Sep", current: 1580, previous: 1720 },
  { name: "Oct", current: 1720, previous: 1650 },
  { name: "Nov", current: 1480, previous: 1600 },
  { name: "Dec", current: 1920, previous: 1850 },
  { name: "Jan", current: 1847, previous: 1780 },
];

export function ConsumptionChartWidget() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const chartData = period === "weekly" ? data : monthlyData;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            Consumption Trends
          </CardTitle>
          <p className="text-sm text-text-secondary">
            Compare with previous period
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={period === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("weekly")}
            className="text-xs"
          >
            Weekly
          </Button>
          <Button
            variant={period === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("monthly")}
            className="text-xs"
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          key={period}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[280px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#808080", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                tick={{ fill: "#808080", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
                formatter={(value) =>
                  value !== undefined ? [`${value} kWh`] : [""]
                }
              />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#808080" }} />
              <Line
                type="monotone"
                dataKey="current"
                name="Current Period"
                stroke="#5A8A70"
                strokeWidth={3}
                dot={{ fill: "#5A8A70", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="Previous Period"
                stroke="#808080"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#808080", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
