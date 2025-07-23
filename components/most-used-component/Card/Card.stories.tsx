import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';


const meta: Meta<typeof Card> = {
  title: 'Composite Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component that combines Container, Text, and Button components to create consistent card layouts with header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'filled'],
      description: 'Card visual variant',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Card layout orientation',
    },
    imagePosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'right', 'bottom'],
      description: 'Position of the image relative to content',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Make the entire card clickable',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    description: {
      control: 'text',
      description: 'Card description text',
    },
    onCardClick: {
      action: 'card-clicked',
      description: 'Card click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image for stories
const sampleImage = {
  src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  alt: 'Sample card image',
};

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a basic card with a title and description.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <Card
        variant="default"
        title="Default Card"
        description="A card with default styling and subtle border."
      />
      <Card
        variant="outlined"
        title="Outlined Card"
        description="A card with a more prominent border and clean background."
      />
      <Card
        variant="elevated"
        title="Elevated Card"
        description="A card with shadow elevation for depth and prominence."
      />
      <Card
        variant="filled"
        title="Filled Card"
        description="A card with a filled background for subtle differentiation."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different card variants: default, outlined, elevated, and filled.',
      },
    },
  },
};

export const WithImage: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card
        variant="elevated"
        image={sampleImage}
        title="Featured Article"
        subtitle="Technology"
        description="Learn about the latest trends in web development and how they're shaping the future of digital experiences."
        primaryAction={{
          label: "Read More",
          onClick: () => console.log("Read more clicked")
        }}
      />
      <Card
        variant="outlined"
        image={{ ...sampleImage, aspectRatio: 'square' }}
        title="Product Showcase"
        description="Discover our latest product features and improvements."
        hoverable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with images in different aspect ratios and positions.',
      },
    },
  },
};

export const ImagePositions: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            variant="elevated"
            image={sampleImage}
            imagePosition="top"
            title="Image Top"
            description="Image positioned at the top of the card."
          />
          <Card
            variant="elevated"
            image={sampleImage}
            imagePosition="bottom"
            title="Image Bottom"
            description="Image positioned at the bottom of the card."
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
        <div className="space-y-4">
          <Card
            variant="elevated"
            orientation="horizontal"
            image={sampleImage}
            imagePosition="left"
            title="Image Left"
            description="Image positioned on the left side of the card content."
          />
          <Card
            variant="elevated"
            orientation="horizontal"
            image={sampleImage}
            imagePosition="right"
            title="Image Right"
            description="Image positioned on the right side of the card content."
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different image positions in both vertical and horizontal card layouts.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card
        variant="outlined"
        title="Single Action"
        description="A card with a single primary action button."
        primaryAction={{
          label: "Learn More",
          onClick: () => console.log("Primary action clicked")
        }}
      />
      <Card
        variant="outlined"
        title="Multiple Actions"
        description="A card with both primary and secondary action buttons."
        primaryAction={{
          label: "Save",
          onClick: () => console.log("Save clicked")
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel clicked")
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with different action button configurations.',
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <Card
        variant="outlined"
        title="Hoverable Card"
        description="This card has hover effects enabled."
        hoverable
      />
      <Card
        variant="outlined"
        title="Clickable Card"
        description="This entire card is clickable."
        clickable
        onCardClick={() => alert('Card clicked!')}
      />
      <Card
        variant="outlined"
        title="Hover + Click"
        description="This card combines hover effects with click functionality."
        hoverable
        clickable
        onCardClick={() => alert('Hoverable card clicked!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with different interactive states: hoverable, clickable, or both.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card
        variant="elevated"
        title="Custom Header"
        headerContent={
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Custom Header</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                <span className="text-sm text-gray-500">Updated 2 hours ago</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        }
        description="This card uses custom header content instead of the default title/subtitle."
      />
      
      <Card
        variant="elevated"
        title="Custom Footer"
        description="This card has custom footer content with additional information."
        footerContent={
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>👍 24 likes</span>
              <span>💬 8 comments</span>
            </div>
            <span>March 15, 2024</span>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with custom header and footer content for advanced layouts.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card
        variant="outlined"
        title="Loading Action"
        description="This card has a loading primary action."
        primaryAction={{
          label: "Saving...",
          onClick: () => console.log("Save clicked"),
          loading: true
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel clicked")
        }}
      />
      <Card
        variant="outlined"
        title="Disabled Actions"
        description="This card has disabled actions."
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
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with loading and disabled action states.',
      },
    },
  },
};

export const ComplexLayouts: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <Card
        variant="elevated"
        image={{ ...sampleImage, aspectRatio: 'wide' }}
        title="Blog Post Card"
        subtitle="Web Development"
        description="A comprehensive guide to building modern web applications with React and TypeScript. Learn best practices, common patterns, and advanced techniques."
        primaryAction={{
          label: "Read Article",
          onClick: () => console.log("Read article")
        }}
        secondaryAction={{
          label: "Bookmark",
          onClick: () => console.log("Bookmark"),
          variant: "outline"
        }}
        hoverable
      />
      
      <Card
        variant="outlined"
        orientation="horizontal"
        image={{ ...sampleImage, aspectRatio: 'square' }}
        imagePosition="left"
        title="Product Card"
        subtitle="$99.99"
        description="High-quality product with excellent features and customer reviews."
        primaryAction={{
          label: "Add to Cart",
          onClick: () => console.log("Add to cart")
        }}
        secondaryAction={{
          label: "View Details",
          onClick: () => console.log("View details"),
          variant: "ghost"
        }}
        hoverable
        clickable
        onCardClick={() => console.log("Product card clicked")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex card layouts combining multiple features and content types.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'elevated',
    title: 'Playground Card',
    subtitle: 'Interactive Example',
    description: 'Use the controls below to experiment with different card configurations.',
    hoverable: true,
    clickable: false,
    orientation: 'vertical',
    imagePosition: 'top',
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
        story: 'Interactive playground to test different combinations of card props.',
      },
    },
  },
};