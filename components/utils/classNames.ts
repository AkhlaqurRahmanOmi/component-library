/**
 * Utility functions for handling CSS class names and Tailwind class generation
 */

import type { ResponsiveSpacing, Breakpoint } from '../types/common';

/**
 * Combines multiple class names, filtering out falsy values
 * @param classes - Array of class names or conditional class names
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Conditionally applies class names based on a condition
 * @param condition - Boolean condition
 * @param trueClass - Class to apply when condition is true
 * @param falseClass - Class to apply when condition is false
 * @returns The appropriate class string
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : falseClass || '';
}

/**
 * Advanced class merging with conflict resolution
 * Handles Tailwind class conflicts by allowing user classes to override base classes
 * @param baseClasses - Base classes from component
 * @param userClasses - User-provided classes
 * @returns Merged class string with conflicts resolved
 */
export function mergeClasses(baseClasses: string, userClasses?: string): string {
  if (!userClasses) return baseClasses;
  
  const baseClassArray = baseClasses.split(' ').filter(Boolean);
  const userClassArray = userClasses.split(' ').filter(Boolean);
  
  // Track classes by their property type to handle conflicts
  const classMap = new Map<string, string>();
  
  // Helper function to extract class property (e.g., 'text' from 'text-lg')
  const getClassProperty = (className: string): string => {
    const parts = className.split('-');
    if (parts.length >= 2) {
      // Handle responsive prefixes (sm:, md:, etc.)
      if (parts[0].includes(':')) {
        const [prefix, ...rest] = parts;
        return `${prefix}-${rest[0]}`;
      }
      return parts[0];
    }
    return className;
  };
  
  // Add base classes
  baseClassArray.forEach(cls => {
    const property = getClassProperty(cls);
    classMap.set(property, cls);
  });
  
  // Add user classes (will override base classes with same property)
  userClassArray.forEach(cls => {
    const property = getClassProperty(cls);
    classMap.set(property, cls);
  });
  
  return Array.from(classMap.values()).join(' ');
}

/**
 * Creates a class name builder function for consistent prop-to-class mapping
 * @param mappings - Object mapping prop values to class names
 * @param defaultValue - Default class when prop is undefined
 * @returns Function that maps prop values to classes
 */
export function createClassBuilder<T extends string>(
  mappings: Record<T, string>,
  defaultValue: string
) {
  return (value?: T): string => {
    return value && mappings[value] ? mappings[value] : defaultValue;
  };
}

/**
 * Generates responsive classes from responsive prop values
 * @param value - Single value or responsive object
 * @param classMap - Mapping of values to class names
 * @returns Responsive class string
 */
export function generateResponsiveClasses<T extends string>(
  value: T | Partial<Record<Breakpoint, T>> | undefined,
  classMap: Record<T, string>
): string {
  if (!value) return '';
  
  // If it's a simple value, return the mapped class
  if (typeof value === 'string') {
    return classMap[value] || '';
  }
  
  // Handle responsive object
  const classes: string[] = [];
  const breakpointOrder: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  
  breakpointOrder.forEach(breakpoint => {
    const breakpointValue = value[breakpoint];
    if (breakpointValue && classMap[breakpointValue]) {
      const baseClass = classMap[breakpointValue];
      // Convert base class to responsive class (e.g., 'm-4' -> 'md:m-4')
      classes.push(`${breakpoint}:${baseClass}`);
    }
  });
  
  return classes.join(' ');
}

/**
 * Generates spacing classes for margin and padding with directional support
 * @param spacing - Spacing value or responsive object
 * @param type - Type of spacing ('margin' or 'padding')
 * @param direction - Optional direction ('top', 'right', 'bottom', 'left', 'x', 'y')
 * @returns Generated spacing classes
 */
export function generateSpacingClasses(
  spacing: ResponsiveSpacing | undefined,
  type: 'margin' | 'padding',
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y'
): string {
  if (!spacing) return '';
  
  const prefix = type === 'margin' ? 'm' : 'p';
  const directionSuffix = direction ? (direction === 'x' || direction === 'y' ? direction : direction.charAt(0)) : '';
  const fullPrefix = `${prefix}${directionSuffix}`;
  
  // Create a mapping for this specific spacing type
  const createSpacingMap = (p: string) => ({
    '0': `${p}-0`,
    '0.5': `${p}-0.5`,
    '1': `${p}-1`,
    '1.5': `${p}-1.5`,
    '2': `${p}-2`,
    '2.5': `${p}-2.5`,
    '3': `${p}-3`,
    '3.5': `${p}-3.5`,
    '4': `${p}-4`,
    '5': `${p}-5`,
    '6': `${p}-6`,
    '7': `${p}-7`,
    '8': `${p}-8`,
    '9': `${p}-9`,
    '10': `${p}-10`,
    '11': `${p}-11`,
    '12': `${p}-12`,
    '14': `${p}-14`,
    '16': `${p}-16`,
    '20': `${p}-20`,
    '24': `${p}-24`,
    '28': `${p}-28`,
    '32': `${p}-32`,
    '36': `${p}-36`,
    '40': `${p}-40`,
    '44': `${p}-44`,
    '48': `${p}-48`,
    '52': `${p}-52`,
    '56': `${p}-56`,
    '60': `${p}-60`,
    '64': `${p}-64`,
    '72': `${p}-72`,
    '80': `${p}-80`,
    '96': `${p}-96`,
    'px': `${p}-px`,
    'auto': `${p}-auto`
  });
  
  const spacingMap = createSpacingMap(fullPrefix);
  
  return generateResponsiveClasses(spacing, spacingMap as Record<string, string>);
}

/**
 * Builds component classes from props using provided mappings
 * @param props - Component props object
 * @param mappings - Object containing class mappings for different prop types
 * @param baseClasses - Base classes that are always applied
 * @returns Complete class string for the component
 */
export function buildComponentClasses<T extends Record<string, unknown>>(
  props: T,
  mappings: {
    [K in keyof T]?: T[K] extends string 
      ? Record<T[K], string> 
      : (value: T[K]) => string;
  },
  baseClasses: string = ''
): string {
  const classes: string[] = [];
  
  // Add base classes
  if (baseClasses) {
    classes.push(baseClasses);
  }
  
  // Process each prop through its mapping
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined && value !== null && mappings[key]) {
      const mapping = mappings[key];
      
      if (typeof mapping === 'function') {
        const result = (mapping as (value: unknown) => string)(value);
        if (result) classes.push(result);
      } else if (typeof mapping === 'object' && typeof value === 'string') {
        const result = (mapping as Record<string, string>)[value];
        if (result) classes.push(result);
      }
    }
  });
  
  // Add custom className if provided
  if (props.className && typeof props.className === 'string') {
    classes.push(props.className);
  }
  
  return mergeClasses(classes.join(' '), '');
}

/**
 * Memoized class builder for performance optimization
 * Caches generated class strings to avoid recalculation
 */
const classCache = new Map<string, string>();

/**
 * Memoized version of buildComponentClasses for better performance
 * @param props - Component props object
 * @param mappings - Object containing class mappings
 * @param baseClasses - Base classes
 * @returns Cached or newly generated class string
 */
export function buildComponentClassesMemo<T extends Record<string, unknown>>(
  props: T,
  mappings: {
    [K in keyof T]?: T[K] extends string 
      ? Record<T[K], string> 
      : (value: T[K]) => string;
  },
  baseClasses: string = ''
): string {
  // Create cache key from props
  const cacheKey = JSON.stringify({ props, baseClasses });
  
  if (classCache.has(cacheKey)) {
    return classCache.get(cacheKey)!;
  }
  
  const result = buildComponentClasses(props, mappings, baseClasses);
  classCache.set(cacheKey, result);
  
  // Limit cache size to prevent memory leaks
  if (classCache.size > 1000) {
    const firstKey = classCache.keys().next().value;
    if (firstKey) {
      classCache.delete(firstKey);
    }
  }
  
  return result;
}

/**
 * Clears the class generation cache
 * Useful for testing or when memory optimization is needed
 */
export function clearClassCache(): void {
  classCache.clear();
}

/**
 * Validates that all required Tailwind classes are available
 * Useful for development warnings
 * @param requiredClasses - Array of class names that should be available
 * @returns Array of missing classes
 */
export function validateTailwindClasses(requiredClasses: string[]): string[] {
  // This is a development helper - in a real implementation,
  // you might check against a Tailwind CSS build or configuration
  const missing: string[] = [];
  
  // Basic validation - check for common Tailwind patterns
  requiredClasses.forEach(className => {
    if (!className.match(/^(text-|bg-|border-|p-|m-|w-|h-|flex|grid|block|inline|hidden)/)) {
      missing.push(className);
    }
  });
  
  return missing;
}