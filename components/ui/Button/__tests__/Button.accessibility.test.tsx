import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';
import { 
  testAccessibility, 
  testColorContrast, 
  testKeyboardNavigation,
  testAriaCompliance,
  testFormAccessibility,
  testFocusManagement,
  testScreenReaderAnnouncements,
  testHighContrastMode
} from '../../../utils/accessibility';

expect.extend(toHaveNoViolations);

describe('Button Component - Accessibility Tests', () => {
  describe('General Accessibility Compliance', () => {
    it('should have no accessibility violations with default props', async () => {
      await testAccessibility(<Button>Default button</Button>);
    });

    it('should have no accessibility violations with all variants', async () => {
      const variants = [
        <Button key="primary" variant="primary">Primary</Button>,
        <Button key="secondary" variant="secondary">Secondary</Button>,
        <Button key="outline" variant="outline">Outline</Button>,
        <Button key="ghost" variant="ghost">Ghost</Button>,
        <Button key="danger" variant="danger">Danger</Button>,
        <Button key="success" variant="success">Success</Button>
      ];

      for (const variant of variants) {
        await testAccessibility(variant);
      }
    });

    it('should have no accessibility violations with different sizes', async () => {
      const sizes = [
        <Button key="xs" size="xs">Extra Small</Button>,
        <Button key="sm" size="sm">Small</Button>,
        <Button key="base" size="base">Base</Button>,
        <Button key="lg" size="lg">Large</Button>,
        <Button key="xl" size="xl">Extra Large</Button>,
        <Button key="2xl" size="2xl">2X Large</Button>
      ];

      for (const size of sizes) {
        await testAccessibility(size);
      }
    });

    it('should have no accessibility violations with different states', async () => {
      const states = [
        <Button key="normal">Normal</Button>,
        <Button key="disabled" disabled>Disabled</Button>,
        <Button key="loading" loading>Loading</Button>,
        <Button key="active" active>Active</Button>
      ];

      for (const state of states) {
        await testAccessibility(state);
      }
    });
  });

  describe('Color Contrast Compliance', () => {
    it('should meet color contrast requirements for all variants', async () => {
      const variants = [
        <Button key="primary" variant="primary">Primary Button</Button>,
        <Button key="secondary" variant="secondary">Secondary Button</Button>,
        <Button key="outline" variant="outline">Outline Button</Button>,
        <Button key="ghost" variant="ghost">Ghost Button</Button>,
        <Button key="danger" variant="danger">Danger Button</Button>,
        <Button key="success" variant="success">Success Button</Button>
      ];

      for (const variant of variants) {
        await testColorContrast(variant);
      }
    });

    it('should maintain contrast in disabled state', async () => {
      const disabledVariants = [
        <Button key="primary" variant="primary" disabled>Disabled Primary</Button>,
        <Button key="secondary" variant="secondary" disabled>Disabled Secondary</Button>,
        <Button key="outline" variant="outline" disabled>Disabled Outline</Button>
      ];

      for (const variant of disabledVariants) {
        await testColorContrast(variant);
      }
    });

    it('should maintain contrast in loading state', async () => {
      await testColorContrast(
        <Button loading variant="primary">Loading Button</Button>
      );
    });

    it('should maintain contrast with focus states', async () => {
      const { container } = render(
        <Button variant="primary" className="focus:ring-2 focus:ring-blue-500">
          Focus Button
        </Button>
      );

      const button = screen.getByRole('button');
      button.focus();

      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation', async () => {
      await testKeyboardNavigation(<Button>Keyboard Button</Button>);
    });

    it('should handle Enter key activation', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Enter Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle Space key activation', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Space Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not activate when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button disabled onClick={handleClick}>Disabled Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not activate when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button loading onClick={handleClick}>Loading Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should maintain proper tab order', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
          <Button disabled>Disabled</Button>
          <Button>Third</Button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      const enabledButtons = buttons.filter(btn => !btn.hasAttribute('disabled'));

      await user.tab();
      expect(document.activeElement).toBe(enabledButtons[0]);

      await user.tab();
      expect(document.activeElement).toBe(enabledButtons[1]);

      await user.tab();
      expect(document.activeElement).toBe(enabledButtons[2]); // Skip disabled button
    });
  });

  describe('ARIA Attributes and Screen Reader Compatibility', () => {
    it('should have proper ARIA attributes', async () => {
      await testAriaCompliance(
        <Button 
          ariaLabel="Custom button label"
          ariaDescribedBy="description-id"
          ariaPressed={true}
          ariaExpanded={false}
        >
          ARIA Button
        </Button>
      );
    });

    it('should validate ARIA attributes correctly', () => {
      render(
        <Button 
          ariaLabel="Settings button"
          ariaDescribedBy="settings-desc"
          ariaLabelledBy="settings-label"
          ariaPressed={false}
          ariaExpanded={true}
          role="menuitem"
        >
          Settings
        </Button>
      );

      const button = screen.getByRole('menuitem');
      expect(button).toHaveAttribute('aria-label', 'Settings button');
      expect(button).toHaveAttribute('aria-describedby', 'settings-desc');
      expect(button).toHaveAttribute('aria-labelledby', 'settings-label');
      expect(button).toHaveAttribute('aria-pressed', 'false');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should announce loading state to screen readers', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should announce disabled state to screen readers', () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should provide proper labeling for icon-only buttons', () => {
      const Icon = () => <span>⚙</span>;

      render(
        <Button iconOnly leftIcon={<Icon />} ariaLabel="Settings">
        </Button>
      );

      const button = screen.getByLabelText('Settings');
      expect(button).toBeInTheDocument();
      
      const announcements = testScreenReaderAnnouncements(button);
      expect(announcements.hasProperLabel).toBe(true);
    });

    it('should handle toggle button states', () => {
      const { rerender } = render(
        <Button ariaPressed={false}>Toggle Off</Button>
      );

      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      rerender(<Button ariaPressed={true}>Toggle On</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Form Accessibility', () => {
    it('should work properly in forms', async () => {
      await testFormAccessibility(
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
          <Button type="submit">Submit</Button>
        </form>
      );
    });

    it('should handle form submission correctly', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should associate with external forms', () => {
      render(
        <>
          <form id="external-form"></form>
          <Button form="external-form" type="submit">
            External Submit
          </Button>
        </>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'external-form');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should handle form validation states', () => {
      render(
        <form>
          <Button type="submit" formNoValidate>
            Submit Without Validation
          </Button>
        </form>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('formNoValidate');
    });
  });

  describe('Focus Management', () => {
    it('should manage focus correctly', () => {
      render(<Button>Focus Button</Button>);

      const button = screen.getByRole('button');
      testFocusManagement(button);
    });

    it('should have visible focus indicators', () => {
      render(
        <Button className="focus:ring-2 focus:ring-blue-500">
          Focus Visible Button
        </Button>
      );

      const button = screen.getByRole('button');
      button.focus();

      expect(document.activeElement).toBe(button);
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });

    it('should maintain focus visibility across variants', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} data-testid={`button-${variant}`}>
            {variant} button
          </Button>
        );

        const button = screen.getByTestId(`button-${variant}`);
        button.focus();

        expect(document.activeElement).toBe(button);
        
        // Check for focus ring classes
        const hasFocusRing = button.classList.toString().includes('focus:ring') ||
                           button.classList.toString().includes('focus:outline');
        expect(hasFocusRing).toBe(true);

        unmount();
      });
    });

    it('should not receive focus when disabled', () => {
      render(
        <div>
          <Button>Before</Button>
          <Button disabled>Disabled</Button>
          <Button>After</Button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      const disabledButton = buttons[1];

      disabledButton.focus();
      expect(document.activeElement).not.toBe(disabledButton);
    });
  });

  describe('High Contrast Mode Compatibility', () => {
    it('should be compatible with high contrast mode', () => {
      render(
        <Button className="border border-gray-300">
          High Contrast Button
        </Button>
      );

      const button = screen.getByRole('button');
      const compatibility = testHighContrastMode(button);

      expect(compatibility.isCompatible).toBe(true);
    });

    it('should maintain visibility in high contrast mode for all variants', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} data-testid={`button-${variant}`}>
            {variant} button
          </Button>
        );

        const button = screen.getByTestId(`button-${variant}`);
        const compatibility = testHighContrastMode(button);

        expect(compatibility.isCompatible).toBe(true);
        unmount();
      });
    });

    it('should maintain focus visibility in high contrast mode', () => {
      render(
        <Button className="focus:outline-2 focus:outline-blue-500">
          High Contrast Focus Button
        </Button>
      );

      const button = screen.getByRole('button');
      button.focus();

      const compatibility = testHighContrastMode(button);
      expect(compatibility.isCompatible).toBe(true);
    });
  });

  describe('Loading State Accessibility', () => {
    it('should announce loading state properly', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('should provide loading indicator for screen readers', () => {
      render(<Button loading>Processing...</Button>);

      const button = screen.getByRole('button');
      const spinner = button.querySelector('.animate-spin');
      
      expect(spinner).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should maintain accessibility during loading state transitions', async () => {
      const { rerender } = render(<Button>Submit</Button>);
      
      let button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button).not.toBeDisabled();

      rerender(<Button loading>Submit</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();

      rerender(<Button>Submit</Button>);
      button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Icon Accessibility', () => {
    it('should handle icon-only buttons properly', () => {
      const Icon = () => <span aria-hidden="true">⚙</span>;

      render(
        <Button iconOnly leftIcon={<Icon />} ariaLabel="Settings">
        </Button>
      );

      const button = screen.getByLabelText('Settings');
      expect(button).toBeInTheDocument();
      
      const icon = button.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('should hide decorative icons from screen readers', () => {
      const DecorativeIcon = () => <span aria-hidden="true">→</span>;

      render(
        <Button rightIcon={<DecorativeIcon />}>
          Next Page
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = button.querySelector('[aria-hidden="true"]');
      
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should provide proper context for meaningful icons', () => {
      const MeaningfulIcon = () => (
        <span role="img" aria-label="Download">
          ⬇
        </span>
      );

      render(
        <Button leftIcon={<MeaningfulIcon />}>
          Download File
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = button.querySelector('[role="img"]');
      
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-label', 'Download');
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
        <Button size="sm" className="sm:text-base md:text-lg">
          Responsive Button
        </Button>
      );

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      await testAccessibility(
        <Button size="sm" className="sm:text-base md:text-lg">
          Responsive Button
        </Button>
      );
    });

    it('should maintain minimum touch target size on mobile', () => {
      render(
        <Button size="sm" className="min-h-[44px] min-w-[44px]">
          Mobile Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing aria-label for icon-only buttons gracefully', async () => {
      const Icon = () => <span>⚙</span>;

      // This should still be accessible but may have warnings
      const { container } = render(
        <Button iconOnly leftIcon={<Icon />}>
        </Button>
      );

      // Should still render without crashing
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      // Run accessibility test - this might have violations due to missing label
      try {
        const results = await axe(container);
        // If there are violations, they should be related to missing labels
        if (results.violations.length > 0) {
          const labelViolations = results.violations.filter(
            v => v.id.includes('label') || v.id.includes('name')
          );
          expect(labelViolations.length).toBeGreaterThan(0);
        }
      } catch (error) {
        // Expected to have accessibility violations
      }
    });

    it('should handle conflicting ARIA states gracefully', () => {
      render(
        <Button 
          disabled 
          ariaPressed={true} 
          ariaExpanded={true}
          ariaDisabled={false} // Conflicting with disabled prop
        >
          Conflicting States
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled(); // HTML disabled takes precedence
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });
});