import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { Input } from '../../ui/Input';


const meta: Meta<typeof Modal> = {
  title: 'Composite Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible modal dialog component that provides overlay functionality, keyboard navigation, focus management, and customizable content areas using Container, Button, and Text components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Modal size',
    },
    centered: {
      control: 'boolean',
      description: 'Center the modal vertically',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape key',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    preventScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when modal is open',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    subtitle: {
      control: 'text',
      description: 'Modal subtitle',
    },
    onClose: {
      action: 'modal-closed',
      description: 'Modal close handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for stories that need state management
const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper
      title="Default Modal"
      primaryAction={{
        label: "Confirm",
        onClick: () => console.log("Confirmed")
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: () => console.log("Cancelled")
      }}
    >
      <Text>This is a basic modal with title, content, and action buttons.</Text>
    </ModalWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalWrapper
        size="xs"
        title="Extra Small Modal"
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This is an extra small modal.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        size="sm"
        title="Small Modal"
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This is a small modal with more content space.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        size="md"
        title="Medium Modal"
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This is a medium-sized modal, which is the default size.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        size="lg"
        title="Large Modal"
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This is a large modal with plenty of space for content.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        size="xl"
        title="Extra Large Modal"
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This is an extra large modal for complex content.</Text>
      </ModalWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different modal sizes: xs, sm, md (default), lg, and xl.',
      },
    },
  },
};

export const ConfirmationDialog: Story = {
  render: () => (
    <ModalWrapper
      size="sm"
      title="Confirm Action"
      primaryAction={{
        label: "Delete",
        onClick: () => console.log("Item deleted"),
        variant: "danger"
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: () => console.log("Cancelled")
      }}
    >
      <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog modal with destructive action styling.',
      },
    },
  },
};

export const FormModal: Story = {
  render: () => {
    const FormContent = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
      
      const handleSubmit = () => {
        console.log('Form submitted:', formData);
      };
      
      return (
        <ModalWrapper
          size="lg"
          title="Contact Form"
          subtitle="Send us a message"
          primaryAction={{
            label: "Send Message",
            onClick: handleSubmit
          }}
          secondaryAction={{
            label: "Cancel",
            onClick: () => console.log("Form cancelled")
          }}
        >
          <div className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              fullWidth
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              fullWidth
            />
            <Input
              label="Message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter your message"
              fullWidth
            />
          </div>
        </ModalWrapper>
      );
    };
    
    return <FormContent />;
  },
  parameters: {
    docs: {
      description: {
        story: 'A modal containing a form with multiple input fields.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => (
    <ModalWrapper
      size="lg"
      headerContent={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Custom Header</h2>
              <p className="text-sm text-gray-500">With icon and additional info</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
        </div>
      }
      footerContent={
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-gray-500">
            Last updated: March 15, 2024
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Publish</Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <Text>This modal demonstrates custom header and footer content.</Text>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Text size="sm" color="gray-600">
            Custom content can include any React components, allowing for complex layouts and interactions.
          </Text>
        </div>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal with custom header and footer content for advanced layouts.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex gap-4">
      <ModalWrapper
        title="Loading Action"
        primaryAction={{
          label: "Saving...",
          onClick: () => console.log("Save clicked"),
          loading: true
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel clicked")
        }}
      >
        <Text>This modal has a loading primary action.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        title="Disabled Actions"
        primaryAction={{
          label: "Submit",
          onClick: () => console.log("Submit clicked"),
          disabled: true
        }}
        secondaryAction={{
          label: "Reset",
          onClick: () => console.log("Reset clicked"),
          disabled: true
        }}
      >
        <Text>This modal has disabled actions.</Text>
      </ModalWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modals with loading and disabled action states.',
      },
    },
  },
};

export const BehaviorOptions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalWrapper
        title="No Overlay Close"
        closeOnOverlayClick={false}
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This modal cannot be closed by clicking the overlay.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        title="No Escape Close"
        closeOnEscape={false}
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This modal cannot be closed with the Escape key.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        title="No Close Button"
        showCloseButton={false}
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This modal has no close button in the header.</Text>
      </ModalWrapper>
      
      <ModalWrapper
        title="Top Positioned"
        centered={false}
        primaryAction={{ label: "OK", onClick: () => {} }}
      >
        <Text>This modal is positioned at the top instead of center.</Text>
      </ModalWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different modal behavior options: overlay click, escape key, close button, and positioning.',
      },
    },
  },
};

export const AlertModal: Story = {
  render: () => (
    <ModalWrapper
      size="sm"
      title="System Alert"
      role="alertdialog"
      ariaLabel="System alert dialog"
      primaryAction={{
        label: "Acknowledge",
        onClick: () => console.log("Alert acknowledged"),
        variant: "primary"
      }}
      showCloseButton={false}
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <Text weight="medium" color="gray-900">Critical System Error</Text>
          <Text size="sm" color="gray-600" className="mt-1">
            A critical error has occurred that requires immediate attention. Please contact system administrator.
          </Text>
        </div>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert modal that requires user acknowledgment and cannot be dismissed easily.',
      },
    },
  },
};

export const NestedContent: Story = {
  render: () => (
    <ModalWrapper
      size="xl"
      title="Complex Content Modal"
      primaryAction={{
        label: "Save Changes",
        onClick: () => console.log("Changes saved")
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: () => console.log("Cancelled")
      }}
    >
      <div className="space-y-6">
        <div>
          <Text size="lg" weight="medium" className="mb-2">Settings</Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input label="Username" defaultValue="john_doe" fullWidth />
            </div>
            <div>
              <Input label="Email" type="email" defaultValue="john@example.com" fullWidth />
            </div>
          </div>
        </div>
        
        <div>
          <Text size="lg" weight="medium" className="mb-2">Preferences</Text>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <Text size="sm">Enable notifications</Text>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <Text size="sm">Auto-save changes</Text>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <Text size="sm">Show advanced options</Text>
            </label>
          </div>
        </div>
        
        <div>
          <Text size="lg" weight="medium" className="mb-2">Description</Text>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={4}
            placeholder="Enter a description..."
            defaultValue="This is a sample description that demonstrates how complex content can be displayed within a modal."
          />
        </div>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal with complex nested content including forms, checkboxes, and text areas.',
      },
    },
  },
};

export const Playground: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <Text>Use the controls below to experiment with different modal configurations.</Text>
    </ModalWrapper>
  ),
  args: {
    size: 'md',
    title: 'Playground Modal',
    subtitle: 'Interactive Example',
    centered: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    preventScroll: true,
    primaryAction: {
      label: 'Primary Action',
      onClick: () => console.log('Primary clicked')
    },
    secondaryAction: {
      label: 'Secondary Action',
      onClick: () => console.log('Secondary clicked')
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of modal props.',
      },
    },
  },
};