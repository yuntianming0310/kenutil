import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a state or prop
 *
 * @param value - The value to track
 * @returns The previous value
 *
 * @example
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
