import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { CardProps, CardRef } from './Card.types';

/**
 * Card component combining Container, Text, and Button components
 * 
 * A versatile card component that provides a consistent layout structure
 * with header, body, and footer sections. Supports various configurations
 * including images, actions, and different visual variants.
 * 
 * @example
 * ```tsx
 * // Basic card with title and content
 * <Card
 *   title="Card Title"
 *   description="This is a description of the card content."
 *   primaryAction={{
 *     label: "Learn More",
 *     onClick: () => console.log("Primary action clicked")
 *   }}
 * />
 * 
 * // Card with image and custom content
 * <Card
 *   variant="elevated"
 *   image={{
 *     src: "/image.jpg",
 *     alt: "Card image",
 *     aspectRatio: "video"
 *   }}
 *   title="Featured Article"
 *   subtitle="Technology"
 *   hoverable
 * >
 *   <Text>Custom content goes here...</Text>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<CardRef, CardProps>(
  (
    {
      // Content props
      children,
      title,
      subtitle,
      headerContent,
      content,
      description,
      footerContent,
      
      // Action props
      primaryAction,
      secondaryAction,
      
      // Variant and interaction props
      variant = 'default',
      hoverable = false,
      clickable = false,
      onCardClick,
      
      // Layout props
      orientation = 'vertical',
      imagePosition = 'top',
      image,
      
      // Styling override props
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      subtitleProps,
      descriptionProps,
      
      // Container props
      className,
      padding = '6',
      borderRadius = 'lg',
      ...containerProps
    },
    ref
  ) => {
    // Build card variant classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'border border-gray-200 bg-white';
        case 'elevated':
          return 'bg-white shadow-lg border border-gray-100';
        case 'filled':
          return 'bg-gray-50 border border-gray-200';
        default:
          return 'bg-white border border-gray-200';
      }
    };
    
    // Build interaction classes
    const getInteractionClasses = () => {
      const classes = [];
      if (hoverable) {
        classes.push('transition-all duration-200 hover:shadow-md hover:-translate-y-1');
      }
      if (clickable || onCardClick) {
        classes.push('cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2');
      }
      return classes.join(' ');
    };
    
    // Build image aspect ratio classes
    const getImageAspectRatio = () => {
      if (!image?.aspectRatio) return 'aspect-video';
      
      switch (image.aspectRatio) {
        case 'square':
          return 'aspect-square';
        case 'video':
          return 'aspect-video';
        case 'wide':
          return 'aspect-[21/9]';
        case 'tall':
          return 'aspect-[3/4]';
        default:
          return 'aspect-video';
      }
    };
    
    // Handle card click
    const handleCardClick = React.useCallback(
      (event: React.MouseEvent) => {
        if (onCardClick && (clickable || hoverable)) {
          onCardClick();
        }
        containerProps.onClick?.(event);
      },
      [onCardClick, clickable, hoverable, containerProps]
    );
    
    // Handle keyboard interaction
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && onCardClick) {
          event.preventDefault();
          onCardClick();
        }
        containerProps.onKeyDown?.(event);
      },
      [onCardClick, containerProps]
    );
    
    // Render image component
    const renderImage = () => {
      if (!image) return null;
      
      return (
        <div className={cn('overflow-hidden', borderRadius && `rounded-t-${borderRadius}`)}>
          <img
            src={image.src}
            alt={image.alt}
            className={cn(
              'w-full h-full object-cover',
              getImageAspectRatio()
            )}
          />
        </div>
      );
    };
    
    // Render header section
    const renderHeader = () => {
      if (!title && !subtitle && !headerContent) return null;
      
      return (
        <Container
          padding="0"
          marginBottom="4"
          {...headerProps}
        >
          {headerContent || (
            <>
              {title && (
                <Text
                  tag="h3"
                  size="lg"
                  weight="semibold"
                  color="gray-900"
                  marginBottom={subtitle ? "1" : "0"}
                  {...titleProps}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  tag="p"
                  size="sm"
                  color="gray-600"
                  {...subtitleProps}
                >
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </Container>
      );
    };
    
    // Render body section
    const renderBody = () => {
      const hasBodyContent = children || content || description;
      if (!hasBodyContent) return null;
      
      return (
        <Container
          padding="0"
          marginBottom="4"
          {...bodyProps}
        >
          {children || content || (
            description && (
              <Text
                color="gray-700"
                lineHeight="relaxed"
                {...descriptionProps}
              >
                {description}
              </Text>
            )
          )}
        </Container>
      );
    };
    
    // Render footer section
    const renderFooter = () => {
      const hasActions = primaryAction || secondaryAction;
      const hasFooterContent = footerContent || hasActions;
      
      if (!hasFooterContent) return null;
      
      return (
        <Container
          padding="0"
          {...footerProps}
        >
          {footerContent || (
            hasActions && (
              <Container
                display="flex"
                gap="3"
                justify="end"
                padding="0"
              >
                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant || 'outline'}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled ?? false}
                    loading={secondaryAction.loading ?? false}
                    ariaLabel={secondaryAction.ariaLabel ?? secondaryAction.label}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    variant={primaryAction.variant || 'primary'}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled ?? false}
                    loading={primaryAction.loading ?? false}
                    ariaLabel={primaryAction.ariaLabel ?? primaryAction.label}
                  >
                    {primaryAction.label}
                  </Button>
                )}
              </Container>
            )
          )}
        </Container>
      );
    };
    
    // Render card content based on orientation and image position
    const renderCardContent = () => {
      const header = renderHeader();
      const body = renderBody();
      const footer = renderFooter();
      const imageElement = renderImage();
      
      if (orientation === 'horizontal' && image) {
        return (
          <Container display="flex" padding="0" gap="6">
            {(imagePosition === 'left') && (
              <Container width="1/3" padding="0">
                {imageElement}
              </Container>
            )}
            <Container display="flex" direction="column" padding="0" className="flex-1">
              {header}
              {body}
              {footer}
            </Container>
            {(imagePosition === 'right') && (
              <Container width="1/3" padding="0">
                {imageElement}
              </Container>
            )}
          </Container>
        );
      }
      
      // Vertical orientation (default)
      return (
        <>
          {(imagePosition === 'top') && imageElement}
          {header}
          {body}
          {footer}
          {(imagePosition === 'bottom') && imageElement}
        </>
      );
    };
    
    return (
      <Container
        ref={ref}
        className={cn(
          getVariantClasses(),
          getInteractionClasses(),
          className
        )}
        padding={padding}
        borderRadius={borderRadius}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={(clickable || onCardClick) ? 0 : undefined}
        role={(clickable || onCardClick) ? 'button' : 'article'}
        ariaLabel={(clickable || onCardClick) ? `Card: ${title || 'Interactive card'}` : undefined}
        ariaDescribedBy={description ? `${title || 'card'}-description` : undefined}
        {...containerProps}
      >
        {renderCardContent()}
      </Container>
    );
  }
);

Card.displayName = 'Card';