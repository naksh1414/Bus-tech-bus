import { Bus, IBus } from '../models/bus.model';

export class BusRepository {
  async createBus(busData: Partial<IBus>): Promise<IBus> {
    return Bus.create(busData);
  }

  async getBusById(id: string): Promise<IBus | null> {
    return Bus.findById(id);
  }

  async updateBus(id: string, busData: Partial<IBus>): Promise<IBus | null> {
    return Bus.findByIdAndUpdate(id, busData, { new: true });
  }

  async deleteBus(id: string): Promise<IBus | null> {
    return Bus.findByIdAndDelete(id);
  }

  async findAvailableBuses(): Promise<IBus[]> {
    return Bus.find({
      status: { $in: ['AVAILABLE', 'PARTIALLY_OCCUPIED'] }
    });
  }

  async updateBusOccupancy(id: string, occupancy: number): Promise<IBus | null> {
    const bus = await this.getBusById(id);
    if (!bus) throw new Error('Bus not found');

    const newStatus = 
      occupancy === 0 ? 'available' :
      occupancy === bus.capacity ? 'fully_occupied' : 
      'partially_occupied';

    return Bus.findByIdAndUpdate(
      id, 
      { 
        currentOccupancy: occupancy,
        status: newStatus 
      }, 
      { new: true }
    );
  }
}
