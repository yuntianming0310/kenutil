import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches data from a URL
 *
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @returns Object containing data, loading state, and error
 *
 * @example
 * const { data, loading, error } = useFetch<User>('/api/user');
 */
export function useFetch<T = any>(
  url: string,
  options: RequestInit = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component
    setLoading(true)
    setError(null)

    fetch(url, options).then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      return response.json()
    }).then((result: T) => {
      if (isMounted) {
        setData(result)
        setLoading(false)
      }
    }).catch((err: Error) => {
      if (isMounted) {
        setError(err.message)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    }
    // Note: options is intentionally not in deps to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { data, loading, error }
}
