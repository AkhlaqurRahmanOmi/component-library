import { Text, Input, Container, Button } from "../index";
import { ComponentShowcase } from "../components/ComponentShowcase";
import { InteractiveExamples } from "@/components/InteractiveExamples";
import { ServerComponentExample } from "@/components/ServerComponentExample";

export default function Home() {
  return (
    <div className="font-sans min-h-screen ">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <Container maxWidth="full" padding="6" margin="auto">
          <Text tag="h1" size="3xl" weight="bold" color="gray-900">
            Component Library Showcase
          </Text>
          <Text tag="p" size="lg" color="gray-600" marginTop="2">
            Interactive examples and documentation for all components
          </Text>
        </Container>
      </header>

      {/* Main Content */}
      <main>
        <ComponentShowcase />
        
        {/* Typography Sizes */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Typography Sizes
          </Text>
          <div className="space-y-4">
            <Text tag="h1" size="xs" className="bg-amber-600">Extra Small Text (xs)</Text>
            <Text size="sm">Small Text (sm)</Text>
            <Text size="base">Base Text (base)</Text>
            <Text size="lg">Large Text (lg)</Text>
            <Text size="xl">Extra Large Text (xl)</Text>
            <Text size="2xl">2X Large Text (2xl)</Text>
            <Text size="3xl">3X Large Text (3xl)</Text>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Font Weights
          </Text>
          <div className="space-y-2">
            <Text weight="thin">Thin Weight</Text>
            <Text weight="light">Light Weight</Text>
            <Text weight="normal">Normal Weight</Text>
            <Text weight="medium">Medium Weight</Text>
            <Text weight="semibold">Semibold Weight</Text>
            <Text weight="bold">Bold Weight</Text>
            <Text weight="extrabold">Extra Bold Weight</Text>
            <Text weight="black">Black Weight</Text>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Colors
          </Text>
          <div className="space-y-2">
            <Text color="primary">Primary Color</Text>
            <Text color="secondary">Secondary Color</Text>
            <Text color="success">Success Color</Text>
            <Text color="warning">Warning Color</Text>
            <Text color="error">Error Color</Text>
            <Text color="info">Info Color</Text>
            <Text color="red-500">Red 500</Text>
            <Text color="blue-600">Blue 600</Text>
            <Text color="green-700">Green 700</Text>
          </div>
        </section>

        {/* Text Alignment */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Text Alignment
          </Text>
          <div className="space-y-4">
            <Text align="left">Left aligned text</Text>
            <Text align="center">Center aligned text</Text>
            <Text align="right">Right aligned text</Text>
            <Text align="justify">
              Justified text that will wrap and justify across multiple lines
              when the content is long enough to demonstrate the justification
              behavior.
            </Text>
          </div>
        </section>

        {/* Text Decoration and Transform */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Text Decoration & Transform
          </Text>
          <div className="space-y-2">
            <Text decoration="underline">Underlined text</Text>
            <Text decoration="line-through">Strikethrough text</Text>
            <Text transform="uppercase">uppercase text</Text>
            <Text transform="lowercase">LOWERCASE TEXT</Text>
            <Text transform="capitalize">capitalize each word</Text>
          </div>
        </section>

        {/* Letter Spacing */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Letter Spacing
          </Text>
          <div className="space-y-2">
            <Text spacing="tighter">Tighter letter spacing</Text>
            <Text spacing="tight">Tight letter spacing</Text>
            <Text spacing="normal">Normal letter spacing</Text>
            <Text spacing="wide">Wide letter spacing</Text>
            <Text spacing="wider">Wider letter spacing</Text>
            <Text spacing="widest">Widest letter spacing</Text>
          </div>
        </section>

        {/* Semantic States */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Semantic States
          </Text>
          <div className="space-y-2">
            <Text error>This is an error message</Text>
            <Text success>This is a success message</Text>
            <Text warning>This is a warning message</Text>
            <Text info>This is an info message</Text>
          </div>
        </section>

        {/* Different HTML Tags */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Different HTML Tags
          </Text>
          <div className="space-y-4">
            <Text tag="h1" size="3xl" weight="bold">
              H1 Heading
            </Text>
            <Text tag="h2" size="2xl" weight="semibold">
              H2 Heading
            </Text>
            <Text tag="h3" size="xl" weight="medium">
              H3 Heading
            </Text>
            <Text tag="p">Paragraph text</Text>
            <Text tag="span" color="blue-600">
              Inline span text
            </Text>
            <Text tag="div" padding="4" className="bg-gray-100 rounded">
              Div with padding and background
            </Text>
          </div>
        </section>

        {/* Container Component Showcase */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Container Component Examples
          </Text>

          {/* Basic Layout Examples */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Basic Layout Types
            </Text>
            
            {/* Block Container */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="2">
                Block Container (Default)
              </Text>
              <Container 
                display="block" 
                background="gray" 
                padding="4" 
                borderRadius="md"
                marginBottom="4"
              >
                <Text>This is a block container with gray background and padding.</Text>
              </Container>
            </div>

            {/* Flex Container */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="2">
                Flex Container
              </Text>
              <Container 
                display="flex" 
                justify="center" 
                align="center" 
                background="blue" 
                padding="6"
                borderRadius="md"
                marginBottom="4"
                className="min-h-24"
              >
                <Text color="white" weight="medium">Centered content in flex container</Text>
              </Container>
            </div>

            {/* Grid Container */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="2">
                Grid Container
              </Text>
              <Container 
                display="grid" 
                gridCols="3" 
                gap="4" 
                background="green" 
                padding="4"
                borderRadius="md"
                marginBottom="4"
              >
                <Container background="white" padding="3" borderRadius="sm">
                  <Text size="sm" weight="medium">Grid Item 1</Text>
                </Container>
                <Container background="white" padding="3" borderRadius="sm">
                  <Text size="sm" weight="medium">Grid Item 2</Text>
                </Container>
                <Container background="white" padding="3" borderRadius="sm">
                  <Text size="sm" weight="medium">Grid Item 3</Text>
                </Container>
              </Container>
            </div>
          </div>

          {/* Flex Layout Examples */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Flex Layout Options
            </Text>
            
            <div className="space-y-6">
              {/* Flex Direction */}
              <div>
                <Text tag="h4" size="lg" weight="medium" marginBottom="2">
                  Flex Direction
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Container 
                    display="flex" 
                    direction="row" 
                    gap="2" 
                    background="purple" 
                    padding="4"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 1</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 2</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 3</Text>
                    </Container>
                  </Container>
                  
                  <Container 
                    display="flex" 
                    direction="column" 
                    gap="2" 
                    background="orange" 
                    padding="4"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 1</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 2</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 3</Text>
                    </Container>
                  </Container>
                </div>
              </div>

              {/* Justify Content */}
              <div>
                <Text tag="h4" size="lg" weight="medium" marginBottom="2">
                  Justify Content
                </Text>
                <div className="space-y-3">
                  <Container 
                    display="flex" 
                    justify="start" 
                    background="teal" 
                    padding="3"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Start</Text>
                    </Container>
                  </Container>
                  
                  <Container 
                    display="flex" 
                    justify="center" 
                    background="teal" 
                    padding="3"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Center</Text>
                    </Container>
                  </Container>
                  
                  <Container 
                    display="flex" 
                    justify="end" 
                    background="teal" 
                    padding="3"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">End</Text>
                    </Container>
                  </Container>
                  
                  <Container 
                    display="flex" 
                    justify="between" 
                    background="teal" 
                    padding="3"
                    borderRadius="md"
                  >
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 1</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 2</Text>
                    </Container>
                    <Container background="white" padding="2" borderRadius="sm">
                      <Text size="sm">Item 3</Text>
                    </Container>
                  </Container>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Styling Examples */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Visual Styling Options
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Background Colors */}
              <Container 
                background="red" 
                padding="4" 
                borderRadius="lg"
              >
                <Text color="white" weight="medium">Red Background</Text>
              </Container>
              
              <Container 
                background="blue" 
                padding="4" 
                borderRadius="lg"
              >
                <Text color="white" weight="medium">Blue Background</Text>
              </Container>
              
              <Container 
                background="green" 
                padding="4" 
                borderRadius="lg"
              >
                <Text color="white" weight="medium">Green Background</Text>
              </Container>
              
              {/* Border Examples */}
              <Container 
                border={{ width: "2", style: "solid", color: "red" }}
                padding="4" 
                borderRadius="md"
              >
                <Text>Red Border</Text>
              </Container>
              
              <Container 
                border={{ width: "2", style: "dashed", color: "blue" }}
                padding="4" 
                borderRadius="md"
              >
                <Text>Dashed Blue Border</Text>
              </Container>
              
              <Container 
                border={{ width: "4", style: "dotted", color: "green" }}
                padding="4" 
                borderRadius="md"
              >
                <Text>Dotted Green Border</Text>
              </Container>
              
              {/* Shadow Examples */}
              <Container 
                background="white" 
                shadow="sm" 
                padding="4" 
                borderRadius="md"
              >
                <Text>Small Shadow</Text>
              </Container>
              
              <Container 
                background="white" 
                shadow="md" 
                padding="4" 
                borderRadius="md"
              >
                <Text>Medium Shadow</Text>
              </Container>
              
              <Container 
                background="white" 
                shadow="lg" 
                padding="4" 
                borderRadius="md"
              >
                <Text>Large Shadow</Text>
              </Container>
            </div>
          </div>

          {/* Responsive Design Example */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Responsive Design
            </Text>
            <Container 
              display="grid"
              gridCols="1"
              gap="4"
              background="indigo"
              padding="4"
              borderRadius="md"
              responsive={{
                sm: { gridCols: "2" },
                md: { gridCols: "3" },
                lg: { gridCols: "4" }
              }}
            >
              <Container background="white" padding="3" borderRadius="sm">
                <Text size="sm" weight="medium">Responsive Item 1</Text>
              </Container>
              <Container background="white" padding="3" borderRadius="sm">
                <Text size="sm" weight="medium">Responsive Item 2</Text>
              </Container>
              <Container background="white" padding="3" borderRadius="sm">
                <Text size="sm" weight="medium">Responsive Item 3</Text>
              </Container>
              <Container background="white" padding="3" borderRadius="sm">
                <Text size="sm" weight="medium">Responsive Item 4</Text>
              </Container>
            </Container>
            <Text size="sm" color="gray" marginTop="2">
              This grid changes from 1 column on mobile to 2 on small screens, 3 on medium, and 4 on large screens.
            </Text>
          </div>

          {/* Complex Layout Example */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Complex Layout Example
            </Text>
            <Container 
              background="gray" 
              padding="6" 
              borderRadius="lg" 
              shadow="xl"
            >
              {/* Header */}
              <Container 
                display="flex" 
                justify="between" 
                align="center" 
                background="white" 
                padding="4" 
                borderRadius="md" 
                marginBottom="4"
                shadow="sm"
              >
                <Text size="lg" weight="bold">Card Header</Text>
                <Container 
                  background="blue" 
                  padding="2" 
                  borderRadius="full"
                >
                  <Text color="white" size="sm">Badge</Text>
                </Container>
              </Container>
              
              {/* Content Area */}
              <Container 
                display="flex" 
                gap="4" 
                marginBottom="4"
              >
                <Container 
                  background="white" 
                  padding="4" 
                  borderRadius="md" 
                  width="2/3"
                  shadow="sm"
                >
                  <Text weight="medium" marginBottom="2">Main Content</Text>
                  <Text size="sm" color="gray">
                    This is the main content area that takes up 2/3 of the width.
                  </Text>
                </Container>
                
                <Container 
                  background="white" 
                  padding="4" 
                  borderRadius="md" 
                  width="1/3"
                  shadow="sm"
                >
                  <Text weight="medium" marginBottom="2">Sidebar</Text>
                  <Text size="sm" color="gray">
                    This sidebar takes up 1/3 of the width.
                  </Text>
                </Container>
              </Container>
              
              {/* Footer */}
              <Container 
                display="flex" 
                justify="end" 
                gap="2" 
                background="white" 
                padding="3" 
                borderRadius="md"
                shadow="sm"
              >
                <Container 
                  background="gray" 
                  padding="2" 
                  borderRadius="md"
                >
                  <Text size="sm">Cancel</Text>
                </Container>
                <Container 
                  background="blue" 
                  padding="2" 
                  borderRadius="md"
                >
                  <Text color="white" size="sm">Save</Text>
                </Container>
              </Container>
            </Container>
          </div>
        </section>

        {/* Button Component Showcase */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Button Component Examples
          </Text>
          
          {/* Button Variants */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Button Variants
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="success">Success Button</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Button Sizes
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="base">Base (Default)</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
              <Button size="2xl">2X Large</Button>
            </div>
          </div>

          {/* Button States */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Button States
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button>Normal State</Button>
              <Button disabled>Disabled State</Button>
              <Button loading>Loading State</Button>
              <Button active>Active State</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
              <Button variant="ghost" loading>Loading Ghost</Button>
            </div>
          </div>

          {/* Buttons with Icons */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Buttons with Icons
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button 
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Item
              </Button>
              <Button 
                variant="outline"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Next Step
              </Button>
              <Button 
                variant="ghost"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Go Back
              </Button>
              <Button 
                variant="danger"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Icon Only Buttons */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Icon Only Buttons
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button 
                iconOnly
                ariaLabel="Add new item"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              ></Button>
              <Button 
                variant="outline"
                iconOnly
                ariaLabel="Edit item"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              ></Button>
              <Button 
                variant="ghost"
                iconOnly
                ariaLabel="More options"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                }
              ></Button>
              <Button 
                variant="danger"
                iconOnly
                size="sm"
                ariaLabel="Delete item"
                leftIcon={
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }
              ></Button>
            </div>
          </div>

          {/* Full Width Buttons */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Full Width Buttons
            </Text>
            <div className="space-y-4 max-w-md">
              <Button fullWidth>Full Width Primary</Button>
              <Button variant="outline" fullWidth>Full Width Outline</Button>
              <Button variant="ghost" fullWidth disabled>Full Width Disabled</Button>
            </div>
          </div>

          {/* Button Types and Form Integration */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Button Types & Form Integration
            </Text>
            <Container 
              background="gray" 
              padding="6" 
              borderRadius="md" 
              border={{ width: "1", style: "solid", color: "gray" }}
            >
              <Text weight="medium" marginBottom="4">Sample Form</Text>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <div className="flex gap-3 pt-2">
                  <Button type="submit" variant="primary">
                    Submit Form
                  </Button>
                  <Button type="reset" variant="outline">
                    Reset Form
                  </Button>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            </Container>
          </div>

          {/* Loading States with Different Variants */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Loading States
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading Primary</Button>
              <Button variant="secondary" loading>Loading Secondary</Button>
              <Button variant="outline" loading>Loading Outline</Button>
              <Button variant="ghost" loading>Loading Ghost</Button>
              <Button 
                loading 
                iconOnly 
                ariaLabel="Loading action"
                size="lg"
              ></Button>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Accessibility Features
            </Text>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button ariaLabel="Custom aria label for screen readers">
                  Accessible Button
                </Button>
                <Button 
                  ariaPressed={true}
                  variant="outline"
                >
                  Toggle Button (Pressed)
                </Button>
                <Button 
                  ariaExpanded={false}
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                >
                  Dropdown Menu
                </Button>
              </div>
              <Text size="sm" color="gray-600">
                These buttons include proper ARIA attributes for screen readers and keyboard navigation support.
              </Text>
            </div>
          </div>

          {/* Button Combinations */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Button Combinations & Layouts
            </Text>
            
            {/* Action Bar */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="3">
                Action Bar
              </Text>
              <Container 
                display="flex" 
                justify="between" 
                align="center"
                background="white" 
                padding="4" 
                borderRadius="md" 
                border={{ width: "1", style: "solid", color: "gray-200" }}
                shadow="sm"
              >
                <Text weight="medium">Document Actions</Text>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Preview</Button>
                  <Button variant="outline" size="sm">Save Draft</Button>
                  <Button size="sm">Publish</Button>
                </div>
              </Container>
            </div>

            {/* Button Group */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="3">
                Button Group
              </Text>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button 
                  variant="outline" 
                  className="rounded-r-none border-r-0"
                >
                  Left
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-none border-r-0"
                >
                  Center
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-l-none"
                >
                  Right
                </Button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mb-6">
              <Text tag="h4" size="lg" weight="medium" marginBottom="3">
                Modal Actions
              </Text>
              <Container 
                background="white" 
                padding="6" 
                borderRadius="lg" 
                shadow="xl"
                border={{ width: "1", style: "solid", color: "gray-200" }}
              >
                <Text size="lg" weight="semibold" marginBottom="2">
                  Confirm Action
                </Text>
                <Text color="gray-600" marginBottom="6">
                  Are you sure you want to delete this item? This action cannot be undone.
                </Text>
                <Container display="flex" justify="end" gap="3">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="danger">Delete</Button>
                </Container>
              </Container>
            </div>
          </div>
        </section>

        {/* Input Component Showcase */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Input Component Examples
          </Text>
          
          {/* Basic Inputs */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Basic Input Types
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Text Input"
                placeholder="Enter text here"
                helperText="This is a basic text input"
              />
              <Input
                type="email"
                label="Email Input"
                placeholder="user@example.com"
                helperText="Enter your email address"
              />
              <Input
                type="password"
                label="Password Input"
                placeholder="Enter password"
                helperText="Password should be secure"
              />
              <Input
                type="number"
                label="Number Input"
                placeholder="123"
                helperText="Enter a number"
              />
            </div>
          </div>

          {/* Input Sizes */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Input Sizes
            </Text>
            <div className="space-y-4">
              <Input
                size="xs"
                label="Extra Small"
                placeholder="Extra small input"
              />
              <Input
                size="sm"
                label="Small"
                placeholder="Small input"
              />
              <Input
                size="base"
                label="Base (Default)"
                placeholder="Base size input"
              />
              <Input
                size="lg"
                label="Large"
                placeholder="Large input"
              />
              <Input
                size="xl"
                label="Extra Large"
                placeholder="Extra large input"
              />
            </div>
          </div>

          {/* Input Variants */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Input Variants
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                variant="default"
                label="Default Variant"
                placeholder="Default styling"
              />
              <Input
                variant="outline"
                label="Outline Variant"
                placeholder="Outline styling"
              />
              <Input
                variant="filled"
                label="Filled Variant"
                placeholder="Filled styling"
              />
              <Input
                variant="underline"
                label="Underline Variant"
                placeholder="Underline styling"
              />
            </div>
          </div>

          {/* Input States */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Input States
            </Text>
            <div className="space-y-4">
              <Input
                label="Default State"
                placeholder="Normal input"
                helperText="This is a normal input"
              />
              <Input
                label="Error State"
                placeholder="Input with error"
                error={true}
                errorMessage="This field is required"
              />
              <Input
                label="Success State"
                placeholder="Valid input"
                successMessage="Input is valid!"
              />
              <Input
                label="Warning State"
                placeholder="Input with warning"
                state="warning"
                helperText="Please double-check this value"
              />
              <Input
                label="Disabled State"
                placeholder="Disabled input"
                disabled={true}
                helperText="This input is disabled"
              />
              <Input
                label="Readonly State"
                value="Read-only value"
                readonly={true}
                helperText="This input is read-only"
              />
            </div>
          </div>

          {/* Label Positions */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Label Positions
            </Text>
            <div className="space-y-6">
              <Input
                label="Top Label (Default)"
                labelPosition="top"
                placeholder="Label above input"
                helperText="Label positioned above the input"
              />
              <Input
                label="Left Label"
                labelPosition="left"
                placeholder="Label to the left"
                helperText="Label positioned to the left of input"
              />
              <Input
                label="Floating Label"
                labelPosition="floating"
                helperText="Label floats above when focused or has value"
              />
            </div>
          </div>

          {/* Full Width and Required */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Layout Options
            </Text>
            <div className="space-y-4">
              <Input
                label="Full Width Input"
                placeholder="This input takes full width"
                fullWidth={true}
                helperText="Input spans the full width of its container"
              />
              <Input
                label="Required Field"
                placeholder="This field is required"
                required={true}
                helperText="Notice the asterisk (*) indicating required field"
              />
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="mb-8">
            <Text tag="h3" size="xl" weight="medium" marginBottom="4">
              Accessibility Features
            </Text>
            <div className="space-y-4">
              <Input
                label="Accessible Input"
                placeholder="Screen reader friendly"
                ariaLabel="Custom aria label for screen readers"
                helperText="This input has proper ARIA attributes"
              />
              <Input
                label="Input with Custom ARIA"
                placeholder="Custom accessibility"
                ariaDescribedBy="custom-description"
                helperText="Custom ARIA described-by relationship"
                id="accessible-input"
              />
            </div>
          </div>
        </section>

        {/* Server Component Example */}
        <ServerComponentExample />

        {/* Interactive Examples - Client Component */}
        <InteractiveExamples />

        {/* Accessibility Example */}
        <section className="mb-12">
          <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
            Accessibility Features
          </Text>
          <div className="space-y-4">
            <Text tag="label" weight="medium" ariaLabel="Form label example">
              Form Label with ARIA support
            </Text>
            <Text
              tag="p"
              ariaLive="polite"
              ariaAtomic={true}
              id="status-message"
            >
              This text will be announced to screen readers when it changes
            </Text>
            <Text tag="span" role="status" ariaLabel="Loading indicator">
              Loading...
            </Text>
          </div>
        </section>
      </main>
    </div>
  );
}
