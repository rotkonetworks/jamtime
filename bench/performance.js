import JAMTime from '../index.js';

const iterations = 1000000;

console.time('getCurrentTimeslot');
for (let i = 0; i < iterations; i++) {
  JAMTime.getCurrentTimeslot();
}
console.timeEnd('getCurrentTimeslot');

console.time('unixToTimeslot');
for (let i = 0; i < iterations; i++) {
  JAMTime.unixToTimeslot(1735732800 + i);
}
console.timeEnd('unixToTimeslot');

console.time('timeslotToUnix');
for (let i = 0; i < iterations; i++) {
  JAMTime.timeslotToUnix(i);
}
console.timeEnd('timeslotToUnix');

const unixArray = Array.from({length: 10000}, (_, i) => 1735732800 + i);

console.time('bulk unix to timeslots');
JAMTime.convertBulkUnixToTimeslots(unixArray);
console.timeEnd('bulk unix to timeslots');

console.time('individual conversions');
for (const unix of unixArray) {
  JAMTime.unixToTimeslot(unix);
}
console.timeEnd('individual conversions');
