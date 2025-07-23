import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';
import type { InputProps } from '../../ui/Input/Input.types';

/**
 * Form field configuration interface
 */
export interface FormField {
  name: string;
  label?: string;
  type?: InputProps['type'];
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: string) => string | null; // Returns error message or null
  };
  inputProps?: Partial<InputProps>;
}

/**
 * Form validation errors interface
 */
export interface FormErrors {
  [fieldName: string]: string;
}

/**
 * Form values interface
 */
export interface FormValues {
  [fieldName: string]: string;
}

/**
 * Form component props interface
 * Combines Input, Button, and Text components with validation
 */
export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
  // Form configuration
  fields?: FormField[];
  children?: React.ReactNode;
  
  // Form state
  values?: FormValues;
  errors?: FormErrors;
  defaultValues?: FormValues;
  
  // Form behavior
  onSubmit?: (values: FormValues, event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onChange?: (values: FormValues, changedField: string) => void;
  onValidate?: (values: FormValues) => FormErrors;
  
  // Validation options
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  showErrorsOnSubmit?: boolean;
  
  // Form layout
  layout?: 'vertical' | 'horizontal' | 'inline';
  spacing?: 'tight' | 'normal' | 'loose';
  
  // Header section
  title?: string;
  subtitle?: string;
  description?: string;
  headerContent?: React.ReactNode;
  
  // Footer section
  footerContent?: React.ReactNode;
  
  // Action buttons
  submitButton?: {
    label?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
  } | false;
  resetButton?: {
    label?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    onClick?: () => void;
  } | false;
  customActions?: React.ReactNode;
  
  // Form state indicators
  loading?: boolean;
  disabled?: boolean;
  
  // Styling overrides
  formProps?: Partial<ContainerProps>;
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  subtitleProps?: Partial<TextProps>;
  descriptionProps?: Partial<TextProps>;
  fieldProps?: Partial<ContainerProps>;
}

export type FormRef = HTMLFormElement;