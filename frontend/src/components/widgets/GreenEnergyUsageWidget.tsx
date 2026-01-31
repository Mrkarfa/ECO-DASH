import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useState, useEffect } from "react";
import { apiClient, type GreenEnergyHour } from "@/api/client";
import { motion } from "framer-motion";

// Fallback mock data for when API is unavailable
const FALLBACK_DATA: GreenEnergyHour[] = [
  { hour: "08:00", active: false },
  { hour: "10:00", active: true },
  { hour: "12:00", active: true, current: true },
  { hour: "14:00", active: true },
  { hour: "16:00", active: false },
  { hour: "18:00", active: false },
];

export function GreenEnergyUsageWidget() {
  const [data, setData] = useState<GreenEnergyHour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<GreenEnergyHour[]>("/energy/usage")
      .then(setData)
      .catch(() => {
        setData(FALLBACK_DATA);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayData = data.length > 0 ? data : FALLBACK_DATA;

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
        {isLoading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-text-secondary text-center py-4"
          >
            Loading...
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">47%</span>
              </div>
              <p className="text-sm text-text-secondary mt-1">11AM — 3PM</p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-2 left-0 right-0 h-[1px] bg-white/10" />

              <div className="flex justify-between relative z-10">
                {displayData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-3"
                  >
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
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
