"use client";

import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { NavigationProps, NavigationRef, NavigationItem } from './Navigation.types';

/**
 * Navigation component using Container, Button, and Text for menu systems
 * 
 * A flexible navigation component that supports horizontal and vertical layouts,
 * multiple variants, dropdown menus, and responsive behavior.
 * 
 * @example
 * ```tsx
 * // Basic horizontal navigation
 * <Navigation
 *   items={[
 *     { id: '1', label: 'Home', href: '/' },
 *     { id: '2', label: 'About', href: '/about' },
 *     { id: '3', label: 'Contact', href: '/contact' }
 *   ]}
 *   activeItemId="1"
 *   variant="tabs"
 * />
 * 
 * // Sidebar navigation with brand
 * <Navigation
 *   orientation="vertical"
 *   variant="sidebar"
 *   brand={{
 *     title: "My App",
 *     logo: <Logo />
 *   }}
 *   items={navigationItems}
 *   collapsible
 * />
 * ```
 */
export const Navigation = React.forwardRef<NavigationRef, NavigationProps>(
  (
    {
      // Core props
      items,
      activeItemId,
      onItemClick,
      
      // Layout props
      orientation = 'horizontal',
      variant = 'default',
      size = 'md',
      spacing = 'normal',
      alignment = 'start',
      
      // Brand props
      brand,
      
      // Mobile props
      collapsible = false,
      defaultCollapsed = false,
      collapseBreakpoint = 'md',
      
      // Dropdown props
      allowMultipleOpen = false,
      closeOnItemClick = true,
      
      // Styling overrides
      itemProps,
      brandProps,
      brandTitleProps,
      dropdownProps,
      
      // Custom renderers
      renderItem,
      renderBrand,
      
      // Accessibility props
      ariaLabel,
      role = 'navigation',
      
      // Container props
      className,
      ...containerProps
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [openDropdowns, setOpenDropdowns] = React.useState<Set<string>>(new Set());
    
    // Get variant-specific classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'pills':
          return 'bg-gray-100 rounded-lg p-1';
        case 'tabs':
          return 'border-b border-gray-200';
        case 'sidebar':
          return 'bg-white border-r border-gray-200 h-full';
        case 'breadcrumb':
          return 'text-sm text-gray-500';
        default:
          return '';
      }
    };
    
    // Get size-specific classes
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'text-sm';
        case 'lg':
          return 'text-lg';
        default:
          return 'text-base';
      }
    };
    
    // Get spacing classes
    const getSpacingClasses = () => {
      const spacingMap = {
        tight: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
        normal: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
        loose: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4'
      };
      return spacingMap[spacing];
    };
    
    // Get alignment classes
    const getAlignmentClasses = () => {
      if (orientation === 'vertical') return '';
      
      switch (alignment) {
        case 'center':
          return 'justify-center';
        case 'end':
          return 'justify-end';
        case 'between':
          return 'justify-between';
        case 'around':
          return 'justify-around';
        default:
          return 'justify-start';
      }
    };
    
    // Handle item click
    const handleItemClick = React.useCallback((item: NavigationItem) => {
      // Handle dropdown toggle
      if (item.children && item.children.length > 0) {
        setOpenDropdowns(prev => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            if (!allowMultipleOpen) {
              newSet.clear();
            }
            newSet.add(item.id);
          }
          return newSet;
        });
      }
      
      // Handle regular item click
      if (item.onClick) {
        item.onClick();
      }
      
      // Close dropdowns if configured
      if (closeOnItemClick && !item.children) {
        setOpenDropdowns(new Set());
      }
      
      // Call parent handler
      onItemClick?.(item);
    }, [allowMultipleOpen, closeOnItemClick, onItemClick]);
    
    // Get item button variant based on navigation variant
    const getItemVariant = (item: NavigationItem, isActive: boolean) => {
      if (item.disabled) return 'ghost';
      
      switch (variant) {
        case 'pills':
          return isActive ? 'primary' : 'ghost';
        case 'tabs':
          return 'ghost';
        case 'sidebar':
          return isActive ? 'primary' : 'ghost';
        default:
          return isActive ? 'primary' : 'ghost';
      }
    };
    
    // Map Navigation size to Button ComponentSize
    const getButtonSize = () => {
      switch (size) {
        case 'sm':
          return 'sm' as const;
        case 'lg':
          return 'lg' as const;
        default: // 'md'
          return 'base' as const;
      }
    };
    
    // Get item-specific classes
    const getItemClasses = (isActive: boolean) => {
      const baseClasses = [];
      
      if (variant === 'tabs') {
        baseClasses.push(
          'border-b-2 rounded-none',
          isActive ? 'border-blue-500 text-blue-600' : 'border-transparent hover:border-gray-300'
        );
      }
      
      if (variant === 'breadcrumb') {
        baseClasses.push('p-0 h-auto font-normal');
      }
      
      if (variant === 'sidebar') {
        baseClasses.push('w-full justify-start');
      }
      
      return baseClasses.join(' ');
    };
    
    // Render navigation item
    const renderNavigationItem = (item: NavigationItem, level = 0) => {
      const isActive = item.active || item.id === activeItemId;
      const hasChildren = item.children && item.children.length > 0;
      const isDropdownOpen = openDropdowns.has(item.id);
      
      if (renderItem) {
        return renderItem(item, isActive);
      }
      
      const itemElement = (
        <Button
          key={item.id}
          variant={getItemVariant(item, isActive)}
          size={getButtonSize()}
          disabled={item.disabled ?? false}
          onClick={() => handleItemClick(item)}
          className={cn(
            getItemClasses(isActive),
            level > 0 && 'ml-4',
            variant === 'breadcrumb' && 'hover:underline'
          )}
          leftIcon={item.icon}
          rightIcon={hasChildren ? (
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                isDropdownOpen && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : undefined}
          {...itemProps}
        >
          <span className="flex items-center gap-2">
            {item.label}
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </span>
        </Button>
      );
      
      // Handle breadcrumb separator
      if (variant === 'breadcrumb' && level === 0) {
        return (
          <React.Fragment key={item.id}>
            {itemElement}
            <Text className="mx-2 text-gray-400">/</Text>
          </React.Fragment>
        );
      }
      
      // Handle dropdown children
      if (hasChildren) {
        return (
          <div key={item.id} className="relative">
            {itemElement}
            {isDropdownOpen && (
              <Container
                className={cn(
                  'absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10',
                  orientation === 'vertical' && 'relative top-0 mt-2 shadow-none border-0 bg-transparent'
                )}
                padding={orientation === 'vertical' ? '0' : '2'}
                {...dropdownProps}
              >
                <div className={cn(
                  orientation === 'vertical' ? 'space-y-1' : 'space-y-1 min-w-[12rem]'
                )}>
                  {item.children?.map(child => renderNavigationItem(child, level + 1))}
                </div>
              </Container>
            )}
          </div>
        );
      }
      
      return itemElement;
    };
    
    // Render brand section
    const renderBrandSection = () => {
      if (!brand && !renderBrand) return null;
      
      if (renderBrand) {
        return renderBrand();
      }
      
      const brandContent = (
        <Container
          display="flex"
          align="center"
          gap="3"
          padding="0"
          {...brandProps}
        >
          {brand!.logo}
          {brand!.title && (
            <Text
              tag="span"
              size="lg"
              weight="semibold"
              {...brandTitleProps}
            >
              {brand!.title}
            </Text>
          )}
        </Container>
      );
      
      if (brand!.href || brand!.onClick) {
        return (
          <Button
            variant="ghost"
            onClick={brand!.onClick || (() => {})}
            className="p-0 h-auto hover:bg-transparent"
            disabled={false}
          >
            {brandContent}
          </Button>
        );
      }
      
      return brandContent;
    };
    
    // Render mobile toggle button
    const renderMobileToggle = () => {
      if (!collapsible) return null;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'md:hidden',
            collapseBreakpoint === 'sm' && 'sm:hidden',
            collapseBreakpoint === 'lg' && 'lg:hidden'
          )}
          ariaLabel="Toggle navigation"
          disabled={false}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </Button>
      );
    };
    
    // Main navigation content
    const navigationContent = (
      <Container
        display="flex"
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        className={cn(
          getSpacingClasses(),
          orientation === 'horizontal' && getAlignmentClasses(),
          getSizeClasses()
        )}
        padding="0"
      >
        {items.map(item => renderNavigationItem(item))}
      </Container>
    );
    
    return (
      <Container
        ref={ref}
        as="nav"
        className={cn(
          getVariantClasses(),
          orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col',
          collapsible && isCollapsed && 'hidden md:flex',
          className
        )}
        role={role}
        aria-label={ariaLabel}
        {...containerProps}
      >
        {/* Brand and mobile toggle */}
        {(brand || renderBrand || collapsible) && (
          <Container
            display="flex"
            justify="between"
            align="center"
            marginBottom={orientation === 'vertical' ? '4' : '0'}
            marginRight={orientation === 'horizontal' ? '6' : '0'}
            padding="0"
          >
            {renderBrandSection()}
            {renderMobileToggle()}
          </Container>
        )}
        
        {/* Navigation items */}
        {(!collapsible || !isCollapsed) && navigationContent}
      </Container>
    );
  }
);

Navigation.displayName = 'Navigation';