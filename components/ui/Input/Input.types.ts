import * as React from 'react';
import type {
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  LayoutProps,
  ComponentSize,
  InputVariant,
  FieldState,
  InputType,
  ResponsiveSpacing
} from '../../types/common';

/**
 * Label positioning options for the Input component
 */
export type LabelPosition = 'top' | 'left' | 'floating';

/**
 * Props for the Input component
 * Supports multiple input types, validation states, and comprehensive styling options
 */
export interface InputProps extends 
  BaseComponentProps,
  AccessibilityProps,
  Omit<InteractiveProps, 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave'>,
  LayoutProps {
  
  // Core input props
  /** Input type */
  type?: InputType;
  /** Input value */
  value?: string;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Default value for uncontrolled inputs */
  defaultValue?: string;
  
  // Styling props
  /** Component size variant */
  size?: ComponentSize;
  /** Visual style variant */
  variant?: InputVariant;
  /** Current field state */
  state?: FieldState;
  
  // State props
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  
  // Validation props
  /** Whether the input has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Success message to display */
  successMessage?: string;
  
  // Label props
  /** Label text */
  label?: string;
  /** Label positioning */
  labelPosition?: LabelPosition;
  /** Whether to hide the label visually (but keep it for screen readers) */
  hideLabel?: boolean;
  
  // HTML input attributes
  /** Input name attribute */
  name?: string;
  /** Autocomplete attribute */
  autoComplete?: string;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length */
  minLength?: number;
  /** Pattern for validation */
  pattern?: string;
  /** Minimum value (for number inputs) */
  min?: number;
  /** Maximum value (for number inputs) */
  max?: number;
  /** Step value (for number inputs) */
  step?: number;
  /** Whether to autofocus the input */
  autoFocus?: boolean;
  /** Form attribute */
  form?: string;
  
  // Event handlers specific to inputs
  /** Input event handler */
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  /** Change event handler (alternative to onChange) */
  onChangeCapture?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Select event handler */
  onSelect?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Invalid event handler */
  onInvalid?: (event: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * Props for the InputLabel component
 */
export interface InputLabelProps extends BaseComponentProps {
  /** Label text */
  children: React.ReactNode;
  /** Associated input ID */
  htmlFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Label position */
  position?: LabelPosition;
  /** Whether the label should be hidden visually */
  hidden?: boolean;
  /** Current field state for styling */
  state?: FieldState;
  /** Whether the input is disabled */
  disabled?: boolean;
}

/**
 * Props for the InputHelperText component
 */
export interface InputHelperTextProps extends BaseComponentProps {
  /** Helper text content */
  children: React.ReactNode;
  /** Current field state for styling */
  state?: FieldState;
  /** Whether this is an error message */
  error?: boolean;
  /** Whether this is a success message */
  success?: boolean;
  /** ARIA role attribute */
  role?: string;
  /** ARIA live region attribute */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Props for the InputWrapper component
 */
export interface InputWrapperProps extends BaseComponentProps {
  /** Child components */
  children: React.ReactNode;
  /** Whether the input takes full width */
  fullWidth?: boolean;
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
  /** Horizontal margin */
  marginX?: ResponsiveSpacing;
  /** Vertical margin */
  marginY?: ResponsiveSpacing;
}