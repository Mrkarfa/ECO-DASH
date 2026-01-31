import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { apiClient, type EnergyData } from "@/api/client";
import { motion } from "framer-motion";

// Fallback mock data for when API is unavailable
const FALLBACK_DATA: EnergyData[] = [
  {
    name: "Kitchen",
    min: 120,
    max: 240,
    current: 187,
    trend: "down",
    data: [45, 52, 38, 65, 48, 72, 58, 42, 55, 68, 45, 52],
  },
  {
    name: "Living Room",
    min: 80,
    max: 180,
    current: 142,
    trend: "up",
    data: [32, 45, 58, 42, 65, 48, 38, 55, 62, 45, 52, 48],
  },
  {
    name: "Bedroom",
    min: 40,
    max: 120,
    current: 68,
    trend: "down",
    data: [28, 35, 42, 32, 45, 38, 52, 35, 42, 38, 45, 42],
  },
];

export function TotalEnergyWidget() {
  const [data, setData] = useState<EnergyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<EnergyData[]>("/energy/total")
      .then(setData)
      .catch(() => {
        // Use fallback data when API fails
        setData(FALLBACK_DATA);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Use fallback data if API data is empty after loading
  const displayData = data.length > 0 ? data : FALLBACK_DATA;

  if (isLoading) {
    return (
      <Card className="h-full items-center justify-center flex">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-text-secondary"
        >
          Loading...
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          Total Energy Consumption
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs border-white/20 hover:bg-white/5"
        >
          Change module
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {displayData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-text-secondary">
                    {item.name}
                  </h4>
                  {item.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-status-warning" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-status-success" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {item.current}
                  </span>
                  <span className="text-sm text-text-tertiary">kWh</span>
                </div>
                <p className="text-xs text-text-tertiary mt-1">
                  {item.min}-{item.max} kWh per month
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-text-tertiary"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={item.data.map((val) => ({ val }))}>
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "4px 8px",
                    }}
                    itemStyle={{ color: "#fff", fontSize: "12px" }}
                    formatter={(value) =>
                      value !== undefined ? [`${value} kWh`, "Usage"] : [""]
                    }
                    labelStyle={{ display: "none" }}
                  />
                  <Bar
                    dataKey="val"
                    fill="#FFFFFF"
                    radius={[4, 4, 0, 0]}
                    barSize={6}
                    background={{ fill: "#2A2A2A", radius: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
