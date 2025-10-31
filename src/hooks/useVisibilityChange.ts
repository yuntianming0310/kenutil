import { useEffect, useState } from "react";

/**
 * Tracks document visibility state
 *
 * @returns Whether the document is currently visible
 *
 * @example
 * const isVisible = useVisibilityChange();
 */
export function useVisibilityChange(): boolean {
  const [isVisible, setIsVisible] = useState(() => {
    // SSR support: default to true when document is not available
    if (typeof document === 'undefined') {
      return true;
    }
    return document.visibilityState === 'visible';
  });

  useEffect(() => {
    // SSR support: check if document is available
    if (typeof document === 'undefined') {
      return;
    }

    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    handleVisibilityChange() // Initial check

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
