import { Router } from "express";
import { getRecommendations } from "../controllers/recommendationController";

export const recommendationRoutes = Router();

recommendationRoutes.get("/", getRecommendations);
