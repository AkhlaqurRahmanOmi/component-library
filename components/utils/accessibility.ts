import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ReactElement } from 'react';

expect.extend(toHaveNoViolations);

/**
 * Test a component for accessibility violations using axe-core
 */
export async function testAccessibility(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

/**
 * Test color contrast compliance for a component
 */
export async function testColorContrast(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'color-contrast-enhanced': { enabled: true }
    }
  });
  expect(results).toHaveNoViolations();
}

/**
 * Test keyboard navigation functionality
 */
export async function testKeyboardNavigation(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'tabindex': { enabled: true }
    }
  });
  expect(results).toHaveNoViolations();
}

/**
 * Test ARIA compliance and attributes
 */
export async function testAriaCompliance(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'aria-allowed-attr': { enabled: true },
      'aria-allowed-role': { enabled: true },
      'aria-command-name': { enabled: true },
      'aria-hidden-body': { enabled: true },
      'aria-hidden-focus': { enabled: true },
      'aria-input-field-name': { enabled: true },
      'aria-required-attr': { enabled: true },
      'aria-required-children': { enabled: true },
      'aria-required-parent': { enabled: true },
      'aria-roles': { enabled: true },
      'aria-toggle-field-name': { enabled: true },
      'aria-valid-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true }
    }
  });
  expect(results).toHaveNoViolations();
}

/**
 * Test form accessibility including labels and associations
 */
export async function testFormAccessibility(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'form-field-multiple-labels': { enabled: true },
      'label': { enabled: true },
      'label-content-name-mismatch': { enabled: true },
      'label-title-only': { enabled: true },
      'input-button-name': { enabled: true },
      'input-image-alt': { enabled: true }
    }
  });
  expect(results).toHaveNoViolations();
}

/**
 * Test semantic HTML structure
 */
export async function testSemanticStructure(component: ReactElement): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'heading-order': { enabled: true },
      'landmark-banner-is-top-level': { enabled: true },
      'landmark-complementary-is-top-level': { enabled: true },
      'landmark-contentinfo-is-top-level': { enabled: true },
      'landmark-main-is-top-level': { enabled: true },
      'landmark-no-duplicate-banner': { enabled: true },
      'landmark-no-duplicate-contentinfo': { enabled: true },
      'landmark-no-duplicate-main': { enabled: true },
      'landmark-one-main': { enabled: true },
      'landmark-unique': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true }
    }
  });
  expect(results).toHaveNoViolations();
}

/**
 * Test focus management for an element
 */
export function testFocusManagement(element: HTMLElement): void {
  // Test that element can receive focus
  element.focus();
  expect(document.activeElement).toBe(element);
  
  // Test that element can lose focus
  element.blur();
  expect(document.activeElement).not.toBe(element);
  
  // Test tabindex behavior
  if (element.hasAttribute('tabindex')) {
    const tabIndex = element.getAttribute('tabindex');
    if (tabIndex === '-1') {
      // Should be programmatically focusable but not in tab order
      element.focus();
      expect(document.activeElement).toBe(element);
    } else if (tabIndex === '0') {
      // Should be in natural tab order
      expect(element.tabIndex).toBe(0);
    }
  }
}

/**
 * Test screen reader announcements and labeling
 */
export function testScreenReaderAnnouncements(element: HTMLElement): {
  hasProperLabel: boolean;
  hasAriaLive: boolean;
  hasAriaAtomic: boolean;
} {
  const hasAriaLabel = element.hasAttribute('aria-label');
  const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
  const hasAssociatedLabel = document.querySelector(`label[for="${element.id}"]`) !== null;
  const hasAriaLive = element.hasAttribute('aria-live');
  const hasAriaAtomic = element.hasAttribute('aria-atomic');
  
  return {
    hasProperLabel: hasAriaLabel || hasAriaLabelledBy || hasAssociatedLabel,
    hasAriaLive,
    hasAriaAtomic
  };
}

/**
 * Test high contrast mode compatibility
 */
export function testHighContrastMode(element: HTMLElement): {
  isCompatible: boolean;
  hasBorder: boolean;
  hasBackground: boolean;
} {
  const computedStyle = window.getComputedStyle(element);
  
  // Check for border (important in high contrast mode)
  const hasBorder = computedStyle.borderWidth !== '0px' && 
                   computedStyle.borderWidth !== '' &&
                   computedStyle.borderStyle !== 'none';
  
  // Check for background
  const hasBackground = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                       computedStyle.backgroundColor !== 'transparent';
  
  // Check for text color
  const hasTextColor = computedStyle.color !== '';
  
  // Element is compatible if it has visual indicators that work in high contrast
  const isCompatible = hasBorder || hasBackground || hasTextColor;
  
  return {
    isCompatible,
    hasBorder,
    hasBackground
  };
}

/**
 * Test component with specific accessibility rules
 */
export async function testWithRules(
  component: ReactElement, 
  rules: string[]
): Promise<void> {
  const { container } = render(component);
  const ruleConfig = rules.reduce((acc, rule) => {
    acc[rule] = { enabled: true };
    return acc;
  }, {} as Record<string, { enabled: boolean }>);
  
  const results = await axe(container, { rules: ruleConfig });
  expect(results).toHaveNoViolations();
}

/**
 * Test component for specific accessibility violations (for negative testing)
 */
export async function testForViolations(
  component: ReactElement,
  expectedViolations: string[]
): Promise<void> {
  const { container } = render(component);
  const results = await axe(container);
  
  const violationIds = results.violations.map(v => v.id);
  expectedViolations.forEach(expectedId => {
    expect(violationIds).toContain(expectedId);
  });
}

/**
 * Test component accessibility with custom axe configuration
 */
export async function testWithConfig(
  component: ReactElement,
  config: any
): Promise<void> {
  const { container } = render(component);
  const results = await axe(container, config);
  expect(results).toHaveNoViolations();
}

/**
 * Get accessibility violations for analysis (without failing the test)
 */
export async function getAccessibilityViolations(component: ReactElement): Promise<any[]> {
  const { container } = render(component);
  const results = await axe(container);
  return results.violations;
}

/**
 * Test component for WCAG compliance level
 */
export async function testWCAGCompliance(
  component: ReactElement,
  level: 'A' | 'AA' | 'AAA' = 'AA'
): Promise<void> {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

/**
 * Test component for specific WCAG success criteria
 */
export async function testWCAGCriteria(
  component: ReactElement,
  criteria: string[]
): Promise<void> {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}