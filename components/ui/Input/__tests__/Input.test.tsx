import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import type { InputProps } from '../Input.types';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders with different input types', () => {
      const types = [
        'email', 'password', 'number', 'tel', 'url', 'search',
        'date', 'time', 'datetime-local', 'month', 'week'
      ] as const;
      
      types.forEach((type) => {
        const { unmount } = render(<Input type={type} data-testid={`input-${type}`} />);
        const input = screen.getByTestId(`input-${type}`);
        expect(input).toHaveAttribute('type', type);
        unmount();
      });
    });

    it('renders with placeholder text', () => {
      render(<Input placeholder="Enter your name" />);
      const input = screen.getByPlaceholderText('Enter your name');
      expect(input).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Input className="custom-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input');
    });

    it('generates unique IDs when not provided', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id');
      expect(input.id).not.toBe('');
    });
  });

  describe('Value and Change Handling', () => {
    it('handles controlled input correctly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      render(<Input value="initial" onChange={handleChange} />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('initial');
      
      await user.clear(input);
      await user.type(input, 'new value');
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles uncontrolled input correctly', async () => {
      const user = userEvent.setup();
      
      render(<Input defaultValue="default" />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('default');
      
      await user.clear(input);
      await user.type(input, 'typed value');
      
      expect(input.value).toBe('typed value');
    });

    it('handles input events correctly', async () => {
      const user = userEvent.setup();
      const handleInput = jest.fn();
      const handleChangeCapture = jest.fn();
      const handleSelect = jest.fn();
      
      render(
        <Input 
          onInput={handleInput}
          onChangeCapture={handleChangeCapture}
          onSelect={handleSelect}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(handleInput).toHaveBeenCalled();
      expect(handleChangeCapture).toHaveBeenCalled();
      
      // Trigger select event
      input.setSelectionRange(0, 4);
      input.dispatchEvent(new Event('select', { bubbles: true }));
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  describe('Styling Props', () => {
    it('applies size classes correctly', () => {
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'] as const;
      
      sizes.forEach((size) => {
        const { unmount } = render(<Input size={size} data-testid={`input-${size}`} />);
        const input = screen.getByTestId(`input-${size}`);
        
        if (size === 'xs') {
          expect(input).toHaveClass('px-2', 'py-1', 'text-xs');
        } else if (size === 'sm') {
          expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');
        } else if (size === 'lg') {
          expect(input).toHaveClass('px-6', 'py-3', 'text-lg');
        } else if (size === 'xl') {
          expect(input).toHaveClass('px-8', 'py-4', 'text-xl');
        } else if (size === '2xl') {
          expect(input).toHaveClass('px-10', 'py-5', 'text-2xl');
        } else {
          expect(input).toHaveClass('px-4', 'py-2', 'text-base');
        }
        unmount();
      });
    });

    it('applies variant classes correctly', () => {
      const variants = ['default', 'outline', 'filled', 'underline'] as const;
      
      variants.forEach((variant) => {
        const { unmount } = render(<Input variant={variant} data-testid={`input-${variant}`} />);
        const input = screen.getByTestId(`input-${variant}`);
        
        if (variant === 'outline') {
          expect(input).toHaveClass('border-2');
        } else if (variant === 'filled') {
          expect(input).toHaveClass('bg-gray-50');
        } else if (variant === 'underline') {
          expect(input).toHaveClass('border-0', 'border-b-2', 'rounded-none');
        } else {
          expect(input).toHaveClass('border-gray-300');
        }
        unmount();
      });
    });

    it('applies state classes correctly', () => {
      const states: Array<InputProps['state']> = ['default', 'error', 'success', 'warning'];
      
      states.forEach((state) => {
        const { unmount } = render(<Input state={state} data-testid={`input-${state}`} />);
        const input = screen.getByTestId(`input-${state}`);
        
        if (state === 'error') {
          expect(input).toHaveClass('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        } else if (state === 'success') {
          expect(input).toHaveClass('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
        } else if (state === 'warning') {
          expect(input).toHaveClass('border-yellow-500', 'focus:border-yellow-500', 'focus:ring-yellow-500');
        } else {
          expect(input).toHaveClass('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');
        }
        unmount();
      });
    });

    it('applies full width correctly', () => {
      render(<Input fullWidth />);
      const input = screen.getByRole('textbox');
      const wrapper = input.parentElement?.parentElement;
      expect(wrapper).toHaveClass('w-full');
    });
  });

  describe('State Props', () => {
    it('handles disabled state correctly', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('handles readonly state correctly', () => {
      render(<Input readonly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('handles required state correctly', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('prevents interaction when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      render(<Input disabled onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('allows interaction when readonly', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(<Input readonly onFocus={handleFocus} onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Validation Props', () => {
    it('displays error state correctly', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('displays error message', () => {
      render(<Input error errorMessage="This field is required" />);
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-600');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('displays helper text', () => {
      render(<Input helperText="Enter at least 8 characters" />);
      const helperText = screen.getByText('Enter at least 8 characters');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('text-gray-600');
    });

    it('displays success message', () => {
      render(<Input successMessage="Input is valid" />);
      const successMessage = screen.getByText('Input is valid');
      expect(successMessage).toBeInTheDocument();
      expect(successMessage).toHaveClass('text-green-600');
    });

    it('shows both error message and helper text when both are provided', () => {
      render(
        <Input 
          error 
          errorMessage="Error occurred" 
          helperText="Helper text" 
        />
      );
      
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('prioritizes error state over success state', () => {
      render(
        <Input 
          error 
          errorMessage="Error message" 
          successMessage="Success message" 
        />
      );
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });

    it('handles pattern validation', async () => {
      const user = userEvent.setup();
      const handleInvalid = jest.fn();
      
      render(
        <Input 
          pattern="[A-Za-z]{3}" 
          required 
          onInvalid={handleInvalid}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, '123');
      
      // Trigger form validation
      const form = document.createElement('form');
      form.appendChild(input.cloneNode(true));
      form.checkValidity();
      input.dispatchEvent(new Event('invalid', { bubbles: true }));
      
      expect(handleInvalid).toHaveBeenCalled();
    });
  });

  describe('Label Props', () => {
    it('renders label correctly', () => {
      render(<Input label="Username" />);
      const label = screen.getByText('Username');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('associates label with input correctly', () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('handles different label positions', () => {
      const positions: Array<InputProps['labelPosition']> = ['top', 'left', 'floating'];
      
      positions.forEach((position) => {
        const { unmount } = render(
          <Input 
            label="Test Label" 
            labelPosition={position} 
            data-testid={`input-${position}`} 
          />
        );
        
        const container = screen.getByTestId(`input-${position}`).parentElement;
        
        if (position === 'left') {
          expect(container?.parentElement).toHaveClass('flex');
        } else if (position === 'floating') {
          expect(container).toHaveClass('relative');
        }
        unmount();
      });
    });

    it('shows required indicator when required', () => {
      render(<Input label="Required Field" required />);
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveClass('text-red-500');
    });

    it('handles hidden label correctly', () => {
      render(<Input label="Hidden Label" hideLabel />);
      const label = screen.getByText('Hidden Label');
      expect(label).toHaveClass('sr-only');
    });

    it('handles floating label correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <Input 
          label="Floating Label" 
          labelPosition="floating"
          placeholder="Enter value"
        />
      );
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Floating Label');
      
      // Floating label should not have placeholder when floating
      expect(input).not.toHaveAttribute('placeholder');
      
      // Check label positioning
      expect(label).toHaveClass('absolute');
      
      // Type in the input to activate floating label
      await user.type(input, 'test');
      expect(label).toHaveClass('text-xs');
    });
  });

  describe('Layout Props', () => {
    it('applies margin classes correctly', () => {
      render(<Input margin="4" />);
      const container = screen.getByRole('textbox').closest('div');
      expect(container).toHaveClass('m-4');
    });

    it('applies directional margin classes correctly', () => {
      render(
        <Input 
          marginTop="2" 
          marginRight="4" 
          marginBottom="6" 
          marginLeft="8"
          marginX="3"
          marginY="5"
        />
      );
      
      const container = screen.getByRole('textbox').closest('div');
      expect(container).toHaveClass('mt-2', 'mr-4', 'mb-6', 'ml-8', 'mx-3', 'my-5');
    });
  });

  describe('Accessibility', () => {
    it('applies ARIA attributes correctly', () => {
      render(
        <Input 
          ariaLabel="Search input"
          ariaDescribedBy="search-help"
          ariaLabelledBy="search-label"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search input');
      expect(input).toHaveAttribute('aria-describedby', 'search-help');
      expect(input).toHaveAttribute('aria-labelledby', 'search-label');
    });

    it('associates error message with input via aria-describedby', () => {
      render(<Input error errorMessage="Invalid input" id="test-input" />);
      
      const input = screen.getByRole('textbox');
      const errorId = `${input.id}-error`;
      
      expect(input).toHaveAttribute('aria-describedby', errorId);
      expect(screen.getByText('Invalid input')).toHaveAttribute('id', errorId);
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<Input helperText="Help text" id="test-input" />);
      
      const input = screen.getByRole('textbox');
      const helpId = `${input.id}-helper`;
      
      expect(input).toHaveAttribute('aria-describedby', helpId);
      expect(screen.getByText('Help text')).toHaveAttribute('id', helpId);
    });

    it('combines multiple aria-describedby references correctly', () => {
      render(
        <Input 
          helperText="Help text" 
          error 
          errorMessage="Error message" 
          ariaDescribedBy="external-description"
          id="test-input" 
        />
      );
      
      const input = screen.getByRole('textbox');
      const helpId = `${input.id}-helper`;
      const errorId = `${input.id}-error`;
      
      expect(input).toHaveAttribute('aria-describedby', `external-description ${helpId} ${errorId}`);
    });

    it('sets aria-invalid when in error state', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      const handleKeyUp = jest.fn();
      const handleKeyPress = jest.fn();
      
      render(
        <Input 
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.tab();
      expect(input).toHaveFocus();
      
      await user.keyboard('{ArrowDown}');
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes correctly', () => {
      render(
        <Input 
          id="custom-id"
          name="username"
          autoComplete="username"
          maxLength={50}
          minLength={3}
          pattern="[A-Za-z]+"
          min={0}
          max={100}
          step={5}
          autoFocus
          form="login-form"
          data-testid="custom-input"
        />
      );
      
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('id', 'custom-id');
      expect(input).toHaveAttribute('name', 'username');
      expect(input).toHaveAttribute('autocomplete', 'username');
      expect(input).toHaveAttribute('maxlength', '50');
      expect(input).toHaveAttribute('minlength', '3');
      expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
      expect(input).toHaveAttribute('step', '5');
      expect(input).toHaveAttribute('form', 'login-form');
      expect(input).toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <Input name="testField" />
          <button type="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button');
      
      await user.type(input, 'test value');
      await user.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('validates on blur when validation is enabled', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();
      
      render(<Input onBlur={handleBlur} required />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles form validation correctly', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());
      const handleInvalid = jest.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <Input 
            name="email" 
            type="email" 
            required 
            onInvalid={handleInvalid}
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button');
      
      // Try to submit with invalid input
      await user.type(input, 'not-an-email');
      await user.click(submitButton);
      
      // Form should not submit with invalid data
      expect(handleSubmit).not.toHaveBeenCalled();
      
      // Fix the input and try again
      await user.clear(input);
      await user.type(input, 'valid@email.com');
      await user.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing id gracefully', () => {
      render(<Input label="No ID Label" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('No ID Label');
      
      expect(input).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('handles number input type correctly', async () => {
      const user = userEvent.setup();
      
      render(<Input type="number" min={0} max={100} />);
      
      const input = screen.getByRole('spinbutton');
      await user.type(input, '123');
      
      expect(input).toHaveValue(123);
    });

    it('handles date input type correctly', async () => {
      render(<Input type="date" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'date');
    });

    it('combines multiple classes correctly', () => {
      render(
        <Input 
          size="lg"
          variant="outline"
          error
          fullWidth
          className="custom-class"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-2', 'border-red-500', 'text-lg');
      
      const wrapper = input.closest('div')?.parentElement;
      expect(wrapper).toHaveClass('w-full');
    });

    it('handles undefined props gracefully', () => {
      render(
        <Input 
          size={undefined}
          variant={undefined}
          state={undefined}
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      // Should use default values
      expect(input).toHaveClass('px-4', 'py-2', 'text-base', 'border-gray-300');
    });
  });

  describe('Input Wrapper Component', () => {
    it('renders wrapper with correct classes', () => {
      render(<Input fullWidth margin="4" />);
      
      const wrapper = screen.getByRole('textbox').closest('div')?.parentElement;
      expect(wrapper).toHaveClass('inline-block', 'w-full', 'm-4');
    });
  });

  describe('Input Label Component', () => {
    it('renders label with correct styles based on state', () => {
      const states: Array<InputProps['state']> = ['default', 'error', 'success', 'warning'];
      
      states.forEach((state) => {
        const { unmount } = render(
          <Input 
            label={`${state} Label`}
            state={state}
          />
        );
        
        const label = screen.getByText(`${state} Label`);
        
        if (state === 'error') {
          expect(label).toHaveClass('text-red-700');
        } else if (state === 'success') {
          expect(label).toHaveClass('text-green-700');
        } else if (state === 'warning') {
          expect(label).toHaveClass('text-yellow-700');
        } else {
          expect(label).toHaveClass('text-gray-700');
        }
        
        unmount();
      });
    });

    it('applies disabled styling to label', () => {
      render(<Input label="Disabled Label" disabled />);
      
      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass('text-gray-400');
    });
  });

  describe('Input Helper Text Component', () => {
    it('renders helper text with correct styles based on state', () => {
      const states: Array<InputProps['state']> = ['default', 'error', 'success', 'warning'];
      
      states.forEach((state) => {
        const { unmount } = render(
          <Input 
            helperText={`${state} helper text`}
            state={state}
          />
        );
        
        const helperText = screen.getByText(`${state} helper text`);
        
        if (state === 'error') {
          expect(helperText).toHaveClass('text-red-600');
        } else if (state === 'success') {
          expect(helperText).toHaveClass('text-green-600');
        } else if (state === 'warning') {
          expect(helperText).toHaveClass('text-yellow-600');
        } else {
          expect(helperText).toHaveClass('text-gray-600');
        }
        
        unmount();
      });
    });
  });
});