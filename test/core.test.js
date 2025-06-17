import { test, expect } from 'bun:test';
import JAMTime from '../index.js';

test('getCurrentTimeslot returns valid number', () => {
  const slot = JAMTime.getCurrentTimeslot();
  expect(typeof slot).toBe('number');
  expect(slot).toBeGreaterThanOrEqual(0);
  expect(slot).toBeLessThanOrEqual(JAMTime.MAX_TIMESLOT);
});

test('round trip conversion', () => {
  const slot = 1000000;
  const unix = JAMTime.timeslotToUnix(slot);
  const backToSlot = JAMTime.unixToTimeslot(unix);
  expect(backToSlot).toBe(slot);
});

test('epoch calculations', () => {
  const slot = 1200;
  expect(JAMTime.getEpoch(slot)).toBe(2);
  expect(JAMTime.getSlotInEpoch(slot)).toBe(0);
});

test('JAM Common Era conversion', () => {
  const jamEra = JAMTime.JAM_COMMON_ERA;
  expect(JAMTime.unixToTimeslot(jamEra)).toBe(0);
  expect(JAMTime.timeslotToUnix(0)).toBe(jamEra);
});

test('bulk operations', () => {
  const unixArray = [1735732800, 1735732806, 1735732812];
  const slots = JAMTime.convertBulkUnixToTimeslots(unixArray);
  const backToUnix = JAMTime.convertBulkTimeslotsToUnix(slots);
  expect(backToUnix).toEqual(unixArray);
});
