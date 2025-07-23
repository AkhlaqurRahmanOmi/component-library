"use client";

import * as React from 'react';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { cn } from '../../utils/classNames';
import type { ModalProps, ModalRef } from './Modal.types';

/**
 * Modal component using Container, Button, and Text with overlay functionality
 * 
 * A flexible modal dialog component that provides overlay functionality,
 * keyboard navigation, focus management, and customizable content areas.
 * 
 * @example
 * ```tsx
 * // Basic modal with title and actions
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   primaryAction={{
 *     label: "Confirm",
 *     onClick: handleConfirm
 *   }}
 *   secondaryAction={{
 *     label: "Cancel",
 *     onClick: () => setIsOpen(false)
 *   }}
 * >
 *   <Text>Are you sure you want to perform this action?</Text>
 * </Modal>
 * 
 * // Custom modal with header content
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   size="lg"
 *   headerContent={<CustomHeader />}
 * >
 *   <CustomContent />
 * </Modal>
 * ```
 */
export const Modal = React.forwardRef<ModalRef, ModalProps>(
  (
    {
      // Core props
      isOpen,
      onClose,
      children,
      
      // Header props
      title,
      subtitle,
      headerContent,
      showCloseButton = true,
      
      // Footer props
      footerContent,
      primaryAction,
      secondaryAction,
      
      // Behavior props
      closeOnOverlayClick = true,
      closeOnEscape = true,
      preventScroll = true,
      
      // Sizing props
      size = 'md',
      maxWidth,
      maxHeight,
      centered = true,
      
      // Styling props
      overlayClassName,
      modalClassName,
      animationDuration = 200,
      
      // Accessibility props
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      role = 'dialog',
      
      // Override props
      overlayProps,
      modalProps,
      headerProps,
      bodyProps,
      footerProps,
      titleProps,
      subtitleProps,
    },
    ref
  ) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const previousActiveElement = React.useRef<HTMLElement | null>(null);
    
    // Combine refs
    React.useImperativeHandle(ref, () => modalRef.current!);
    
    // Get modal size classes
    const getSizeClasses = () => {
      const sizeMap = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full'
      };
      return sizeMap[size];
    };
    
    // Handle escape key
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEscape && isOpen) {
          onClose();
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, closeOnEscape, onClose]);
    
    // Handle body scroll prevention
    React.useEffect(() => {
      if (isOpen && preventScroll) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [isOpen, preventScroll]);
    
    // Handle focus management
    React.useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        // Focus the modal after a brief delay to ensure it's rendered
        const timer = setTimeout(() => {
          if (modalRef.current) {
            modalRef.current.focus();
          }
        }, 100);
        
        return () => clearTimeout(timer);
      } else if (previousActiveElement.current) {
        // Restore focus when modal closes
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [isOpen]);
    
    // Handle overlay click
    const handleOverlayClick = React.useCallback(
      (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
          onClose();
        }
        overlayProps?.onClick?.(event);
      },
      [closeOnOverlayClick, onClose, overlayProps]
    );
    
    // Handle modal click (prevent event bubbling)
    const handleModalClick = React.useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        modalProps?.onClick?.(event);
      },
      [modalProps]
    );
    
    // Render close button
    const renderCloseButton = () => {
      if (!showCloseButton) return null;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          ariaLabel="Close modal"
          className="absolute top-4 right-4 p-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
    
    // Render header section
    const renderHeader = () => {
      if (!title && !subtitle && !headerContent) return null;
      
      return (
        <Container
          padding="6"
          paddingBottom="0"
          {...headerProps}
        >
          {headerContent || (
            <>
              {title && (
                <Text
                  tag="h2"
                  size="xl"
                  weight="semibold"
                  color="gray-900"
                  marginBottom={subtitle ? "2" : "0"}
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
      if (!children) return null;
      
      return (
        <Container
          padding="6"
          paddingTop="4"
          paddingBottom="4"
          className="flex-1 overflow-y-auto"
          {...bodyProps}
        >
          {children}
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
          padding="6"
          paddingTop="0"
          background="gray"
          border={{ width: "0", style: "solid", color: "gray" }}
          className="border-t"
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
    
    // Don't render if not open
    if (!isOpen) return null;
    
    return (
      <Container
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          !centered && 'items-start pt-16',
          overlayClassName
        )}
        background="black"
        opacity="50"
        onClick={handleOverlayClick}
        {...overlayProps}
      >
        <Container
          ref={modalRef}
          className={cn(
            'relative bg-white rounded-lg shadow-xl max-h-full flex flex-col',
            'transform transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            getSizeClasses(),
            modalClassName
          )}
          style={{
            maxWidth: maxWidth || undefined,
            maxHeight: maxHeight || undefined,
            animationDuration: `${animationDuration}ms`
          }}
          onClick={handleModalClick}
          role={role}
          aria-modal="true"
          ariaLabel={ariaLabel ?? title ?? 'Modal'}
          ariaDescribedBy={ariaDescribedBy}
          ariaLabelledBy={ariaLabelledBy || (title ? 'modal-title' : undefined)}
          tabIndex={-1}
          {...modalProps}
        >
          {renderCloseButton()}
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </Container>
      </Container>
    );
  }
);

Modal.displayName = 'Modal';