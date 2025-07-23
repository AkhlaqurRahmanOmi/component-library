import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text component that can render different HTML tags with comprehensive typography options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
      description: 'HTML tag to render',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Text size',
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight',
    },
    color: {
      control: { type: 'select' },
      options: ['black', 'white', 'gray', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'orange', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Text color',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    decoration: {
      control: { type: 'select' },
      options: ['none', 'underline', 'overline', 'line-through'],
      description: 'Text decoration',
    },
    transform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transform',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      description: 'Letter spacing',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default text component',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text tag="h1" size="4xl" weight="bold">Heading 1</Text>
      <Text tag="h2" size="3xl" weight="semibold">Heading 2</Text>
      <Text tag="h3" size="2xl" weight="medium">Heading 3</Text>
      <Text tag="h4" size="xl" weight="medium">Heading 4</Text>
      <Text tag="h5" size="lg" weight="medium">Heading 5</Text>
      <Text tag="h6" size="base" weight="medium">Heading 6</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different heading levels with appropriate sizing and weights.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2X large text (2xl)</Text>
      <Text size="3xl">3X large text (3xl)</Text>
      <Text size="4xl">4X large text (4xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available text sizes from xs to 4xl.',
      },
    },
  },
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="thin">Thin weight</Text>
      <Text weight="light">Light weight</Text>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
      <Text weight="extrabold">Extra bold weight</Text>
      <Text weight="black">Black weight</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available font weights from thin to black.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2 bg-white p-4 rounded">
      <Text color="black">Black text</Text>
      <Text color="gray">Gray text</Text>
      <Text color="red">Red text</Text>
      <Text color="blue">Blue text</Text>
      <Text color="green">Green text</Text>
      <Text color="yellow">Yellow text</Text>
      <Text color="purple">Purple text</Text>
      <Text color="pink">Pink text</Text>
      <Text color="indigo">Indigo text</Text>
      <Text color="orange">Orange text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available text colors.',
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Text align="left">Left aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text align="center">Center aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text align="right">Right aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text align="justify">Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options: left, center, right, and justify.',
      },
    },
  },
};

export const Decorations: Story = {
  render: () => (
    <div className="space-y-2">
      <Text decoration="none">No decoration</Text>
      <Text decoration="underline">Underlined text</Text>
      <Text decoration="overline">Overlined text</Text>
      <Text decoration="line-through">Strikethrough text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text decoration options: none, underline, overline, and line-through.',
      },
    },
  },
};

export const Transforms: Story = {
  render: () => (
    <div className="space-y-2">
      <Text transform="none">No transform</Text>
      <Text transform="uppercase">uppercase text</Text>
      <Text transform="lowercase">LOWERCASE TEXT</Text>
      <Text transform="capitalize">capitalize each word</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text transform options: none, uppercase, lowercase, and capitalize.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click me or hover over me',
    onClick: () => alert('Text clicked!'),
    className: 'cursor-pointer hover:text-blue-600 transition-colors',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive text with click handler.',
      },
    },
  },
};

export const WithAccessibility: Story = {
  args: {
    children: 'Accessible text component',
    role: 'button',
    ariaLabel: 'Clickable text button',
    tabIndex: 0,
    onClick: () => alert('Accessible text clicked!'),
    className: 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text component with accessibility features including ARIA attributes and keyboard focus.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    tag: 'p',
    size: 'base',
    weight: 'normal',
    color: 'black',
    align: 'left',
    decoration: 'none',
    transform: 'none',
    spacing: 'normal',
    children: 'Customize this text using the controls panel',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
};