import { useEffect, useState } from "react";

/**
 * Options for useOnlineStatus hook
 */
interface UseOnlineStatusOptions {
  /**
   * URL to ping for verifying real internet connection
   * If not provided, only uses navigator.onLine (simple mode)
   */
  pingUrl?: string;
  /**
   * Interval in milliseconds to ping the URL (default: 30000ms / 30s)
   */
  pingInterval?: number;
  /**
   * Timeout for ping requests in milliseconds (default: 5000ms / 5s)
   */
  pingTimeout?: number;
}

/**
 * Tracks the online/offline status of the browser
 *
 * Simple mode (default): Uses navigator.onLine - fast but may be inaccurate
 * Enhanced mode: Optional periodic ping to verify real internet connection
 *
 * @param options - Configuration options
 * @returns Whether the browser is currently online
 *
 * @example
 * // Simple mode - lightweight, instant
 * const isOnline = useOnlineStatus();
 *
 * @example
 * // Enhanced mode - verifies real connection
 * const isOnline = useOnlineStatus({
 *   pingUrl: '/api/health',
 *   pingInterval: 30000  // Check every 30 seconds
 * });
 */
export function useOnlineStatus(options?: UseOnlineStatusOptions): boolean {
  const { pingUrl, pingInterval = 30000, pingTimeout = 5000 } = options ?? {};

  const [isOnline, setIsOnline] = useState(() => {
    // SSR support: default to true when navigator is not available
    if (typeof navigator === 'undefined') {
      return true;
    }
    return navigator.onLine;
  });

  useEffect(() => {
    // SSR support: check if window is available
    if (typeof window === 'undefined') {
      return;
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Always listen to browser events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Enhanced mode: periodic ping
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (pingUrl) {
      const verifyConnection = async () => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), pingTimeout);

          const response = await fetch(pingUrl, {
            method: 'HEAD',
            cache: 'no-cache',
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          setIsOnline(response.ok);
        } catch {
          setIsOnline(false);
        }
      };

      // Verify immediately
      verifyConnection();

      // Then verify periodically
      intervalId = setInterval(verifyConnection, pingInterval);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pingUrl, pingInterval, pingTimeout]);

  return isOnline;
}
