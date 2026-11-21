export type BusStatus = "AVAILABLE" | "PARTIALLY_OCCUPIED" | "FULLY_OCCUPIED";

/**
 * Derives a bus's status from how many seats are taken.
 * Values match the `status` enum on the Bus model, which is what queries filter on.
 */
export function statusForOccupancy(occupancy: number, capacity: number): BusStatus {
  if (!Number.isInteger(occupancy) || occupancy < 0) {
    throw new Error("Occupancy must be a non-negative integer");
  }
  if (occupancy > capacity) {
    throw new Error(`Occupancy ${occupancy} exceeds capacity ${capacity}`);
  }
  if (occupancy === 0) return "AVAILABLE";
  if (occupancy === capacity) return "FULLY_OCCUPIED";
  return "PARTIALLY_OCCUPIED";
}
