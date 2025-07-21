import React from 'react';
import { Text, Container } from '../index';

/**
 * ComponentShowcase - A simple showcase component that displays an overview
 * of the component library features
 */
export function ComponentShowcase() {
  return (
    <Container padding="6" marginBottom="12">
      <Container 
        background="white" 
        padding="8" 
        borderRadius="lg" 
        shadow="lg"
        border={{ width: "1", style: "solid", color: "gray" }}
      >
        <Text tag="h2" size="3xl" weight="bold" marginBottom="4" color="primary">
          Welcome to Our Component Library
        </Text>
        
        <Text size="lg" color="gray" marginBottom="6">
          A comprehensive collection of accessible, customizable React components built with TypeScript and Tailwind CSS.
        </Text>
        
        <Container display="grid" gridCols="1" gap="6" responsive={{ md: { gridCols: "2" }, lg: { gridCols: "3" } }}>
          <Container 
            background="blue" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              🎨 Flexible Styling
            </Text>
            <Text color="white" size="sm">
              Comprehensive prop-based styling system with Tailwind CSS integration
            </Text>
          </Container>
          
          <Container 
            background="green" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              ♿ Accessibility First
            </Text>
            <Text color="white" size="sm">
              Built-in ARIA attributes, keyboard navigation, and screen reader support
            </Text>
          </Container>
          
          <Container 
            background="purple" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              📱 Responsive Design
            </Text>
            <Text color="white" size="sm">
              Mobile-first responsive components that work across all devices
            </Text>
          </Container>
          
          <Container 
            background="orange" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              🔧 TypeScript Support
            </Text>
            <Text color="white" size="sm">
              Full TypeScript support with comprehensive type definitions
            </Text>
          </Container>
          
          <Container 
            background="teal" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              ⚡ Performance Optimized
            </Text>
            <Text color="white" size="sm">
              Memoized class generation and tree-shaking support for optimal bundle size
            </Text>
          </Container>
          
          <Container 
            background="red" 
            padding="4" 
            borderRadius="md" 
            shadow="sm"
          >
            <Text color="white" weight="semibold" marginBottom="2">
              🧪 Thoroughly Tested
            </Text>
            <Text color="white" size="sm">
              Comprehensive unit tests and accessibility testing for reliability
            </Text>
          </Container>
        </Container>
        
        <Container marginTop="8" padding="4" background="gray" borderRadius="md">
          <Text weight="medium" marginBottom="2">
            Available Components:
          </Text>
          <Container display="flex" gap="2" wrap="wrap">
            <Container background="white" padding="2" borderRadius="sm" shadow="sm">
              <Text size="sm" weight="medium">Text</Text>
            </Container>
            <Container background="white" padding="2" borderRadius="sm" shadow="sm">
              <Text size="sm" weight="medium">Button</Text>
            </Container>
            <Container background="white" padding="2" borderRadius="sm" shadow="sm">
              <Text size="sm" weight="medium">Input</Text>
            </Container>
            <Container background="white" padding="2" borderRadius="sm" shadow="sm">
              <Text size="sm" weight="medium">Container</Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default ComponentShowcase;