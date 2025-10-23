export function median(nums: number[]):
  number {
  if (!nums.length) return 0;
  const a = nums.slice().sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);

  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

export function average(nums: number[]):
  number {
  return nums.length ?
    nums.reduce((a, b) => a + b, 0) / nums.length :
    0;
}


export function inRange(n: number, min: number, max: number, inclusive = true): boolean {
  return inclusive ? n >= min && n <= max : n > min && n < max;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function sample<T>(arr: T[]): T | undefined {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;
}

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @returns Formatted string with commas
 * @example formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Generate random integer within range (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 * @example randomInt(1, 10) // Random integer between 1-10
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
