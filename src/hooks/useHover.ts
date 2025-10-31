import { useEffect, useRef, useState } from "react";

/**
 * Tracks hover state of an element
 *
 * @returns Tuple of [ref, isHovered]
 *
 * @example
 * ```tsx
 * function Card() {
 *   const [hoverRef, isHovered] = useHover<HTMLDivElement>();
 *
 *   return (
 *     <div ref={hoverRef}>
 *       {isHovered ? 'Hovering!' : 'Hover me'}
 *     </div>
 *   );
 * }
 * ```
 */
export function useHover<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T | null>,
  boolean
] {
  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
}
