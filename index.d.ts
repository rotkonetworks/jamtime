export interface TimeInfo {
  timeslot: number;
  epoch: number;
  slotInEpoch: number;
  unixTimestamp: number;
  date: string;
  localDate: string;
  isFuture: boolean;
}

export interface EpochInfo {
  epoch: number;
  startSlot: number;
  endSlot: number;
  startUnix: number;
  endUnix: number;
}

export interface SlotRange {
  startSlot: number;
  endSlot: number;
  count: number;
}

declare const JAMTime: {
  readonly JAM_COMMON_ERA: 1735732800;
  readonly SLOT_DURATION: 6;
  readonly EPOCH_LENGTH: 600;
  readonly MAX_TIMESLOT: 0xFFFFFFFF;
  
  getCurrentTimeslot(): number;
  unixToTimeslot(unixTimestamp: number): number;
  timeslotToUnix(timeslot: number): number;
  getEpoch(timeslot: number): number;
  getSlotInEpoch(timeslot: number): number;
  isTimeslotFuture(timeslot: number, currentSlot?: number): boolean;
  getTimeInfo(timeslot: number): TimeInfo;
  
  convertBulkUnixToTimeslots(unixArray: number[]): number[];
  convertBulkTimeslotsToUnix(timeslotArray: number[]): number[];
  
  epochRange(startEpoch: number, endEpoch: number): Generator<EpochInfo>;
  getTimeToNextSlot(): number;
  isValidTimeslot(timeslot: number): boolean;
  getSlotsInRange(startUnix: number, endUnix: number): SlotRange;
};

export default JAMTime;
