# KenUtil

Personal JavaScript/TypeScript utility collection and React Hooks.

## Install

```bash
npm install kenutil
```

## Usage

```javascript
// Utility functions
import { capitalize, debounce, sleep } from 'kenutil';

// React Hooks
import { useDebounce, useForm, useMediaQuery } from 'kenutil';
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

### React Hooks
- `useOutsideClick(handler, listenCapturing?)` - Detect clicks outside an element
- `useLocalStorageState(initialValue, key)` - Sync state with localStorage
- `useDebounce(value, delay)` - Debounce a value
- `useDebouncedCallback(callback, delay)` - Debounce a callback function
- `useThrottle(value, delay)` - Throttle a value
- `useThrottledCallback(callback, delay)` - Throttle a callback function
- `usePrevious(value)` - Track previous value of state/prop
- `useVisibilityChange()` - Track document visibility state
- `useIntersectionObserver(options?)` - Observe element visibility with IntersectionObserver
- `useWindowSize()` - Track window width and height
- `useIntervalWhen(callback, ms, startImmediately?, condition?)` - Run callback on interval when condition is met
- `useFetch(url, options?)` - Fetch data with loading and error states
- `useMediaQuery(query, options?)` - Track media query matches (includes BREAKPOINTS)
- `useForm(options)` - Lightweight form state management with validation
- `useOnlineStatus(options?)` - Track online/offline status (simple or enhanced mode)
- `useHover()` - Track element hover state
- `useUpdateEffect(effect, deps)` - useEffect that skips initial render

## License

ISC
