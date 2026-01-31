import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastContextType {
  toast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-bg-tertiary border border-white/10 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]"
            >
              <div
                className={`w-2 h-2 rounded-full ${t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : "bg-blue-500"}`}
              />
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((item) => item.id !== t.id))
                }
                className="text-white/50 hover:text-white"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
