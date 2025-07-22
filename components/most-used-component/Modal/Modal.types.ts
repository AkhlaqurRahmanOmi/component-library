import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Modal size variants
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal component props interface
 * Combines Container, Text, and Button functionality for modal dialogs
 */
export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal content */
  children?: React.ReactNode;
  
  /** Custom header content (overrides title if provided) */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  
  /** Modal size */
  size?: ModalSize;
  
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
  
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
  
  /** Whether the modal is in a loading state */
  loading?: boolean;
  
  /** Custom styling for different modal sections */
  overlayProps?: Partial<ContainerProps>;
  containerProps?: Partial<ContainerProps>;
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  descriptionProps?: Partial<TextProps>;
  
  /** Accessibility props */
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  
  /** Custom class names */
  className?: string;
  overlayClassName?: string;
  
  /** Portal target element */
  portalTarget?: Element | null;
  
  /** Animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * Modal component ref type
 */
export type ModalRef = HTMLDivElement;