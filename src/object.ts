export function isEmpty(obj: any): boolean {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function safeJsonParse<T = any>(
  str: string,
  fallback: T = {} as T
): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

/**
 * Deep clone an object with circular reference support
 */
export function deepClone<T>(obj: T, cache = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (cache.has(obj as any)) return cache.get(obj as any);

  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T;

  if (obj instanceof Map) {
    const cloned = new Map();
    cache.set(obj as any, cloned as any);
    obj.forEach((value, key) => cloned.set(key, deepClone(value, cache)));
    return cloned as T;
  }

  if (obj instanceof Set) {
    const cloned = new Set();
    cache.set(obj as any, cloned as any);
    obj.forEach(value => cloned.add(deepClone(value, cache)));
    return cloned as T;
  }

  if (Array.isArray(obj)) {
    const cloned: any[] = [];
    cache.set(obj as any, cloned as any);
    obj.forEach(item => cloned.push(deepClone(item, cache)));
    return cloned as T;
  }

  const cloned = {} as T;
  cache.set(obj as any, cloned);
  Object.keys(obj).forEach(key => {
    (cloned as any)[key] = deepClone((obj as any)[key], cache);
  });

  return cloned;
}
