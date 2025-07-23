"use client";

import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { cn } from '../../utils/classNames';
import type { FormProps, FormRef, FormValues, FormErrors, FormField } from './Form.types';

/**
 * Form component combining Input, Button, and Text components with validation
 * 
 * A comprehensive form component that handles form state, validation,
 * and submission with a flexible field configuration system.
 * 
 * @example
 * ```tsx
 * // Basic form with field configuration
 * <Form
 *   title="Contact Form"
 *   fields={[
 *     {
 *       name: 'name',
 *       label: 'Full Name',
 *       required: true,
 *       validation: { minLength: 2 }
 *     },
 *     {
 *       name: 'email',
 *       label: 'Email',
 *       type: 'email',
 *       required: true
 *     }
 *   ]}
 *   onSubmit={(values) => console.log(values)}
 * />
 * 
 * // Custom form with children
 * <Form
 *   title="Custom Form"
 *   onSubmit={handleSubmit}
 *   submitButton={{ label: "Save Changes" }}
 * >
 *   <Input name="username" label="Username" required />
 *   <Input name="password" label="Password" type="password" required />
 * </Form>
 * ```
 */
export const Form = React.forwardRef<FormRef, FormProps>(
  (
    {
      // Form configuration
      fields = [],
      children,
      
      // Form state
      values: controlledValues,
      errors: controlledErrors,
      defaultValues = {},
      
      // Form behavior
      onSubmit,
      onChange,
      onValidate,
      
      // Validation options
      validateOnChange = false,
      validateOnBlur = true,
      showErrorsOnSubmit = true,
      
      // Layout options
      layout = 'vertical',
      spacing = 'normal',
      
      // Header props
      title,
      subtitle,
      description,
      headerContent,
      
      // Footer props
      footerContent,
      submitButton = { label: 'Submit' },
      resetButton = false,
      customActions,
      
      // State props
      loading = false,
      disabled = false,
      
      // Styling overrides
      formProps,
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      subtitleProps,
      descriptionProps,
      fieldProps,
      
      // HTML form props
      className,
      ...htmlFormProps
    },
    ref
  ) => {
    // Internal form state
    const [internalValues, setInternalValues] = React.useState<FormValues>(defaultValues);
    const [internalErrors, setInternalErrors] = React.useState<FormErrors>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    // Use controlled or internal state
    const values = controlledValues ?? internalValues;
    const errors = controlledErrors ?? internalErrors;
    
    // Get spacing classes
    const getSpacingClass = () => {
      switch (spacing) {
        case 'tight':
          return 'space-y-3';
        case 'loose':
          return 'space-y-6';
        default:
          return 'space-y-4';
      }
    };
    
    // Validate a single field
    const validateField = React.useCallback((field: FormField, value: string): string | null => {
      const { validation, required } = field;
      
      // Required validation
      if (required && (!value || value.trim() === '')) {
        return `${field.label || field.name} is required`;
      }
      
      // Skip other validations if field is empty and not required
      if (!value || value.trim() === '') {
        return null;
      }
      
      if (validation) {
        // Pattern validation
        if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
          return `${field.label || field.name} format is invalid`;
        }
        
        // Length validations
        if (validation.minLength && value.length < validation.minLength) {
          return `${field.label || field.name} must be at least ${validation.minLength} characters`;
        }
        
        if (validation.maxLength && value.length > validation.maxLength) {
          return `${field.label || field.name} must be no more than ${validation.maxLength} characters`;
        }
        
        // Numeric validations
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if (validation.min !== undefined && numValue < validation.min) {
            return `${field.label || field.name} must be at least ${validation.min}`;
          }
          
          if (validation.max !== undefined && numValue > validation.max) {
            return `${field.label || field.name} must be no more than ${validation.max}`;
          }
        }
        
        // Custom validation
        if (validation.custom) {
          const customError = validation.custom(value);
          if (customError) {
            return customError;
          }
        }
      }
      
      return null;
    }, []);
    
    // Validate all fields
    const validateForm = React.useCallback((formValues: FormValues): FormErrors => {
      const newErrors: FormErrors = {};
      
      // Validate configured fields
      fields.forEach(field => {
        const error = validateField(field, formValues[field.name] || '');
        if (error) {
          newErrors[field.name] = error;
        }
      });
      
      // Custom validation
      if (onValidate) {
        const customErrors = onValidate(formValues);
        Object.assign(newErrors, customErrors);
      }
      
      return newErrors;
    }, [fields, validateField, onValidate]);
    
    // Handle field value change
    const handleFieldChange = React.useCallback((fieldName: string, value: string) => {
      const newValues = { ...values, [fieldName]: value };
      
      // Update internal state if not controlled
      if (controlledValues === undefined) {
        setInternalValues(newValues);
      }
      
      // Validate on change if enabled
      if (validateOnChange) {
        const field = fields.find(f => f.name === fieldName);
        if (field) {
          const error = validateField(field, value);
          const newErrors = { ...errors };
          if (error) {
            newErrors[fieldName] = error;
          } else {
            delete newErrors[fieldName];
          }
          
          if (controlledErrors === undefined) {
            setInternalErrors(newErrors);
          }
        }
      }
      
      // Call onChange callback
      onChange?.(newValues, fieldName);
    }, [values, errors, controlledValues, controlledErrors, validateOnChange, fields, validateField, onChange]);
    
    // Handle field blur
    const handleFieldBlur = React.useCallback((fieldName: string) => {
      setTouched(prev => ({ ...prev, [fieldName]: true }));
      
      // Validate on blur if enabled
      if (validateOnBlur) {
        const field = fields.find(f => f.name === fieldName);
        if (field) {
          const error = validateField(field, values[fieldName] || '');
          const newErrors = { ...errors };
          if (error) {
            newErrors[fieldName] = error;
          } else {
            delete newErrors[fieldName];
          }
          
          if (controlledErrors === undefined) {
            setInternalErrors(newErrors);
          }
        }
      }
    }, [validateOnBlur, fields, validateField, values, errors, controlledErrors]);
    
    // Handle form submission
    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      if (disabled || loading || isSubmitting) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Validate form
        const validationErrors = validateForm(values);
        
        if (showErrorsOnSubmit && Object.keys(validationErrors).length > 0) {
          if (controlledErrors === undefined) {
            setInternalErrors(validationErrors);
          }
          // Mark all fields as touched to show errors
          const allTouched = fields.reduce((acc, field) => {
            acc[field.name] = true;
            return acc;
          }, {} as Record<string, boolean>);
          setTouched(allTouched);
          return;
        }
        
        // Clear errors if validation passes
        if (controlledErrors === undefined) {
          setInternalErrors({});
        }
        
        // Call onSubmit
        if (onSubmit) {
          await onSubmit(values, event);
        }
      } finally {
        setIsSubmitting(false);
      }
    }, [disabled, loading, isSubmitting, validateForm, values, showErrorsOnSubmit, controlledErrors, fields, onSubmit]);
    
    // Handle form reset
    const handleReset = React.useCallback(() => {
      if (controlledValues === undefined) {
        setInternalValues(defaultValues);
      }
      if (controlledErrors === undefined) {
        setInternalErrors({});
      }
      setTouched({});
      
      if (resetButton && typeof resetButton === 'object' && resetButton.onClick) {
        resetButton.onClick();
      }
    }, [controlledValues, controlledErrors, defaultValues, resetButton]);
    
    // Render header section
    const renderHeader = () => {
      if (!title && !subtitle && !description && !headerContent) return null;
      
      return (
        <Container
          marginBottom="6"
          {...headerProps}
        >
          {headerContent || (
            <>
              {title && (
                <Text
                  tag="h2"
                  size="xl"
                  weight="semibold"
                  color="gray-900"
                  marginBottom={subtitle || description ? "2" : "0"}
                  {...titleProps}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  tag="p"
                  size="lg"
                  color="gray-700"
                  marginBottom={description ? "2" : "0"}
                  {...subtitleProps}
                >
                  {subtitle}
                </Text>
              )}
              {description && (
                <Text
                  color="gray-600"
                  {...descriptionProps}
                >
                  {description}
                </Text>
              )}
            </>
          )}
        </Container>
      );
    };
    
    // Render form fields
    const renderFields = () => {
      if (children) {
        return children;
      }
      
      return fields.map((field) => {
        const fieldError = (touched[field.name] || showErrorsOnSubmit) ? errors[field.name] : undefined;
        
        return (
          <Container key={field.name} {...fieldProps}>
            <Input
              name={field.name}
              label={field.label}
              type={field.type || 'text'}
              placeholder={field.placeholder ?? ''}
              required={field.required ?? false}
              value={values[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field.name)}
              error={!!fieldError}
              errorMessage={fieldError}
              disabled={disabled || loading}
              fullWidth
              {...field.inputProps}
            />
          </Container>
        );
      });
    };
    
    // Render footer section
    const renderFooter = () => {
      const hasActions = submitButton !== false || resetButton !== false || customActions;
      const hasFooterContent = footerContent || hasActions;
      
      if (!hasFooterContent) return null;
      
      return (
        <Container
          marginTop="6"
          {...footerProps}
        >
          {footerContent || (
            hasActions && (
              <Container
                display="flex"
                gap="3"
                justify={layout === 'horizontal' ? 'end' : 'start'}
                direction={layout === 'vertical' ? 'column' : 'row'}
              >
                {resetButton !== false && (
                  <Button
                    type="button"
                    variant={(typeof resetButton === 'object' && resetButton.variant) || 'outline'}
                    onClick={handleReset}
                    disabled={disabled || loading || isSubmitting || (typeof resetButton === 'object' && resetButton.disabled) || false}
                    fullWidth={layout === 'vertical'}
                  >
                    {(typeof resetButton === 'object' && resetButton.label) || 'Reset'}
                  </Button>
                )}
                {customActions}
                {submitButton !== false && (
                  <Button
                    type="submit"
                    variant={(typeof submitButton === 'object' && submitButton.variant) || 'primary'}
                    disabled={disabled || (typeof submitButton === 'object' && submitButton.disabled) || false}
                    loading={loading || isSubmitting || (typeof submitButton === 'object' && submitButton.loading) || false}
                    fullWidth={layout === 'vertical' || (typeof submitButton === 'object' && submitButton.fullWidth) || false}
                  >
                    {(typeof submitButton === 'object' && submitButton.label) || 'Submit'}
                  </Button>
                )}
              </Container>
            )
          )}
        </Container>
      );
    };
    
    return (
      <form
        ref={ref}
        className={cn(
          'w-full',
          className
        )}
        onSubmit={handleSubmit}
        {...htmlFormProps}
      >
        <Container {...formProps}>
          {renderHeader()}
          <Container
            className={getSpacingClass()}
            {...bodyProps}
          >
            {renderFields()}
          </Container>
          {renderFooter()}
        </Container>
      </form>
    );
  }
);

Form.displayName = 'Form';