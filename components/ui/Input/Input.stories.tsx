import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with comprehensive styling and validation options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'filled'],
      description: 'Input variant',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'floating'],
      description: 'Label position',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="base" label="Base" placeholder="Base input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input sizes: small, base, and large.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input variant="default" label="Default" placeholder="Default variant" />
      <Input variant="outline" label="Outline" placeholder="Outline variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input variants: default, outline, and filled.',
      },
    },
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="email" label="Email" placeholder="Enter email" />
      <Input type="password" label="Password" placeholder="Enter password" />
      <Input type="number" label="Number" placeholder="Enter number" />
      <Input type="tel" label="Phone" placeholder="Enter phone number" />
      <Input type="url" label="URL" placeholder="Enter URL" />
      <Input type="search" label="Search" placeholder="Search..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types with appropriate placeholders.',
      },
    },
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input label="Top Label" labelPosition="top" placeholder="Label on top" />
      <Input label="Left Label" labelPosition="left" placeholder="Label on left" />
      <Input label="Floating Label" labelPosition="floating" placeholder=" " />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different label positions: top, left, and floating.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Normal" placeholder="Normal state" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
      <Input label="Readonly" value="Readonly value" readonly />
      <Input label="Required" placeholder="Required field" required />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states: normal, disabled, readonly, and required.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        label="Valid Input" 
        placeholder="This is valid" 
        helperText="This field looks good!"
      />
      <Input 
        label="Invalid Input" 
        placeholder="This has an error" 
        error 
        errorMessage="This field is required"
      />
      <Input 
        label="With Helper Text" 
        placeholder="Enter your username" 
        helperText="Username must be at least 3 characters long"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input validation states with helper text and error messages.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Input 
        label="Full Width Input" 
        placeholder="This input takes full width" 
        fullWidth 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full width input that spans the entire container.',
      },
    },
  },
};

const ControlledInputExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="w-80">
      <Input
        label="Controlled Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        helperText={`Character count: ${value.length}`}
      />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledInputExample />,
  parameters: {
    docs: {
      description: {
        story: 'Controlled input with state management and character count.',
      },
    },
  },
};

const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter your full name"
        required
        error={!!errors.name}
        errorMessage={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
        required
        error={!!errors.email}
        errorMessage={errors.email}
      />
      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Enter your phone number"
        required
        error={!!errors.phone}
        errorMessage={errors.phone}
      />
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Submit Form
      </button>
    </form>
  );
};

export const FormIntegration: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with validation and error handling.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    type: 'text',
    size: 'base',
    variant: 'default',
    labelPosition: 'top',
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Helper text',
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
};