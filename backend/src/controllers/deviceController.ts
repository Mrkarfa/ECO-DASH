import { Request, Response } from "express";
import { buildingData } from "../data/mockData";

export const getBuildingStatus = (req: Request, res: Response) => {
  res.json(buildingData);
};
