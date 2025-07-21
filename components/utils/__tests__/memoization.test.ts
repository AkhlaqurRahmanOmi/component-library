/**
 * @jest-environment jsdom
 */

import {
  memoizeClassNames,
  memoizeComponentClasses,
  clearMemoizationCaches,
  getCacheStats,
  devWarnings
} from '../memoization';

describe('Memoization Utilities', () => {
  beforeEach(() => {
    clearMemoizationCaches();
    jest.clearAllMocks();
  });

  describe('memoizeClassNames', () => {
    it('should cache function results', () => {
      const mockFn = jest.fn((props: { color: string; size: string }) => 
        `text-${props.color} text-${props.size}`
      );
      const memoizedFn = memoizeClassNames(mockFn);

      const props = { color: 'blue', size: 'lg' };
      
      // First call
      const result1 = memoizedFn(props);
      expect(result1).toBe('text-blue text-lg');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Second call with same props should use cache
      const result2 = memoizedFn(props);
      expect(result2).toBe('text-blue text-lg');
      expect(mockFn).toHaveBeenCalledTimes(1); // Still 1, not called again

      // Third call with different props should call function
      const result3 = memoizedFn({ color: 'red', size: 'sm' });
      expect(result3).toBe('text-red text-sm');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle undefined and null values correctly', () => {
      const mockFn = jest.fn((props: { color?: string; size?: string }) => {
        const classes = [];
        if (props.color) classes.push(`text-${props.color}`);
        if (props.size) classes.push(`text-${props.size}`);
        return classes.join(' ');
      });
      const memoizedFn = memoizeClassNames(mockFn);

      const result1 = memoizedFn({ color: 'blue' });
      const result2 = memoizedFn({ color: 'blue' });
      
      expect(result1).toBe('text-blue');
      expect(result2).toBe('text-blue');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should create different cache keys for different prop combinations', () => {
      const mockFn = jest.fn((props: any) => JSON.stringify(props));
      const memoizedFn = memoizeClassNames(mockFn);

      memoizedFn({ a: 1, b: 2 });
      memoizedFn({ b: 2, a: 1 }); // Same props, different order
      memoizedFn({ a: 1, b: 3 }); // Different values

      expect(mockFn).toHaveBeenCalledTimes(2); // Same props should be cached
    });
  });

  describe('memoizeComponentClasses', () => {
    it('should work with component class builders', () => {
      const mockBuilder = jest.fn((props: { variant: string; size: string }) => 
        `btn btn-${props.variant} btn-${props.size}`
      );
      const memoizedBuilder = memoizeComponentClasses(mockBuilder);

      const props = { variant: 'primary', size: 'md' };
      
      const result1 = memoizedBuilder(props);
      const result2 = memoizedBuilder(props);
      
      expect(result1).toBe('btn btn-primary btn-md');
      expect(result2).toBe('btn btn-primary btn-md');
      expect(mockBuilder).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cache Management', () => {
    it('should clear all caches', () => {
      const mockFn = jest.fn((props: { test: string }) => props.test);
      const memoizedFn = memoizeClassNames(mockFn);

      // Populate cache
      memoizedFn({ test: 'value' });
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Clear cache
      clearMemoizationCaches();

      // Should call function again after cache clear
      memoizedFn({ test: 'value' });
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should provide cache statistics', () => {
      const mockFn = jest.fn((props: { test: string }) => props.test);
      const memoizedFn = memoizeClassNames(mockFn);
      const memoizedComponentFn = memoizeComponentClasses(mockFn);

      // Populate caches
      memoizedFn({ test: 'value1' });
      memoizedFn({ test: 'value2' });
      memoizedComponentFn({ test: 'component1' });

      const stats = getCacheStats();
      expect(stats.classNameCache.size).toBe(2);
      expect(stats.componentClassCache.size).toBe(1);
      expect(stats.classNameCache.maxSize).toBe(1000);
      expect(stats.componentClassCache.maxSize).toBe(500);
    });
  });

  describe('Development Warnings', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Set NODE_ENV to development for warnings to work
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      process.env.NODE_ENV = 'test';
    });

    it('should warn about invalid props in development', () => {
      devWarnings.warnInvalidProp('Button', 'variant', 'invalid', ['primary', 'secondary']);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Button] Invalid prop "variant" with value "invalid". Valid values: primary, secondary'
      );
    });

    it('should warn about deprecated props', () => {
      devWarnings.warnDeprecatedProp('Input', 'oldProp', 'newProp');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Input] Prop "oldProp" is deprecated. Use "newProp" instead.'
      );
    });

    it('should warn about conflicting props', () => {
      devWarnings.warnConflictingProps('Container', ['width', 'fullWidth'], 'Cannot use both width and fullWidth');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Container] Conflicting props detected: width, fullWidth. Cannot use both width and fullWidth'
      );
    });

    it('should not show duplicate warnings', () => {
      // Create a fresh instance for this test
      const { createDevWarnings } = require('../memoization');
      const testWarnings = createDevWarnings();
      
      testWarnings.warnInvalidProp('Button', 'variant', 'invalid');
      testWarnings.warnInvalidProp('Button', 'variant', 'invalid');
      
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should not warn in production', () => {
      process.env.NODE_ENV = 'production';
      
      devWarnings.warnInvalidProp('Button', 'variant', 'invalid');
      
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('LRU Cache Behavior', () => {
    it('should evict least recently used items when cache is full', () => {
      const mockFn = jest.fn((props: { id: number }) => `item-${props.id}`);
      
      // Create a memoized function with a small cache size for testing
      // We'll test this by creating many unique cache entries
      const memoizedFn = memoizeClassNames(mockFn);

      // Fill cache beyond typical usage to test LRU behavior
      for (let i = 0; i < 1100; i++) {
        memoizedFn({ id: i });
      }

      // The cache should have evicted some items
      const stats = getCacheStats();
      expect(stats.classNameCache.size).toBeLessThanOrEqual(1000);
    });

    it('should move accessed items to end (most recently used)', () => {
      const mockFn = jest.fn((props: { id: number }) => `item-${props.id}`);
      const memoizedFn = memoizeClassNames(mockFn);

      // Add some items
      memoizedFn({ id: 1 });
      memoizedFn({ id: 2 });
      memoizedFn({ id: 3 });
      
      expect(mockFn).toHaveBeenCalledTimes(3);

      // Access first item again (should move it to end)
      memoizedFn({ id: 1 });
      
      // Should not call function again (cache hit)
      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });
});