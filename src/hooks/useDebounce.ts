import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Debounces a value
 * Returns the debounced value that only updates after the specified delay
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Creates a debounced version of a callback function
 * The callback will only be invoked after the specified delay has passed since the last call
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced callback function
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((term: string) => {
 *   fetchSearchResults(term);
 * }, 500);
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}
