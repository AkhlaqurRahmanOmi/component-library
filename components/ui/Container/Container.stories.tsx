import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import type { ContainerProps } from './Container.types';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible container component with comprehensive layout and styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: { type: 'select' },
      options: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'inline-grid'],
      description: 'Display type',
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flex direction',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justify content',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Align items',
    },
    wrap: {
      control: { type: 'select' },
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap',
    },
    gap: {
      control: { type: 'select' },
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Gap between items',
    },
    padding: {
      control: { type: 'select' },
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Padding',
    },
    margin: {
      control: { type: 'select' },
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
      description: 'Margin',
    },
    background: {
      control: { type: 'select' },
      options: ['white', 'gray', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'orange'],
      description: 'Background color',
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Border radius',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl'],
      description: 'Box shadow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <>
    <div className="bg-blue-100 p-4 rounded">Item 1</div>
    <div className="bg-green-100 p-4 rounded">Item 2</div>
    <div className="bg-yellow-100 p-4 rounded">Item 3</div>
  </>
);

export const Default: Story = {
  args: {
    children: <div className="bg-gray-100 p-4 rounded">Default container content</div>,
  },
};

export const FlexLayouts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Flex Row</h3>
        <Container display="flex" direction="row" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Flex Column</h3>
        <Container display="flex" direction="column" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Flex Row Reverse</h3>
        <Container display="flex" direction="row-reverse" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different flex directions: row, column, and row-reverse.',
      },
    },
  },
};

export const FlexJustification: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Justify Start</h3>
        <Container display="flex" justify="start" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Justify Center</h3>
        <Container display="flex" justify="center" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Justify Between</h3>
        <Container display="flex" justify="between" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Justify Around</h3>
        <Container display="flex" justify="around" gap="4" padding="4" background="gray" borderRadius="md">
          <SampleContent />
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different justify-content options for flex containers.',
      },
    },
  },
};

export const FlexAlignment: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Start</h3>
        <Container display="flex" align="start" gap="4" padding="4" background="gray" borderRadius="md" height="32">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Center</h3>
        <Container display="flex" align="center" gap="4" padding="4" background="gray" borderRadius="md" height="32">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Align End</h3>
        <Container display="flex" align="end" gap="4" padding="4" background="gray" borderRadius="md" height="32">
          <SampleContent />
        </Container>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Stretch</h3>
        <Container display="flex" align="stretch" gap="4" padding="4" background="gray" borderRadius="md" height="32">
          <SampleContent />
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different align-items options for flex containers.',
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Grid Layout</h3>
        <Container 
          display="grid" 
          gap="4" 
          padding="4" 
          background="gray" 
          borderRadius="md"
          className="grid-cols-3"
        >
          <div className="bg-blue-100 p-4 rounded">Grid Item 1</div>
          <div className="bg-green-100 p-4 rounded">Grid Item 2</div>
          <div className="bg-yellow-100 p-4 rounded">Grid Item 3</div>
          <div className="bg-red-100 p-4 rounded">Grid Item 4</div>
          <div className="bg-purple-100 p-4 rounded">Grid Item 5</div>
          <div className="bg-pink-100 p-4 rounded">Grid Item 6</div>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout with 3 columns and gap spacing.',
      },
    },
  },
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Different Padding</h3>
        <div className="space-y-4">
          <Container padding="2" background="blue" borderRadius="md">
            <div className="bg-white p-2 rounded">Padding 2</div>
          </Container>
          <Container padding="4" background="blue" borderRadius="md">
            <div className="bg-white p-2 rounded">Padding 4</div>
          </Container>
          <Container padding="8" background="blue" borderRadius="md">
            <div className="bg-white p-2 rounded">Padding 8</div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Different Gaps</h3>
        <div className="space-y-4">
          <Container display="flex" gap="2" padding="4" background="gray" borderRadius="md">
            <SampleContent />
          </Container>
          <Container display="flex" gap="4" padding="4" background="gray" borderRadius="md">
            <SampleContent />
          </Container>
          <Container display="flex" gap="8" padding="4" background="gray" borderRadius="md">
            <SampleContent />
          </Container>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options: padding and gap.',
      },
    },
  },
};

export const BackgroundColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Container background="white" padding="4" borderRadius="md" className="border">
        <div className="text-gray-800">White background</div>
      </Container>
      <Container background="gray" padding="4" borderRadius="md">
        <div className="text-gray-800">Gray background</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="md">
        <div className="text-white">Blue background</div>
      </Container>
      <Container background="green" padding="4" borderRadius="md">
        <div className="text-white">Green background</div>
      </Container>
      <Container background="red" padding="4" borderRadius="md">
        <div className="text-white">Red background</div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different background color options.',
      },
    },
  },
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-4">
      <Container background="blue" padding="4" borderRadius="none">
        <div className="text-white">No border radius</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="sm">
        <div className="text-white">Small border radius</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="md">
        <div className="text-white">Medium border radius</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="lg">
        <div className="text-white">Large border radius</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="xl">
        <div className="text-white">Extra large border radius</div>
      </Container>
      <Container background="blue" padding="4" borderRadius="full">
        <div className="text-white">Full border radius</div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options from none to full.',
      },
    },
  },
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-6 bg-gray-50 p-6">
      <Container background="white" padding="4" borderRadius="md" shadow="none">
        <div>No shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="sm">
        <div>Small shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="base">
        <div>Base shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="md">
        <div>Medium shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="lg">
        <div>Large shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="xl">
        <div>Extra large shadow</div>
      </Container>
      <Container background="white" padding="4" borderRadius="md" shadow="2xl">
        <div>2X large shadow</div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different box shadow options from none to 2xl.',
      },
    },
  },
};

export const CardExample: Story = {
  render: () => (
    <Container 
      background="white" 
      padding="6" 
      borderRadius="lg" 
      shadow="md"
      className="max-w-sm"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
        <p className="text-gray-600">
          This is an example of using the Container component to create a card-like layout 
          with background, padding, border radius, and shadow.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Action Button
        </button>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using Container to create a card component.',
      },
    },
  },
};

export const ResponsiveExample: Story = {
  render: () => (
    <Container 
      display="flex" 
      direction="column" 
      gap="4" 
      padding="4" 
      background="gray" 
      borderRadius="md"
      className="md:flex-row md:gap-8 md:p-8"
    >
      <div className="bg-blue-100 p-4 rounded flex-1">
        <h4 className="font-semibold">Responsive Item 1</h4>
        <p className="text-sm text-gray-600">Stacks vertically on mobile, horizontally on desktop</p>
      </div>
      <div className="bg-green-100 p-4 rounded flex-1">
        <h4 className="font-semibold">Responsive Item 2</h4>
        <p className="text-sm text-gray-600">Uses responsive Tailwind classes</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded flex-1">
        <h4 className="font-semibold">Responsive Item 3</h4>
        <p className="text-sm text-gray-600">Adapts to screen size</p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive container that changes layout based on screen size.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    display: 'flex',
    direction: 'row',
    justify: 'start',
    align: 'start',
    wrap: 'nowrap',
    gap: '4',
    padding: '4',
    margin: '0',
    background: 'gray',
    borderRadius: 'md',
    shadow: 'none',
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
};