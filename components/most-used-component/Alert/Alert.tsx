"use client";

import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { AlertProps, AlertRef } from './Alert.types';

/**
 * Default icons for different alert variants
 */
const DefaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
};

/**
 * Alert/Notification component using Container, Text, and Button for user feedback
 * 
 * A versatile alert component that provides user feedback with different severity levels,
 * customizable actions, and various styling options.
 * 
 * @example
 * ```tsx
 * // Basic success alert
 * <Alert
 *   variant="success"
 *   title="Success!"
 *   message="Your changes have been saved successfully."
 *   dismissible
 *   onDismiss={() => setShowAlert(false)}
 * />
 * 
 * // Error alert with actions
 * <Alert
 *   variant="error"
 *   title="Error occurred"
 *   message="Failed to save your changes. Please try again."
 *   primaryAction={{
 *     label: "Retry",
 *     onClick: handleRetry
 *   }}
 *   secondaryAction={{
 *     label: "Cancel",
 *     onClick: handleCancel
 *   }}
 * />
 * ```
 */
export const Alert = React.forwardRef<AlertRef, AlertProps>(
  (
    {
      // Content props
      children,
      title,
      message,
      
      // Variant props
      variant = 'info',
      severity = 'medium',
      
      // Behavior props
      dismissible = false,
      onDismiss,
      autoClose = false,
      autoCloseDelay = 5000,
      
      // Styling props
      size = 'md',
      rounded = true,
      bordered = true,
      filled = false,
      
      // Icon props
      icon,
      showIcon = true,
      
      // Action props
      actions,
      primaryAction,
      secondaryAction,
      
      // Layout props
      orientation = 'horizontal',
      
      // Animation props
      animate = true,
      slideDirection = 'top',
      
      // Override props
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      messageProps,
      iconProps,
      
      // Accessibility props
      role = 'alert',
      ariaLive = 'polite',
      ariaAtomic = true,
      
      // Custom renderers
      renderIcon,
      renderActions,
      
      // Container props
      className,
      ...containerProps
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    // Auto close functionality
    React.useEffect(() => {
      if (autoClose && autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    }, [autoClose, autoCloseDelay]);
    
    // Get variant-specific classes
    const getVariantClasses = () => {
      const baseClasses = [];
      
      if (filled) {
        switch (variant) {
          case 'info':
            baseClasses.push('bg-blue-500 text-white');
            break;
          case 'success':
            baseClasses.push('bg-green-500 text-white');
            break;
          case 'warning':
            baseClasses.push('bg-yellow-500 text-white');
            break;
          case 'error':
            baseClasses.push('bg-red-500 text-white');
            break;
        }
      } else {
        switch (variant) {
          case 'info':
            baseClasses.push('bg-blue-50 text-blue-800 border-blue-200');
            break;
          case 'success':
            baseClasses.push('bg-green-50 text-green-800 border-green-200');
            break;
          case 'warning':
            baseClasses.push('bg-yellow-50 text-yellow-800 border-yellow-200');
            break;
          case 'error':
            baseClasses.push('bg-red-50 text-red-800 border-red-200');
            break;
        }
      }
      
      return baseClasses.join(' ');
    };
    
    // Get size-specific classes
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'p-3 text-sm';
        case 'lg':
          return 'p-6 text-lg';
        default:
          return 'p-4 text-base';
      }
    };
    
    // Get animation classes
    const getAnimationClasses = () => {
      if (!animate) return '';
      
      const baseAnimation = 'transition-all duration-300 ease-in-out';
      
      if (!isVisible) {
        switch (slideDirection) {
          case 'top':
            return `${baseAnimation} -translate-y-full opacity-0`;
          case 'bottom':
            return `${baseAnimation} translate-y-full opacity-0`;
          case 'left':
            return `${baseAnimation} -translate-x-full opacity-0`;
          case 'right':
            return `${baseAnimation} translate-x-full opacity-0`;
          default:
            return `${baseAnimation} opacity-0`;
        }
      }
      
      return `${baseAnimation} translate-x-0 translate-y-0 opacity-100`;
    };
    
    // Handle dismiss
    const handleDismiss = React.useCallback(() => {
      if (animate) {
        setIsAnimating(true);
        setIsVisible(false);
        
        // Wait for animation to complete before calling onDismiss
        setTimeout(() => {
          onDismiss?.();
          setIsAnimating(false);
        }, 300);
      } else {
        onDismiss?.();
      }
    }, [animate, onDismiss]);
    
    // Render icon
    const renderAlertIcon = () => {
      if (!showIcon) return null;
      
      if (renderIcon) {
        return renderIcon(variant);
      }
      
      const iconElement = icon || DefaultIcons[variant];
      
      return (
        <Container
          className={cn(
            'flex-shrink-0',
            filled ? 'text-white' : `text-${variant === 'warning' ? 'yellow' : variant}-500`
          )}
          {...iconProps}
        >
          {iconElement}
        </Container>
      );
    };
    
    // Render dismiss button
    const renderDismissButton = () => {
      if (!dismissible) return null;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10',
            filled ? 'text-white' : `text-${variant}-600`
          )}
          ariaLabel="Dismiss alert"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      );
    };
    
    // Render header section
    const renderHeader = () => {
      if (!title) return null;
      
      return (
        <Container
          display="flex"
          justify="between"
          align="start"
          marginBottom={message || children ? "2" : "0"}
          padding="0"
          {...headerProps}
        >
          <Text
            tag="h4"
            weight="semibold"
            className={filled ? 'text-white' : ''}
            {...titleProps}
          >
            {title}
          </Text>
          {dismissible && orientation === 'horizontal' && renderDismissButton()}
        </Container>
      );
    };
    
    // Render body section
    const renderBody = () => {
      const hasContent = message || children;
      if (!hasContent) return null;
      
      return (
        <Container
          padding="0"
          {...bodyProps}
        >
          {children || (
            message && (
              <Text
                className={filled ? 'text-white opacity-90' : ''}
                {...messageProps}
              >
                {message}
              </Text>
            )
          )}
        </Container>
      );
    };
    
    // Render footer/actions section
    const renderFooter = () => {
      const allActions = [
        ...(actions || []),
        ...(primaryAction ? [primaryAction] : []),
        ...(secondaryAction ? [secondaryAction] : [])
      ];
      
      if (allActions.length === 0) return null;
      
      if (renderActions) {
        return renderActions(allActions);
      }
      
      return (
        <Container
          display="flex"
          gap="2"
          marginTop="3"
          padding="0"
          {...footerProps}
        >
          {allActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || (filled ? 'outline' : 'primary')}
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled ?? false}
              loading={action.loading ?? false}
              className={filled ? 'border-white text-white hover:bg-white hover:text-gray-900' : ''}
            >
              {action.label}
            </Button>
          ))}
        </Container>
      );
    };
    
    // Don't render if dismissed and not animating
    if (!isVisible && !isAnimating) {
      return null;
    }
    
    return (
      <Container
        ref={ref}
        className={cn(
          'relative',
          getVariantClasses(),
          getSizeClasses(),
          getAnimationClasses(),
          rounded && 'rounded-lg',
          bordered && 'border',
          className
        )}
        role={role}
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
        {...containerProps}
      >
        <Container
          display="flex"
          gap="3"
          align={orientation === 'horizontal' ? 'start' : 'center'}
          direction={orientation === 'vertical' ? 'column' : 'row'}
          padding="0"
        >
          {renderAlertIcon()}
          
          <Container className="flex-1 min-w-0" padding="0">
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
          </Container>
          
          {dismissible && orientation === 'vertical' && renderDismissButton()}
        </Container>
      </Container>
    );
  }
);

Alert.displayName = 'Alert';