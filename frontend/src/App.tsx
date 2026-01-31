import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import { ToastProvider } from "@/components/ui/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="apartments"
              element={
                <div className="p-4 text-white">
                  My Apartments (Coming Soon)
                </div>
              }
            />
            <Route
              path="reporting"
              element={
                <div className="p-4 text-white">Reporting (Coming Soon)</div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-4 text-white">Settings (Coming Soon)</div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
