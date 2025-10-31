import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Throttles a value
 * Returns the throttled value that updates at most once per delay period
 *
 * @param value - The value to throttle
 * @param delay - The delay in milliseconds
 * @returns The throttled value
 *
 * @example
 * const throttledScrollPos = useThrottle(scrollPosition, 100);
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdated.current;

    if (timeSinceLastUpdate >= delay) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, delay - timeSinceLastUpdate);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}

/**
 * Creates a throttled version of a callback function
 * The callback will be invoked at most once per delay period
 *
 * @param callback - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns The throttled callback function
 *
 * @example
 * const throttledResize = useThrottledCallback(() => {
 *   console.log('Window resized');
 * }, 200);
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      const execute = () => {
        lastCall.current = now;
        callbackRef.current(...args);
      };

      if (timeSinceLastCall >= delay) {
        execute();
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(execute, delay - timeSinceLastCall);
      }
    },
    [delay]
  );
}
