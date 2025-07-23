import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';


const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component with multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl'],
      description: 'Button size',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    active: {
      control: 'boolean',
      description: 'Active state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon only button',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons for stories
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const LoadingIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button variants: primary, secondary, outline, ghost, and danger.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="base">Base</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes: small, base, large, and extra large.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal, active, disabled, and loading.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button rightIcon={<DownloadIcon />}>Download</Button>
      <Button leftIcon={<PlusIcon />} rightIcon={<DownloadIcon />}>Both Icons</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, or both.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconOnly leftIcon={<PlusIcon />} ariaLabel="Add item" />
      <Button iconOnly leftIcon={<DownloadIcon />} ariaLabel="Download" variant="outline" />
      <Button iconOnly leftIcon={<PlusIcon />} ariaLabel="Add item" variant="ghost" />
      <Button iconOnly leftIcon={<DownloadIcon />} ariaLabel="Download" size="sm" />
      <Button iconOnly leftIcon={<PlusIcon />} ariaLabel="Add item" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons with different variants and sizes.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading...</Button>
      <Button loading variant="outline">Loading...</Button>
      <Button loading variant="ghost">Loading...</Button>
      <Button loading leftIcon={<LoadingIcon />}>Custom Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states with different variants and custom loading icons.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button fullWidth>Full Width Primary</Button>
      <Button fullWidth variant="outline">Full Width Outline</Button>
      <Button fullWidth variant="ghost">Full Width Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons that span the entire container.',
      },
    },
  },
};

export const ButtonTypes: Story = {
  render: () => (
    <form className="space-y-4 p-4 border rounded-lg max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Sample Form</label>
        <input 
          type="text" 
          placeholder="Enter some text" 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">Reset</Button>
        <Button type="button" variant="ghost">Cancel</Button>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button types: submit, reset, and button in a form context.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const handleClick = () => {
      alert('Button clicked!');
    };

    return (
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleClick}>Click Me</Button>
        <Button onClick={handleClick} variant="outline">Click Me Too</Button>
        <Button onClick={handleClick} leftIcon={<PlusIcon />}>Add & Alert</Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive buttons with click handlers.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button 
        ariaLabel="Close dialog" 
        iconOnly 
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        }
      />
      <Button ariaPressed={true} active>Toggle Button (Pressed)</Button>
      <Button ariaExpanded={false}>
        Dropdown Button
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with accessibility features including ARIA attributes.',
      },
    },
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Horizontal Button Group</h3>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button className="rounded-r-none border-r-0">Left</Button>
          <Button variant="outline" className="rounded-none border-r-0">Middle</Button>
          <Button variant="outline" className="rounded-l-none">Right</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Action Button Group</h3>
        <div className="flex gap-2">
          <Button leftIcon={<PlusIcon />}>Create</Button>
          <Button variant="outline" leftIcon={<DownloadIcon />}>Export</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of grouping buttons together for related actions.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    type: 'button',
    children: 'Playground Button',
    disabled: false,
    loading: false,
    active: false,
    fullWidth: false,
    iconOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
};