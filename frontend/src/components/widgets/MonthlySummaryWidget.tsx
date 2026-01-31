import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  DollarSign,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SummaryItem {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: LucideIcon;
  color: string;
}

const summaryData: SummaryItem[] = [
  {
    label: "Total Consumption",
    value: 1847,
    unit: "kWh",
    change: -12,
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    label: "Cost Savings",
    value: 142,
    unit: "$",
    change: 23,
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    label: "Carbon Reduced",
    value: 234,
    unit: "kg",
    change: 18,
    icon: Leaf,
    color: "text-emerald-400",
  },
];

function AnimatedCounter({
  value,
  duration = 1.5,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function MonthlySummaryWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Monthly Summary</CardTitle>
        <p className="text-sm text-text-secondary">January 2026</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-background-dark-secondary rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-center justify-between mb-3">
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <div
                className={`flex items-center gap-1 text-sm ${
                  item.change > 0
                    ? "text-status-success"
                    : "text-status-warning"
                }`}
              >
                {item.change > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(item.change)}%
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  <AnimatedCounter value={item.value} />
                </span>
                <span className="text-text-tertiary text-sm">{item.unit}</span>
              </div>
              <p className="text-text-secondary text-sm">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
