import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";

// Realistic peak hours pattern
const peakPattern = [
  [20, 15, 10, 8, 8, 12, 35, 65, 75, 60, 45, 50],
  [55, 60, 55, 50, 52, 58, 70, 85, 90, 75, 55, 30],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => i * 2);

function getIntensity(dayIndex: number, hourIndex: number): number {
  const baseValue = peakPattern[hourIndex < 6 ? 0 : 1][hourIndex % 12];
  const dayMultiplier = dayIndex >= 5 ? 0.7 : 1;
  return Math.min(100, baseValue * dayMultiplier + (Math.random() * 10 - 5));
}

function getColor(value: number): string {
  if (value < 25) return "bg-green-primary/30";
  if (value < 50) return "bg-green-primary/50";
  if (value < 75) return "bg-green-primary/80";
  return "bg-green-primary";
}

export function PeakHoursWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Peak Usage Hours
        </CardTitle>
        <p className="text-sm text-text-secondary">
          Hourly consumption heatmap
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Hour labels */}
            <div className="flex gap-1 mb-2 pl-12">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 text-[10px] text-text-tertiary text-center"
                >
                  {hour.toString().padStart(2, "0")}:00
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-1">
              {days.map((day, dayIndex) => (
                <div key={day} className="flex items-center gap-1">
                  <span className="w-10 text-xs text-text-secondary">
                    {day}
                  </span>
                  <div className="flex-1 flex gap-1">
                    {hours.map((hour, hourIndex) => {
                      const intensity = getIntensity(dayIndex, hourIndex);
                      return (
                        <motion.div
                          key={hour}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: (dayIndex * 12 + hourIndex) * 0.01,
                          }}
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          className={`flex-1 h-6 rounded-sm cursor-pointer ${getColor(
                            intensity,
                          )} transition-all`}
                          title={`${day} ${hour}:00 - ${Math.round(intensity)}% usage`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-4 mt-4">
              <span className="text-xs text-text-tertiary">Low</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-sm bg-green-primary/30" />
                <div className="w-4 h-4 rounded-sm bg-green-primary/50" />
                <div className="w-4 h-4 rounded-sm bg-green-primary/80" />
                <div className="w-4 h-4 rounded-sm bg-green-primary" />
              </div>
              <span className="text-xs text-text-tertiary">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
