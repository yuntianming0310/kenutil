import { useEffect, useRef } from "react"

/**
 * Runs a callback on an interval when a condition is met
 *
 * @param callback - The function to call on each interval
 * @param ms - The interval duration in milliseconds
 * @param startImmediately - Whether to call the callback immediately
 * @param condition - Whether the interval should be active
 *
 * @example
 * useIntervalWhen(() => console.log('tick'), 1000, false, isActive);
 */
export function useIntervalWhen(
  callback: () => any,
  ms: number,
  startImmediately = false,
  condition = true
) {
  const savedCallback = useRef<(() => any) | undefined>(undefined)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!condition) {
      return
    }

    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (startImmediately) {
      tick()
    }

    const id = setInterval(tick, ms)

    return () => clearInterval(id)
  }, [ms, startImmediately, condition])
}
