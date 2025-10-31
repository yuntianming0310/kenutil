import { useEffect, useRef, DependencyList, EffectCallback } from "react";

/**
 * useEffect that skips the initial render
 * Only runs on updates, not on mount
 *
 * @param effect - Effect callback function
 * @param deps - Dependency list
 *
 * @example
 * ```tsx
 * function SearchComponent({ query }) {
 *   // This will NOT run on initial render
 *   // Only when query changes after mount
 *   useUpdateEffect(() => {
 *     fetchSearchResults(query);
 *   }, [query]);
 * }
 * ```
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
