import { BusRepository } from "../repositories/bus.repository";
import { IBus } from "../models/bus.model";
import { kafkaProducer } from "../config/kafka";
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

    // Publish bus creation event
    await kafkaProducer.send({
      topic: "bus-events",
      messages: [
        {
          key: bus._id.toString(),
          value: JSON.stringify({
            type: "BUS_REGISTERED",
            payload: bus,
          }),
        },
      ],
    });

    return bus;
  }

  async updateBusRoute(busId: string, routeId: string): Promise<IBus | null> {
    const updatedBus = await this.busRepository.updateBus(busId, {
      currentRoute: routeId,
    });

    // Publish route update event
    if (updatedBus) {
      await kafkaProducer.send({
        topic: "bus-events",
        messages: [
          {
            key: busId,
            value: JSON.stringify({
              type: "BUS_ROUTE_UPDATED",
              payload: updatedBus,
            }),
          },
        ],
      });
    }

    return updatedBus;
  }

  async getAvailableBuses(): Promise<IBus[]> {
    return this.busRepository.findAvailableBuses();
  }
  
  async getBusById(id: string): Promise<IBus | null> {
    return this.busRepository.getBusById(id);
  }
}
