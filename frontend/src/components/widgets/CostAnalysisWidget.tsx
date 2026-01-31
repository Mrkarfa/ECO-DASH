import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Heating/Cooling", value: 485, color: "#5A8A70" },
  { name: "Lighting", value: 320, color: "#4A6F5F" },
  { name: "Appliances", value: 280, color: "#3D5F4E" },
  { name: "Electronics", value: 180, color: "#2D4A3E" },
  { name: "Other", value: 120, color: "#1A3530" },
];

const total = data.reduce((acc, item) => acc + item.value, 0);

export function CostAnalysisWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Cost Breakdown</CardTitle>
        <p className="text-sm text-text-secondary">Energy costs by category</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-[200px] w-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "#fff", fontSize: "12px" }}
                  formatter={(value) =>
                    value !== undefined ? [`$${value}`] : [""]
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="flex-1 space-y-3">
            {data.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-text-secondary">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    ${item.value}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    ({((item.value / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              </motion.div>
            ))}
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Total</span>
                <span className="text-lg font-bold text-white">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
