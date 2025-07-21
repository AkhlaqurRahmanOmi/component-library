/**
 * Utility functions index - exports all utility functions for easy importing
 */

// Class name utilities
export {
  cn,
  conditionalClass,
  mergeClasses,
  createClassBuilder,
  generateResponsiveClasses,
  generateSpacingClasses,
  buildComponentClasses,
  buildComponentClassesMemo,
  clearClassCache,
  validateTailwindClasses
} from './classNames';

// Tailwind class mappings
export {
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
  fieldStateMap
} from './tailwindMappings';

// Component-specific class builders
export * from './componentClassBuilders';

// Memoization utilities
export {
  memoizeClassNames,
  memoizeComponentClasses,
  clearMemoizationCaches,
  getCacheStats,
  devWarnings
} from './memoization';

// Accessibility testing utilities
export * from './accessibility';