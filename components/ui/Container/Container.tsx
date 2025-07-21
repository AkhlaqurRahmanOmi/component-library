import * as React from 'react';
import { buildContainerClasses } from '../../utils/componentClassBuilders';
import { cn } from '../../utils/classNames';
import type { ContainerProps, ContainerRef } from './Container.types';

/**
 * Container component with flexible display and layout options
 * 
 * A versatile layout component that supports flexbox, grid, and block layouts
 * with comprehensive styling options including responsive design support.
 * 
 * @example
 * ```tsx
 * // Basic flex container
 * <Container display="flex" justify="center" align="center" padding="4">
 *   <div>Centered content</div>
 * </Container>
 * 
 * // Grid layout with responsive design
 * <Container 
 *   display="grid" 
 *   gridCols="3" 
 *   gap="4"
 *   responsive={{
 *     sm: { gridCols: "1" },
 *     md: { gridCols: "2" }
 *   }}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Container>
 * 
 * // Styled container with background and border
 * <Container
 *   background="gray"
 *   border={{ width: "1", style: "solid", color: "gray" }}
 *   borderRadius="lg"
 *   shadow="md"
 *   padding="6"
 * >
 *   <p>Styled content</p>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<ContainerRef, ContainerProps>(
  (
    {
      children,
      as: Component = 'div',
      className,
      display = 'block',
      fullWidth,
      fullHeight,
      centered,
      gridCols,
      gridRows,
      gridColSpan,
      gridRowSpan,
      position,
      top,
      right,
      bottom,
      left,
      zIndex,
      overflow,
      overflowX,
      overflowY,
      opacity,
      responsive,
      // Accessibility props
      role,
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      tabIndex,
      ariaExpanded,
      ariaPressed,
      ariaSelected,
      ariaDisabled,
      ariaHidden,
      ariaLive,
      ariaAtomic,
      // Interactive props
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      // HTML attributes
      id,
      style,
      'data-testid': dataTestId,
      ...restProps
    },
    ref
  ) => {
    // Build base classes using the class builder
    const classBuilderProps: Record<string, unknown> = { display, className };
    
    // Only add properties that are defined
    if (restProps.direction) classBuilderProps.direction = restProps.direction;
    if (restProps.justify) classBuilderProps.justify = restProps.justify;
    if (restProps.align) classBuilderProps.align = restProps.align;
    if (restProps.wrap) classBuilderProps.wrap = restProps.wrap;
    if (restProps.gap) classBuilderProps.gap = restProps.gap;
    if (restProps.width) classBuilderProps.width = restProps.width;
    if (restProps.height) classBuilderProps.height = restProps.height;
    if (restProps.maxWidth) classBuilderProps.maxWidth = restProps.maxWidth;
    if (restProps.maxHeight) classBuilderProps.maxHeight = restProps.maxHeight;
    if (restProps.background) classBuilderProps.background = restProps.background;
    if (restProps.border) classBuilderProps.border = restProps.border;
    if (restProps.borderRadius) classBuilderProps.borderRadius = restProps.borderRadius;
    if (restProps.shadow) classBuilderProps.shadow = restProps.shadow;
    if (restProps.margin) classBuilderProps.margin = restProps.margin;
    if (restProps.marginTop) classBuilderProps.marginTop = restProps.marginTop;
    if (restProps.marginRight) classBuilderProps.marginRight = restProps.marginRight;
    if (restProps.marginBottom) classBuilderProps.marginBottom = restProps.marginBottom;
    if (restProps.marginLeft) classBuilderProps.marginLeft = restProps.marginLeft;
    if (restProps.marginX) classBuilderProps.marginX = restProps.marginX;
    if (restProps.marginY) classBuilderProps.marginY = restProps.marginY;
    if (restProps.padding) classBuilderProps.padding = restProps.padding;
    if (restProps.paddingTop) classBuilderProps.paddingTop = restProps.paddingTop;
    if (restProps.paddingRight) classBuilderProps.paddingRight = restProps.paddingRight;
    if (restProps.paddingBottom) classBuilderProps.paddingBottom = restProps.paddingBottom;
    if (restProps.paddingLeft) classBuilderProps.paddingLeft = restProps.paddingLeft;
    if (restProps.paddingX) classBuilderProps.paddingX = restProps.paddingX;
    if (restProps.paddingY) classBuilderProps.paddingY = restProps.paddingY;
    
    const baseClasses = buildContainerClasses(classBuilderProps);

    // Additional utility classes
    const utilityClasses: string[] = [];

    // Full width/height classes
    if (fullWidth) utilityClasses.push('w-full');
    if (fullHeight) utilityClasses.push('h-full');

    // Centering classes
    if (centered) {
      utilityClasses.push('mx-auto');
    }

    // Grid-specific classes
    if (display === 'grid' || display === 'inline-grid') {
      if (gridCols) utilityClasses.push(`grid-cols-${gridCols}`);
      if (gridRows) utilityClasses.push(`grid-rows-${gridRows}`);
      if (gridColSpan) utilityClasses.push(`col-span-${gridColSpan}`);
      if (gridRowSpan) utilityClasses.push(`row-span-${gridRowSpan}`);
    }

    // Position classes
    if (position) {
      utilityClasses.push(position);
      if (top) utilityClasses.push(`top-${top}`);
      if (right) utilityClasses.push(`right-${right}`);
      if (bottom) utilityClasses.push(`bottom-${bottom}`);
      if (left) utilityClasses.push(`left-${left}`);
    }

    // Z-index classes
    if (zIndex) utilityClasses.push(`z-${zIndex}`);

    // Overflow classes
    if (overflow) utilityClasses.push(`overflow-${overflow}`);
    if (overflowX) utilityClasses.push(`overflow-x-${overflowX}`);
    if (overflowY) utilityClasses.push(`overflow-y-${overflowY}`);

    // Opacity classes
    if (opacity) utilityClasses.push(`opacity-${opacity}`);

    // Responsive classes
    const responsiveClasses: string[] = [];
    if (responsive) {
      Object.entries(responsive).forEach(([breakpoint, props]) => {
        if (props.display) responsiveClasses.push(`${breakpoint}:${props.display}`);
        if (props.direction) responsiveClasses.push(`${breakpoint}:flex-${props.direction === 'column' ? 'col' : props.direction}`);
        if (props.justify) responsiveClasses.push(`${breakpoint}:justify-${props.justify}`);
        if (props.align) responsiveClasses.push(`${breakpoint}:items-${props.align}`);
        if (props.wrap) responsiveClasses.push(`${breakpoint}:flex-${props.wrap}`);
        if (props.gap) responsiveClasses.push(`${breakpoint}:gap-${props.gap}`);
        if (props.width) responsiveClasses.push(`${breakpoint}:w-${props.width}`);
        if (props.height) responsiveClasses.push(`${breakpoint}:h-${props.height}`);
        if (props.maxWidth) responsiveClasses.push(`${breakpoint}:max-w-${props.maxWidth}`);
        if (props.maxHeight) responsiveClasses.push(`${breakpoint}:max-h-${props.maxHeight}`);
        if (props.minWidth) responsiveClasses.push(`${breakpoint}:min-w-${props.minWidth}`);
        if (props.minHeight) responsiveClasses.push(`${breakpoint}:min-h-${props.minHeight}`);
      });
    }

    // Combine all classes
    const finalClasses = cn(
      baseClasses,
      utilityClasses.join(' '),
      responsiveClasses.join(' ')
    );

    // Build accessibility props
    const accessibilityProps = {
      role,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      'aria-expanded': ariaExpanded,
      'aria-pressed': ariaPressed,
      'aria-selected': ariaSelected,
      'aria-disabled': ariaDisabled,
      'aria-hidden': ariaHidden,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      tabIndex
    };

    // Build interaction props
    const interactionProps = {
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress
    };

    // Filter out undefined values from props objects
    const cleanAccessibilityProps = Object.fromEntries(
      Object.entries(accessibilityProps).filter(([, value]) => value !== undefined)
    );

    const cleanInteractionProps = Object.fromEntries(
      Object.entries(interactionProps).filter(([, value]) => value !== undefined)
    );

    return React.createElement(
      Component,
      {
        ref,
        id,
        className: finalClasses,
        style,
        'data-testid': dataTestId,
        ...cleanAccessibilityProps,
        ...cleanInteractionProps,
      },
      children
    );
  }
);

Container.displayName = 'Container';

export default Container;