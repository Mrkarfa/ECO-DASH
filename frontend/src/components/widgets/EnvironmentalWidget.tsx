import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Leaf,
  TreeDeciduous,
  Wind,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ImpactItem {
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  description: string;
}

const impactData: ImpactItem[] = [
  {
    label: "CO₂ Reduced",
    value: 234,
    unit: "kg",
    icon: Wind,
    description: "Equivalent to 9 trees absorbing CO₂ for a month",
  },
  {
    label: "Trees Saved",
    value: 12,
    unit: "trees",
    icon: TreeDeciduous,
    description: "Based on paper and energy saved",
  },
  {
    label: "Water Saved",
    value: 1847,
    unit: "L",
    icon: Droplets,
    description: "Through efficient energy production",
  },
];

function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = value;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(
      () => {
        current += 1;
        if (current >= steps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * current));
        }
      },
      (duration * 1000) / steps,
    );

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function EnvironmentalWidget() {
  return (
    <Card className="h-full bg-gradient-to-br from-green-primary/20 to-background-dark-secondary border-green-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-glow" />
          <CardTitle className="text-xl font-semibold">
            Environmental Impact
          </CardTitle>
        </div>
        <p className="text-sm text-text-secondary">
          Your contribution to a greener planet
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {impactData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ x: 5 }}
            className="flex items-start gap-4 p-3 rounded-lg bg-background-dark/50 border border-white/5 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-green-primary/30">
              <item.icon className="h-5 w-5 text-green-glow" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  <AnimatedCounter value={item.value} />
                </span>
                <span className="text-sm text-text-tertiary">{item.unit}</span>
              </div>
              <p className="text-sm font-medium text-text-secondary">
                {item.label}
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 rounded-xl bg-green-primary/10 border border-green-primary/30 text-center"
        >
          <p className="text-sm text-green-glow font-medium">
            🌍 You're in the top 15% of eco-conscious users this month!
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
