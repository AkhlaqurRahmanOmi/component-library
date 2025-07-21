/**
 * Comprehensive Tailwind CSS class mappings for component library
 * Maps component prop values to their corresponding Tailwind classes
 */

import type {
  ColorVariant,
  SpacingVariant,
  SizeVariant,
  TextSize,
  FontWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  LetterSpacing,
  LineHeight,
  BorderWidth,
  BorderStyle,
  BorderRadius,
  ShadowVariant,
  ComponentSize,
  DisplayVariant,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,
  ButtonVariant,
  InputVariant,
  FieldState
} from '../types/common';

// =============================================================================
// COLOR MAPPINGS
// =============================================================================

/**
 * Maps color variants to Tailwind text color classes
 */
export const textColorMap: Record<ColorVariant, string> = {
  black: 'text-black',
  white: 'text-white',
  gray: 'text-gray-500',
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  indigo: 'text-indigo-500',
  orange: 'text-orange-500',
  teal: 'text-teal-500',
  cyan: 'text-cyan-500',
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-500'
};

/**
 * Maps color variants to Tailwind background color classes
 */
export const backgroundColorMap: Record<ColorVariant, string> = {
  black: 'bg-black',
  white: 'bg-white',
  gray: 'bg-gray-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  indigo: 'bg-indigo-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
  info: 'bg-blue-500'
};

/**
 * Maps color variants to Tailwind border color classes
 */
export const borderColorMap: Record<ColorVariant, string> = {
  black: 'border-black',
  white: 'border-white',
  gray: 'border-gray-500',
  red: 'border-red-500',
  blue: 'border-blue-500',
  green: 'border-green-500',
  yellow: 'border-yellow-500',
  purple: 'border-purple-500',
  pink: 'border-pink-500',
  indigo: 'border-indigo-500',
  orange: 'border-orange-500',
  teal: 'border-teal-500',
  cyan: 'border-cyan-500',
  primary: 'border-blue-600',
  secondary: 'border-gray-600',
  success: 'border-green-600',
  warning: 'border-yellow-600',
  error: 'border-red-600',
  info: 'border-blue-500'
};

// =============================================================================
// SPACING MAPPINGS
// =============================================================================

/**
 * Maps spacing variants to Tailwind margin classes
 */
export const marginMap: Record<SpacingVariant, string> = {
  '0': 'm-0',
  '0.5': 'm-0.5',
  '1': 'm-1',
  '1.5': 'm-1.5',
  '2': 'm-2',
  '2.5': 'm-2.5',
  '3': 'm-3',
  '3.5': 'm-3.5',
  '4': 'm-4',
  '5': 'm-5',
  '6': 'm-6',
  '7': 'm-7',
  '8': 'm-8',
  '9': 'm-9',
  '10': 'm-10',
  '11': 'm-11',
  '12': 'm-12',
  '14': 'm-14',
  '16': 'm-16',
  '20': 'm-20',
  '24': 'm-24',
  '28': 'm-28',
  '32': 'm-32',
  '36': 'm-36',
  '40': 'm-40',
  '44': 'm-44',
  '48': 'm-48',
  '52': 'm-52',
  '56': 'm-56',
  '60': 'm-60',
  '64': 'm-64',
  '72': 'm-72',
  '80': 'm-80',
  '96': 'm-96',
  'px': 'm-px',
  'auto': 'm-auto'
};

/**
 * Maps spacing variants to Tailwind padding classes
 */
export const paddingMap: Record<SpacingVariant, string> = {
  '0': 'p-0',
  '0.5': 'p-0.5',
  '1': 'p-1',
  '1.5': 'p-1.5',
  '2': 'p-2',
  '2.5': 'p-2.5',
  '3': 'p-3',
  '3.5': 'p-3.5',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6',
  '7': 'p-7',
  '8': 'p-8',
  '9': 'p-9',
  '10': 'p-10',
  '11': 'p-11',
  '12': 'p-12',
  '14': 'p-14',
  '16': 'p-16',
  '20': 'p-20',
  '24': 'p-24',
  '28': 'p-28',
  '32': 'p-32',
  '36': 'p-36',
  '40': 'p-40',
  '44': 'p-44',
  '48': 'p-48',
  '52': 'p-52',
  '56': 'p-56',
  '60': 'p-60',
  '64': 'p-64',
  '72': 'p-72',
  '80': 'p-80',
  '96': 'p-96',
  'px': 'p-px',
  'auto': 'p-auto'
};

// =============================================================================
// SIZE MAPPINGS
// =============================================================================

/**
 * Maps size variants to Tailwind width classes
 */
export const widthMap: Record<SizeVariant, string> = {
  'auto': 'w-auto',
  'full': 'w-full',
  'screen': 'w-screen',
  'min': 'w-min',
  'max': 'w-max',
  'fit': 'w-fit',
  'none': 'w-none',
  '0': 'w-0',
  '1': 'w-1',
  '2': 'w-2',
  '3': 'w-3',
  '4': 'w-4',
  '5': 'w-5',
  '6': 'w-6',
  '7': 'w-7',
  '8': 'w-8',
  '9': 'w-9',
  '10': 'w-10',
  '11': 'w-11',
  '12': 'w-12',
  '14': 'w-14',
  '16': 'w-16',
  '20': 'w-20',
  '24': 'w-24',
  '28': 'w-28',
  '32': 'w-32',
  '36': 'w-36',
  '40': 'w-40',
  '44': 'w-44',
  '48': 'w-48',
  '52': 'w-52',
  '56': 'w-56',
  '60': 'w-60',
  '64': 'w-64',
  '72': 'w-72',
  '80': 'w-80',
  '96': 'w-96',
  '1/2': 'w-1/2',
  '1/3': 'w-1/3',
  '2/3': 'w-2/3',
  '1/4': 'w-1/4',
  '2/4': 'w-2/4',
  '3/4': 'w-3/4',
  '1/5': 'w-1/5',
  '2/5': 'w-2/5',
  '3/5': 'w-3/5',
  '4/5': 'w-4/5',
  '1/6': 'w-1/6',
  '2/6': 'w-2/6',
  '3/6': 'w-3/6',
  '4/6': 'w-4/6',
  '5/6': 'w-5/6',
  '1/12': 'w-1/12',
  '2/12': 'w-2/12',
  '3/12': 'w-3/12',
  '4/12': 'w-4/12',
  '5/12': 'w-5/12',
  '6/12': 'w-6/12',
  '7/12': 'w-7/12',
  '8/12': 'w-8/12',
  '9/12': 'w-9/12',
  '10/12': 'w-10/12',
  '11/12': 'w-11/12'
};

/**
 * Maps size variants to Tailwind height classes
 */
export const heightMap: Record<SizeVariant, string> = {
  'auto': 'h-auto',
  'full': 'h-full',
  'screen': 'h-screen',
  'min': 'h-min',
  'max': 'h-max',
  'fit': 'h-fit',
  'none': 'h-none',
  '0': 'h-0',
  '1': 'h-1',
  '2': 'h-2',
  '3': 'h-3',
  '4': 'h-4',
  '5': 'h-5',
  '6': 'h-6',
  '7': 'h-7',
  '8': 'h-8',
  '9': 'h-9',
  '10': 'h-10',
  '11': 'h-11',
  '12': 'h-12',
  '14': 'h-14',
  '16': 'h-16',
  '20': 'h-20',
  '24': 'h-24',
  '28': 'h-28',
  '32': 'h-32',
  '36': 'h-36',
  '40': 'h-40',
  '44': 'h-44',
  '48': 'h-48',
  '52': 'h-52',
  '56': 'h-56',
  '60': 'h-60',
  '64': 'h-64',
  '72': 'h-72',
  '80': 'h-80',
  '96': 'h-96',
  '1/2': 'h-1/2',
  '1/3': 'h-1/3',
  '2/3': 'h-2/3',
  '1/4': 'h-1/4',
  '2/4': 'h-2/4',
  '3/4': 'h-3/4',
  '1/5': 'h-1/5',
  '2/5': 'h-2/5',
  '3/5': 'h-3/5',
  '4/5': 'h-4/5',
  '1/6': 'h-1/6',
  '2/6': 'h-2/6',
  '3/6': 'h-3/6',
  '4/6': 'h-4/6',
  '5/6': 'h-5/6',
  '1/12': 'h-1/12',
  '2/12': 'h-2/12',
  '3/12': 'h-3/12',
  '4/12': 'h-4/12',
  '5/12': 'h-5/12',
  '6/12': 'h-6/12',
  '7/12': 'h-7/12',
  '8/12': 'h-8/12',
  '9/12': 'h-9/12',
  '10/12': 'h-10/12',
  '11/12': 'h-11/12'
};

// =============================================================================
// TYPOGRAPHY MAPPINGS
// =============================================================================

/**
 * Maps text size variants to Tailwind text size classes
 */
export const textSizeMap: Record<TextSize, string> = {
  'xs': 'text-xs',
  'sm': 'text-sm',
  'base': 'text-base',
  'lg': 'text-lg',
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl'
};

/**
 * Maps font weight variants to Tailwind font weight classes
 */
export const fontWeightMap: Record<FontWeight, string> = {
  'thin': 'font-thin',
  'extralight': 'font-extralight',
  'light': 'font-light',
  'normal': 'font-normal',
  'medium': 'font-medium',
  'semibold': 'font-semibold',
  'bold': 'font-bold',
  'extrabold': 'font-extrabold',
  'black': 'font-black'
};

/**
 * Maps text alignment variants to Tailwind text alignment classes
 */
export const textAlignMap: Record<TextAlign, string> = {
  'left': 'text-left',
  'center': 'text-center',
  'right': 'text-right',
  'justify': 'text-justify',
  'start': 'text-start',
  'end': 'text-end'
};

/**
 * Maps text decoration variants to Tailwind text decoration classes
 */
export const textDecorationMap: Record<TextDecoration, string> = {
  'none': 'no-underline',
  'underline': 'underline',
  'overline': 'overline',
  'line-through': 'line-through'
};

/**
 * Maps text transform variants to Tailwind text transform classes
 */
export const textTransformMap: Record<TextTransform, string> = {
  'none': 'normal-case',
  'uppercase': 'uppercase',
  'lowercase': 'lowercase',
  'capitalize': 'capitalize'
};

/**
 * Maps letter spacing variants to Tailwind letter spacing classes
 */
export const letterSpacingMap: Record<LetterSpacing, string> = {
  'tighter': 'tracking-tighter',
  'tight': 'tracking-tight',
  'normal': 'tracking-normal',
  'wide': 'tracking-wide',
  'wider': 'tracking-wider',
  'widest': 'tracking-widest'
};

/**
 * Maps line height variants to Tailwind line height classes
 */
export const lineHeightMap: Record<LineHeight, string> = {
  'none': 'leading-none',
  'tight': 'leading-tight',
  'snug': 'leading-snug',
  'normal': 'leading-normal',
  'relaxed': 'leading-relaxed',
  'loose': 'leading-loose',
  '3': 'leading-3',
  '4': 'leading-4',
  '5': 'leading-5',
  '6': 'leading-6',
  '7': 'leading-7',
  '8': 'leading-8',
  '9': 'leading-9',
  '10': 'leading-10'
};

// =============================================================================
// LAYOUT MAPPINGS
// =============================================================================

/**
 * Maps display variants to Tailwind display classes
 */
export const displayMap: Record<DisplayVariant, string> = {
  'block': 'block',
  'inline': 'inline',
  'inline-block': 'inline-block',
  'flex': 'flex',
  'inline-flex': 'inline-flex',
  'grid': 'grid',
  'inline-grid': 'inline-grid',
  'table': 'table',
  'table-cell': 'table-cell',
  'table-row': 'table-row',
  'hidden': 'hidden'
};

/**
 * Maps flex direction variants to Tailwind flex direction classes
 */
export const flexDirectionMap: Record<FlexDirection, string> = {
  'row': 'flex-row',
  'column': 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse'
};

/**
 * Maps justify content variants to Tailwind justify content classes
 */
export const justifyContentMap: Record<JustifyContent, string> = {
  'start': 'justify-start',
  'end': 'justify-end',
  'center': 'justify-center',
  'between': 'justify-between',
  'around': 'justify-around',
  'evenly': 'justify-evenly',
  'stretch': 'justify-stretch'
};

/**
 * Maps align items variants to Tailwind align items classes
 */
export const alignItemsMap: Record<AlignItems, string> = {
  'start': 'items-start',
  'end': 'items-end',
  'center': 'items-center',
  'stretch': 'items-stretch',
  'baseline': 'items-baseline'
};

/**
 * Maps flex wrap variants to Tailwind flex wrap classes
 */
export const flexWrapMap: Record<FlexWrap, string> = {
  'nowrap': 'flex-nowrap',
  'wrap': 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse'
};

// =============================================================================
// BORDER MAPPINGS
// =============================================================================

/**
 * Maps border width variants to Tailwind border width classes
 */
export const borderWidthMap: Record<BorderWidth, string> = {
  '0': 'border-0',
  '1': 'border',
  '2': 'border-2',
  '4': 'border-4',
  '8': 'border-8'
};

/**
 * Maps border style variants to Tailwind border style classes
 */
export const borderStyleMap: Record<BorderStyle, string> = {
  'solid': 'border-solid',
  'dashed': 'border-dashed',
  'dotted': 'border-dotted',
  'double': 'border-double',
  'none': 'border-none'
};

/**
 * Maps border radius variants to Tailwind border radius classes
 */
export const borderRadiusMap: Record<BorderRadius, string> = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'base': 'rounded',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  'full': 'rounded-full'
};

// =============================================================================
// SHADOW MAPPINGS
// =============================================================================

/**
 * Maps shadow variants to Tailwind shadow classes
 */
export const shadowMap: Record<ShadowVariant, string> = {
  'none': 'shadow-none',
  'sm': 'shadow-sm',
  'base': 'shadow',
  'md': 'shadow-md',
  'lg': 'shadow-lg',
  'xl': 'shadow-xl',
  '2xl': 'shadow-2xl',
  'inner': 'shadow-inner'
};

// =============================================================================
// COMPONENT SIZE MAPPINGS
// =============================================================================

/**
 * Maps component size variants to appropriate padding and text size combinations
 */
export const componentSizeMap: Record<ComponentSize, { padding: string; textSize: string }> = {
  'xs': { padding: 'px-2 py-1', textSize: 'text-xs' },
  'sm': { padding: 'px-3 py-1.5', textSize: 'text-sm' },
  'base': { padding: 'px-4 py-2', textSize: 'text-base' },
  'lg': { padding: 'px-6 py-3', textSize: 'text-lg' },
  'xl': { padding: 'px-8 py-4', textSize: 'text-xl' },
  '2xl': { padding: 'px-10 py-5', textSize: 'text-2xl' }
};

// =============================================================================
// COMPONENT VARIANT MAPPINGS
// =============================================================================

/**
 * Maps button variants to their corresponding Tailwind class combinations
 */
export const buttonVariantMap: Record<ButtonVariant, string> = {
  'primary': 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent',
  'secondary': 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent',
  'outline': 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 border-blue-600',
  'ghost': 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500 border-transparent',
  'danger': 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent',
  'success': 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border-transparent'
};

/**
 * Maps input variants to their corresponding Tailwind class combinations
 */
export const inputVariantMap: Record<InputVariant, string> = {
  'default': 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  'outline': 'border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  'filled': 'bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
  'underline': 'border-0 border-b-2 border-gray-300 focus:border-blue-500 rounded-none'
};

/**
 * Maps field states to their corresponding Tailwind class combinations
 */
export const fieldStateMap: Record<FieldState, string> = {
  'default': 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  'error': 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900',
  'success': 'border-green-500 focus:border-green-500 focus:ring-green-500 text-green-900',
  'warning': 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 text-yellow-900'
};