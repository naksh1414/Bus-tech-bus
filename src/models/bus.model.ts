// bus-service/src/models/bus.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBus extends Document {
  busNumber: string;
  capacity: number;
  currentOccupancy: number;
  status: 'AVAILABLE' | 'PARTIALLY_OCCUPIED' | 'FULLY_OCCUPIED';
  currentRoute?: string;
}

const BusSchema: Schema = new Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'PARTIALLY_OCCUPIED', 'FULLY_OCCUPIED'],
    default: 'AVAILABLE'
  },
  currentRoute: {
    type: String
  }
}, {
  timestamps: true
});

export const Bus: Model<IBus> = mongoose.model<IBus>('Bus', BusSchema);