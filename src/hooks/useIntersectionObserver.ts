import { useEffect, useRef, useState } from "react"

/**
 * Hook to observe element visibility using IntersectionObserver API
 *
 * @param options - IntersectionObserver options
 * @returns Tuple of [ref, isIntersecting]
 *
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [ref, isIntersecting]
}
