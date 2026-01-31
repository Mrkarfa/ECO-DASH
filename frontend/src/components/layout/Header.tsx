import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/ToastProvider";

export function Header() {
  const { toast } = useToast();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 gap-4">
        <div className="flex items-center gap-2 mr-8">
          <div className="h-8 w-8 rounded-full bg-green-primary flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            ECO DASH
          </span>
        </div>

        <nav className="flex items-center gap-6 mr-auto">
          {["Dashboard", "Analytics", "Devices", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                item === "Dashboard" ? "text-white" : "text-text-secondary",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (item !== "Dashboard")
                  toast(`${item} feature coming soon!`, "info");
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-white"
            onClick={() => toast("Search activated", "info")}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-white"
            onClick={() => toast("No new notifications", "success")}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-white"
            onClick={() => toast("Profile settings", "info")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
