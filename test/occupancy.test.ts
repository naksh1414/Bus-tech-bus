import { test } from "node:test";
import assert from "node:assert/strict";
import { statusForOccupancy } from "../src/utils/occupancy";

test("an empty bus is AVAILABLE", () => {
  assert.equal(statusForOccupancy(0, 40), "AVAILABLE");
});

test("a partly filled bus is PARTIALLY_OCCUPIED", () => {
  assert.equal(statusForOccupancy(1, 40), "PARTIALLY_OCCUPIED");
  assert.equal(statusForOccupancy(39, 40), "PARTIALLY_OCCUPIED");
});

test("a full bus is FULLY_OCCUPIED", () => {
  assert.equal(statusForOccupancy(40, 40), "FULLY_OCCUPIED");
});

test("statuses match the Bus model enum used by the available-buses query", () => {
  // Regression: statuses used to be written in lowercase, so updated buses
  // vanished from GET /buses/available, which filters on uppercase values.
  const allowed = ["AVAILABLE", "PARTIALLY_OCCUPIED", "FULLY_OCCUPIED"];
  for (const occupancy of [0, 10, 40]) {
    assert.ok(allowed.includes(statusForOccupancy(occupancy, 40)));
  }
});

test("rejects occupancy above capacity", () => {
  assert.throws(() => statusForOccupancy(41, 40), /exceeds capacity/);
});

test("rejects negative or fractional occupancy", () => {
  assert.throws(() => statusForOccupancy(-1, 40), /non-negative integer/);
  assert.throws(() => statusForOccupancy(2.5, 40), /non-negative integer/);
});
