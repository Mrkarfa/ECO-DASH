import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background-dark text-text-primary font-sans selection:bg-green-primary selection:text-white">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
