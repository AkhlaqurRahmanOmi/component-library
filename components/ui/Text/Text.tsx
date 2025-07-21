import * as React from "react";
import { cn } from "../../utils/classNames";
import { TextProps } from "./Text.types";

/**
 * Tailwind class mappings for Text component props
 */
const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
} as const;

const fontWeightClasses = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
} as const;

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
  start: "text-start",
  end: "text-end",
} as const;

const textDecorationClasses = {
  none: "no-underline",
  underline: "underline",
  overline: "overline",
  "line-through": "line-through",
} as const;

const textTransformClasses = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
} as const;

const letterSpacingClasses = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
} as const;

const lineHeightClasses = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
  "3": "leading-3",
  "4": "leading-4",
  "5": "leading-5",
  "6": "leading-6",
  "7": "leading-7",
  "8": "leading-8",
  "9": "leading-9",
  "10": "leading-10",
} as const;

const displayClasses = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  table: "table",
  "table-cell": "table-cell",
  "table-row": "table-row",
  hidden: "hidden",
} as const;

const wordBreakClasses = {
  normal: "break-normal",
  words: "break-words",
  all: "break-all",
  keep: "break-keep",
} as const;

/**
 * Generate color classes based on color prop
 */
const getColorClass = (color?: string): string => {
  if (!color) return "";

  // Handle semantic colors
  const semanticColors = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    info: "text-blue-500",
  };

  if (color in semanticColors) {
    return semanticColors[color as keyof typeof semanticColors];
  }

  // Handle color with intensity (e.g., "blue-500")
  if (color.includes("-")) {
    return `text-${color}`;
  }

  // Handle basic colors
  const basicColors = [
    "black",
    "white",
    "gray",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "orange",
    "teal",
    "cyan",
  ];
  if (basicColors.includes(color)) {
    return `text-${color}-600`; // Default to 600 intensity
  }

  return "";
};

/**
 * Generate spacing classes for margin and padding
 */
const getSpacingClass = (
  type: "margin" | "padding",
  value?: string
): string => {
  if (!value) return "";

  const prefix = type === "margin" ? "m" : "p";
  return `${prefix}-${value}`;
};

/**
 * Generate responsive spacing classes
 */
const getResponsiveSpacingClasses = (
  type: "margin" | "padding",
  value?: string | Record<string, string>
): string[] => {
  if (!value) return [];

  if (typeof value === "string") {
    return [getSpacingClass(type, value)];
  }

  if (typeof value === "object") {
    const classes: string[] = [];
    Object.entries(value).forEach(([breakpoint, spacing]) => {
      if (spacing) {
        const prefix = type === "margin" ? "m" : "p";
        if (
          breakpoint === "sm" ||
          breakpoint === "md" ||
          breakpoint === "lg" ||
          breakpoint === "xl" ||
          breakpoint === "2xl"
        ) {
          classes.push(`${breakpoint}:${prefix}-${spacing}`);
        }
      }
    });
    return classes;
  }

  return [];
};

/**
 * Text component for flexible typography rendering
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      // Core props
      tag = "p",
      children,
      className,
      id,
      style,
      "data-testid": dataTestId,

      // Typography props
      size = "base",
      weight,
      color,
      align,
      decoration,
      transform,
      spacing,
      lineHeight,

      // Layout props
      display,
      truncate,
      wrap,
      wordBreak,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingX,
      paddingY,

      // Semantic props
      error,
      success,
      warning,
      info,

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
      title,
      lang,
      dir,

      ...rest
    },
    ref
  ) => {
    // Build class names
    const classes = cn(
      // Base typography classes
      textSizeClasses[size],
      weight && fontWeightClasses[weight],
      align && textAlignClasses[align],
      decoration && textDecorationClasses[decoration],
      transform && textTransformClasses[transform],
      spacing && letterSpacingClasses[spacing],
      lineHeight && lineHeightClasses[lineHeight],

      // Color classes
      getColorClass(color),

      // Semantic color overrides
      error && "text-red-600",
      success && "text-green-600",
      warning && "text-yellow-600",
      info && "text-blue-500",

      // Display classes
      display && displayClasses[display],

      // Text behavior classes
      truncate && "truncate",
      wrap === false && "whitespace-nowrap",
      wrap === "nowrap" && "whitespace-nowrap",
      wrap === "wrap" && "whitespace-normal",
      wrap === "balance" && "text-balance",
      wordBreak && wordBreakClasses[wordBreak],

      // Spacing classes
      ...getResponsiveSpacingClasses("margin", margin),
      ...getResponsiveSpacingClasses("margin", marginTop).map((cls) =>
        cls.replace("m-", "mt-")
      ),
      ...getResponsiveSpacingClasses("margin", marginRight).map((cls) =>
        cls.replace("m-", "mr-")
      ),
      ...getResponsiveSpacingClasses("margin", marginBottom).map((cls) =>
        cls.replace("m-", "mb-")
      ),
      ...getResponsiveSpacingClasses("margin", marginLeft).map((cls) =>
        cls.replace("m-", "ml-")
      ),
      ...getResponsiveSpacingClasses("margin", marginX).map((cls) =>
        cls.replace("m-", "mx-")
      ),
      ...getResponsiveSpacingClasses("margin", marginY).map((cls) =>
        cls.replace("m-", "my-")
      ),
      ...getResponsiveSpacingClasses("padding", padding),
      ...getResponsiveSpacingClasses("padding", paddingTop).map((cls) =>
        cls.replace("p-", "pt-")
      ),
      ...getResponsiveSpacingClasses("padding", paddingRight).map((cls) =>
        cls.replace("p-", "pr-")
      ),
      ...getResponsiveSpacingClasses("padding", paddingBottom).map((cls) =>
        cls.replace("p-", "pb-")
      ),
      ...getResponsiveSpacingClasses("padding", paddingLeft).map((cls) =>
        cls.replace("p-", "pl-")
      ),
      ...getResponsiveSpacingClasses("padding", paddingX).map((cls) =>
        cls.replace("p-", "px-")
      ),
      ...getResponsiveSpacingClasses("padding", paddingY).map((cls) =>
        cls.replace("p-", "py-")
      ),

      // User-provided classes
      className
    );

    // Build accessibility attributes
    const accessibilityProps = {
      role,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      tabIndex,
      "aria-expanded": ariaExpanded,
      "aria-pressed": ariaPressed,
      "aria-selected": ariaSelected,
      "aria-disabled": ariaDisabled,
      "aria-hidden": ariaHidden,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
    };

    // Build event handlers
    const eventHandlers = {
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress,
    };

    // Build common props
    const commonProps = {
      ref: ref as React.Ref<HTMLElement>,
      id,
      className: classes,
      style,
      "data-testid": dataTestId,
      title,
      lang,
      dir,
      ...accessibilityProps,
      ...eventHandlers,
      ...rest,
    };

    // Render the appropriate HTML element
    const Element = tag as keyof React.JSX.IntrinsicElements;

    return React.createElement(Element, commonProps, children);
  }
);

Text.displayName = "Text";
