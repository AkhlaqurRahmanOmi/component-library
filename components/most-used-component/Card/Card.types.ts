import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Card component props interface
 * Combines Container, Text, and Button functionality for versatile card layouts
 */
export interface CardProps extends Omit<ContainerProps, 'children'> {
  // Card content
  children?: React.ReactNode;
  
  // Header section
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode;
  
  // Body section
  content?: React.ReactNode;
  description?: string;
  
  // Footer section
  footerContent?: React.ReactNode;
  
  // Action buttons
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
  };
  
  // Card variants
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  
  // Interactive states
  hoverable?: boolean;
  clickable?: boolean;
  onCardClick?: () => void;
  
  // Layout options
  orientation?: 'vertical' | 'horizontal';
  imagePosition?: 'top' | 'left' | 'right' | 'bottom';
  
  // Image/media
  image?: {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  };
  
  // Styling overrides
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  subtitleProps?: Partial<TextProps>;
  descriptionProps?: Partial<TextProps>;
}

export type CardRef = HTMLDivElement;