import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient, type Recommendation } from "@/api/client";
import { motion } from "framer-motion";

// Fallback mock data for when API is unavailable
const FALLBACK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "Consider switching to LED bulbs in your living room",
    category: "Lighting",
    time: "2h ago",
    type: "Quick Win",
    priority: "high",
  },
  {
    id: 2,
    title: "Your AC runs 3 hours more than optimal during weekdays",
    category: "HVAC",
    time: "5h ago",
    type: "Energy Saver",
    priority: "medium",
  },
  {
    id: 3,
    title: "Schedule dishwasher to run during off-peak hours (10PM-6AM)",
    category: "Appliances",
    time: "1d ago",
    type: "Cost Saver",
    priority: "low",
  },
];

export function RecommendationsWidget() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<Recommendation[]>("/recommendations")
      .then(setRecommendations)
      .catch(() => {
        setRecommendations(FALLBACK_RECOMMENDATIONS);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayData =
    recommendations.length > 0 ? recommendations : FALLBACK_RECOMMENDATIONS;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            Recommendations
          </CardTitle>
          <p className="text-sm text-text-secondary">
            Personalized tips for optimizing energy
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-text-tertiary"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pr-2 custom-scrollbar space-y-3">
        {isLoading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-text-secondary text-center py-4"
          >
            Loading...
          </motion.div>
        ) : (
          displayData.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-background-light-secondary rounded-xl p-4 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-white px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wide text-text-tertiary border border-border-secondary">
                  {rec.category}
                </span>
                {rec.time && (
                  <div className="flex items-center text-text-tertiary text-xs gap-1">
                    <Clock className="h-3 w-3" />
                    {rec.time}
                  </div>
                )}
              </div>
              <h4 className="text-text-dark font-medium text-sm leading-snug mb-3">
                {rec.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-green-primary bg-green-primary/10 px-2 py-0.5 rounded-full">
                  <Zap className="h-3 w-3" />
                  {rec.type}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
