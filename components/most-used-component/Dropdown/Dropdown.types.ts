import * as React from 'react';
import type { ContainerProps } from '../../ui/Container/Container.types';

import type { ButtonProps } from '../../ui/Button/Button.types';

/**
 * Dropdown option interface
 */
export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
  divider?: boolean;
}

/**
 * Dropdown component props interface
 * Combines Button, Container, and Text for selection menus
 */
export interface DropdownProps {
  // Core props
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[], option: DropdownOption | DropdownOption[]) => void;
  
  // Trigger configuration
  trigger?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  
  // Selection behavior
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  
  // Dropdown behavior
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  
  // Positioning
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
  offset?: number;
  
  // Styling
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  
  // Search configuration
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filterOptions?: (options: DropdownOption[], query: string) => DropdownOption[];
  
  // Empty state
  emptyMessage?: string;
  renderEmpty?: () => React.ReactNode;
  
  // Custom renderers
  renderTrigger?: (props: {
    isOpen: boolean;
    selectedOptions: DropdownOption[];
    placeholder: string;
  }) => React.ReactNode;
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
  renderSelectedValue?: (selectedOptions: DropdownOption[]) => React.ReactNode;
  
  // Styling overrides
  triggerProps?: Partial<ButtonProps>;
  dropdownProps?: Partial<ContainerProps>;
  optionProps?: Partial<ButtonProps>;
  searchProps?: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // HTML attributes
  id?: string;
  name?: string;
  form?: string;
  required?: boolean;
  
  // Event handlers
  onFocus?: () => void;
  onBlur?: () => void;
}

export type DropdownRef = HTMLDivElement;