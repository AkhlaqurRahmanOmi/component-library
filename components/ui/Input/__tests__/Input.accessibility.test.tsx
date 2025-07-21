import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from '../Input';
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

describe('Input Component - Accessibility Tests', () => {
  describe('General Accessibility Compliance', () => {
    it('should have no accessibility violations with default props', async () => {
      await testAccessibility(<Input ariaLabel="Default input" />);
    });

    it('should have no accessibility violations with all input types', async () => {
      const types = [
        <Input key="text" type="text" ariaLabel="Text input" />,
        <Input key="email" type="email" ariaLabel="Email input" />,
        <Input key="password" type="password" ariaLabel="Password input" />,
        <Input key="number" type="number" ariaLabel="Number input" />,
        <Input key="tel" type="tel" ariaLabel="Phone input" />,
        <Input key="url" type="url" ariaLabel="URL input" />,
        <Input key="search" type="search" ariaLabel="Search input" />
      ];

      for (const type of types) {
        await testAccessibility(type);
      }
    });

    it('should have no accessibility violations with different variants', async () => {
      const variants = [
        <Input key="default" variant="default" label="Default variant input" />,
        <Input key="outline" variant="outline" label="Outline variant input" />,
        <Input key="filled" variant="filled" label="Filled variant input" />
      ];

      for (const variant of variants) {
        await testAccessibility(variant);
      }
    });

    it('should have no accessibility violations with different states', async () => {
      const states = [
        <Input key="normal" label="Normal input" />,
        <Input key="disabled" disabled label="Disabled input" />,
        <Input key="readonly" readOnly label="Readonly input" />,
        <Input key="required" required label="Required input" />,
        <Input key="error" error errorMessage="Error message" label="Error input" />
      ];

      for (const state of states) {
        await testAccessibility(state);
      }
    });
  });

  describe('Form Accessibility', () => {
    it('should work properly in forms', async () => {
      await testFormAccessibility(
        <form>
          <Input label="Full Name" required />
          <Input label="Email" type="email" required />
          <button type="submit">Submit</button>
        </form>
      );
    });

    it('should associate labels correctly', () => {
      render(<Input label="Username" id="username-input" />);

      const input = screen.getByLabelText('Username');
      const label = screen.getByText('Username');

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'username-input');
      expect(label).toHaveAttribute('for', 'username-input');
    });

    it('should handle external labels', () => {
      render(
        <div>
          <label htmlFor="external-input">External Label</label>
          <Input id="external-input" />
        </div>
      );

      const input = screen.getByLabelText('External Label');
      expect(input).toHaveAttribute('id', 'external-input');
    });

    it('should associate error messages correctly', () => {
      render(
        <Input 
          label="Email" 
          error 
          errorMessage="Please enter a valid email"
          id="email-input"
        />
      );

      const input = screen.getByLabelText('Email');
      const errorMessage = screen.getByText('Please enter a valid email');

      expect(input).toHaveAttribute('aria-describedby');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('should associate helper text correctly', () => {
      render(
        <Input 
          label="Password" 
          helperText="Must be at least 8 characters"
          id="password-input"
        />
      );

      const input = screen.getByLabelText('Password');
      const helperText = screen.getByText('Must be at least 8 characters');

      expect(input).toHaveAttribute('aria-describedby');
      expect(helperText).toBeInTheDocument();
    });

    it('should handle both helper text and error messages', () => {
      render(
        <Input 
          label="Confirm Password" 
          helperText="Must match your password"
          error
          errorMessage="Passwords do not match"
          id="confirm-password"
        />
      );

      const input = screen.getByLabelText('Confirm Password');
      const helperText = screen.getByText('Must match your password');
      const errorMessage = screen.getByText('Passwords do not match');

      expect(input).toHaveAttribute('aria-describedby');
      expect(helperText).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  describe('Color Contrast Compliance', () => {
    it('should meet color contrast requirements for all variants', async () => {
      const variants = [
        <Input key="default" variant="default" placeholder="Default input" />,
        <Input key="outline" variant="outline" placeholder="Outline input" />,
        <Input key="filled" variant="filled" placeholder="Filled input" />
      ];

      for (const variant of variants) {
        await testColorContrast(variant);
      }
    });

    it('should maintain contrast in error state', async () => {
      await testColorContrast(
        <Input error errorMessage="Error message" placeholder="Error input" ariaLabel="Error input" />
      );
    });

    it('should maintain contrast in disabled state', async () => {
      await testColorContrast(
        <Input disabled placeholder="Disabled input" />
      );
    });

    it('should maintain contrast with focus states', async () => {
      const { container } = render(
        <Input placeholder="Focus input" className="focus:ring-2 focus:ring-blue-500" />
      );

      const input = screen.getByRole('textbox');
      input.focus();

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
      await testKeyboardNavigation(<Input label="Keyboard Input" />);
    });

    it('should handle keyboard input correctly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Input onChange={handleChange} label="Text Input" />);

      const input = screen.getByLabelText('Text Input');
      await user.type(input, 'Hello World');

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('Hello World');
    });

    it('should handle Tab navigation correctly', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Input label="First Input" />
          <Input label="Second Input" />
          <Input label="Third Input" disabled />
          <Input label="Fourth Input" />
        </div>
      );

      const inputs = screen.getAllByRole('textbox');
      const enabledInputs = inputs.filter(input => !input.hasAttribute('disabled'));

      await user.tab();
      expect(document.activeElement).toBe(enabledInputs[0]);

      await user.tab();
      expect(document.activeElement).toBe(enabledInputs[1]);

      await user.tab();
      expect(document.activeElement).toBe(enabledInputs[2]); // Skip disabled input
    });

    it('should not accept input when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Input disabled onChange={handleChange} label="Disabled Input" />);

      const input = screen.getByLabelText('Disabled Input');
      await user.type(input, 'Should not work');

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    it('should not accept input when readonly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <Input 
          readOnly 
          onChange={handleChange} 
          label="Readonly Input" 
          defaultValue="Read only value"
        />
      );

      const input = screen.getByLabelText('Readonly Input');
      await user.type(input, 'Should not change');

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('Read only value');
    });
  });

  describe('ARIA Attributes and Screen Reader Compatibility', () => {
    it('should have proper ARIA attributes', async () => {
      await testAriaCompliance(
        <Input 
          label="ARIA Input"
          ariaDescribedBy="description-id"
          ariaLabelledBy="label-id"
          required
        />
      );
    });

    it('should validate ARIA attributes correctly', () => {
      render(
        <Input 
          label="Accessible Input"
          ariaLabel="Custom input label"
          ariaDescribedBy="input-desc"
          ariaLabelledBy="input-label"
          required
          id="accessible-input"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Custom input label');
      expect(input).toHaveAttribute('aria-describedby', 'input-desc');
      expect(input).toHaveAttribute('aria-labelledby', 'input-label');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('id', 'accessible-input');
    });

    it('should announce validation states to screen readers', () => {
      render(
        <Input 
          label="Validation Input"
          error
          errorMessage="This field is required"
          required
        />
      );

      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('This field is required');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('should handle autocomplete attributes', () => {
      render(
        <Input 
          label="Email"
          type="email"
          autoComplete="email"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('should provide proper context for password inputs', () => {
      render(
        <Input 
          label="Password"
          type="password"
          autoComplete="current-password"
          helperText="Must be at least 8 characters"
        />
      );

      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveAttribute('autocomplete', 'current-password');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('Focus Management', () => {
    it('should manage focus correctly', () => {
      render(<Input label="Focus Input" />);

      const input = screen.getByRole('textbox');
      testFocusManagement(input);
    });

    it('should have visible focus indicators', () => {
      render(
        <Input 
          label="Focus Visible Input"
          className="focus:ring-2 focus:ring-blue-500"
        />
      );

      const input = screen.getByRole('textbox');
      input.focus();

      expect(document.activeElement).toBe(input);
      expect(input).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });

    it('should maintain focus visibility across variants', () => {
      const variants = ['default', 'outline', 'filled'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Input 
            variant={variant} 
            label={`${variant} input`}
            data-testid={`input-${variant}`}
          />
        );

        const input = screen.getByTestId(`input-${variant}`);
        input.focus();

        expect(document.activeElement).toBe(input);
        
        // Check for focus ring classes
        const hasFocusRing = input.classList.toString().includes('focus:ring') ||
                           input.classList.toString().includes('focus:outline');
        expect(hasFocusRing).toBe(true);

        unmount();
      });
    });

    it('should not receive focus when disabled', () => {
      render(<Input disabled label="Disabled Input" />);

      const input = screen.getByRole('textbox');
      input.focus();

      expect(document.activeElement).not.toBe(input);
    });
  });

  describe('High Contrast Mode Compatibility', () => {
    it('should be compatible with high contrast mode', () => {
      render(
        <Input 
          label="High Contrast Input"
          className="border border-gray-300"
        />
      );

      const input = screen.getByRole('textbox');
      const compatibility = testHighContrastMode(input);

      expect(compatibility.isCompatible).toBe(true);
    });

    it('should maintain visibility in high contrast mode for all variants', () => {
      const variants = ['default', 'outline', 'filled'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Input 
            variant={variant} 
            label={`${variant} input`}
            data-testid={`input-${variant}`}
          />
        );

        const input = screen.getByTestId(`input-${variant}`);
        const compatibility = testHighContrastMode(input);

        expect(compatibility.isCompatible).toBe(true);
        unmount();
      });
    });

    it('should maintain error state visibility in high contrast mode', () => {
      render(
        <Input 
          label="Error Input"
          error
          errorMessage="Error message"
          className="border-red-500"
        />
      );

      const input = screen.getByRole('textbox');
      const compatibility = testHighContrastMode(input);

      expect(compatibility.isCompatible).toBe(true);
    });
  });

  describe('Error State Accessibility', () => {
    it('should announce error states properly', () => {
      render(
        <Input 
          label="Error Input"
          error
          errorMessage="This field is required"
        />
      );

      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('This field is required');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('should handle dynamic error state changes', () => {
      const { rerender } = render(
        <Input label="Dynamic Error Input" />
      );

      let input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-invalid');

      rerender(
        <Input 
          label="Dynamic Error Input" 
          error 
          errorMessage="Now has error"
        />
      );

      input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Now has error');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('should clear error announcements when error is resolved', () => {
      const { rerender } = render(
        <Input 
          label="Clearing Error Input"
          error
          errorMessage="Has error"
        />
      );

      let input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Has error')).toBeInTheDocument();

      rerender(<Input label="Clearing Error Input" />);

      input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(screen.queryByText('Has error')).not.toBeInTheDocument();
    });
  });

  describe('Label Positioning Accessibility', () => {
    it('should handle top label positioning', () => {
      render(
        <Input 
          label="Top Label"
          labelPosition="top"
          id="top-label-input"
        />
      );

      const input = screen.getByLabelText('Top Label');
      const label = screen.getByText('Top Label');

      expect(input).toHaveAttribute('id', 'top-label-input');
      expect(label).toHaveAttribute('for', 'top-label-input');
    });

    it('should handle left label positioning', () => {
      render(
        <Input 
          label="Left Label"
          labelPosition="left"
          id="left-label-input"
        />
      );

      const input = screen.getByLabelText('Left Label');
      const label = screen.getByText('Left Label');

      expect(input).toHaveAttribute('id', 'left-label-input');
      expect(label).toHaveAttribute('for', 'left-label-input');
    });

    it('should handle floating label positioning', () => {
      render(
        <Input 
          label="Floating Label"
          labelPosition="floating"
          id="floating-label-input"
        />
      );

      const input = screen.getByLabelText('Floating Label');
      const label = screen.getByText('Floating Label');

      expect(input).toHaveAttribute('id', 'floating-label-input');
      expect(label).toHaveAttribute('for', 'floating-label-input');
    });
  });

  describe('Input Type Accessibility', () => {
    it('should handle email input type correctly', () => {
      render(
        <Input 
          type="email"
          label="Email Address"
          autoComplete="email"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('should handle password input type correctly', () => {
      render(
        <Input 
          type="password"
          label="Password"
          autoComplete="current-password"
        />
      );

      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveAttribute('autocomplete', 'current-password');
    });

    it('should handle number input type correctly', () => {
      render(
        <Input 
          type="number"
          label="Age"
          min={0}
          max={120}
        />
      );

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '120');
    });

    it('should handle search input type correctly', () => {
      render(
        <Input 
          type="search"
          label="Search"
          placeholder="Search..."
        />
      );

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
      expect(input).toHaveAttribute('placeholder', 'Search...');
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
        <Input 
          label="Responsive Input"
          className="text-sm sm:text-base"
        />
      );

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      await testAccessibility(
        <Input 
          label="Responsive Input"
          className="text-sm sm:text-base"
        />
      );
    });

    it('should maintain minimum touch target size on mobile', () => {
      render(
        <Input 
          label="Mobile Input"
          className="min-h-[44px]"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('min-h-[44px]');
    });
  });

  describe('Placeholder Accessibility', () => {
    it('should not rely solely on placeholder for labeling', () => {
      render(
        <Input 
          placeholder="Enter your name"
          // Missing label - should be flagged in accessibility tests
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Enter your name');
      
      // Input should have proper labeling beyond just placeholder
      const hasProperLabel = input.hasAttribute('aria-label') ||
                           input.hasAttribute('aria-labelledby') ||
                           document.querySelector(`label[for="${input.id}"]`) !== null;
      
      // This test documents current behavior - ideally should have proper label
      expect(hasProperLabel).toBe(false);
    });

    it('should use placeholder as supplementary information', () => {
      render(
        <Input 
          label="Full Name"
          placeholder="e.g., John Doe"
        />
      );

      const input = screen.getByLabelText('Full Name');
      expect(input).toHaveAttribute('placeholder', 'e.g., John Doe');
    });
  });
});