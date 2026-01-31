import { Router } from "express";
import { getBuildingStatus } from "../controllers/deviceController";

export const deviceRoutes = Router();

deviceRoutes.get("/building", getBuildingStatus);
