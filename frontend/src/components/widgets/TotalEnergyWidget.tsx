import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { apiClient, type EnergyData } from "@/api/client";

export function TotalEnergyWidget() {
  const [data, setData] = useState<EnergyData[]>([]);

  useEffect(() => {
    apiClient
      .get<EnergyData[]>("/energy/total")
      .then(setData)
      .catch(console.error);
  }, []);

  if (data.length === 0)
    return (
      <Card className="h-full items-center justify-center flex">
        <p>Loading...</p>
      </Card>
    );

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
        {data.map((item) => (
          <div key={item.name} className="flex flex-col space-y-4">
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
                    formatter={(value: any) => [`${value} kWh`, "Usage"]}
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
