import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Modal component props interface
 * Combines Container, Text, and Button functionality for modal dialogs
 */
export interface ModalProps {
  // Core modal props
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  
  // Header section
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode;
  showCloseButton?: boolean;
  
  // Footer section
  footerContent?: React.ReactNode;
  
  // Action buttons
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    loading?: boolean;
  };
  
  // Modal behavior
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  
  // Modal sizing
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  maxWidth?: string;
  maxHeight?: string;
  
  // Modal positioning
  centered?: boolean;
  
  // Styling props
  overlayClassName?: string;
  modalClassName?: string;
  
  // Animation props
  animationDuration?: number;
  
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  role?: string;
  
  // Styling overrides
  overlayProps?: Partial<ContainerProps>;
  modalProps?: Partial<ContainerProps>;
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  subtitleProps?: Partial<TextProps>;
}

export type ModalRef = HTMLDivElement;