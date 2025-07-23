import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from '../Card';
import { Modal } from '../Modal';
import { Form } from '../Form';
import { Navigation } from '../Navigation';
import { Alert } from '../Alert';
import { Dropdown } from '../Dropdown';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Composite Components Accessibility', () => {
  describe('Card Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Card
          title="Test Card"
          description="Test description"
          primaryAction={{
            label: "Primary Action",
            onClick: () => {}
          }}
          secondaryAction={{
            label: "Secondary Action",
            onClick: () => {}
          }}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes when clickable', () => {
      render(
        <Card
          title="Clickable Card"
          description="This card is clickable"
          clickable
          onCardClick={() => {}}
        />
      );
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label', 'Card: Clickable Card');
      expect(card).toHaveAttribute('tabindex', '0');
    });

    it('should handle keyboard navigation when clickable', () => {
      const handleClick = jest.fn();
      render(
        <Card
          title="Keyboard Card"
          clickable
          onCardClick={handleClick}
        />
      );
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
      
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Modal Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Test Modal"
          primaryAction={{
            label: "Confirm",
            onClick: () => {}
          }}
        >
          <p>Modal content</p>
        </Modal>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Test Modal"
          ariaLabel="Test modal dialog"
        >
          <p>Modal content</p>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-label', 'Test modal dialog');
      expect(modal).toHaveAttribute('tabindex', '-1');
    });

    it('should handle escape key', () => {
      const handleClose = jest.fn();
      render(
        <Modal
          isOpen={true}
          onClose={handleClose}
          title="Test Modal"
        >
          <p>Modal content</p>
        </Modal>
      );
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('Form Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Form
          title="Test Form"
          fields={[
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              required: true
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              required: true
            }
          ]}
          onSubmit={() => {}}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper form structure', () => {
      render(
        <Form
          title="Registration Form"
          fields={[
            {
              name: 'username',
              label: 'Username',
              required: true
            }
          ]}
          onSubmit={() => {}}
        />
      );
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('name', 'username');
    });
  });

  describe('Navigation Component', () => {
    const navigationItems = [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'About', href: '/about' },
      { id: '3', label: 'Contact', href: '/contact' }
    ];

    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Navigation
          items={navigationItems}
          ariaLabel="Main navigation"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper navigation structure', () => {
      render(
        <Navigation
          items={navigationItems}
          ariaLabel="Main navigation"
        />
      );
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('should handle disabled items correctly', () => {
      const itemsWithDisabled = [
        { id: '1', label: 'Home', href: '/' },
        { id: '2', label: 'Disabled', href: '/disabled', disabled: true }
      ];

      render(<Navigation items={itemsWithDisabled} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).not.toBeDisabled();
      expect(buttons[1]).toBeDisabled();
    });
  });

  describe('Alert Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Alert
          variant="info"
          title="Information"
          message="This is an informational alert"
          primaryAction={{
            label: "Action",
            onClick: () => {}
          }}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <Alert
          variant="error"
          title="Error"
          message="An error occurred"
          role="alert"
          ariaLive="assertive"
        />
      );
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('should handle dismissible alerts', () => {
      const handleDismiss = jest.fn();
      render(
        <Alert
          variant="success"
          title="Success"
          message="Operation completed"
          dismissible
          onDismiss={handleDismiss}
        />
      );
      
      const dismissButton = screen.getByLabelText('Dismiss alert');
      fireEvent.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalled();
    });
  });

  describe('Dropdown Component', () => {
    const options = [
      { id: '1', label: 'Option 1', value: 'option1' },
      { id: '2', label: 'Option 2', value: 'option2' },
      { id: '3', label: 'Option 3', value: 'option3' }
    ];

    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Dropdown
          options={options}
          placeholder="Select an option"
          ariaLabel="Select dropdown"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <Dropdown
          options={options}
          placeholder="Select an option"
          ariaLabel="Select dropdown"
        />
      );
      
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-label', 'Select dropdown');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should handle keyboard navigation', () => {
      render(
        <Dropdown
          options={options}
          placeholder="Select an option"
        />
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should handle disabled options', () => {
      const optionsWithDisabled = [
        { id: '1', label: 'Option 1', value: 'option1' },
        { id: '2', label: 'Disabled Option', value: 'option2', disabled: true }
      ];

      render(
        <Dropdown
          options={optionsWithDisabled}
          placeholder="Select an option"
          defaultOpen={true}
        />
      );
      
      const buttons = screen.getAllByRole('button');
      const optionButtons = buttons.filter(btn => btn.textContent?.includes('Option'));
      
      expect(optionButtons[0]).not.toBeDisabled();
      expect(optionButtons[1]).toBeDisabled();
    });
  });
});