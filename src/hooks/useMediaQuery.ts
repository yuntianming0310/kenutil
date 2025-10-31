import { useEffect, useState } from "react";

/**
 * Tracks whether a media query matches the current viewport
 *
 * @param query - The media query string to match (e.g., "(min-width: 768px)")
 * @param options - Configuration options
 * @param options.defaultValue - Default value to use during SSR or when matchMedia is unavailable
 * @param options.initializeWithValue - Whether to initialize with the actual value (default: true)
 * @returns Whether the media query currently matches
 *
 * @example
 * // Basic usage
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * @example
 * // With default value for SSR
 * const isDesktop = useMediaQuery('(min-width: 1024px)', { defaultValue: false });
 *
 * @example
 * // Common breakpoints
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
 * const isDesktop = useMediaQuery('(min-width: 1025px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(
  query: string,
  options?: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
  }
): boolean {
  const { defaultValue = false, initializeWithValue = true } = options ?? {};

  const getMatches = (query: string): boolean => {
    // SSR support: check if window is available
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    // Check if matchMedia is supported
    if (typeof window.matchMedia !== 'function') {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  useEffect(() => {
    // SSR support: check if window is available
    if (typeof window === 'undefined') {
      return;
    }

    // Check if matchMedia is supported
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Update state to current value
    setMatches(mediaQueryList.matches);

    // Define the event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern API: addEventListener (preferred over deprecated addListener)
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined common breakpoint queries for convenience
 */
export const BREAKPOINTS = {
  xs: '(max-width: 475px)',
  sm: '(min-width: 476px) and (max-width: 640px)',
  md: '(min-width: 641px) and (max-width: 768px)',
  lg: '(min-width: 769px) and (max-width: 1024px)',
  xl: '(min-width: 1025px) and (max-width: 1280px)',
  '2xl': '(min-width: 1281px)',
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
} as const;
