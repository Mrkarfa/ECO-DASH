import { TotalEnergyWidget } from "@/components/widgets/TotalEnergyWidget";

import { GreenConnectionsWidget } from "@/components/widgets/GreenConnectionsWidget";
import { RecommendationsWidget } from "@/components/widgets/RecommendationsWidget";
import { TrackingWidget } from "@/components/widgets/TrackingWidget";
import { DetailedReportWidget } from "@/components/widgets/DetailedReportWidget";
import { GreenEnergyUsageWidget } from "@/components/widgets/GreenEnergyUsageWidget";
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

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto"
    >
      {/* Row 1 */}

      {/* Total Energy Consumption - 6 cols (50%) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <TotalEnergyWidget />
      </motion.div>

      {/* Green Connections - 3 cols (25%) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-3"
      >
        <GreenConnectionsWidget />
      </motion.div>

      {/* Recommendations - 3 cols (25%) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-3"
      >
        <RecommendationsWidget />
      </motion.div>

      {/* Row 2 */}

      {/* Tracking - 3 cols (approx 15-25% to fit grid) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-2"
      >
        <TrackingWidget />
      </motion.div>

      {/* Detailed Report - 6 cols (approx 42-50%) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-7"
      >
        <DetailedReportWidget />
      </motion.div>

      {/* Green Energy Usage - 3 cols (rest) */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-3"
      >
        <GreenEnergyUsageWidget />
      </motion.div>
    </motion.div>
  );
}
