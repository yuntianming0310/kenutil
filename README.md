# KenUtil

Personal JavaScript utility collection.

## Install

```bash
npm install kenutil
```

## Usage

```javascript
import { capitalize, debounce, sleep } from "kenutil";
```

## API

### String

- `capitalize(str)` - Capitalize first letter
- `formatDate(dateStr, locale?)` - Format date with locale support
- `normalizeWhitespace(str)` - Trim and normalize whitespace to single spaces

### Array

- `uniqueArray(arr)` - Remove duplicates using Set
- `chunk(arr, size)` - Split array into chunks of specified size
- `shuffle(arr)` - Shuffle array using Fisher-Yates algorithm
- `sample(arr)` - Get random element from array

### Number

- `formatNumber(num)` - Add thousands separator (1234567 → "1,234,567")
- `randomInt(min, max)` - Generate random integer (inclusive)
- `median(nums)` - Calculate median of number array
- `average(nums)` - Calculate average of number array
- `inRange(n, min, max, inclusive?)` - Check if number is in range
- `lerp(a, b, t)` - Linear interpolation between two numbers

### Object

- `isEmpty(obj)` - Check if object is empty
- `safeJsonParse(str, fallback?)` - JSON parse with fallback (default: {})
- `deepClone(obj)` - Deep clone with circular reference support

### Async

- `sleep(ms)` - Delay execution
- `debounce(func, delay)` - Debounce function
- `throttle(func, delay)` - Throttle function execution

### Browser

- `copyToClipboard(text)` - Copy text to clipboard
- `readClipboardText()` - Read text from clipboard
- `downloadFile(url, filename)` - Trigger file download
- `cn(...args)` - Merge classNames

## License

ISC
