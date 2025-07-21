import * as React from 'react';
import type {
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  LayoutProps,
  ButtonVariant,
  ComponentSize
} from '../../types/common';

/**
 * Button component props interface
 * Extends base component props with button-specific functionality
 */
export interface ButtonProps extends 
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  Pick<LayoutProps, 'margin' | 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft' | 'marginX' | 'marginY'> {
  
  // Core button props
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Button content - optional when iconOnly is true */
  children?: React.ReactNode;
  
  // Style props
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ComponentSize;
  
  // State props
  /** Disabled state */
  disabled?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Active/pressed state */
  active?: boolean;
  
  // Icon props
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Button contains only an icon (affects padding) */
  iconOnly?: boolean;
  
  // Layout props
  /** Make button full width */
  fullWidth?: boolean;
  
  // HTML form attributes
  /** Form ID this button belongs to */
  form?: string;
  /** Form validation bypass */
  formNoValidate?: boolean;
  /** Form action URL for submit buttons */
  formAction?: string;
  /** Form encoding type */
  formEncType?: string;
  /** Form method */
  formMethod?: 'get' | 'post';
  /** Form target */
  formTarget?: string;
  
  // Additional HTML attributes
  /** Button name attribute */
  name?: string;
  /** Button value attribute */
  value?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
}