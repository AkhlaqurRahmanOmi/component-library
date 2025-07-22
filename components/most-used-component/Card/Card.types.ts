import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Card component props interface
 * Combines Container, Text, and Button functionality for card layouts
 */
export interface CardProps extends Omit<ContainerProps, 'children'> {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card description/content */
  description?: string;
  /** Custom content to render in the card body */
  children?: React.ReactNode;
  
  /** Header content (overrides title/subtitle if provided) */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  
  /** Image source for card image */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Image position */
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  
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
  
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  
  /** Whether the card is clickable */
  clickable?: boolean;
  /** Click handler for the entire card */
  onCardClick?: () => void;
  
  /** Whether the card is in a loading state */
  loading?: boolean;
  
  /** Custom styling for different card sections */
  headerProps?: Partial<ContainerProps>;
  bodyProps?: Partial<ContainerProps>;
  footerProps?: Partial<ContainerProps>;
  titleProps?: Partial<TextProps>;
  subtitleProps?: Partial<TextProps>;
  descriptionProps?: Partial<TextProps>;
}

/**
 * Card component ref type
 */
export type CardRef = HTMLDivElement;