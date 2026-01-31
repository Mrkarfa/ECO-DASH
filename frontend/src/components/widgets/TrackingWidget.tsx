import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient, type TrackingData } from "@/api/client";

export function TrackingWidget() {
  const [data, setData] = useState<TrackingData | null>(null);

  useEffect(() => {
    apiClient
      .get<TrackingData>("/energy/solar")
      .then(setData)
      .catch(console.error);
  }, []);

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
        <p className="text-sm text-text-dark-secondary font-medium mb-4">
          Solar energy tomorrow
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-text-dark tracking-tighter">
            {data?.solarForecast ?? "-.-"}
          </span>
          <span className="text-lg font-medium text-text-dark-secondary">
            {data?.unit ?? "kWh"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
