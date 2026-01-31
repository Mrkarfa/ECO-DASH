import { Router } from "express";
import {
  getTotalEnergy,
  getWeeklyReport,
  getGreenEnergyUsage,
  getSolarTracking,
} from "../controllers/energyController";

export const energyRoutes = Router();

energyRoutes.get("/total", getTotalEnergy);
energyRoutes.get("/report", getWeeklyReport);
energyRoutes.get("/usage", getGreenEnergyUsage);
energyRoutes.get("/solar", getSolarTracking);
