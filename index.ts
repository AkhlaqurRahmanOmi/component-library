/**
 * Component Library Main Entry Point
 * 
 * This is the main entry point for the component library.
 * It exports all components, types, and utilities for external consumption.
 * 
 * Usage:
 * import { Button, Text, Input, Container } from 'component-library';
 * import type { ButtonProps, TextProps } from 'component-library';
 * 
 * Tree-shaking support:
 * - Individual component imports: import { Button } from 'component-library';
 * - Individual utility imports: import { cn } from 'component-library';
 * - Type-only imports: import type { ButtonProps } from 'component-library';
 */

// =============================================================================
// COMPONENTS - Barrel exports for tree-shaking
// =============================================================================

// Export all components and their types through barrel exports
export * from './components';

// =============================================================================
// COMPONENTS - Direct exports for convenience and better tree-shaking
// =============================================================================

// Re-export commonly used components for convenience
export { Button } from './components/ui/Button';
export { Text } from './components/ui/Text';
export { Input } from './components/ui/Input';
export { Container } from './components/ui/Container';

// =============================================================================
// COMPONENT TYPES - Direct exports for better TypeScript experience
// =============================================================================

// Re-export commonly used component prop types
export type { ButtonProps } from './components/ui/Button';
export type { TextProps } from './components/ui/Text';
export type { InputProps } from './components/ui/Input';
export type { ContainerProps } from './components/ui/Container';

// =============================================================================
// COMMON TYPES - All shared type definitions
// =============================================================================

export type {
  // Color system
  ColorVariant,
  ColorIntensity,
  ColorWithIntensity,

  // Spacing system
  SpacingVariant,
  ResponsiveSpacing,

  // Size system
  SizeVariant,

  // Layout and display
  DisplayVariant,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,

  // Typography
  TextSize,
  FontWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  LetterSpacing,
  LineHeight,

  // Borders and visual
  BorderWidth,
  BorderStyle,
  BorderRadius,
  BorderVariant,
  ShadowVariant,

  // Component variants
  ComponentSize,
  ButtonVariant,
  InputVariant,
  FieldState,
  InputType,

  // Responsive design
  Breakpoint,
  ResponsiveValue,

  // Base interfaces
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  LayoutProps,
  VisualProps,

  // Utility types
  DeepPartial,
  ComponentProps,
  PolymorphicProps,
  HTMLElementTag,


} from './components/types';

// =============================================================================
// UTILITIES - All utility functions
// =============================================================================

export {
  // Class name utilities
  cn,
  conditionalClass,
  mergeClasses,
  createClassBuilder,
  generateResponsiveClasses,
  generateSpacingClasses,
  buildComponentClasses,
  buildComponentClassesMemo,
  clearClassCache,
  validateTailwindClasses,

  // Tailwind class mappings
  textColorMap,
  backgroundColorMap,
  borderColorMap,
  marginMap,
  paddingMap,
  widthMap,
  heightMap,
  textSizeMap,
  fontWeightMap,
  textAlignMap,
  textDecorationMap,
  textTransformMap,
  letterSpacingMap,
  lineHeightMap,
  displayMap,
  flexDirectionMap,
  justifyContentMap,
  alignItemsMap,
  flexWrapMap,
  borderWidthMap,
  borderStyleMap,
  borderRadiusMap,
  shadowMap,
  componentSizeMap,
  buttonVariantMap,
  inputVariantMap,
  fieldStateMap,

  // Component-specific class builders
  buildTextClasses,
  buildInputClasses,
  buildContainerClasses,
  buildButtonClasses,
  generateFocusRingClasses,
  generateHoverClasses
} from './components/utils';

// =============================================================================
// UTILITY TYPES - Component class builder interfaces
// =============================================================================

export type {
  // Component class builder interfaces
  TextClassProps,
  InputClassProps,
  ContainerClassProps,
  ButtonClassProps
} from './components/utils';