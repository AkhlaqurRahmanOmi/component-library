import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';
import type { TextProps } from '../../ui/Text/Text.types';
import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Navigation item interface
 */
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  active?: boolean;
  children?: NavigationItem[];
}

/**
 * Navigation component props interface
 * Uses Container, Button, and Text for menu systems
 */
export interface NavigationProps extends Omit<ContainerProps, 'children'> {
  // Navigation items
  items: NavigationItem[];
  
  // Navigation behavior
  activeItemId?: string;
  onItemClick?: (item: NavigationItem) => void;
  
  // Navigation layout
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'tabs' | 'sidebar' | 'breadcrumb';
  size?: 'sm' | 'md' | 'lg';
  
  // Navigation styling
  spacing?: 'tight' | 'normal' | 'loose';
  alignment?: 'start' | 'center' | 'end' | 'between' | 'around';
  
  // Brand/Logo section
  brand?: {
    logo?: React.ReactNode;
    title?: string;
    href?: string;
    onClick?: () => void;
  };
  
  // Mobile behavior
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  collapseBreakpoint?: 'sm' | 'md' | 'lg';
  
  // Dropdown behavior
  allowMultipleOpen?: boolean;
  closeOnItemClick?: boolean;
  
  // Styling overrides
  itemProps?: Partial<ButtonProps>;
  brandProps?: Partial<ContainerProps>;
  brandTitleProps?: Partial<TextProps>;
  dropdownProps?: Partial<ContainerProps>;
  
  // Custom renderers
  renderItem?: (item: NavigationItem, isActive: boolean) => React.ReactNode;
  renderBrand?: () => React.ReactNode;
  
  // Accessibility
  ariaLabel?: string;
  role?: string;
}

export type NavigationRef = HTMLDivElement;