import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toHaveNoViolations } from 'jest-axe';
import { Text } from '../Text';
import { 
  testAccessibility, 
  testColorContrast, 
  testKeyboardNavigation,
  testAriaCompliance,
  testSemanticStructure,
  testFocusManagement,
  testScreenReaderAnnouncements,
  testHighContrastMode
} from '../../../utils/accessibility';

expect.extend(toHaveNoViolations);

describe('Text Component - Accessibility Tests', () => {
  describe('General Accessibility Compliance', () => {
    it('should have no accessibility violations with default props', async () => {
      await testAccessibility(<Text>Default text content</Text>);
    });

    it('should have no accessibility violations with all variants', async () => {
      const variants = [
        <Text key="p" tag="p">Paragraph text</Text>,
        <Text key="h1" tag="h1">Heading 1</Text>,
        <Text key="h2" tag="h2">Heading 2</Text>,
        <Text key="h3" tag="h3">Heading 3</Text>,
        <Text key="span" tag="span">Span text</Text>,
        <Text key="div" tag="div">Div text</Text>,
        <Text key="label" tag="label">Label text</Text>
      ];

      for (const variant of variants) {
        await testAccessibility(variant);
      }
    });

    it('should have no accessibility violations with interactive elements', async () => {
      const handleClick = jest.fn();
      await testAccessibility(
        <Text onClick={handleClick} tabIndex={0} role="button">
          Interactive text
        </Text>
      );
    });

    it('should have no accessibility violations with semantic props', async () => {
      const semanticVariants = [
        <Text key="error" error>Error message</Text>,
        <Text key="success" success>Success message</Text>,
        <Text key="warning" warning>Warning message</Text>,
        <Text key="info" info>Info message</Text>
      ];

      for (const variant of semanticVariants) {
        await testAccessibility(variant);
      }
    });
  });

  describe('Color Contrast Compliance', () => {
    it('should meet color contrast requirements for all color variants', async () => {
      const colorVariants = [
        <Text key="black" color="black">Black text</Text>,
        <Text key="white" color="white" style={{ backgroundColor: '#000' }}>White text</Text>,
        <Text key="gray" color="gray">Gray text</Text>,
        <Text key="red" color="red">Red text</Text>,
        <Text key="blue" color="blue">Blue text</Text>,
        <Text key="green" color="green">Green text</Text>,
        <Text key="primary" color="primary">Primary text</Text>,
        <Text key="secondary" color="secondary">Secondary text</Text>
      ];

      for (const variant of colorVariants) {
        await testColorContrast(variant);
      }
    });

    it('should meet color contrast requirements for semantic colors', async () => {
      const semanticVariants = [
        <Text key="error" error>Error message</Text>,
        <Text key="success" success>Success message</Text>,
        <Text key="warning" warning>Warning message</Text>,
        <Text key="info" info>Info message</Text>
      ];

      for (const variant of semanticVariants) {
        await testColorContrast(variant);
      }
    });

    it('should maintain contrast with custom backgrounds', async () => {
      const backgroundVariants = [
        <Text key="light" color="black" style={{ backgroundColor: '#f0f0f0' }}>
          Dark text on light background
        </Text>,
        <Text key="dark" color="white" style={{ backgroundColor: '#333' }}>
          Light text on dark background
        </Text>
      ];

      for (const variant of backgroundVariants) {
        await testColorContrast(variant);
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation when interactive', async () => {
      const handleClick = jest.fn();
      await testKeyboardNavigation(
        <Text onClick={handleClick} tabIndex={0} role="button">
          Interactive text
        </Text>
      );
    });

    it('should handle keyboard events correctly', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      const handleClick = jest.fn();

      render(
        <Text 
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
        >
          Keyboard accessible text
        </Text>
      );

      const element = screen.getByRole('button');
      
      // Test focus
      await user.tab();
      expect(document.activeElement).toBe(element);

      // Test Enter key
      await user.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleClick).toHaveBeenCalled();

      // Test Space key
      handleClick.mockClear();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have proper tab order', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Text tabIndex={0} role="button">First</Text>
          <Text tabIndex={0} role="button">Second</Text>
          <Text tabIndex={0} role="button">Third</Text>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      
      // Tab through elements
      await user.tab();
      expect(document.activeElement).toBe(buttons[0]);
      
      await user.tab();
      expect(document.activeElement).toBe(buttons[1]);
      
      await user.tab();
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('should skip non-interactive elements in tab order', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Text tabIndex={0} role="button">Interactive</Text>
          <Text>Non-interactive</Text>
          <Text tabIndex={0} role="button">Interactive 2</Text>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      
      await user.tab();
      expect(document.activeElement).toBe(buttons[0]);
      
      await user.tab();
      expect(document.activeElement).toBe(buttons[1]);
    });
  });

  describe('ARIA Attributes and Screen Reader Compatibility', () => {
    it('should have proper ARIA attributes', async () => {
      await testAriaCompliance(
        <Text 
          role="button"
          ariaLabel="Custom label"
          ariaDescribedBy="description"
          ariaLabelledBy="label-id"
          ariaExpanded={true}
          ariaPressed={false}
          tabIndex={0}
        >
          ARIA compliant text
        </Text>
      );
    });

    it('should validate ARIA attributes correctly', () => {
      render(
        <Text 
          role="button"
          ariaLabel="Button label"
          ariaDescribedBy="desc-1"
          ariaLabelledBy="label-1"
          ariaExpanded={true}
          ariaPressed={false}
          ariaSelected={true}
          ariaDisabled={false}
          ariaHidden={false}
          ariaLive="polite"
          ariaAtomic={true}
          tabIndex={0}
        >
          Fully accessible text
        </Text>
      );

      const element = screen.getByRole('button');
      
      expect(element).toHaveAttribute('aria-label', 'Button label');
      expect(element).toHaveAttribute('aria-describedby', 'desc-1');
      expect(element).toHaveAttribute('aria-labelledby', 'label-1');
      expect(element).toHaveAttribute('aria-expanded', 'true');
      expect(element).toHaveAttribute('aria-pressed', 'false');
      expect(element).toHaveAttribute('aria-selected', 'true');
      expect(element).toHaveAttribute('aria-disabled', 'false');
      expect(element).toHaveAttribute('aria-hidden', 'false');
      expect(element).toHaveAttribute('aria-live', 'polite');
      expect(element).toHaveAttribute('aria-atomic', 'true');
      expect(element).toHaveAttribute('tabIndex', '0');
    });

    it('should support screen reader announcements', () => {
      render(
        <Text ariaLive="polite" ariaAtomic={true}>
          Status message
        </Text>
      );

      const element = screen.getByText('Status message');
      const announcements = testScreenReaderAnnouncements(element);
      
      expect(announcements.hasAriaLive).toBe(true);
      expect(announcements.hasAriaAtomic).toBe(true);
      expect(announcements.hasProperLabel).toBe(false); // No explicit label needed for status
    });

    it('should provide proper labeling for interactive elements', () => {
      render(
        <Text role="button" ariaLabel="Close dialog" tabIndex={0}>
          ×
        </Text>
      );

      const element = screen.getByRole('button');
      const announcements = testScreenReaderAnnouncements(element);
      
      expect(announcements.hasProperLabel).toBe(true);
    });
  });

  describe('Semantic HTML Structure', () => {
    it('should use proper semantic HTML', async () => {
      await testSemanticStructure(
        <div>
          <Text tag="h1">Main Heading</Text>
          <Text tag="h2">Section Heading</Text>
          <Text tag="p">Paragraph content</Text>
        </div>
      );
    });

    it('should maintain proper heading hierarchy', () => {
      render(
        <div>
          <Text tag="h1">Level 1</Text>
          <Text tag="h2">Level 2</Text>
          <Text tag="h3">Level 3</Text>
          <Text tag="h2">Another Level 2</Text>
        </div>
      );

      const h1 = screen.getByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });

      expect(h1).toBeInTheDocument();
      expect(h2Elements).toHaveLength(2);
      expect(h3).toBeInTheDocument();
    });

    it('should use appropriate semantic tags', () => {
      render(
        <div>
          <Text tag="label">Label text</Text>
          <Text tag="span" role="status">Status text</Text>
          <Text tag="div" role="alert">Alert text</Text>
        </div>
      );

      expect(screen.getByText('Label text').tagName).toBe('LABEL');
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should manage focus correctly for interactive elements', () => {
      render(
        <Text tabIndex={0} role="button">
          Focusable text
        </Text>
      );

      const element = screen.getByRole('button');
      testFocusManagement(element);
    });

    it('should have visible focus indicators', () => {
      render(
        <Text tabIndex={0} role="button" className="focus:ring-2 focus:ring-blue-500">
          Focus indicator text
        </Text>
      );

      const element = screen.getByRole('button');
      element.focus();
      
      expect(document.activeElement).toBe(element);
      expect(element).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });

    it('should not trap focus unintentionally', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <button>Before</button>
          <Text tabIndex={0} role="button">Text button</Text>
          <button>After</button>
        </div>
      );

      const beforeButton = screen.getByText('Before');
      const textButton = screen.getByRole('button', { name: 'Text button' });
      const afterButton = screen.getByText('After');

      beforeButton.focus();
      expect(document.activeElement).toBe(beforeButton);

      await user.tab();
      expect(document.activeElement).toBe(textButton);

      await user.tab();
      expect(document.activeElement).toBe(afterButton);
    });
  });

  describe('High Contrast Mode Compatibility', () => {
    it('should be compatible with high contrast mode', () => {
      render(
        <Text className="border border-gray-300">
          High contrast text
        </Text>
      );

      const element = screen.getByText('High contrast text');
      const compatibility = testHighContrastMode(element);
      
      expect(compatibility.isCompatible).toBe(true);
    });

    it('should maintain visibility in high contrast mode for interactive elements', () => {
      render(
        <Text 
          role="button" 
          tabIndex={0}
          className="border border-gray-300 focus:outline-2 focus:outline-blue-500"
        >
          Interactive high contrast text
        </Text>
      );

      const element = screen.getByRole('button');
      const compatibility = testHighContrastMode(element);
      
      expect(compatibility.isCompatible).toBe(true);
      expect(compatibility.hasBorder).toBe(true);
    });
  });

  describe('Language and Direction Support', () => {
    it('should support language attributes', async () => {
      await testAccessibility(
        <Text lang="fr" dir="ltr">
          Bonjour le monde
        </Text>
      );
    });

    it('should support right-to-left text direction', async () => {
      await testAccessibility(
        <Text lang="ar" dir="rtl">
          مرحبا بالعالم
        </Text>
      );
    });

    it('should apply language and direction attributes correctly', () => {
      render(
        <Text lang="es" dir="ltr">
          Hola mundo
        </Text>
      );

      const element = screen.getByText('Hola mundo');
      expect(element).toHaveAttribute('lang', 'es');
      expect(element).toHaveAttribute('dir', 'ltr');
    });
  });

  describe('Error States and Validation', () => {
    it('should announce error states to screen readers', async () => {
      await testAccessibility(
        <Text error role="alert">
          Error message content
        </Text>
      );
    });

    it('should provide proper error messaging', () => {
      render(
        <div>
          <Text id="error-msg" error role="alert">
            This field is required
          </Text>
          <input aria-describedby="error-msg" />
        </div>
      );

      const errorMsg = screen.getByRole('alert');
      const input = screen.getByRole('textbox');
      
      expect(errorMsg).toHaveAttribute('id', 'error-msg');
      expect(input).toHaveAttribute('aria-describedby', 'error-msg');
    });
  });

  describe('Responsive Accessibility', () => {
    it('should maintain accessibility across different screen sizes', async () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      await testAccessibility(
        <Text size="sm" className="sm:text-base md:text-lg">
          Responsive text
        </Text>
      );

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      await testAccessibility(
        <Text size="sm" className="sm:text-base md:text-lg">
          Responsive text
        </Text>
      );
    });

    it('should maintain focus visibility at all screen sizes', () => {
      render(
        <Text 
          tabIndex={0} 
          role="button"
          className="focus:ring-2 focus:ring-blue-500 sm:focus:ring-4"
        >
          Responsive focus text
        </Text>
      );

      const element = screen.getByRole('button');
      element.focus();
      
      expect(document.activeElement).toBe(element);
      expect(element).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });
  });
});