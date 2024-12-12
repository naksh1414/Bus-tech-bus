// bus-service/src/routes/bus.routes.ts
import express from "express";
import { BusController } from "../controllers/bus.controller";

const router = express.Router();
const busController = new BusController();

router.post("/buses", (req, res) => busController.createBus(req, res));

router.get("/buses/available", (req, res) =>
  busController.getAvailableBuses(req, res)
);

router.get("/buses/all", (req, res) => busController.getAllBuses(req, res));
router.patch("/buses/route", (req, res) =>
  busController.updateBusRoute(req, res)
);
router.get("/buses/:id", (req, res) => busController.getBusById(req, res));

export default router;
