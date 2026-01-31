import { Request, Response } from "express";
import { recommendations } from "../data/mockData";

export const getRecommendations = (req: Request, res: Response) => {
  res.json(recommendations);
};
