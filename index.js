const JAM_COMMON_ERA = 1735732800;
const SLOT_DURATION = 6;
const EPOCH_LENGTH = 600;
const MAX_TIMESLOT = 0xFFFFFFFF;
const SLOT_DURATION_RECIPROCAL = 0.16666666666666666;

let cachedTimeslot = -1;
let cacheExpiry = 0;

function getCurrentTimeslot() {
  const now = Date.now();
  if (now < cacheExpiry) return cachedTimeslot;
  
  const jamSeconds = now * 0.001 - JAM_COMMON_ERA;
  cachedTimeslot = (jamSeconds * SLOT_DURATION_RECIPROCAL) >>> 0;
  cacheExpiry = now + (SLOT_DURATION - (jamSeconds % SLOT_DURATION)) * 1000;
  
  return cachedTimeslot;
}

function unixToTimeslot(unixTimestamp) {
  return ((unixTimestamp - JAM_COMMON_ERA) * SLOT_DURATION_RECIPROCAL) >>> 0;
}

function timeslotToUnix(timeslot) {
  return JAM_COMMON_ERA + timeslot * SLOT_DURATION;
}

function getEpoch(timeslot) {
  return Math.floor(timeslot / EPOCH_LENGTH);
}

function getSlotInEpoch(timeslot) {
  return timeslot % EPOCH_LENGTH;
}

function isTimeslotFuture(timeslot, currentSlot = getCurrentTimeslot()) {
  return timeslot > currentSlot;
}

function getTimeInfo(timeslot) {
  const unixTime = JAM_COMMON_ERA + (timeslot * SLOT_DURATION);
  const epoch = Math.floor(timeslot / EPOCH_LENGTH);
  const slotInEpoch = timeslot % EPOCH_LENGTH;
  const date = new Date(unixTime * 1000);
  
  return {
    timeslot,
    epoch,
    slotInEpoch,
    unixTimestamp: unixTime,
    date: date.toISOString(),
    localDate: date.toLocaleString(),
    isFuture: timeslot > getCurrentTimeslot()
  };
}

function convertBulkUnixToTimeslots(unixArray) {
  const len = unixArray.length;
  const result = new Array(len);
  for (let i = 0; i < len; ++i) {
    result[i] = (unixArray[i] - JAM_COMMON_ERA) * SLOT_DURATION_RECIPROCAL >>> 0;
  }
  return result;
}

function convertBulkTimeslotsToUnix(timeslotArray) {
  const len = timeslotArray.length;
  const result = new Array(len);
  for (let i = 0; i < len; ++i) {
    result[i] = JAM_COMMON_ERA + timeslotArray[i] * SLOT_DURATION;
  }
  return result;
}

function* epochRange(startEpoch, endEpoch) {
  for (let epoch = startEpoch; epoch <= endEpoch; epoch++) {
    yield {
      epoch,
      startSlot: epoch * EPOCH_LENGTH,
      endSlot: (epoch + 1) * EPOCH_LENGTH - 1,
      startUnix: JAM_COMMON_ERA + (epoch * EPOCH_LENGTH * SLOT_DURATION),
      endUnix: JAM_COMMON_ERA + ((epoch + 1) * EPOCH_LENGTH - 1) * SLOT_DURATION
    };
  }
}

function getTimeToNextSlot() {
  const jamSeconds = Date.now() * 0.001 - JAM_COMMON_ERA;
  return SLOT_DURATION - jamSeconds % SLOT_DURATION;
}

function isValidTimeslot(timeslot) {
  return Number.isInteger(timeslot) && timeslot >= 0 && timeslot <= MAX_TIMESLOT;
}

function getSlotsInRange(startUnix, endUnix) {
  const startSlot = unixToTimeslot(startUnix);
  const endSlot = unixToTimeslot(endUnix);
  return { startSlot, endSlot, count: endSlot - startSlot + 1 };
}

const JAMTime = {
  JAM_COMMON_ERA,
  SLOT_DURATION,
  EPOCH_LENGTH,
  MAX_TIMESLOT,
  getCurrentTimeslot,
  unixToTimeslot,
  timeslotToUnix,
  getEpoch,
  getSlotInEpoch,
  isTimeslotFuture,
  getTimeInfo,
  convertBulkUnixToTimeslots,
  convertBulkTimeslotsToUnix,
  epochRange,
  getTimeToNextSlot,
  isValidTimeslot,
  getSlotsInRange
};

if (typeof window !== 'undefined') {
  window.JAMTime = JAMTime;
}

export default JAMTime;
