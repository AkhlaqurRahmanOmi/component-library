import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import type { 
  FormProps, 
  FormFieldProps, 
  FormGroupProps, 
  FormActionsProps,
  FormDataState,
  FormValidationState,
  ValidationRule
} from './Form.types';

/**
 * Form Field component
 */
const FormField: React.FC<FormFieldProps> = ({
  config,
  value,
  error,
  touched,
  onChange,
  onBlur,
  isSubmitting,
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(config.name, event.target.value);
  };

  const handleBlur = () => {
    onBlur(config.name);
  };

  return (
    <Container className={`form-field ${className || ''}`} {...props}>
      <Input
        name={config.name}
        type={config.type}
        label={config.label}
        placeholder={config.placeholder}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        required={config.required}
        error={!!error}
        errorMessage={error}
        disabled={isSubmitting}
        fullWidth
        {...config.fieldProps}
      />
    </Container>
  );
};

/**
 * Form Group component
 */
const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  spacing = "4",
  className,
  ...props
}) => {
  return (
    <Container
      className={`form-group ${className || ''}`}
      marginBottom={spacing}
      {...props}
    >
      {title && (
        <Text
          tag="h3"
          size="lg"
          weight="medium"
          marginBottom="2"
          className="form-group-title"
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          tag="p"
          size="sm"
          color="gray-600"
          marginBottom="4"
          className="form-group-description"
        >
          {description}
        </Text>
      )}
      <Container gap={spacing}>
        {children}
      </Container>
    </Container>
  );
};

/**
 * Form Actions component
 */
const FormActions: React.FC<FormActionsProps> = ({
  submitText = "Submit",
  cancelText = "Cancel",
  resetText = "Reset",
  showCancel = false,
  showReset = false,
  onCancel,
  onReset,
  isSubmitting = false,
  isValid = true,
  align = "right",
  children,
  className,
  ...props
}) => {
  const justifyMap = {
    left: 'start',
    center: 'center',
    right: 'end',
    between: 'between'
  } as const;

  return (
    <Container
      className={`form-actions ${className || ''}`}
      display="flex"
      justify={justifyMap[align]}
      align="center"
      gap="3"
      marginTop="6"
      {...props}
    >
      {showReset && (
        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetText}
        </Button>
      )}
      {showCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelText}
        </Button>
      )}
      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        {submitText}
      </Button>
      {children}
    </Container>
  );
};

/**
 * Validation utilities
 */
const validateField = (value: any, rules: ValidationRule[], formData?: Record<string, any>): string => {
  for (const rule of rules) {
    const result = rule.validate(value, formData);
    if (result !== true) {
      return typeof result === 'string' ? result : rule.message || 'Invalid value';
    }
  }
  return '';
};

const validateForm = (
  values: Record<string, any>,
  fields: FormProps['fields'] = [],
  customValidator?: FormProps['onValidate']
): FormValidationState => {
  const errors: Record<string, string> = {};

  // Validate individual fields
  fields.forEach(field => {
    if (field.validation) {
      const error = validateField(values[field.name], field.validation, values);
      if (error) {
        errors[field.name] = error;
      }
    }
  });

  // Run custom validation
  if (customValidator) {
    const customErrors = customValidator(values);
    Object.assign(errors, customErrors);
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    touched: {}
  };
};

/**
 * Main Form component
 */
export const Form: React.FC<FormProps> & {
  Field: typeof FormField;
  Group: typeof FormGroup;
  Actions: typeof FormActions;
} = ({
  children,
  fields = [],
  initialValues = {},
  onSubmit,
  onChange,
  onValidate,
  onReset,
  actions,
  validateOnChange = true,
  validateOnBlur = true,
  showErrorsImmediately = false,
  fieldSpacing = "4",
  layout = "vertical",
  width = "full",
  maxWidth,
  padding,
  disabled = false,
  loading = false,
  className,
  method,
  action,
  encType,
  target,
  noValidate = true,
  ...props
}) => {
  // Form state
  const [formData, setFormData] = React.useState<FormDataState>(() => {
    const values = { ...initialValues };
    fields.forEach(field => {
      if (values[field.name] === undefined) {
        values[field.name] = field.defaultValue || '';
      }
    });

    return {
      values,
      validation: validateForm(values, fields, onValidate),
      isSubmitting: false,
      hasSubmitted: false
    };
  });

  // Update form data
  const updateFormData = (updates: Partial<FormDataState>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      onChange?.(newData);
      return newData;
    });
  };

  // Handle field change
  const handleFieldChange = (name: string, value: any) => {
    const newValues = { ...formData.values, [name]: value };
    const validation = validateOnChange 
      ? validateForm(newValues, fields, onValidate)
      : formData.validation;

    updateFormData({
      values: newValues,
      validation
    });
  };

  // Handle field blur
  const handleFieldBlur = (name: string) => {
    if (!validateOnBlur) return;

    const validation = validateForm(formData.values, fields, onValidate);
    const newTouched = { ...formData.validation.touched, [name]: true };

    updateFormData({
      validation: {
        ...validation,
        touched: newTouched
      }
    });
  };

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (disabled || loading || formData.isSubmitting) return;

    // Validate form
    const validation = validateForm(formData.values, fields, onValidate);
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);

    updateFormData({
      validation: {
        ...validation,
        touched: allTouched
      },
      isSubmitting: true,
      hasSubmitted: true
    });

    if (!validation.isValid) {
      updateFormData({ isSubmitting: false });
      return;
    }

    try {
      await onSubmit(formData.values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      updateFormData({ isSubmitting: false });
    }
  };

  // Handle form reset
  const handleReset = () => {
    const values = { ...initialValues };
    fields.forEach(field => {
      if (values[field.name] === undefined) {
        values[field.name] = field.defaultValue || '';
      }
    });

    updateFormData({
      values,
      validation: validateForm(values, fields, onValidate),
      isSubmitting: false,
      hasSubmitted: false
    });

    onReset?.();
  };

  // Get layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'space-y-4';
      case 'inline':
        return 'flex flex-wrap gap-4';
      default:
        return 'space-y-4';
    }
  };

  return (
    <Container
      as="form"
      className={`form ${getLayoutClasses()} ${className || ''}`}
      width={width}
      maxWidth={maxWidth}
      padding={padding}
      onSubmit={handleSubmit}
      method={method}
      action={action}
      encType={encType}
      target={target}
      noValidate={noValidate}
      {...props}
    >
      {/* Render configured fields */}
      {fields.map(field => {
        const shouldShowError = showErrorsImmediately || 
          formData.validation.touched[field.name] || 
          formData.hasSubmitted;

        return (
          <FormField
            key={field.name}
            config={field}
            value={formData.values[field.name]}
            error={shouldShowError ? formData.validation.errors[field.name] : undefined}
            touched={formData.validation.touched[field.name]}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            isSubmitting={formData.isSubmitting || loading}
          />
        );
      })}

      {/* Custom form content */}
      {children}

      {/* Form actions */}
      {actions && (
        <FormActions
          {...actions}
          onReset={handleReset}
          isSubmitting={formData.isSubmitting || loading}
          isValid={formData.validation.isValid}
        />
      )}
    </Container>
  );
};

// Attach sub-components
Form.Field = FormField;
Form.Group = FormGroup;
Form.Actions = FormActions;

Form.displayName = 'Form';