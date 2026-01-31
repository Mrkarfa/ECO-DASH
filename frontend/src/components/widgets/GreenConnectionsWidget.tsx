import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";
import { Building3D } from "./Building3D";
import { useState, useEffect } from "react";
import { apiClient, type BuildingStatus } from "@/api/client";

export function GreenConnectionsWidget() {
  const [data, setData] = useState<BuildingStatus | null>(null);

  useEffect(() => {
    apiClient
      .get<BuildingStatus>("/devices/building")
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">
          Green connections
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-text-tertiary"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Office</span>
            <span className="text-xs text-green-accent bg-green-primary/20 px-2 py-0.5 rounded-full">
              {data?.zones[0]?.active ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-status-success"></div>
          </div>
        </div>

        <div className="flex-1 relative min-h-[150px] -mx-4">
          <Building3D />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Available energy</span>
            <span className="text-white font-medium">83%</span>
          </div>
          <div className="h-2 w-full bg-background-dark-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-green-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: "83%" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
