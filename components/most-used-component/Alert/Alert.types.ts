import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Alert action interface
 */
export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Alert component props interface
 * Uses Container, Text, and Button for user feedback
 */
export interface AlertProps extends Omit<ContainerProps, 'children'> {
  // Alert content
  children?: React.ReactNode;
  title?: string;
  message?: string;
  
  // Alert type/severity
  variant?: 'info' | 'success' | 'warning' | 'error';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  
  // Alert behavior
  dismissible?: boolean;
  onDismiss?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number; // in milliseconds
  
  // Alert styling
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  bordered?: boolean;
  filled?: boolean;
  
  // Icon configuration
  icon?: React.ReactNode;
  showIcon?: boolean;
  
  // Actions
  actions?: AlertAction[];
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  
  // Layout options
  orientation?: 'horizontal' | 'vertical';
  
  // Animation
  animate?: boolean;
  slideDirection?: 'top' | 'bottom' | 'left' | 'right';
  
  // Styling overrides
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  messageProps?: Partial<TextProps>;
  iconProps?: Partial<ContainerProps>;
  
  // Accessibility
  role?: 'alert' | 'alertdialog' | 'status';
  ariaLive?: 'polite' | 'assertive' | 'off';
  ariaAtomic?: boolean;
  
  // Custom renderers
  renderIcon?: (variant: AlertProps['variant']) => React.ReactNode;
  renderActions?: (actions: AlertAction[]) => React.ReactNode;
}

export type AlertRef = HTMLDivElement;