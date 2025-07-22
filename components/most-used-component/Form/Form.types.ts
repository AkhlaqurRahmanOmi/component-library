import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';
import type { InputProps } from '../../ui/Input/Input.types';

/**
 * Form field configuration
 */
export interface FormField {
  /** Field name/key */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type?: InputProps['type'];
  /** Field placeholder */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Field validation rules */
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
  /** Additional input props */
  inputProps?: Partial<InputProps>;
}

/**
 * Form validation errors
 */
export type FormErrors = Record<string, string>;

/**
 * Form values
 */
export type FormValues = Record<string, string>;

/**
 * Form submission handler
 */
export type FormSubmitHandler = (values: FormValues) => void | Promise<void>;

/**
 * Form component props interface
 * Combines Input, Button, and Text components with validation
 */
export interface FormProps extends Omit<ContainerProps, 'children' | 'onSubmit'> {
  /** Form fields configuration */
  fields: FormField[];
  /** Initial form values */
  initialValues?: FormValues;
  /** Form submission handler */
  onSubmit: FormSubmitHandler;
  
  /** Form title */
  title?: string;
  /** Form description */
  description?: string;
  /** Custom form content */
  children?: React.ReactNode;
  
  /** Submit button configuration */
  submitButton?: {
    label?: string;
  } & Partial<ButtonProps>;
  
  /** Reset button configuration */
  resetButton?: {
    label?: string;
    show?: boolean;
  } & Partial<ButtonProps>;
  
  /** Whether the form is in a loading state */
  loading?: boolean;
  /** Whether the form is disabled */
  disabled?: boolean;
  
  /** Validation mode */
  validationMode?: 'onSubmit' | 'onChange' | 'onBlur';
  
  /** Custom validation function */
  validate?: (values: FormValues) => FormErrors;
  
  /** Form layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  
  /** Custom styling for different form sections */
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  descriptionProps?: Partial<TextProps>;
  
  /** Form event handlers */
  onValuesChange?: (values: FormValues) => void;
  onValidationChange?: (errors: FormErrors) => void;
  onReset?: () => void;
  
  /** HTML form attributes */
  method?: 'get' | 'post';
  action?: string;
  encType?: string;
  target?: string;
  noValidate?: boolean;
}

/**
 * Form component ref type
 */
export type FormRef = HTMLFormElement;