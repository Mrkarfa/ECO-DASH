import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useState, useEffect } from "react";
import { apiClient, type GreenEnergyHour } from "@/api/client";

export function GreenEnergyUsageWidget() {
  const [data, setData] = useState<GreenEnergyHour[]>([]);

  useEffect(() => {
    apiClient
      .get<GreenEnergyHour[]>("/energy/usage")
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <Card className="h-full border-green-primary bg-green-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">
          Green energy usage
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs bg-transparent border-white/20 hover:bg-white/5 hover:text-white"
        >
          Change
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col justify-end h-[calc(100%-80px)]">
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white">47%</span>
          </div>
          <p className="text-sm text-text-secondary mt-1">11AM — 3PM</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-2 left-0 right-0 h-[1px] bg-white/10" />

          <div className="flex justify-between relative z-10">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-colors",
                    item.active
                      ? "bg-white border-white"
                      : "bg-transparent border-gray-600",
                    item.current && "ring-4 ring-white/20",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    item.current ? "text-white" : "text-text-tertiary",
                  )}
                >
                  {item.hour.split(":")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
