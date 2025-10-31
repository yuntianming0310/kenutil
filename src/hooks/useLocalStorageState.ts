import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { safeJsonParse } from "../object";

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    // SSR support: check if localStorage is available
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return initialState;
    }

    const storedValue = localStorage.getItem(key);
    return storedValue ? safeJsonParse<T>(storedValue, initialState) : initialState;
  })

  useEffect(() => {
    // SSR support: check if localStorage is available
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
