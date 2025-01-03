import { BusRepository } from "../repositories/bus.repository";
import { IBus } from "../models/bus.model";
import { Types } from "mongoose";

interface IBusDocument extends IBus {
  _id: Types.ObjectId;
}

export class BusService {
  private busRepository: BusRepository;

  constructor() {
    this.busRepository = new BusRepository();
  }

  async registerBus(busData: Partial<IBus>): Promise<IBusDocument> {
    const bus = (await this.busRepository.createBus(busData)) as IBusDocument;
    return bus;
  }

  async updateBusRoute(busId: string, routeId: string): Promise<IBus | null> {
    const updatedBus = await this.busRepository.updateBus(busId, {
      currentRoute: routeId,
    });
    return updatedBus;
  }

  async getAvailableBuses(): Promise<IBus[]> {
    return this.busRepository.findAvailableBuses();
  }

  async getAllBuses(): Promise<IBus[]> {
    return this.busRepository.findAllBuses();
  }

  async getBusById(id: string): Promise<IBus | null> {
    return this.busRepository.getBusById(id);
  }
}
