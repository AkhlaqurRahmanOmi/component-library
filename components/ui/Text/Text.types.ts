import * as React from 'react';
import {
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  LayoutProps,
  TextSize,
  FontWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  LetterSpacing,
  LineHeight,
  ColorWithIntensity,
  DisplayVariant,
} from '../../types/common';

/**
 * HTML tag types that the Text component can render as
 */
export type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'label' | 'legend' | 'button';

/**
 * Text component props interface
 * Extends base component props with typography-specific options
 */
export interface TextProps extends 
  BaseComponentProps, 
  AccessibilityProps, 
  InteractiveProps, 
  LayoutProps {
  
  // Core props
  /** HTML tag to render as */
  tag?: TextTag;
  /** Text content */
  children: React.ReactNode;
  
  // Typography props
  /** Text size variant */
  size?: TextSize;
  /** Font weight variant */
  weight?: FontWeight;
  /** Text color */
  color?: ColorWithIntensity;
  /** Text alignment */
  align?: TextAlign;
  /** Text decoration */
  decoration?: TextDecoration;
  /** Text transform */
  transform?: TextTransform;
  /** Letter spacing */
  spacing?: LetterSpacing;
  /** Line height */
  lineHeight?: LineHeight;
  
  // Layout props
  /** Display type */
  display?: DisplayVariant;
  /** Whether text should truncate with ellipsis */
  truncate?: boolean;
  /** Whether text should wrap */
  wrap?: boolean | 'nowrap' | 'wrap' | 'balance';
  /** Whether text should break words */
  wordBreak?: 'normal' | 'words' | 'all' | 'keep';
  
  // Semantic props
  /** Whether this text represents an error message */
  error?: boolean;
  /** Whether this text represents a success message */
  success?: boolean;
  /** Whether this text represents a warning message */
  warning?: boolean;
  /** Whether this text represents informational content */
  info?: boolean;
  
  // HTML attributes that might be commonly used
  /** Title attribute for tooltips */
  title?: string;
  /** Language attribute */
  lang?: string;
  /** Direction attribute for RTL support */
  dir?: 'ltr' | 'rtl' | 'auto';
}

/**
 * Text component ref type - union of all possible HTML elements
 */
export type TextRef = 
  | HTMLParagraphElement 
  | HTMLHeadingElement 
  | HTMLSpanElement 
  | HTMLDivElement 
  | HTMLLabelElement 
  | HTMLLegendElement;