import * as React from 'react';
import { createPortal } from 'react-dom';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { ModalProps, ModalRef } from './Modal.types';

/**
 * Modal component using Container, Button, and Text with overlay functionality
 * 
 * A flexible modal dialog component that supports various sizes, actions,
 * and customization options with proper accessibility features.
 * 
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   primaryAction={{
 *     label: "Confirm",
 *     onClick: handleConfirm
 *   }}
 *   secondaryAction={{
 *     label: "Cancel",
 *     onClick: () => setIsOpen(false),
 *     variant: "outline"
 *   }}
 * />
 * ```
 */
export const Modal = React.forwardRef<ModalRef, ModalProps>(
  (
    {
      // Core modal props
      open,
      onClose,
      title,
      description,
      children,
      header,
      footer,
      size = 'md',
      
      // Behavior props
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      
      // Action props
      primaryAction,
      secondaryAction,
      
      // State props
      loading = false,
      
      // Styling props
      overlayProps,
      containerProps,
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      descriptionProps,
      
      // Accessibility props
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      
      // Class names
      className,
      overlayClassName,
      
      // Portal props
      portalTarget,
      animationDuration = 200,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const previousFocusRef = React.useRef<HTMLElement | null>(null);
    
    // Handle portal target
    const [portalElement, setPortalElement] = React.useState<Element | null>(null);
    
    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        setPortalElement(portalTarget || document.body);
      }
    }, [portalTarget]);
    
    // Modal size classes
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'max-w-sm';
        case 'md':
          return 'max-w-md';
        case 'lg':
          return 'max-w-lg';
        case 'xl':
          return 'max-w-xl';
        case 'full':
          return 'max-w-full mx-4';
        default:
          return 'max-w-md';
      }
    };
    
    // Handle modal open/close animations
    React.useEffect(() => {
      if (open) {
        setIsVisible(true);
        setIsAnimating(true);
        // Store the currently focused element
        previousFocusRef.current = document.activeElement as HTMLElement;
        
        // Focus the modal after animation
        setTimeout(() => {
          setIsAnimating(false);
          modalRef.current?.focus();
        }, animationDuration);
      } else if (isVisible) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsVisible(false);
          setIsAnimating(false);
          // Restore focus to the previously focused element
          previousFocusRef.current?.focus();
        }, animationDuration);
      }
    }, [open, animationDuration, isVisible]);
    
    // Handle escape key
    React.useEffect(() => {
      if (!closeOnEscape || !isVisible) return;
      
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, isVisible, onClose]);
    
    // Handle focus trap
    React.useEffect(() => {
      if (!isVisible) return;
      
      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;
        
        const modal = modalRef.current;
        if (!modal) return;
        
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            event.preventDefault();
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }, [isVisible]);
    
    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };
    
    // Close button component
    const CloseButton = () => {
      if (!showCloseButton) return null;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          ariaLabel="Close modal"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      );
    };
    
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
      
      if (!title && !description) return null;
      
      return (
        <Container
          padding="6"
          paddingBottom="0"
          {...headerProps}
        >
          {title && (
            <Text
              tag="h2"
              size="xl"
              weight="semibold"
              color="gray-900"
              marginBottom={description ? "2" : "0"}
              {...titleProps}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              tag="p"
              size="sm"
              color="gray-600"
              {...descriptionProps}
            >
              {description}
            </Text>
          )}
        </Container>
      );
    };
    
    // Body component
    const BodyComponent = () => {
      if (!children) return null;
      
      return (
        <Container
          padding="6"
          paddingTop={title || description || header ? "4" : "6"}
          {...bodyProps}
        >
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
          background="gray-50"
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
                  {...secondaryAction}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="primary"
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
    
    // Modal content
    const ModalContent = () => (
      <Container
        ref={modalRef}
        position="relative"
        background="white"
        borderRadius="lg"
        shadow="xl"
        width="full"
        maxHeight="90vh"
        overflow="hidden"
        className={cn(
          getSizeClasses(),
          'transform transition-all duration-200',
          isAnimating && !open ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        {...containerProps}
      >
        {loading && <LoadingOverlay />}
        <CloseButton />
        
        <Container
          display="flex"
          direction="column"
          maxHeight="90vh"
          overflow="auto"
        >
          <HeaderComponent />
          <BodyComponent />
          <FooterComponent />
        </Container>
      </Container>
    );
    
    // Don't render if not visible
    if (!isVisible || !portalElement) return null;
    
    return createPortal(
      <Container
        position="fixed"
        top="0"
        left="0"
        width="full"
        height="full"
        zIndex="50"
        display="flex"
        justify="center"
        align="center"
        padding="4"
        className={cn(
          'bg-black bg-opacity-50 transition-opacity duration-200',
          isAnimating && !open ? 'opacity-0' : 'opacity-100',
          overlayClassName
        )}
        onClick={handleOverlayClick}
        {...overlayProps}
      >
        <ModalContent />
      </Container>,
      portalElement
    );
  }
);

Modal.displayName = 'Modal';