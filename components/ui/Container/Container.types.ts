import * as React from 'react';
import type {
  BaseComponentProps,
  AccessibilityProps,
  InteractiveProps,
  LayoutProps,
  DisplayVariant,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,
  SpacingVariant,
  SizeVariant,
  ColorVariant,
  BorderVariant,
  BorderRadius,
  ShadowVariant
} from '../../types/common';

/**
 * Responsive container props for different breakpoints
 */
export interface ResponsiveContainerProps {
  /** Small breakpoint (640px+) */
  sm?: Partial<ContainerLayoutProps>;
  /** Medium breakpoint (768px+) */
  md?: Partial<ContainerLayoutProps>;
  /** Large breakpoint (1024px+) */
  lg?: Partial<ContainerLayoutProps>;
  /** Extra large breakpoint (1280px+) */
  xl?: Partial<ContainerLayoutProps>;
  /** 2X large breakpoint (1536px+) */
  '2xl'?: Partial<ContainerLayoutProps>;
}

/**
 * Layout-specific props for Container component
 */
export interface ContainerLayoutProps {
  /** Display type */
  display?: DisplayVariant;
  /** Flex direction (only applies when display is flex or inline-flex) */
  direction?: FlexDirection;
  /** Justify content alignment (only applies to flex containers) */
  justify?: JustifyContent;
  /** Align items (only applies to flex containers) */
  align?: AlignItems;
  /** Flex wrap behavior (only applies to flex containers) */
  wrap?: FlexWrap;
  /** Gap between child elements */
  gap?: SpacingVariant;
  /** Width of the container */
  width?: SizeVariant;
  /** Height of the container */
  height?: SizeVariant;
  /** Maximum width of the container */
  maxWidth?: SizeVariant;
  /** Maximum height of the container */
  maxHeight?: SizeVariant;
  /** Minimum width of the container */
  minWidth?: SizeVariant;
  /** Minimum height of the container */
  minHeight?: SizeVariant;
  /** Grid-specific props (when display is grid or inline-grid) */
  gridCols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none';
  gridRows?: '1' | '2' | '3' | '4' | '5' | '6' | 'none';
  gridColSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';
  gridRowSpan?: '1' | '2' | '3' | '4' | '5' | '6' | 'full';
}

/**
 * Visual styling props for Container component
 */
export interface ContainerVisualProps {
  /** Background color */
  background?: ColorVariant;
  /** Border configuration */
  border?: BorderVariant;
  /** Border radius */
  borderRadius?: BorderRadius;
  /** Box shadow */
  shadow?: ShadowVariant;
  /** Opacity level */
  opacity?: '0' | '5' | '10' | '20' | '25' | '30' | '40' | '50' | '60' | '70' | '75' | '80' | '90' | '95' | '100';
}

/**
 * Complete Container component props interface
 */
export interface ContainerProps 
  extends BaseComponentProps,
          AccessibilityProps,
          InteractiveProps,
          LayoutProps,
          ContainerLayoutProps,
          ContainerVisualProps {
  /** Child elements to render inside the container */
  children: React.ReactNode;
  
  /** HTML element tag to render as (default: 'div') */
  as?: keyof React.JSX.IntrinsicElements;
  
  /** Responsive design configuration */
  responsive?: ResponsiveContainerProps;
  
  /** Whether the container should take full width */
  fullWidth?: boolean;
  
  /** Whether the container should take full height */
  fullHeight?: boolean;
  
  /** Whether the container should be centered horizontally */
  centered?: boolean;
  
  /** Position-related props */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: SpacingVariant;
  right?: SpacingVariant;
  bottom?: SpacingVariant;
  left?: SpacingVariant;
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto';
  
  /** Overflow behavior */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
}

/**
 * Container component ref type
 */
export type ContainerRef = HTMLDivElement;

/**
 * Container component type with forwardRef
 */
export type ContainerComponent = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<ContainerRef>
>;