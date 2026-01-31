import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import {
  User,
  Bell,
  Target,
  Moon,
  Sun,
  Shield,
  Download,
  Trash2,
  Save,
  Mail,
  Smartphone,
  Zap,
  DollarSign,
  Leaf,
  type LucideIcon,
} from "lucide-react";

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

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? "bg-green-primary" : "bg-white/10"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
      />
    </button>
  );
}

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-text-secondary">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-background-dark-secondary border border-white/10 rounded-lg py-2.5 text-white placeholder:text-text-tertiary focus:outline-none focus:border-green-primary/50 transition-colors ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

export default function Settings() {
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    dailyReport: true,
    weeklyReport: false,
    alerts: true,
    tips: true,
  });

  // Goals state
  const [goals, setGoals] = useState({
    dailyLimit: "50",
    monthlyBudget: "150",
    carbonTarget: "500",
  });

  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    toast("Settings saved successfully!", "success");
  };

  const handleExport = () => {
    toast("Exporting your data...", "info");
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast(
      `${key} notifications ${notifications[key] ? "disabled" : "enabled"}`,
      "info",
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto"
    >
      {/* Profile Settings - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-green-primary/20 rounded-lg">
              <User className="h-5 w-5 text-green-glow" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Profile</CardTitle>
              <p className="text-sm text-text-secondary">
                Manage your account details
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-primary to-green-glow flex items-center justify-center cursor-pointer"
              >
                <span className="text-2xl font-bold text-white">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </motion.div>
              <div>
                <p className="font-medium text-white">{profile.name}</p>
                <p className="text-sm text-text-secondary">Premium Member</p>
                <Button variant="outline" size="sm" className="mt-2 text-xs">
                  Change Avatar
                </Button>
              </div>
            </div>

            <InputField
              label="Full Name"
              value={profile.name}
              onChange={(value) => setProfile({ ...profile, name: value })}
              icon={User}
            />
            <InputField
              label="Email"
              type="email"
              value={profile.email}
              onChange={(value) => setProfile({ ...profile, email: value })}
              icon={Mail}
            />
            <InputField
              label="Phone"
              type="tel"
              value={profile.phone}
              onChange={(value) => setProfile({ ...profile, phone: value })}
              icon={Smartphone}
            />

            <Button onClick={handleSave} className="w-full mt-4">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Bell className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                Notifications
              </CardTitle>
              <p className="text-sm text-text-secondary">
                Control how you receive updates
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", icon: Mail },
              { key: "push", label: "Push Notifications", icon: Smartphone },
              { key: "dailyReport", label: "Daily Report", icon: Zap },
              { key: "weeklyReport", label: "Weekly Summary", icon: Target },
              { key: "alerts", label: "Usage Alerts", icon: Bell },
              { key: "tips", label: "Energy Saving Tips", icon: Leaf },
            ].map((item) => (
              <motion.div
                key={item.key}
                whileHover={{ x: 3 }}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-text-tertiary" />
                  <span className="text-white">{item.label}</span>
                </div>
                <ToggleSwitch
                  enabled={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onToggle={() =>
                    toggleNotification(item.key as keyof typeof notifications)
                  }
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Energy Goals - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                Energy Goals
              </CardTitle>
              <p className="text-sm text-text-secondary">
                Set your consumption targets
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-text-secondary">
                Daily Limit (kWh)
              </label>
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <input
                  type="number"
                  value={goals.dailyLimit}
                  onChange={(e) =>
                    setGoals({ ...goals, dailyLimit: e.target.value })
                  }
                  className="w-full bg-background-dark-secondary border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-green-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-text-secondary">
                Monthly Budget ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <input
                  type="number"
                  value={goals.monthlyBudget}
                  onChange={(e) =>
                    setGoals({ ...goals, monthlyBudget: e.target.value })
                  }
                  className="w-full bg-background-dark-secondary border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-green-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-text-secondary">
                Carbon Target (kg CO₂/month)
              </label>
              <div className="relative">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <input
                  type="number"
                  value={goals.carbonTarget}
                  onChange={(e) =>
                    setGoals({ ...goals, carbonTarget: e.target.value })
                  }
                  className="w-full bg-background-dark-secondary border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-green-primary/50"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full mt-4">
              <Save className="h-4 w-4 mr-2" />
              Update Goals
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance & Privacy - 6 cols */}
      <motion.div
        variants={item}
        className="col-span-1 md:col-span-12 lg:col-span-6"
      >
        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-purple-400" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  Appearance
                </CardTitle>
                <p className="text-sm text-text-secondary">
                  Customize your experience
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Moon className="h-4 w-4 text-text-tertiary" />
                  <span className="text-white">Dark Mode</span>
                </div>
                <ToggleSwitch
                  enabled={darkMode}
                  onToggle={() => setDarkMode(!darkMode)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  Data & Privacy
                </CardTitle>
                <p className="text-sm text-text-secondary">Manage your data</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={handleExport}
                className="w-full flex items-center justify-between p-3 bg-background-dark-secondary rounded-lg border border-white/5 hover:border-green-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="h-4 w-4 text-green-glow" />
                  <span className="text-white">Export My Data</span>
                </div>
                <span className="text-xs text-text-tertiary">JSON, CSV</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                className="w-full flex items-center justify-between p-3 bg-background-dark-secondary rounded-lg border border-white/5 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="h-4 w-4 text-red-400" />
                  <span className="text-white">Delete Account</span>
                </div>
                <span className="text-xs text-text-tertiary">Permanent</span>
              </motion.button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
