import { Request, Response } from "express";
import {
  totalEnergyData,
  weeklyReportData,
  greenEnergyHourly,
  trackingData,
} from "../data/mockData";

export const getTotalEnergy = (req: Request, res: Response) => {
  res.json(totalEnergyData);
};

export const getWeeklyReport = (req: Request, res: Response) => {
  res.json(weeklyReportData);
};

export const getGreenEnergyUsage = (req: Request, res: Response) => {
  res.json(greenEnergyHourly);
};

export const getSolarTracking = (req: Request, res: Response) => {
  res.json(trackingData);
};
