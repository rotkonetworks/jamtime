import JAMTime from "./index.js";

const s = JAMTime.getCurrentTimeslot();
const next = JAMTime.getTimeToNextSlot();
const ms = Math.floor((6 - next) * 1000 / 6);
console.log(`JAM Slot: ${s}.${ms.toString().padStart(3, "0")} (Epoch ${Math.floor(s / 600)}, Slot ${s % 600}, Next: ${next.toFixed(2)}s)`);