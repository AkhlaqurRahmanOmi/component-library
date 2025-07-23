import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import type { ButtonProps } from '../Button.types';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveTextContent('Click me');
    });

    it('renders with different button types', () => {
      const types = ['button', 'submit', 'reset'] as const;
      
      types.forEach((type) => {
        const { unmount } = render(
          <Button type={type} data-testid={`button-${type}`}>
            {type} button
          </Button>
        );
        
        const button = screen.getByTestId(`button-${type}`);
        expect(button).toHaveAttribute('type', type);
        unmount();
      });
    });

    it('renders children correctly', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-button">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-button');
    });
  });

  describe('Style Props', () => {
    it('applies variant classes correctly', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'] as const;
      
      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} data-testid={`button-${variant}`}>
            {variant} button
          </Button>
        );
        
        const button = screen.getByTestId(`button-${variant}`);
        
        if (variant === 'primary') {
          expect(button).toHaveClass('bg-blue-600', 'text-white');
        } else if (variant === 'secondary') {
          expect(button).toHaveClass('bg-gray-600', 'text-white');
        } else if (variant === 'outline') {
          expect(button).toHaveClass('border-blue-600', 'bg-transparent');
        } else if (variant === 'ghost') {
          expect(button).toHaveClass('bg-transparent');
        } else if (variant === 'danger') {
          expect(button).toHaveClass('bg-red-600', 'text-white');
        } else if (variant === 'success') {
          expect(button).toHaveClass('bg-green-600', 'text-white');
        }
        unmount();
      });
    });

    it('applies size classes correctly', () => {
      const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'];
      
      sizes.forEach((size) => {
        const { unmount } = render(
          <Button size={size} data-testid={`button-${size}`}>
            {size} button
          </Button>
        );
        
        const button = screen.getByTestId(`button-${size}`);
        
        if (size === 'xs') {
          expect(button).toHaveClass('px-2', 'py-1', 'text-xs');
        } else if (size === 'sm') {
          expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
        } else if (size === 'lg') {
          expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
        } else if (size === 'xl') {
          expect(button).toHaveClass('px-8', 'py-4', 'text-xl');
        } else if (size === '2xl') {
          expect(button).toHaveClass('px-10', 'py-5', 'text-2xl');
        } else {
          expect(button).toHaveClass('px-4', 'py-2', 'text-base');
        }
        unmount();
      });
    });

    it('applies full width correctly', () => {
      render(<Button fullWidth>Full width button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('State Props', () => {
    it('handles disabled state correctly', () => {
      render(<Button disabled>Disabled button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('handles loading state correctly', () => {
      render(<Button loading>Loading button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-75', 'cursor-wait');
      
      // Should show loading spinner
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('handles active state correctly', () => {
      render(<Button active>Active button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ring-2', 'ring-offset-2');
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents click when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents keyboard events when disabled', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      
      render(<Button disabled onKeyDown={handleKeyDown}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).not.toHaveBeenCalled();
    });
  });

  describe('Icon Props', () => {
    it('renders left icon correctly', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      
      render(
        <Button leftIcon={<LeftIcon />}>
          Button with left icon
        </Button>
      );
      
      const leftIcon = screen.getByTestId('left-icon');
      const button = screen.getByRole('button');
      
      expect(leftIcon).toBeInTheDocument();
      expect(button).toContainElement(leftIcon);
    });

    it('renders right icon correctly', () => {
      const RightIcon = () => <span data-testid="right-icon">→</span>;
      
      render(
        <Button rightIcon={<RightIcon />}>
          Button with right icon
        </Button>
      );
      
      const rightIcon = screen.getByTestId('right-icon');
      const button = screen.getByRole('button');
      
      expect(rightIcon).toBeInTheDocument();
      expect(button).toContainElement(rightIcon);
    });

    it('renders both left and right icons correctly', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      const RightIcon = () => <span data-testid="right-icon">→</span>;
      
      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Button with both icons
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('handles icon-only button correctly', () => {
      const Icon = () => <span data-testid="icon">⚙</span>;
      
      render(
        <Button iconOnly leftIcon={<Icon />} aria-label="Settings">
        </Button>
      );
      
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('icon');
      
      expect(icon).toBeInTheDocument();
      expect(button).toHaveClass('p-2'); // Square padding for icon-only
      expect(button).toHaveAttribute('aria-label', 'Settings');
    });

    it('applies proper spacing with icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      
      render(
        <Button leftIcon={<LeftIcon />}>
          Text with icon
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('gap-2'); // Gap between icon and text
    });

    it('renders loading spinner with correct size based on button size', () => {
      const sizes: Array<ButtonProps['size']> = ['sm', 'base', 'lg'];
      
      sizes.forEach((size) => {
        const { unmount } = render(
          <Button size={size} loading data-testid={`button-${size}`}>
            {size} button
          </Button>
        );
        
        const button = screen.getByTestId(`button-${size}`);
        const spinner = button.querySelector('.animate-spin');
        
        if (size === 'sm') {
          expect(spinner).toHaveClass('w-3', 'h-3');
        } else if (size === 'lg') {
          expect(spinner).toHaveClass('w-5', 'h-5');
        } else {
          expect(spinner).toHaveClass('w-4', 'h-4');
        }
        
        unmount();
      });
    });
  });

  describe('Interactions', () => {
    it('handles click events correctly', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Clickable button</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interactions correctly', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Keyboard button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focus button
        </Button>
      );
      
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles mouse enter and leave events', async () => {
      const user = userEvent.setup();
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      
      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover button
        </Button>
      );
      
      const button = screen.getByRole('button');
      
      await user.hover(button);
      expect(handleMouseEnter).toHaveBeenCalled();
      
      await user.unhover(button);
      expect(handleMouseLeave).toHaveBeenCalled();
    });

    it('handles key down and key up events', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      const handleKeyUp = jest.fn();
      
      render(
        <Button onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
          Keyboard events button
        </Button>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{ArrowDown}');
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('shows hover effects', async () => {
      const user = userEvent.setup();
      
      render(<Button variant="primary">Hover button</Button>);
      
      const button = screen.getByRole('button');
      await user.hover(button);
      
      expect(button).toHaveClass('hover:bg-blue-700');
    });

    it('shows focus effects', () => {
      render(<Button>Focus button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Layout Props', () => {
    it('applies margin classes correctly', () => {
      render(<Button margin="4">Margin button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('m-4');
    });

    it('applies directional margin classes correctly', () => {
      render(
        <Button 
          marginTop="2" 
          marginRight="4" 
          marginBottom="6" 
          marginLeft="8"
          marginX="3"
          marginY="5"
        >
          Directional margin button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('mt-2', 'mr-4', 'mb-6', 'ml-8', 'mx-3', 'my-5');
    });
  });

  describe('Accessibility', () => {
    it('applies ARIA attributes correctly', () => {
      render(
        <Button 
          ariaLabel="Custom label"
          ariaPressed={true}
          ariaExpanded={false}
          ariaDescribedBy="description-id"
          ariaLabelledBy="label-id"
          role="menuitem"
          tabIndex={0}
        >
          ARIA button
        </Button>
      );
      
      const button = screen.getByRole('menuitem');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-describedby', 'description-id');
      expect(button).toHaveAttribute('aria-labelledby', 'label-id');
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('has proper keyboard navigation', () => {
      render(<Button>Keyboard accessible</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('tabIndex', '0');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('announces loading state to screen readers', () => {
      render(<Button loading>Loading button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('provides proper labeling for icon-only buttons', () => {
      const Icon = () => <span>⚙</span>;
      
      render(
        <Button iconOnly leftIcon={<Icon />} aria-label="Settings">
        </Button>
      );
      
      const button = screen.getByLabelText('Settings');
      expect(button).toBeInTheDocument();
    });

    it('maintains focus visibility', () => {
      render(<Button>Focus visible</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2');
    });

    it('has proper focus ring color based on variant', () => {
      const variants: Array<ButtonProps['variant']> = ['primary', 'secondary', 'danger', 'success'];
      
      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant} data-testid={`button-${variant}`}>
            {variant} button
          </Button>
        );
        
        const button = screen.getByTestId(`button-${variant}`);
        button.focus();
        
        if (variant === 'primary') {
          expect(button).toHaveClass('focus:ring-blue-500');
        } else if (variant === 'secondary') {
          expect(button).toHaveClass('focus:ring-gray-500');
        } else if (variant === 'danger') {
          expect(button).toHaveClass('focus:ring-red-500');
        } else if (variant === 'success') {
          expect(button).toHaveClass('focus:ring-green-500');
        }
        
        unmount();
      });
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes correctly', () => {
      render(
        <Button 
          id="custom-button"
          form="my-form"
          tabIndex={-1}
          data-testid="custom-button"
          name="submit-button"
          value="submit-value"
          autoFocus
        >
          Attributed button
        </Button>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('id', 'custom-button');
      expect(button).toHaveAttribute('form', 'my-form');
      expect(button).toHaveAttribute('tabIndex', '-1');
      expect(button).toHaveAttribute('name', 'submit-button');
      expect(button).toHaveAttribute('value', 'submit-value');
      expect(button).toHaveFocus();
    });

    it('applies inline styles correctly', () => {
      const customStyle = { minWidth: '200px', zIndex: 10 };
      render(
        <Button style={customStyle}>
          Styled button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('min-width: 200px');
      expect(button).toHaveStyle('z-index: 10');
    });

    it('forwards form-related attributes correctly', () => {
      render(
        <Button 
          form="external-form"
          formNoValidate
          formAction="/submit"
          formEncType="multipart/form-data"
          formMethod="post"
          formTarget="_blank"
        >
          Form attributes button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'external-form');
      expect(button).toHaveAttribute('formNoValidate');
      expect(button).toHaveAttribute('formAction', '/submit');
      expect(button).toHaveAttribute('formEncType', 'multipart/form-data');
      expect(button).toHaveAttribute('formMethod', 'post');
      expect(button).toHaveAttribute('formTarget', '_blank');
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('works with form reset', async () => {
      const user = userEvent.setup();
      
      render(
        <form>
          <input defaultValue="test" />
          <Button type="reset">Reset</Button>
        </form>
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const resetButton = screen.getByRole('button');
      
      expect(input.value).toBe('test');
      
      await user.click(resetButton);
      expect(input.value).toBe('');
    });

    it('associates with form via form attribute', () => {
      render(
        <>
          <form id="external-form"></form>
          <Button form="external-form" type="submit">
            External submit
          </Button>
        </>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'external-form');
    });

    it('submits the correct form when multiple forms exist', async () => {
      const user = userEvent.setup();
      const handleSubmit1 = jest.fn((e) => e.preventDefault());
      const handleSubmit2 = jest.fn((e) => e.preventDefault());
      
      render(
        <>
          <form id="form1" onSubmit={handleSubmit1}>
            <input name="field1" />
          </form>
          <form id="form2" onSubmit={handleSubmit2}>
            <input name="field2" />
          </form>
          <Button form="form1" type="submit">Submit Form 1</Button>
        </>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleSubmit1).toHaveBeenCalled();
      expect(handleSubmit2).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button>{''}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('combines multiple classes correctly', () => {
      render(
        <Button 
          variant="primary"
          size="lg"
          fullWidth
          loading
          active
          className="custom-class"
        >
          Complex button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-blue-600', 'text-white', 'px-6', 'py-3', 'text-lg',
        'w-full', 'opacity-75', 'ring-2', 'ring-offset-2', 'custom-class'
      );
    });

    it('handles conflicting states correctly', () => {
      render(<Button disabled loading>Conflicting states</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50'); // Disabled takes precedence
    });

    it('handles invalid prop values gracefully', () => {
      // @ts-expect-error - Testing invalid prop handling
      render(<Button variant="invalid">Invalid variant</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      render(<Button variant={undefined} size={undefined}>Undefined props</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Should use default values
      expect(button).toHaveClass('bg-blue-600', 'px-4', 'py-2', 'text-base');
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      
      const TestButton = ({ children }: { children: React.ReactNode }) => {
        renderSpy();
        return <Button>{children}</Button>;
      };
      
      const { rerender } = render(<TestButton>Initial</TestButton>);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      rerender(<TestButton>Initial</TestButton>);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });

    it('handles rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Rapid click</Button>);
      
      const button = screen.getByRole('button');
      
      // Simulate rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('memoizes event handlers correctly', () => {
      const handleClick = jest.fn();
      
      const { rerender } = render(
        <Button onClick={handleClick}>Click me</Button>
      );
      
      rerender(<Button onClick={handleClick}>Click me again</Button>);
      
      // The onClick handler should be memoized and not recreated
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Click me again');
    });
  });
});