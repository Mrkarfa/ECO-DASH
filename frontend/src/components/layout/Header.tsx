import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/ToastProvider";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Analytics", path: "/analytics" },
  { name: "Devices", path: "/devices" },
  { name: "Settings", path: "/settings" },
];

export function Header() {
  const { toast } = useToast();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 gap-4">
        <Link to="/" className="flex items-center gap-2 mr-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-8 w-8 rounded-full bg-green-primary flex items-center justify-center"
          >
            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white">
            ECO DASH
          </span>
        </Link>

        <nav className="flex items-center gap-6 mr-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-white py-2",
                  isActive ? "text-white" : "text-text-secondary",
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
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
            className="text-text-secondary hover:text-white relative"
            onClick={() => toast("No new notifications", "success")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-green-primary rounded-full" />
          </Button>
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
