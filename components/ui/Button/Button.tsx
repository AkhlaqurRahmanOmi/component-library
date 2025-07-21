"use client";

import * as React from 'react';
import { buildButtonClasses } from '../../utils/componentClassBuilders';
import { cn } from '../../utils/classNames';
import type { ButtonProps } from './Button.types';

/**
 * Loading spinner component for button loading state
 */
const LoadingSpinner: React.FC<{ size?: 'sm' | 'base' | 'lg' }> = ({ size = 'base' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    base: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Button Component
 * 
 * A flexible button component with multiple variants, sizes, and states.
 * Supports icons, loading states, and comprehensive accessibility features.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * <Button variant="outline" leftIcon={<Icon />} loading>
 *   Loading...
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      // Core props
      type = 'button',
      children,
      className,
      
      // Style props
      variant = 'primary',
      size = 'base',
      
      // State props
      disabled = false,
      loading = false,
      active = false,
      
      // Icon props
      leftIcon,
      rightIcon,
      iconOnly = false,
      
      // Layout props
      fullWidth = false,
      
      // Spacing props
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      
      // Event handlers
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
      
      // Accessibility props
      ariaLabel,
      ariaPressed,
      ariaExpanded,
      ariaDescribedBy,
      ariaLabelledBy,
      role,
      tabIndex,
      
      // HTML attributes
      id,
      form,
      formNoValidate,
      formAction,
      formEncType,
      formMethod,
      formTarget,
      name,
      value,
      autoFocus,
      style,
      'data-testid': dataTestId,
      
      ...rest
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = disabled || loading;
    
    // Build button classes using the utility function
    const buttonClasses = buildButtonClasses({
      variant,
      size,
      fullWidth,
      disabled: isDisabled,
      loading,
      active,
      ...(margin && { margin }),
      ...(marginTop && { marginTop }),
      ...(marginRight && { marginRight }),
      ...(marginBottom && { marginBottom }),
      ...(marginLeft && { marginLeft }),
      ...(marginX && { marginX }),
      ...(marginY && { marginY }),
      ...(className && { className })
    });
    
    // Handle click events - prevent clicks when disabled or loading
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      },
      [isDisabled, onClick]
    );
    
    // Handle keyboard events for accessibility
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Prevent space/enter when disabled or loading
        if (isDisabled && (event.key === ' ' || event.key === 'Enter')) {
          event.preventDefault();
          return;
        }
        onKeyDown?.(event);
      },
      [isDisabled, onKeyDown]
    );
    
    // Determine spinner size based on button size
    const getSpinnerSize = (): 'sm' | 'base' | 'lg' => {
      if (size === 'xs' || size === 'sm') return 'sm';
      if (size === 'lg' || size === 'xl' || size === '2xl') return 'lg';
      return 'base';
    };
    
    // Render icon with proper spacing
    const renderIcon = (icon: React.ReactNode, position: 'left' | 'right') => {
      if (!icon) return null;
      
      const spacingClass = iconOnly 
        ? '' 
        : position === 'left' 
          ? 'mr-2' 
          : 'ml-2';
      
      return (
        <span className={cn('inline-flex items-center', spacingClass)}>
          {icon}
        </span>
      );
    };
    
    // Render button content
    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner size={getSpinnerSize()} />
            {!iconOnly && (
              <span className="ml-2">
                {children}
              </span>
            )}
          </>
        );
      }
      
      return (
        <>
          {renderIcon(leftIcon, 'left')}
          {!iconOnly && children}
          {renderIcon(rightIcon, 'right')}
        </>
      );
    };
    
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        role={role}
        tabIndex={tabIndex}
        id={id}
        form={form}
        formNoValidate={formNoValidate}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formTarget={formTarget}
        name={name}
        value={value}
        autoFocus={autoFocus}
        style={style}
        data-testid={dataTestId}
        {...rest}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';