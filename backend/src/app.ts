import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { energyRoutes } from "./routes/energyRoutes";
import { deviceRoutes } from "./routes/deviceRoutes";
import { recommendationRoutes } from "./routes/recommendationRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/energy", energyRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("Energy Dashboard API is running");
});

export default app;
