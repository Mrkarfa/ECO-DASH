import { MonthlySummaryWidget } from "@/components/widgets/MonthlySummaryWidget";
import { ConsumptionChartWidget } from "@/components/widgets/ConsumptionChartWidget";
import { PeakHoursWidget } from "@/components/widgets/PeakHoursWidget";
import { CostAnalysisWidget } from "@/components/widgets/CostAnalysisWidget";
import { EnvironmentalWidget } from "@/components/widgets/EnvironmentalWidget";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Analytics() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto"
    >
      {/* Monthly Summary - Full Width */}
      <motion.div variants={item} className="col-span-1 md:col-span-12">
        <MonthlySummaryWidget />
      </motion.div>

      {/* Consumption Trends Chart - 8 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-8"
      >
        <ConsumptionChartWidget />
      </motion.div>

      {/* Environmental Impact - 4 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-4"
      >
        <EnvironmentalWidget />
      </motion.div>

      {/* Peak Hours Heatmap - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <PeakHoursWidget />
      </motion.div>

      {/* Cost Analysis - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <CostAnalysisWidget />
      </motion.div>
    </motion.div>
  );
}
