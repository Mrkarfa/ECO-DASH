import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient, type TrackingData } from "@/api/client";
import { motion } from "framer-motion";

// Fallback mock data for when API is unavailable
const FALLBACK_DATA: TrackingData = {
  solarForecast: 4.2,
  unit: "kWh",
};

export function TrackingWidget() {
  const [data, setData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<TrackingData>("/energy/solar")
      .then(setData)
      .catch(() => {
        setData(FALLBACK_DATA);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayData = data ?? FALLBACK_DATA;

  return (
    <Card className="h-full bg-background-light border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-text-dark">
          Tracking
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-text-dark-secondary hover:bg-black/5"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Sun className="h-4 w-4 text-yellow-500" />
          <p className="text-sm text-text-dark-secondary font-medium">
            Solar energy tomorrow
          </p>
        </div>
        {isLoading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-text-dark-secondary"
          >
            Loading...
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-5xl font-bold text-text-dark tracking-tighter">
              {displayData.solarForecast}
            </span>
            <span className="text-lg font-medium text-text-dark-secondary">
              {displayData.unit}
            </span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
