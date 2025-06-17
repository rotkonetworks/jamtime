import JAMTime from "./index.js";

console.log("JAMTime object:", JAMTime);
console.log("Available methods:", Object.keys(JAMTime));

try {
  const s = JAMTime.getCurrentTimeslot();
  const next = JAMTime.getTimeToNextSlot();
  const ms = Math.floor((6 - next) * 1000 / 6);
  console.log(`JAM Slot: ${s}.${ms.toString().padStart(3, "0")} (Epoch ${Math.floor(s / 600)}, Slot ${s % 600}, Next: ${next.toFixed(2)}s)`);
} catch (error) {
  console.error("Error:", error.message);
}