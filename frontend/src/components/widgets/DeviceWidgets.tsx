import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Power,
  Thermometer,
  Lightbulb,
  Wind,
  Tv,
  Refrigerator,
  WashingMachine,
  MoreHorizontal,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface Device {
  id: string;
  name: string;
  room: string;
  icon: LucideIcon;
  isOn: boolean;
  power: number;
  usage: number;
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Smart AC",
    room: "Living Room",
    icon: Wind,
    isOn: true,
    power: 1200,
    usage: 24.5,
  },
  {
    id: "2",
    name: "LED Lights",
    room: "Living Room",
    icon: Lightbulb,
    isOn: true,
    power: 60,
    usage: 2.1,
  },
  {
    id: "3",
    name: "Smart TV",
    room: "Living Room",
    icon: Tv,
    isOn: false,
    power: 150,
    usage: 0,
  },
  {
    id: "4",
    name: "Refrigerator",
    room: "Kitchen",
    icon: Refrigerator,
    isOn: true,
    power: 200,
    usage: 8.4,
  },
  {
    id: "5",
    name: "Washing Machine",
    room: "Utility",
    icon: WashingMachine,
    isOn: false,
    power: 500,
    usage: 0,
  },
  {
    id: "6",
    name: "Bedroom AC",
    room: "Bedroom",
    icon: Wind,
    isOn: false,
    power: 1000,
    usage: 0,
  },
];

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  index: number;
}

function DeviceCard({ device, onToggle, index }: DeviceCardProps) {
  const Icon = device.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden rounded-xl p-5 transition-all cursor-pointer ${
        device.isOn
          ? "bg-gradient-to-br from-green-primary/30 to-background-dark-secondary border border-green-primary/30"
          : "bg-background-dark-secondary border border-white/5"
      }`}
    >
      {/* Glow effect when on */}
      {device.isOn && (
        <div className="absolute inset-0 bg-green-glow/5 pointer-events-none" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${
            device.isOn ? "bg-green-primary/50" : "bg-white/5"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              device.isOn ? "text-white" : "text-text-tertiary"
            }`}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-text-tertiary hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-white mb-1">{device.name}</h3>
        <p className="text-sm text-text-tertiary">{device.room}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {device.isOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 text-xs text-green-glow"
            >
              <Zap className="h-3 w-3" />
              {device.power}W
            </motion.div>
          )}
          {device.isOn && (
            <span className="text-xs text-text-tertiary">
              • {device.usage} kWh today
            </span>
          )}
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => onToggle(device.id)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            device.isOn ? "bg-green-primary" : "bg-white/10"
          }`}
        >
          <motion.div
            animate={{ x: device.isOn ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
          />
        </button>
      </div>
    </motion.div>
  );
}

function DeviceStatsWidget({ devices }: { devices: Device[] }) {
  const activeDevices = devices.filter((d) => d.isOn);
  const totalPower = activeDevices.reduce((acc, d) => acc + d.power, 0);
  const totalUsage = activeDevices.reduce((acc, d) => acc + d.usage, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Device Stats</CardTitle>
        <p className="text-sm text-text-secondary">Real-time power usage</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background-dark-secondary rounded-xl p-4 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Power className="h-4 w-4 text-green-glow" />
              <span className="text-sm text-text-secondary">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {activeDevices.length}
              <span className="text-text-tertiary text-sm font-normal">
                /{devices.length}
              </span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background-dark-secondary rounded-xl p-4 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-text-secondary">Power</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {(totalPower / 1000).toFixed(1)}
              <span className="text-text-tertiary text-sm font-normal">
                {" "}
                kW
              </span>
            </p>
          </motion.div>
        </div>

        <div className="bg-background-dark-secondary rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-text-secondary">Today's Usage</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {totalUsage.toFixed(1)}
            <span className="text-text-tertiary text-lg font-normal"> kWh</span>
          </p>
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalUsage / 50) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-primary to-green-glow rounded-full"
            />
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            {((totalUsage / 50) * 100).toFixed(0)}% of daily goal (50 kWh)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function AddDeviceCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full min-h-[180px] rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-green-primary/50 hover:bg-green-primary/5 transition-all"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
        <span className="text-2xl text-text-tertiary">+</span>
      </div>
      <span className="text-sm text-text-secondary">Add New Device</span>
    </motion.div>
  );
}

export { DeviceCard, DeviceStatsWidget, AddDeviceCard, initialDevices };
export type { Device };
