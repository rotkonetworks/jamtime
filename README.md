# JAMTime

JavaScript library for JAM Common Era timing calculations.

## Installation

```bash
npm install jamtime
# or
bun add jamtime
```

## Usage

```javascript
import JAMTime from 'jamtime';

// Get current timeslot
const slot = JAMTime.getCurrentTimeslot();

// Convert timestamps
const unix = JAMTime.timeslotToUnix(slot);
const backToSlot = JAMTime.unixToTimeslot(unix);

// Get detailed time info
const info = JAMTime.getTimeInfo(slot);
console.log(info.epoch, info.localDate);

// Bulk operations for performance
const unixArray = [1735732800, 1735732806];
const slots = JAMTime.convertBulkUnixToTimeslots(unixArray);
```

## API

- `getCurrentTimeslot()` - Current JAM timeslot
- `unixToTimeslot(unix)` - Convert Unix timestamp to timeslot
- `timeslotToUnix(slot)` - Convert timeslot to Unix timestamp
- `getTimeInfo(slot)` - Get detailed time information
- `convertBulkUnixToTimeslots(array)` - Bulk Unix to timeslot conversion
- `convertBulkTimeslotsToUnix(array)` - Bulk timeslot to Unix conversion

## Constants

- `JAM_COMMON_ERA: 1735732800` - JAM epoch start (Jan 1, 2025 12:00 UTC)
- `SLOT_DURATION: 6` - Seconds per slot
- `EPOCH_LENGTH: 600` - Slots per epoch

## License

MIT
