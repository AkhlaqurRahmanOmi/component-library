/**
 * Component-specific class builders that combine mappings with utility functions
 * These provide high-level APIs for generating component classes
 */

import {
  cn,
  mergeClasses,
  generateSpacingClasses
} from './classNames';

import {
  memoizeComponentClasses,
  devWarnings
} from './memoization';

import {
  textColorMap,
  backgroundColorMap,
  borderColorMap,
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
  widthMap,
  heightMap
} from './tailwindMappings';

import type {
  ColorVariant,
  SpacingVariant,
  ResponsiveSpacing,
  TextSize,
  FontWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  LetterSpacing,
  LineHeight,
  DisplayVariant,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,
  BorderStyle,
  BorderRadius,
  ShadowVariant,
  ComponentSize,
  ButtonVariant,
  InputVariant,
  FieldState,
  SizeVariant,
  BorderVariant
} from '../types/common';

// =============================================================================
// TEXT COMPONENT CLASS BUILDER
// =============================================================================

export interface TextClassProps {
  size?: TextSize;
  weight?: FontWeight;
  color?: ColorVariant;
  align?: TextAlign;
  decoration?: TextDecoration;
  transform?: TextTransform;
  spacing?: LetterSpacing;
  lineHeight?: LineHeight;
  margin?: ResponsiveSpacing;
  marginTop?: ResponsiveSpacing;
  marginRight?: ResponsiveSpacing;
  marginBottom?: ResponsiveSpacing;
  marginLeft?: ResponsiveSpacing;
  marginX?: ResponsiveSpacing;
  marginY?: ResponsiveSpacing;
  padding?: ResponsiveSpacing;
  paddingTop?: ResponsiveSpacing;
  paddingRight?: ResponsiveSpacing;
  paddingBottom?: ResponsiveSpacing;
  paddingLeft?: ResponsiveSpacing;
  paddingX?: ResponsiveSpacing;
  paddingY?: ResponsiveSpacing;
  display?: DisplayVariant;
  className?: string;
}

/**
 * Internal function for building Text component classes
 */
function _buildTextClasses(props: TextClassProps): string {
  const classes: string[] = [];
  
  // Development warnings
  if (props.size && !textSizeMap[props.size]) {
    devWarnings.warnInvalidProp('Text', 'size', props.size, Object.keys(textSizeMap));
  }
  if (props.weight && !fontWeightMap[props.weight]) {
    devWarnings.warnInvalidProp('Text', 'weight', props.weight, Object.keys(fontWeightMap));
  }
  if (props.color && !textColorMap[props.color]) {
    devWarnings.warnInvalidProp('Text', 'color', props.color, Object.keys(textColorMap));
  }
  
  // Typography classes
  if (props.size) classes.push(textSizeMap[props.size]);
  if (props.weight) classes.push(fontWeightMap[props.weight]);
  if (props.color) classes.push(textColorMap[props.color]);
  if (props.align) classes.push(textAlignMap[props.align]);
  if (props.decoration) classes.push(textDecorationMap[props.decoration]);
  if (props.transform) classes.push(textTransformMap[props.transform]);
  if (props.spacing) classes.push(letterSpacingMap[props.spacing]);
  if (props.lineHeight) classes.push(lineHeightMap[props.lineHeight]);
  if (props.display) classes.push(displayMap[props.display]);
  
  // Spacing classes
  if (props.margin) classes.push(generateSpacingClasses(props.margin, 'margin'));
  if (props.marginTop) classes.push(generateSpacingClasses(props.marginTop, 'margin', 'top'));
  if (props.marginRight) classes.push(generateSpacingClasses(props.marginRight, 'margin', 'right'));
  if (props.marginBottom) classes.push(generateSpacingClasses(props.marginBottom, 'margin', 'bottom'));
  if (props.marginLeft) classes.push(generateSpacingClasses(props.marginLeft, 'margin', 'left'));
  if (props.marginX) classes.push(generateSpacingClasses(props.marginX, 'margin', 'x'));
  if (props.marginY) classes.push(generateSpacingClasses(props.marginY, 'margin', 'y'));
  
  if (props.padding) classes.push(generateSpacingClasses(props.padding, 'padding'));
  if (props.paddingTop) classes.push(generateSpacingClasses(props.paddingTop, 'padding', 'top'));
  if (props.paddingRight) classes.push(generateSpacingClasses(props.paddingRight, 'padding', 'right'));
  if (props.paddingBottom) classes.push(generateSpacingClasses(props.paddingBottom, 'padding', 'bottom'));
  if (props.paddingLeft) classes.push(generateSpacingClasses(props.paddingLeft, 'padding', 'left'));
  if (props.paddingX) classes.push(generateSpacingClasses(props.paddingX, 'padding', 'x'));
  if (props.paddingY) classes.push(generateSpacingClasses(props.paddingY, 'padding', 'y'));
  
  return mergeClasses(classes.join(' '), props.className);
}

/**
 * Builds classes for Text component (memoized)
 */
export const buildTextClasses = memoizeComponentClasses(_buildTextClasses);

// =============================================================================
// INPUT COMPONENT CLASS BUILDER
// =============================================================================

export interface InputClassProps {
  size?: ComponentSize;
  variant?: InputVariant;
  state?: FieldState;
  fullWidth?: boolean;
  disabled?: boolean;
  margin?: ResponsiveSpacing;
  marginTop?: ResponsiveSpacing;
  marginRight?: ResponsiveSpacing;
  marginBottom?: ResponsiveSpacing;
  marginLeft?: ResponsiveSpacing;
  marginX?: ResponsiveSpacing;
  marginY?: ResponsiveSpacing;
  padding?: ResponsiveSpacing;
  paddingTop?: ResponsiveSpacing;
  paddingRight?: ResponsiveSpacing;
  paddingBottom?: ResponsiveSpacing;
  paddingLeft?: ResponsiveSpacing;
  paddingX?: ResponsiveSpacing;
  paddingY?: ResponsiveSpacing;
  className?: string;
}

/**
 * Internal function for building Input component classes
 */
function _buildInputClasses(props: InputClassProps): string {
  const classes: string[] = [];
  
  // Development warnings
  if (props.size && !componentSizeMap[props.size]) {
    devWarnings.warnInvalidProp('Input', 'size', props.size, Object.keys(componentSizeMap));
  }
  if (props.variant && !inputVariantMap[props.variant]) {
    devWarnings.warnInvalidProp('Input', 'variant', props.variant, Object.keys(inputVariantMap));
  }
  if (props.state && !fieldStateMap[props.state]) {
    devWarnings.warnInvalidProp('Input', 'state', props.state, Object.keys(fieldStateMap));
  }
  
  // Base input classes
  classes.push('block rounded-md shadow-sm transition-colors duration-200');
  
  // Size classes
  if (props.size && componentSizeMap[props.size]) {
    classes.push(componentSizeMap[props.size].padding);
    classes.push(componentSizeMap[props.size].textSize);
  } else {
    classes.push(componentSizeMap.base.padding);
    classes.push(componentSizeMap.base.textSize);
  }
  
  // Variant classes
  if (props.variant) {
    classes.push(inputVariantMap[props.variant]);
  } else {
    classes.push(inputVariantMap.default);
  }
  
  // State classes
  if (props.state && props.state !== 'default') {
    classes.push(fieldStateMap[props.state]);
  }
  
  // Width classes
  if (props.fullWidth) {
    classes.push('w-full');
  }
  
  // Disabled state
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed');
  }
  
  // Spacing classes
  if (props.margin) classes.push(generateSpacingClasses(props.margin, 'margin'));
  if (props.marginTop) classes.push(generateSpacingClasses(props.marginTop, 'margin', 'top'));
  if (props.marginRight) classes.push(generateSpacingClasses(props.marginRight, 'margin', 'right'));
  if (props.marginBottom) classes.push(generateSpacingClasses(props.marginBottom, 'margin', 'bottom'));
  if (props.marginLeft) classes.push(generateSpacingClasses(props.marginLeft, 'margin', 'left'));
  if (props.marginX) classes.push(generateSpacingClasses(props.marginX, 'margin', 'x'));
  if (props.marginY) classes.push(generateSpacingClasses(props.marginY, 'margin', 'y'));
  
  return mergeClasses(classes.join(' '), props.className);
}

/**
 * Builds classes for Input component (memoized)
 */
export const buildInputClasses = memoizeComponentClasses(_buildInputClasses);

// =============================================================================
// CONTAINER COMPONENT CLASS BUILDER
// =============================================================================

export interface ContainerClassProps {
  display?: DisplayVariant;
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  wrap?: FlexWrap;
  gap?: SpacingVariant;
  width?: SizeVariant;
  height?: SizeVariant;
  maxWidth?: SizeVariant;
  maxHeight?: SizeVariant;
  background?: ColorVariant;
  border?: BorderVariant;
  borderRadius?: BorderRadius;
  shadow?: ShadowVariant;
  margin?: ResponsiveSpacing;
  marginTop?: ResponsiveSpacing;
  marginRight?: ResponsiveSpacing;
  marginBottom?: ResponsiveSpacing;
  marginLeft?: ResponsiveSpacing;
  marginX?: ResponsiveSpacing;
  marginY?: ResponsiveSpacing;
  padding?: ResponsiveSpacing;
  paddingTop?: ResponsiveSpacing;
  paddingRight?: ResponsiveSpacing;
  paddingBottom?: ResponsiveSpacing;
  paddingLeft?: ResponsiveSpacing;
  paddingX?: ResponsiveSpacing;
  paddingY?: ResponsiveSpacing;
  className?: string;
}

/**
 * Internal function for building Container component classes
 */
function _buildContainerClasses(props: ContainerClassProps): string {
  const classes: string[] = [];
  
  // Development warnings
  if (props.display && !displayMap[props.display]) {
    devWarnings.warnInvalidProp('Container', 'display', props.display, Object.keys(displayMap));
  }
  if (props.background && !backgroundColorMap[props.background]) {
    devWarnings.warnInvalidProp('Container', 'background', props.background, Object.keys(backgroundColorMap));
  }
  
  // Display classes
  if (props.display) {
    classes.push(displayMap[props.display]);
    
    // Flex-specific classes
    if (props.display === 'flex' || props.display === 'inline-flex') {
      if (props.direction) classes.push(flexDirectionMap[props.direction]);
      if (props.justify) classes.push(justifyContentMap[props.justify]);
      if (props.align) classes.push(alignItemsMap[props.align]);
      if (props.wrap) classes.push(flexWrapMap[props.wrap]);
    }
  }
  
  // Gap classes
  if (props.gap) {
    classes.push(`gap-${props.gap}`);
  }
  
  // Size classes
  if (props.width) classes.push(widthMap[props.width]);
  if (props.height) classes.push(heightMap[props.height]);
  if (props.maxWidth) classes.push(`max-${widthMap[props.maxWidth]}`);
  if (props.maxHeight) classes.push(`max-${heightMap[props.maxHeight]}`);
  
  // Visual classes
  if (props.background) classes.push(backgroundColorMap[props.background]);
  if (props.borderRadius) classes.push(borderRadiusMap[props.borderRadius]);
  if (props.shadow) classes.push(shadowMap[props.shadow]);
  
  // Border classes
  if (props.border) {
    if (typeof props.border === 'string') {
      if (props.border === 'none') {
        classes.push('border-none');
      } else {
        classes.push(borderStyleMap[props.border as BorderStyle]);
      }
    } else {
      if (props.border.width) classes.push(borderWidthMap[props.border.width]);
      if (props.border.style) classes.push(borderStyleMap[props.border.style]);
      if (props.border.color) classes.push(borderColorMap[props.border.color as ColorVariant]);
    }
  }
  
  // Spacing classes
  if (props.margin) classes.push(generateSpacingClasses(props.margin, 'margin'));
  if (props.marginTop) classes.push(generateSpacingClasses(props.marginTop, 'margin', 'top'));
  if (props.marginRight) classes.push(generateSpacingClasses(props.marginRight, 'margin', 'right'));
  if (props.marginBottom) classes.push(generateSpacingClasses(props.marginBottom, 'margin', 'bottom'));
  if (props.marginLeft) classes.push(generateSpacingClasses(props.marginLeft, 'margin', 'left'));
  if (props.marginX) classes.push(generateSpacingClasses(props.marginX, 'margin', 'x'));
  if (props.marginY) classes.push(generateSpacingClasses(props.marginY, 'margin', 'y'));
  
  if (props.padding) classes.push(generateSpacingClasses(props.padding, 'padding'));
  if (props.paddingTop) classes.push(generateSpacingClasses(props.paddingTop, 'padding', 'top'));
  if (props.paddingRight) classes.push(generateSpacingClasses(props.paddingRight, 'padding', 'right'));
  if (props.paddingBottom) classes.push(generateSpacingClasses(props.paddingBottom, 'padding', 'bottom'));
  if (props.paddingLeft) classes.push(generateSpacingClasses(props.paddingLeft, 'padding', 'left'));
  if (props.paddingX) classes.push(generateSpacingClasses(props.paddingX, 'padding', 'x'));
  if (props.paddingY) classes.push(generateSpacingClasses(props.paddingY, 'padding', 'y'));
  
  return mergeClasses(classes.join(' '), props.className);
}

/**
 * Builds classes for Container component (memoized)
 */
export const buildContainerClasses = memoizeComponentClasses(_buildContainerClasses);

// =============================================================================
// BUTTON COMPONENT CLASS BUILDER
// =============================================================================

export interface ButtonClassProps {
  variant?: ButtonVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  margin?: ResponsiveSpacing;
  marginTop?: ResponsiveSpacing;
  marginRight?: ResponsiveSpacing;
  marginBottom?: ResponsiveSpacing;
  marginLeft?: ResponsiveSpacing;
  marginX?: ResponsiveSpacing;
  marginY?: ResponsiveSpacing;
  className?: string;
}

/**
 * Internal function for building Button component classes
 */
function _buildButtonClasses(props: ButtonClassProps): string {
  const classes: string[] = [];
  
  // Development warnings
  if (props.size && !componentSizeMap[props.size]) {
    devWarnings.warnInvalidProp('Button', 'size', props.size, Object.keys(componentSizeMap));
  }
  if (props.variant && !buttonVariantMap[props.variant]) {
    devWarnings.warnInvalidProp('Button', 'variant', props.variant, Object.keys(buttonVariantMap));
  }
  
  // Base button classes
  classes.push(
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );
  
  // Size classes
  if (props.size && componentSizeMap[props.size]) {
    classes.push(componentSizeMap[props.size].padding);
    classes.push(componentSizeMap[props.size].textSize);
  } else {
    classes.push(componentSizeMap.base.padding);
    classes.push(componentSizeMap.base.textSize);
  }
  
  // Minimum touch target size for accessibility (44px minimum) - applied after size classes
  classes.push('min-w-[44px]', 'min-h-[44px]');
  
  // Variant classes
  if (props.variant) {
    classes.push(buttonVariantMap[props.variant]);
  } else {
    classes.push(buttonVariantMap.primary);
  }
  
  // Width classes
  if (props.fullWidth) {
    classes.push('w-full');
  }
  
  // State classes
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed');
  }
  
  if (props.loading) {
    classes.push('cursor-wait');
  }
  
  if (props.active) {
    classes.push('ring-2 ring-offset-2');
  }
  
  // Spacing classes
  if (props.margin) classes.push(generateSpacingClasses(props.margin, 'margin'));
  if (props.marginTop) classes.push(generateSpacingClasses(props.marginTop, 'margin', 'top'));
  if (props.marginRight) classes.push(generateSpacingClasses(props.marginRight, 'margin', 'right'));
  if (props.marginBottom) classes.push(generateSpacingClasses(props.marginBottom, 'margin', 'bottom'));
  if (props.marginLeft) classes.push(generateSpacingClasses(props.marginLeft, 'margin', 'left'));
  if (props.marginX) classes.push(generateSpacingClasses(props.marginX, 'margin', 'x'));
  if (props.marginY) classes.push(generateSpacingClasses(props.marginY, 'margin', 'y'));
  
  return mergeClasses(classes.join(' '), props.className);
}

/**
 * Builds classes for Button component (memoized)
 */
export const buildButtonClasses = memoizeComponentClasses(_buildButtonClasses);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generates focus ring classes based on color variant
 */
export function generateFocusRingClasses(color: ColorVariant = 'primary'): string {
  const focusColorMap: Record<ColorVariant, string> = {
    black: 'focus:ring-gray-500',
    white: 'focus:ring-gray-300',
    gray: 'focus:ring-gray-500',
    red: 'focus:ring-red-500',
    blue: 'focus:ring-blue-500',
    green: 'focus:ring-green-500',
    yellow: 'focus:ring-yellow-500',
    purple: 'focus:ring-purple-500',
    pink: 'focus:ring-pink-500',
    indigo: 'focus:ring-indigo-500',
    orange: 'focus:ring-orange-500',
    teal: 'focus:ring-teal-500',
    cyan: 'focus:ring-cyan-500',
    primary: 'focus:ring-blue-500',
    secondary: 'focus:ring-gray-500',
    success: 'focus:ring-green-500',
    warning: 'focus:ring-yellow-500',
    error: 'focus:ring-red-500',
    info: 'focus:ring-blue-500'
  };
  
  return cn('focus:outline-none focus:ring-2 focus:ring-offset-2', focusColorMap[color]);
}

/**
 * Generates hover classes based on color variant
 */
export function generateHoverClasses(color: ColorVariant = 'primary', type: 'background' | 'text' = 'background'): string {
  const hoverBackgroundMap: Record<ColorVariant, string> = {
    black: 'hover:bg-gray-800',
    white: 'hover:bg-gray-50',
    gray: 'hover:bg-gray-600',
    red: 'hover:bg-red-600',
    blue: 'hover:bg-blue-600',
    green: 'hover:bg-green-600',
    yellow: 'hover:bg-yellow-600',
    purple: 'hover:bg-purple-600',
    pink: 'hover:bg-pink-600',
    indigo: 'hover:bg-indigo-600',
    orange: 'hover:bg-orange-600',
    teal: 'hover:bg-teal-600',
    cyan: 'hover:bg-cyan-600',
    primary: 'hover:bg-blue-700',
    secondary: 'hover:bg-gray-700',
    success: 'hover:bg-green-700',
    warning: 'hover:bg-yellow-700',
    error: 'hover:bg-red-700',
    info: 'hover:bg-blue-700'
  };
  
  const hoverTextMap: Record<ColorVariant, string> = {
    black: 'hover:text-gray-800',
    white: 'hover:text-gray-100',
    gray: 'hover:text-gray-600',
    red: 'hover:text-red-600',
    blue: 'hover:text-blue-600',
    green: 'hover:text-green-600',
    yellow: 'hover:text-yellow-600',
    purple: 'hover:text-purple-600',
    pink: 'hover:text-pink-600',
    indigo: 'hover:text-indigo-600',
    orange: 'hover:text-orange-600',
    teal: 'hover:text-teal-600',
    cyan: 'hover:text-cyan-600',
    primary: 'hover:text-blue-700',
    secondary: 'hover:text-gray-700',
    success: 'hover:text-green-700',
    warning: 'hover:text-yellow-700',
    error: 'hover:text-red-700',
    info: 'hover:text-blue-700'
  };
  
  return type === 'background' ? hoverBackgroundMap[color] : hoverTextMap[color];
}