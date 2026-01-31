import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient, type Recommendation } from "@/api/client";

export function RecommendationsWidget() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    apiClient
      .get<Recommendation[]>("/recommendations")
      .then(setRecommendations)
      .catch(console.error);
  }, []);

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
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-background-light-secondary rounded-xl p-4 transition-transform hover:scale-[1.02] cursor-pointer"
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
