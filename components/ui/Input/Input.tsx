import * as React from 'react';
import { buildInputClasses } from '../../utils/componentClassBuilders';
import { generateSpacingClasses } from '../../utils/classNames';
import { cn } from '../../utils/classNames';
import type {
  InputProps,
  InputLabelProps,
  InputHelperTextProps,
  InputWrapperProps
} from './Input.types';

/**
 * InputWrapper component for consistent spacing and layout
 */
const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  fullWidth,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  className,
  ...props
}) => {
  const classes = cn(
    'inline-block',
    fullWidth && 'w-full',
    margin && generateSpacingClasses(margin, 'margin'),
    marginTop && generateSpacingClasses(marginTop, 'margin', 'top'),
    marginRight && generateSpacingClasses(marginRight, 'margin', 'right'),
    marginBottom && generateSpacingClasses(marginBottom, 'margin', 'bottom'),
    marginLeft && generateSpacingClasses(marginLeft, 'margin', 'left'),
    marginX && generateSpacingClasses(marginX, 'margin', 'x'),
    marginY && generateSpacingClasses(marginY, 'margin', 'y'),
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * InputLabel component for accessible form labels
 */
const InputLabel: React.FC<InputLabelProps> = ({
  children,
  htmlFor,
  required,
  position = 'top',
  hidden,
  state = 'default',
  disabled,
  className,
  ...props
}) => {
  const classes = cn(
    'block text-sm font-medium transition-colors duration-200',
    // Position-specific styles
    position === 'top' && 'mb-1',
    position === 'left' && 'mr-3 self-center',
    position === 'floating' && 'absolute left-3 transition-all duration-200 pointer-events-none',
    // State-specific colors
    state === 'error' && 'text-red-700',
    state === 'success' && 'text-green-700',
    state === 'warning' && 'text-yellow-700',
    state === 'default' && 'text-gray-700',
    // Disabled state
    disabled && 'text-gray-400',
    // Hidden label (for screen readers only)
    hidden && 'sr-only',
    className
  );

  return (
    <label htmlFor={htmlFor} className={classes} {...props}>
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

/**
 * InputHelperText component for displaying helper text, errors, and success messages
 */
const InputHelperText: React.FC<InputHelperTextProps> = ({
  children,
  state = 'default',
  error,
  success,
  className,
  ...props
}) => {
  // Determine the actual state based on props
  const actualState = error ? 'error' : success ? 'success' : state;

  const classes = cn(
    'mt-1 text-sm transition-colors duration-200',
    actualState === 'error' && 'text-red-600',
    actualState === 'success' && 'text-green-600',
    actualState === 'warning' && 'text-yellow-600',
    actualState === 'default' && 'text-gray-600',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Input component with comprehensive styling and validation support
 * 
 * Features:
 * - Multiple input types support
 * - Validation states with error/success messaging
 * - Label positioning (top, left, floating)
 * - Accessibility compliance with proper ARIA attributes
 * - Comprehensive styling options through props
 * - Full TypeScript support
 */
export const Input: React.FC<InputProps> = ({
  // Core props
  type = 'text',
  value,
  onChange,
  placeholder,
  defaultValue,
  
  // Styling props
  size = 'base',
  variant = 'default',
  state: propState,
  
  // State props
  disabled = false,
  readonly = false,
  required = false,
  fullWidth = false,
  
  // Validation props
  error = false,
  errorMessage,
  helperText,
  successMessage,
  
  // Label props
  label,
  labelPosition = 'top',
  hideLabel = false,
  
  // Layout props
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  
  // Accessibility props
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
  
  // HTML attributes
  id,
  name,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  min,
  max,
  step,
  autoFocus,
  form,
  className,
  
  // Event handlers
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onInput,
  onChangeCapture,
  onSelect,
  onInvalid,
  
  ...props
}) => {
  // Generate unique ID if not provided
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const helperTextId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  
  // Determine the actual state
  const actualState = error ? 'error' : (successMessage ? 'success' : propState || 'default');
  
  // Build input classes
  const inputClasses = buildInputClasses({
    size,
    variant,
    state: actualState,
    fullWidth,
    disabled,
    ...(className && { className })
  });
  
  // Determine ARIA attributes
  const ariaDescribedByIds = [
    ariaDescribedBy,
    (helperText || successMessage) && helperTextId,
    (error && errorMessage) && errorId
  ].filter(Boolean).join(' ') || undefined;
  
  // Determine if floating label should be active
  const hasValue = value !== undefined ? value !== '' : false;
  const isFloatingActive = hasValue; // Simplified for SSR compatibility
  
  // Floating label classes
  const floatingLabelClasses = labelPosition === 'floating' ? cn(
    'absolute left-3 transition-all duration-200 pointer-events-none',
    isFloatingActive 
      ? '-top-2 text-xs bg-white px-1' 
      : 'top-1/2 -translate-y-1/2 text-base',
    actualState === 'error' && 'text-red-700',
    actualState === 'success' && 'text-green-700',
    actualState === 'warning' && 'text-yellow-700',
    actualState === 'default' && 'text-gray-700',
    disabled && 'text-gray-400'
  ) : undefined;
  
  const inputElement = (
    <input
      id={inputId}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={labelPosition === 'floating' ? undefined : placeholder}
      disabled={disabled}
      readOnly={readonly}
      required={required}
      name={name}
      autoComplete={autoComplete}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      min={min}
      max={max}
      step={step}
      autoFocus={autoFocus}
      form={form}
      className={inputClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy || (label && !hideLabel ? `${inputId}-label` : undefined)}
      aria-describedby={ariaDescribedByIds}
      aria-invalid={error ? true : undefined}
      aria-required={required}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onInput={onInput}
      onChangeCapture={onChangeCapture}
      onSelect={onSelect}
      onInvalid={onInvalid}
      {...props}
    />
  );
  
  const labelElement = label && (
    <InputLabel
      htmlFor={inputId}
      required={required}
      position={labelPosition}
      hidden={hideLabel}
      state={actualState}
      disabled={disabled}
      {...(labelPosition === 'floating' && floatingLabelClasses && { className: floatingLabelClasses })}
      id={`${inputId}-label`}
    >
      {label}
    </InputLabel>
  );
  
  const helperTextElement = (helperText || successMessage) && (
    <InputHelperText
      id={helperTextId}
      state={actualState}
      success={!!successMessage}
    >
      {successMessage || helperText}
    </InputHelperText>
  );
  
  const errorElement = error && errorMessage && (
    <InputHelperText
      id={errorId}
      error={true}
      role="alert"
      aria-live="polite"
    >
      {errorMessage}
    </InputHelperText>
  );
  
  // Helper function to create wrapper props
  const getWrapperProps = (): Partial<InputWrapperProps> => {
    const wrapperProps: Partial<InputWrapperProps> = { fullWidth };
    if (margin !== undefined) wrapperProps.margin = margin;
    if (marginTop !== undefined) wrapperProps.marginTop = marginTop;
    if (marginRight !== undefined) wrapperProps.marginRight = marginRight;
    if (marginBottom !== undefined) wrapperProps.marginBottom = marginBottom;
    if (marginLeft !== undefined) wrapperProps.marginLeft = marginLeft;
    if (marginX !== undefined) wrapperProps.marginX = marginX;
    if (marginY !== undefined) wrapperProps.marginY = marginY;
    return wrapperProps;
  };

  // Render based on label position
  if (labelPosition === 'left') {
    return (
      <InputWrapper {...getWrapperProps()}>
        <div className="flex items-start">
          {labelElement}
          <div className="flex-1">
            {inputElement}
            {helperTextElement}
            {errorElement}
          </div>
        </div>
      </InputWrapper>
    );
  }
  
  if (labelPosition === 'floating') {
    return (
      <InputWrapper {...getWrapperProps()}>
        <div className="relative">
          {inputElement}
          {labelElement}
        </div>
        {helperTextElement}
        {errorElement}
      </InputWrapper>
    );
  }
  
  // Default: top label position
  return (
    <InputWrapper {...getWrapperProps()}>
      {labelElement}
      {inputElement}
      {helperTextElement}
      {errorElement}
    </InputWrapper>
  );
};

// Set display name for debugging
Input.displayName = 'Input';

export default Input;