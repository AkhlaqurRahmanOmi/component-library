/**
 * Memoization utilities for performance optimization
 * Caches class name generation results to avoid repeated computations
 */

// Simple LRU cache implementation
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instances for different types of class generation
const classNameCache = new LRUCache<string, string>(1000);
const componentClassCache = new LRUCache<string, string>(500);

/**
 * Creates a cache key from an object by serializing its properties
 */
function createCacheKey(obj: Record<string, any>): string {
  const keys = Object.keys(obj).sort();
  const parts: string[] = [];
  
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        parts.push(`${key}:${JSON.stringify(value)}`);
      } else {
        parts.push(`${key}:${value}`);
      }
    }
  }
  
  return parts.join('|');
}

/**
 * Memoized function wrapper for class name generation
 */
export function memoizeClassNames<T extends Record<string, any>>(
  fn: (props: T) => string,
  cacheInstance: LRUCache<string, string> = classNameCache
) {
  return (props: T): string => {
    const cacheKey = createCacheKey(props);
    
    let result = cacheInstance.get(cacheKey);
    if (result === undefined) {
      result = fn(props);
      cacheInstance.set(cacheKey, result);
    }
    
    return result;
  };
}

/**
 * Memoized component class generation
 */
export function memoizeComponentClasses<T extends Record<string, any>>(
  fn: (props: T) => string
) {
  return memoizeClassNames(fn, componentClassCache);
}

/**
 * Clear all memoization caches (useful for testing or memory management)
 */
export function clearMemoizationCaches(): void {
  classNameCache.clear();
  componentClassCache.clear();
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
  return {
    classNameCache: {
      size: classNameCache.size(),
      maxSize: 1000
    },
    componentClassCache: {
      size: componentClassCache.size(),
      maxSize: 500
    }
  };
}

/**
 * Development warning system for common prop mistakes
 */
export function createDevWarnings() {
  if (process.env.NODE_ENV === 'production') {
    return {
      warnInvalidProp: () => {},
      warnDeprecatedProp: () => {},
      warnConflictingProps: () => {}
    };
  }

  const warnings = new Set<string>();

  return {
    warnInvalidProp: (componentName: string, propName: string, value: any, validValues?: string[]) => {
      const key = `${componentName}-${propName}-${value}`;
      if (!warnings.has(key)) {
        warnings.add(key);
        const validValuesText = validValues ? ` Valid values: ${validValues.join(', ')}` : '';
        console.warn(
          `[${componentName}] Invalid prop "${propName}" with value "${value}".${validValuesText}`
        );
      }
    },

    warnDeprecatedProp: (componentName: string, propName: string, replacement?: string) => {
      const key = `${componentName}-${propName}-deprecated`;
      if (!warnings.has(key)) {
        warnings.add(key);
        const replacementText = replacement ? ` Use "${replacement}" instead.` : '';
        console.warn(
          `[${componentName}] Prop "${propName}" is deprecated.${replacementText}`
        );
      }
    },

    warnConflictingProps: (componentName: string, props: string[], reason: string) => {
      const key = `${componentName}-${props.join('-')}-conflict`;
      if (!warnings.has(key)) {
        warnings.add(key);
        console.warn(
          `[${componentName}] Conflicting props detected: ${props.join(', ')}. ${reason}`
        );
      }
    }
  };
}

// Export development warnings instance
export const devWarnings = createDevWarnings();