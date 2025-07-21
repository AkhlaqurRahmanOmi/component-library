import * as React from 'react';

/**
 * Common type definitions used across all components
 */

// =============================================================================
// COLOR SYSTEM
// =============================================================================

/**
 * Standard color variants used across all components
 * Includes semantic colors (primary, secondary, etc.) and standard colors
 */
export type ColorVariant = 
  | 'black' | 'white' | 'gray' | 'red' | 'blue' | 'green' 
  | 'yellow' | 'purple' | 'pink' | 'indigo' | 'orange' | 'teal' | 'cyan'
  | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Color intensity variants for more granular color control
 */
export type ColorIntensity = 
  | '50' | '100' | '200' | '300' | '400' | '500' 
  | '600' | '700' | '800' | '900' | '950';

/**
 * Combined color with optional intensity
 */
export type ColorWithIntensity = ColorVariant | `${Exclude<ColorVariant, 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'>}-${ColorIntensity}`;

// =============================================================================
// SPACING SYSTEM
// =============================================================================

/**
 * Tailwind spacing scale for consistent margin and padding
 */
export type SpacingVariant = 
  | '0' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '5' | '6' 
  | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16' | '20' | '24' | '28' 
  | '32' | '36' | '40' | '44' | '48' | '52' | '56' | '60' | '64' | '72' 
  | '80' | '96' | 'px' | 'auto';

/**
 * Responsive spacing object for different breakpoints
 */
export type ResponsiveSpacing = SpacingVariant | {
  sm?: SpacingVariant;
  md?: SpacingVariant;
  lg?: SpacingVariant;
  xl?: SpacingVariant;
  '2xl'?: SpacingVariant;
};

// =============================================================================
// SIZE SYSTEM
// =============================================================================

/**
 * Size variants for width and height properties
 */
export type SizeVariant = 
  | 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | 'none'
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  | '14' | '16' | '20' | '24' | '28' | '32' | '36' | '40' | '44' | '48' | '52' 
  | '56' | '60' | '64' | '72' | '80' | '96'
  | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5'
  | '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '1/12' | '2/12' | '3/12' | '4/12' 
  | '5/12' | '6/12' | '7/12' | '8/12' | '9/12' | '10/12' | '11/12';

// =============================================================================
// LAYOUT SYSTEM
// =============================================================================

/**
 * Display property variants
 */
export type DisplayVariant = 
  | 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' 
  | 'grid' | 'inline-grid' | 'table' | 'table-cell' | 'table-row' | 'hidden';

/**
 * Flexbox direction variants
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Flexbox justify content variants
 */
export type JustifyContent = 
  | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';

/**
 * Flexbox align items variants
 */
export type AlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline';

/**
 * Flexbox wrap variants
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

/**
 * Text size variants
 */
export type TextSize = 
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

/**
 * Font weight variants
 */
export type FontWeight = 
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

/**
 * Text alignment variants
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

/**
 * Text decoration variants
 */
export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

/**
 * Text transform variants
 */
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

/**
 * Letter spacing variants
 */
export type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

/**
 * Line height variants
 */
export type LineHeight = 
  | 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' 
  | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

// =============================================================================
// BORDER SYSTEM
// =============================================================================

/**
 * Border width variants
 */
export type BorderWidth = '0' | '1' | '2' | '4' | '8';

/**
 * Border style variants
 */
export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

/**
 * Border radius variants
 */
export type BorderRadius = 
  | 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Comprehensive border configuration
 */
export type BorderVariant = 
  | 'none' | BorderStyle
  | {
      width?: BorderWidth;
      style?: BorderStyle;
      color?: ColorWithIntensity;
    };

// =============================================================================
// SHADOW SYSTEM
// =============================================================================

/**
 * Box shadow variants
 */
export type ShadowVariant = 
  | 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

// =============================================================================
// COMPONENT SIZE VARIANTS
// =============================================================================

/**
 * Standard component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

// =============================================================================
// BASE INTERFACES
// =============================================================================

/**
 * Base component props that all components should extend
 * Provides consistent foundation for all components
 */
export interface BaseComponentProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Unique identifier for the element */
  id?: string;
  /** Inline styles (use sparingly, prefer className) */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
  /** Test identifier for automated testing */
  'data-testid'?: string;
}

/**
 * Accessibility props mixin for WCAG compliance
 * Provides consistent accessibility interface across components
 */
export interface AccessibilityProps {
  /** ARIA role attribute */
  role?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ID of element that describes this element */
  ariaDescribedBy?: string;
  /** ID of element that labels this element */
  ariaLabelledBy?: string;
  /** Tab order for keyboard navigation */
  tabIndex?: number;
  /** ARIA expanded state for collapsible elements */
  ariaExpanded?: boolean;
  /** ARIA pressed state for toggle buttons */
  ariaPressed?: boolean;
  /** ARIA selected state for selectable elements */
  ariaSelected?: boolean;
  /** ARIA disabled state */
  ariaDisabled?: boolean;
  /** ARIA hidden state */
  ariaHidden?: boolean;
  /** ARIA live region for dynamic content */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  ariaAtomic?: boolean;
}

/**
 * Interactive props mixin for user interactions
 * Provides consistent event handling interface
 */
export interface InteractiveProps {
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Double click event handler */
  onDoubleClick?: (event: React.MouseEvent) => void;
  /** Mouse enter event handler */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** Mouse leave event handler */
  onMouseLeave?: (event: React.MouseEvent) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent) => void;
  /** Key down event handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** Key up event handler */
  onKeyUp?: (event: React.KeyboardEvent) => void;
  /** Key press event handler */
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

/**
 * Layout props mixin for spacing and positioning
 * Provides consistent layout interface across components
 */
export interface LayoutProps {
  /** Margin spacing */
  margin?: ResponsiveSpacing;
  /** Margin top */
  marginTop?: ResponsiveSpacing;
  /** Margin right */
  marginRight?: ResponsiveSpacing;
  /** Margin bottom */
  marginBottom?: ResponsiveSpacing;
  /** Margin left */
  marginLeft?: ResponsiveSpacing;
  /** Horizontal margin (left and right) */
  marginX?: ResponsiveSpacing;
  /** Vertical margin (top and bottom) */
  marginY?: ResponsiveSpacing;
  /** Padding spacing */
  padding?: ResponsiveSpacing;
  /** Padding top */
  paddingTop?: ResponsiveSpacing;
  /** Padding right */
  paddingRight?: ResponsiveSpacing;
  /** Padding bottom */
  paddingBottom?: ResponsiveSpacing;
  /** Padding left */
  paddingLeft?: ResponsiveSpacing;
  /** Horizontal padding (left and right) */
  paddingX?: ResponsiveSpacing;
  /** Vertical padding (top and bottom) */
  paddingY?: ResponsiveSpacing;
}

/**
 * Visual styling props mixin
 * Provides consistent visual styling interface
 */
export interface VisualProps {
  /** Background color */
  background?: ColorWithIntensity;
  /** Text color */
  color?: ColorWithIntensity;
  /** Border configuration */
  border?: BorderVariant;
  /** Border radius */
  borderRadius?: BorderRadius;
  /** Box shadow */
  shadow?: ShadowVariant;
  /** Opacity level */
  opacity?: '0' | '5' | '10' | '20' | '25' | '30' | '40' | '50' | '60' | '70' | '75' | '80' | '90' | '95' | '100';
}

// =============================================================================
// RESPONSIVE DESIGN
// =============================================================================

/**
 * Breakpoint names for responsive design
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Responsive value type that can be a single value or breakpoint object
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// =============================================================================
// FORM COMPONENTS
// =============================================================================

/**
 * Form field states
 */
export type FieldState = 'default' | 'error' | 'success' | 'warning';

/**
 * Input types supported by form components
 */
export type InputType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' 
  | 'date' | 'time' | 'datetime-local' | 'month' | 'week';

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

/**
 * Button style variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

/**
 * Input style variants
 */
export type InputVariant = 'default' | 'outline' | 'filled' | 'underline';

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract component props from a React component
 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Polymorphic component props for components that can render as different elements
 */
export type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

/**
 * HTML element tag names for polymorphic components
 */
export type HTMLElementTag = keyof React.JSX.IntrinsicElements;