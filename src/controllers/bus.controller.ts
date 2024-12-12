// bus-service/src/controllers/bus.controller.ts
import { Request, Response } from 'express';
import { BusService } from '../services/bus.service';

export class BusController {
  private busService: BusService;

  constructor() {
    this.busService = new BusService();
  }

  async createBus(req: Request, res: Response): Promise<void> {
    try {
      const bus = await this.busService.registerBus(req.body);
      res.status(201).json(bus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create bus' });
    }
  }

  async getAvailableBuses(req: Request, res: Response): Promise<void> {
    try {
      const buses = await this.busService.getAvailableBuses();
      res.status(200).json(buses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve available buses' });
    }
  }

  async getAllBuses(req: Request, res: Response): Promise<void> {
    try {
      const buses = await this.busService.getAllBuses();
      res.status(200).json(buses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve available buses' });
    }
  }

  async updateBusRoute(req: Request, res: Response): Promise<void> {
    try {
      const { busId, routeId } = req.body;
      const updatedBus = await this.busService.updateBusRoute(busId, routeId);
      res.status(200).json(updatedBus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update bus route' });
    }
  }
    // New method to fetch bus details by ID
    async getBusById(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params; // Get the bus ID from the route parameters
        const bus = await this.busService.getBusById(id); // Call the service method
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
          return;
        }
        res.status(200).json(bus);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bus details' });
      }
    }
  }



