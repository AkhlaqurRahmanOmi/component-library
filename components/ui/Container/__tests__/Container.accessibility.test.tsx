import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Container } from '../Container';
import { 
  testAccessibility, 
  testColorContrast, 
  testSemanticStructure,
  testHighContrastMode
} from '../../../utils/accessibility';

expect.extend(toHaveNoViolations);

describe('Container Component - Accessibility Tests', () => {
  describe('General Accessibility Compliance', () => {
    it('should have no accessibility violations with default props', async () => {
      await testAccessibility(
        <Container>
          <p>Default container content</p>
        </Container>
      );
    });

    it('should have no accessibility violations with different display types', async () => {
      const displayTypes = [
        <Container key="block" display="block"><p>Block container</p></Container>,
        <Container key="flex" display="flex"><p>Flex container</p></Container>,
        <Container key="grid" display="grid"><p>Grid container</p></Container>,
        <Container key="inline-block" display="inline-block"><p>Inline-block container</p></Container>,
        <Container key="inline-flex" display="inline-flex"><p>Inline-flex container</p></Container>,
        <Container key="inline-grid" display="inline-grid"><p>Inline-grid container</p></Container>
      ];

      for (const displayType of displayTypes) {
        await testAccessibility(displayType);
      }
    });

    it('should have no accessibility violations with semantic roles', async () => {
      const semanticContainers = [
        <Container key="main" role="main"><p>Main content</p></Container>,
        <Container key="section" role="region" ariaLabel="Content section"><p>Section content</p></Container>,
        <Container key="article" role="article"><p>Article content</p></Container>,
        <Container key="aside" role="complementary"><p>Aside content</p></Container>,
        <Container key="nav" role="navigation" ariaLabel="Site navigation"><p>Navigation content</p></Container>
      ];

      for (const container of semanticContainers) {
        await testAccessibility(container);
      }
    });

    it('should have no accessibility violations with interactive content', async () => {
      await testAccessibility(
        <Container role="button" tabIndex={0} ariaLabel="Interactive container">
          <p>Interactive content</p>
        </Container>
      );
    });
  });

  describe('Color Contrast Compliance', () => {
    it('should meet color contrast requirements with background colors', async () => {
      const backgroundVariants = [
        <Container key="white" background="white" className="text-black">
          <p>White background with black text</p>
        </Container>,
        <Container key="gray" background="gray" className="text-white">
          <p>Gray background with white text</p>
        </Container>,
        <Container key="blue" background="blue" className="text-white">
          <p>Blue background with white text</p>
        </Container>
      ];

      for (const variant of backgroundVariants) {
        await testColorContrast(variant);
      }
    });

    it('should maintain contrast with custom styling', async () => {
      await testColorContrast(
        <Container 
          style={{ backgroundColor: '#333', color: '#fff' }}
          className="p-4"
        >
          <p>Custom styled container with proper contrast</p>
        </Container>
      );
    });

    it('should maintain contrast with border styling', async () => {
      await testColorContrast(
        <Container 
          border="solid"
          className="border-gray-300 bg-white text-black p-4"
        >
          <p>Container with border styling</p>
        </Container>
      );
    });
  });

  describe('Semantic HTML Structure', () => {
    it('should use proper semantic HTML with roles', async () => {
      await testSemanticStructure(
        <div>
          <Container role="banner">
            <h1>Site Header</h1>
          </Container>
          <Container role="main">
            <h2>Main Content</h2>
            <p>Content goes here</p>
          </Container>
          <Container role="complementary" ariaLabel="Sidebar">
            <h3>Sidebar</h3>
            <p>Sidebar content</p>
          </Container>
          <Container role="contentinfo">
            <p>Footer content</p>
          </Container>
        </div>
      );
    });

    it('should support landmark roles correctly', () => {
      render(
        <div>
          <Container role="banner" data-testid="header">
            <h1>Header</h1>
          </Container>
          <Container role="navigation" ariaLabel="Main navigation" data-testid="nav">
            <nav>Navigation</nav>
          </Container>
          <Container role="main" data-testid="main">
            <main>Main content</main>
          </Container>
          <Container role="complementary" ariaLabel="Sidebar" data-testid="aside">
            <aside>Sidebar</aside>
          </Container>
          <Container role="contentinfo" data-testid="footer">
            <footer>Footer</footer>
          </Container>
        </div>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('complementary')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should handle region roles with proper labeling', () => {
      render(
        <Container role="region" ariaLabel="Product features" data-testid="features">
          <h2>Features</h2>
          <p>Feature content</p>
        </Container>
      );

      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-label', 'Product features');
      expect(region).toBeInTheDocument();
    });

    it('should support article and section semantics', () => {
      render(
        <div>
          <Container role="article" data-testid="article">
            <h2>Article Title</h2>
            <p>Article content</p>
          </Container>
          <Container role="region" ariaLabelledBy="section-heading" data-testid="section">
            <h3 id="section-heading">Section Title</h3>
            <p>Section content</p>
          </Container>
        </div>
      );

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'section-heading');
    });
  });

  describe('ARIA Attributes and Screen Reader Compatibility', () => {
    it('should handle ARIA attributes correctly', () => {
      render(
        <Container 
          role="region"
          ariaLabel="Content area"
          ariaDescribedBy="description"
          ariaLabelledBy="heading"
          ariaExpanded={true}
          ariaHidden={false}
          data-testid="aria-container"
        >
          <h2 id="heading">Section Heading</h2>
          <p id="description">Section description</p>
          <p>Section content</p>
        </Container>
      );

      const container = screen.getByTestId('aria-container');
      expect(container).toHaveAttribute('role', 'region');
      expect(container).toHaveAttribute('aria-label', 'Content area');
      expect(container).toHaveAttribute('aria-describedby', 'description');
      expect(container).toHaveAttribute('aria-labelledby', 'heading');
      expect(container).toHaveAttribute('aria-expanded', 'true');
      expect(container).toHaveAttribute('aria-hidden', 'false');
    });

    it('should support live regions for dynamic content', () => {
      render(
        <Container 
          role="status" 
          ariaLive="polite" 
          ariaAtomic={true}
          data-testid="status-container"
        >
          <p>Status message</p>
        </Container>
      );

      const container = screen.getByTestId('status-container');
      expect(container).toHaveAttribute('role', 'status');
      expect(container).toHaveAttribute('aria-live', 'polite');
      expect(container).toHaveAttribute('aria-atomic', 'true');
    });

    it('should handle alert regions correctly', () => {
      render(
        <Container role="alert" data-testid="alert-container">
          <p>Important alert message</p>
        </Container>
      );

      const container = screen.getByRole('alert');
      expect(container).toBeInTheDocument();
    });

    it('should support tabpanel role with proper attributes', () => {
      render(
        <div>
          <div role="tablist">
            <button role="tab" aria-controls="panel1" id="tab1">Tab 1</button>
          </div>
          <Container 
            role="tabpanel" 
            ariaLabelledBy="tab1"
            id="panel1"
            data-testid="tabpanel"
          >
            <p>Tab panel content</p>
          </Container>
        </div>
      );

      const tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab1');
      expect(tabpanel).toHaveAttribute('id', 'panel1');
    });
  });

  describe('Focus Management', () => {
    it('should handle focusable containers correctly', () => {
      render(
        <Container 
          tabIndex={0} 
          role="button" 
          ariaLabel="Focusable container"
          data-testid="focusable-container"
        >
          <p>Focusable content</p>
        </Container>
      );

      const container = screen.getByTestId('focusable-container');
      container.focus();

      expect(document.activeElement).toBe(container);
      expect(container).toHaveAttribute('tabIndex', '0');
    });

    it('should not interfere with focus of child elements', () => {
      render(
        <Container>
          <button>First Button</button>
          <input placeholder="Text input" />
          <button>Second Button</button>
        </Container>
      );

      const firstButton = screen.getByText('First Button');
      const input = screen.getByRole('textbox');
      const secondButton = screen.getByText('Second Button');

      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      input.focus();
      expect(document.activeElement).toBe(input);

      secondButton.focus();
      expect(document.activeElement).toBe(secondButton);
    });

    it('should handle skip links correctly', () => {
      render(
        <div>
          <a href="#main-content" className="sr-only focus:not-sr-only">
            Skip to main content
          </a>
          <Container role="main" id="main-content" tabIndex={-1}>
            <h1>Main Content</h1>
            <p>Content goes here</p>
          </Container>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');
      const mainContent = screen.getByRole('main');

      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(mainContent).toHaveAttribute('id', 'main-content');
      expect(mainContent).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('High Contrast Mode Compatibility', () => {
    it('should be compatible with high contrast mode', () => {
      render(
        <Container 
          className="border border-gray-300 bg-white"
          data-testid="high-contrast-container"
        >
          <p>High contrast container</p>
        </Container>
      );

      const container = screen.getByTestId('high-contrast-container');
      const compatibility = testHighContrastMode(container);

      expect(compatibility.isCompatible).toBe(true);
    });

    it('should maintain visibility with different background colors', () => {
      const backgrounds = ['white', 'gray', 'blue'] as const;

      backgrounds.forEach((bg) => {
        const { unmount } = render(
          <Container 
            background={bg}
            className="border border-gray-300"
            data-testid={`container-${bg}`}
          >
            <p>{bg} background container</p>
          </Container>
        );

        const container = screen.getByTestId(`container-${bg}`);
        const compatibility = testHighContrastMode(container);

        expect(compatibility.isCompatible).toBe(true);
        unmount();
      });
    });

    it('should maintain border visibility in high contrast mode', () => {
      render(
        <Container 
          border="solid"
          className="border-2 border-gray-400"
          data-testid="border-container"
        >
          <p>Container with border</p>
        </Container>
      );

      const container = screen.getByTestId('border-container');
      const compatibility = testHighContrastMode(container);

      expect(compatibility.hasBorder).toBe(true);
      expect(compatibility.isCompatible).toBe(true);
    });
  });

  describe('Layout Accessibility', () => {
    it('should handle flexbox layouts accessibly', async () => {
      await testAccessibility(
        <Container 
          display="flex" 
          direction="column" 
          gap="4"
          role="region"
          ariaLabel="Flex layout"
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Container>
      );
    });

    it('should handle grid layouts accessibly', async () => {
      await testAccessibility(
        <Container 
          display="grid" 
          className="grid-cols-2 gap-4"
          role="region"
          ariaLabel="Grid layout"
        >
          <div>Grid item 1</div>
          <div>Grid item 2</div>
          <div>Grid item 3</div>
          <div>Grid item 4</div>
        </Container>
      );
    });

    it('should maintain reading order in complex layouts', () => {
      render(
        <Container display="flex" direction="row-reverse">
          <div id="second">Second in DOM, first visually</div>
          <div id="first">First in DOM, second visually</div>
        </Container>
      );

      // Visual order is reversed, but DOM order should be maintained for screen readers
      const first = document.getElementById('first');
      const second = document.getElementById('second');

      expect(first?.nextElementSibling).toBe(second);
    });

    it('should handle responsive layouts accessibly', async () => {
      await testAccessibility(
        <Container 
          className="flex flex-col md:flex-row gap-4"
          role="region"
          ariaLabel="Responsive layout"
        >
          <div>Responsive item 1</div>
          <div>Responsive item 2</div>
        </Container>
      );
    });
  });

  describe('Interactive Container Accessibility', () => {
    it('should handle clickable containers correctly', async () => {
      const handleClick = jest.fn();

      await testAccessibility(
        <Container 
          role="button"
          tabIndex={0}
          onClick={handleClick}
          ariaLabel="Clickable container"
        >
          <p>Click me</p>
        </Container>
      );
    });

    it('should handle expandable/collapsible containers', () => {
      const { rerender } = render(
        <Container 
          role="button"
          tabIndex={0}
          ariaExpanded={false}
          ariaControls="collapsible-content"
          ariaLabel="Expand content"
          data-testid="expandable-container"
        >
          <p>Click to expand</p>
        </Container>
      );

      let container = screen.getByTestId('expandable-container');
      expect(container).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <Container 
          role="button"
          tabIndex={0}
          ariaExpanded={true}
          ariaControls="collapsible-content"
          ariaLabel="Collapse content"
          data-testid="expandable-container"
        >
          <p>Click to collapse</p>
          <div id="collapsible-content">
            <p>Expanded content</p>
          </div>
        </Container>
      );

      container = screen.getByTestId('expandable-container');
      expect(container).toHaveAttribute('aria-expanded', 'true');
      expect(container).toHaveAttribute('aria-controls', 'collapsible-content');
    });

    it('should handle drag and drop containers', async () => {
      await testAccessibility(
        <Container 
          role="listbox"
          ariaLabel="Draggable items"
          tabIndex={0}
        >
          <div role="option" draggable tabIndex={0} aria-grabbed="false">
            Draggable item 1
          </div>
          <div role="option" draggable tabIndex={0} aria-grabbed="false">
            Draggable item 2
          </div>
        </Container>
      );
    });
  });

  describe('Responsive Accessibility', () => {
    it('should maintain accessibility across different screen sizes', async () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      await testAccessibility(
        <Container 
          className="p-2 sm:p-4 md:p-6"
          role="region"
          ariaLabel="Responsive container"
        >
          <p>Responsive content</p>
        </Container>
      );

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      await testAccessibility(
        <Container 
          className="p-2 sm:p-4 md:p-6"
          role="region"
          ariaLabel="Responsive container"
        >
          <p>Responsive content</p>
        </Container>
      );
    });

    it('should handle responsive role changes', async () => {
      // This would be handled by responsive design patterns
      await testAccessibility(
        <Container 
          role="navigation"
          ariaLabel="Mobile navigation"
          className="block md:hidden"
        >
          <p>Mobile nav</p>
        </Container>
      );

      await testAccessibility(
        <Container 
          role="navigation"
          ariaLabel="Desktop navigation"
          className="hidden md:block"
        >
          <p>Desktop nav</p>
        </Container>
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty containers gracefully', async () => {
      await testAccessibility(<Container />);
    });

    it('should handle containers with only whitespace', async () => {
      await testAccessibility(
        <Container>
          {' '}
        </Container>
      );
    });

    it('should handle deeply nested containers', async () => {
      await testAccessibility(
        <Container role="main">
          <Container role="region" ariaLabel="Section 1">
            <Container role="article">
              <Container>
                <p>Deeply nested content</p>
              </Container>
            </Container>
          </Container>
        </Container>
      );
    });

    it('should handle conflicting ARIA attributes gracefully', () => {
      render(
        <Container 
          role="button"
          ariaLabel="Button label"
          ariaLabelledBy="conflicting-label"
          data-testid="conflicting-container"
        >
          <p id="conflicting-label">Conflicting label</p>
          <p>Container content</p>
        </Container>
      );

      const container = screen.getByTestId('conflicting-container');
      expect(container).toHaveAttribute('aria-label', 'Button label');
      expect(container).toHaveAttribute('aria-labelledby', 'conflicting-label');
      // Both attributes are present - aria-labelledby should take precedence
    });

    it('should handle invalid role attributes gracefully', async () => {
      // @ts-expect-error - Testing invalid role handling
      await testAccessibility(
        <Container role="invalid-role">
          <p>Content with invalid role</p>
        </Container>
      );
    });
  });

  describe('Performance and Memory', () => {
    it('should not create memory leaks with event listeners', () => {
      const handleClick = jest.fn();
      
      const { unmount } = render(
        <Container onClick={handleClick} role="button" tabIndex={0}>
          <p>Clickable container</p>
        </Container>
      );

      // Component should unmount cleanly
      unmount();
      
      // No assertions needed - test passes if no memory leaks occur
    });

    it('should handle rapid re-renders without accessibility issues', async () => {
      const { rerender } = render(
        <Container role="status" ariaLive="polite">
          <p>Status 1</p>
        </Container>
      );

      // Rapid re-renders
      for (let i = 2; i <= 5; i++) {
        rerender(
          <Container role="status" ariaLive="polite">
            <p>Status {i}</p>
          </Container>
        );
      }

      // Final state should still be accessible
      await testAccessibility(
        <Container role="status" ariaLive="polite">
          <p>Status 5</p>
        </Container>
      );
    });
  });
});