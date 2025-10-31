import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Tracks window size
 *
 * @returns Object containing window width and height
 *
 * @example
 * const { width, height } = useWindowSize();
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    // SSR support: default to 0 when window is not available
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  })

  useEffect(() => {
    // SSR support: check if window is available
    if (typeof window === 'undefined') {
      return;
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
