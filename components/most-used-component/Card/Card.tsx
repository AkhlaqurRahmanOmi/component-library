import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { CardProps, CardRef } from './Card.types';

/**
 * Card component combining Container, Text, and Button components
 * 
 * A flexible card component that can display title, subtitle, description,
 * image, and action buttons in various layouts.
 * 
 * @example
 * ```tsx
 * <Card
 *   title="Card Title"
 *   subtitle="Card Subtitle"
 *   description="This is a description of the card content."
 *   primaryAction={{
 *     label: "Primary Action",
 *     onClick: () => console.log("Primary clicked")
 *   }}
 *   secondaryAction={{
 *     label: "Secondary",
 *     onClick: () => console.log("Secondary clicked"),
 *     variant: "outline"
 *   }}
 * />
 * ```
 */
export const Card = React.forwardRef<CardRef, CardProps>(
  (
    {
      // Card-specific props
      title,
      subtitle,
      description,
      children,
      header,
      footer,
      imageSrc,
      imageAlt,
      imagePosition = 'top',
      primaryAction,
      secondaryAction,
      variant = 'default',
      clickable = false,
      onCardClick,
      loading = false,
      
      // Custom styling props
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      subtitleProps,
      descriptionProps,
      
      // Container props
      className,
      ...containerProps
    },
    ref
  ) => {
    // Card variant styles
    const getCardVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'border border-gray-200 bg-white';
        case 'elevated':
          return 'bg-white shadow-md border border-gray-100';
        case 'filled':
          return 'bg-gray-50 border border-gray-200';
        default:
          return 'bg-white border border-gray-200';
      }
    };
    
    // Clickable card styles
    const clickableClasses = clickable || onCardClick ? 
      'cursor-pointer hover:shadow-lg transition-shadow duration-200' : '';
    
    // Loading overlay
    const LoadingOverlay = () => (
      <Container
        position="absolute"
        top="0"
        left="0"
        width="full"
        height="full"
        background="white"
        opacity="80"
        display="flex"
        justify="center"
        align="center"
        zIndex="10"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </Container>
    );
    
    // Image component
    const ImageComponent = () => {
      if (!imageSrc) return null;
      
      return (
        <Container
          className={cn(
            'overflow-hidden',
            imagePosition === 'top' && 'rounded-t-lg',
            imagePosition === 'bottom' && 'rounded-b-lg',
            (imagePosition === 'left' || imagePosition === 'right') && 'flex-shrink-0'
          )}
          width={imagePosition === 'left' || imagePosition === 'right' ? '1/3' : 'full'}
          height={imagePosition === 'top' || imagePosition === 'bottom' ? '48' : 'full'}
        >
          <img
            src={imageSrc}
            alt={imageAlt || ''}
            className="w-full h-full object-cover"
          />
        </Container>
      );
    };
    
    // Header component
    const HeaderComponent = () => {
      if (header) {
        return (
          <Container
            padding="6"
            paddingBottom="0"
            {...headerProps}
          >
            {header}
          </Container>
        );
      }
      
      if (!title && !subtitle) return null;
      
      return (
        <Container
          padding="6"
          paddingBottom="0"
          {...headerProps}
        >
          {title && (
            <Text
              tag="h3"
              size="lg"
              weight="semibold"
              color="gray-900"
              marginBottom="1"
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
        </Container>
      );
    };
    
    // Body component
    const BodyComponent = () => {
      const hasContent = description || children;
      if (!hasContent) return null;
      
      return (
        <Container
          padding="6"
          paddingTop={title || subtitle || header ? "4" : "6"}
          {...bodyProps}
        >
          {description && (
            <Text
              tag="p"
              size="base"
              color="gray-700"
              lineHeight="relaxed"
              marginBottom={children ? "4" : "0"}
              {...descriptionProps}
            >
              {description}
            </Text>
          )}
          {children}
        </Container>
      );
    };
    
    // Footer component
    const FooterComponent = () => {
      const hasActions = primaryAction || secondaryAction;
      const hasFooterContent = footer || hasActions;
      
      if (!hasFooterContent) return null;
      
      return (
        <Container
          padding="6"
          paddingTop="0"
          {...footerProps}
        >
          {footer || (
            <Container
              display="flex"
              gap="3"
              justify="end"
              align="center"
            >
              {secondaryAction && (
                <Button
                  variant="outline"
                  size="sm"
                  {...secondaryAction}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="primary"
                  size="sm"
                  {...primaryAction}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
            </Container>
          )}
        </Container>
      );
    };
    
    // Main content container
    const ContentContainer = () => (
      <Container
        display="flex"
        direction={imagePosition === 'left' || imagePosition === 'right' ? 'row' : 'column'}
        height="full"
      >
        {imagePosition === 'left' && <ImageComponent />}
        {imagePosition === 'top' && <ImageComponent />}
        
        <Container
          display="flex"
          direction="column"
          height="full"
          width="full"
        >
          <HeaderComponent />
          <BodyComponent />
          <FooterComponent />
        </Container>
        
        {imagePosition === 'right' && <ImageComponent />}
        {imagePosition === 'bottom' && <ImageComponent />}
      </Container>
    );
    
    return (
      <Container
        ref={ref}
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        className={cn(
          getCardVariantClasses(),
          clickableClasses,
          className
        )}
        onClick={onCardClick}
        {...containerProps}
      >
        {loading && <LoadingOverlay />}
        <ContentContainer />
      </Container>
    );
  }
);

Card.displayName = 'Card';