import { useState } from "react";
import { motion } from "framer-motion";
import {
  DeviceCard,
  DeviceStatsWidget,
  AddDeviceCard,
  initialDevices,
  type Device,
} from "@/components/widgets/DeviceWidgets";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [filter, setFilter] = useState<"all" | "on" | "off">("all");
  const { toast } = useToast();

  const handleToggle = (id: string) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === id) {
          const newState = !device.isOn;
          toast(
            `${device.name} turned ${newState ? "on" : "off"}`,
            newState ? "success" : "info",
          );
          return {
            ...device,
            isOn: newState,
            usage: newState ? device.usage + Math.random() * 2 : 0,
          };
        }
        return device;
      }),
    );
  };

  const filteredDevices = devices.filter((device) => {
    if (filter === "on") return device.isOn;
    if (filter === "off") return !device.isOn;
    return true;
  });

  const rooms = [...new Set(devices.map((d) => d.room))];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto"
    >
      {/* Header with Filters */}
      <motion.div variants={item} className="col-span-1 md:col-span-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                My Devices
              </CardTitle>
              <p className="text-sm text-text-secondary">
                Manage and control all your connected devices
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All ({devices.length})
              </Button>
              <Button
                variant={filter === "on" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("on")}
              >
                On ({devices.filter((d) => d.isOn).length})
              </Button>
              <Button
                variant={filter === "off" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("off")}
              >
                Off ({devices.filter((d) => !d.isOn).length})
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Device Stats Widget - 4 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-4"
      >
        <DeviceStatsWidget devices={devices} />
      </motion.div>

      {/* Device Grid - 8 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-6 lg:col-span-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device, index) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={handleToggle}
              index={index}
            />
          ))}
          <AddDeviceCard />
        </div>
      </motion.div>

      {/* Room Groups - Full Width */}
      <motion.div variants={item} className="col-span-1 md:col-span-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">By Room</CardTitle>
            <p className="text-sm text-text-secondary">
              Devices organized by location
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rooms.map((room) => {
                const roomDevices = devices.filter((d) => d.room === room);
                const activeCount = roomDevices.filter((d) => d.isOn).length;
                const totalPower = roomDevices
                  .filter((d) => d.isOn)
                  .reduce((acc, d) => acc + d.power, 0);

                return (
                  <motion.div
                    key={room}
                    whileHover={{ scale: 1.02 }}
                    className="bg-background-dark-secondary rounded-xl p-4 border border-white/5 cursor-pointer hover:border-green-primary/30"
                  >
                    <h4 className="font-medium text-white mb-2">{room}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">
                        {activeCount}/{roomDevices.length} active
                      </span>
                      {totalPower > 0 && (
                        <span className="text-green-glow">
                          {(totalPower / 1000).toFixed(1)} kW
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-primary rounded-full transition-all"
                        style={{
                          width: `${(activeCount / roomDevices.length) * 100}%`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
