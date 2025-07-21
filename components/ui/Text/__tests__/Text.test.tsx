import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Text } from '../Text';
import type { TextProps } from '../Text.types';

describe('Text Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Text>Hello World</Text>);
      const element = screen.getByText('Hello World');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('P');
    });

    it('renders with custom tag', () => {
      render(<Text tag="h1">Heading</Text>);
      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H1');
    });

    it('renders with all heading levels', () => {
      const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      
      headingLevels.forEach((tag, index) => {
        const { unmount } = render(<Text tag={tag}>{`Heading ${index + 1}`}</Text>);
        const element = screen.getByRole('heading', { level: index + 1 });
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe(tag.toUpperCase());
        unmount();
      });
    });

    it('renders with span tag', () => {
      render(<Text tag="span">Span text</Text>);
      const element = screen.getByText('Span text');
      expect(element.tagName).toBe('SPAN');
    });

    it('renders with div tag', () => {
      render(<Text tag="div">Div text</Text>);
      const element = screen.getByText('Div text');
      expect(element.tagName).toBe('DIV');
    });

    it('renders with label tag', () => {
      render(<Text tag="label">Label text</Text>);
      const element = screen.getByText('Label text');
      expect(element.tagName).toBe('LABEL');
    });

    it('applies custom className', () => {
      render(<Text className="custom-class">Text</Text>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Text>
          <span>Child 1</span>
          <span>Child 2</span>
        </Text>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Typography Props', () => {
    it('applies size classes correctly', () => {
      const sizes: Array<TextProps['size']> = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
      
      sizes.forEach((size) => {
        const { unmount } = render(<Text size={size}>Size test</Text>);
        const element = screen.getByText('Size test');
        expect(element).toHaveClass(`text-${size}`);
        unmount();
      });
    });

    it('applies weight classes correctly', () => {
      const weights: Array<TextProps['weight']> = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
      
      weights.forEach((weight) => {
        const { unmount } = render(<Text weight={weight}>Weight test</Text>);
        const element = screen.getByText('Weight test');
        expect(element).toHaveClass(`font-${weight}`);
        unmount();
      });
    });

    it('applies color classes correctly', () => {
      const colors: Array<TextProps['color']> = [
        'black', 'white', 'gray', 'red', 'blue', 'green', 
        'yellow', 'purple', 'pink', 'indigo', 'orange', 'teal', 'cyan',
        'primary', 'secondary', 'success', 'warning', 'error', 'info'
      ];
      
      colors.forEach((color) => {
        const { unmount } = render(<Text color={color}>Color test</Text>);
        const element = screen.getByText('Color test');
        
        // Check for color class based on semantic or standard colors
        if (color === 'primary') {
          expect(element).toHaveClass('text-blue-600');
        } else if (color === 'secondary') {
          expect(element).toHaveClass('text-gray-600');
        } else if (color === 'success') {
          expect(element).toHaveClass('text-green-600');
        } else if (color === 'warning') {
          expect(element).toHaveClass('text-yellow-600');
        } else if (color === 'error') {
          expect(element).toHaveClass('text-red-600');
        } else if (color === 'info') {
          expect(element).toHaveClass('text-blue-500');
        } else if (color === 'black') {
          expect(element).toHaveClass('text-black');
        } else if (color === 'white') {
          expect(element).toHaveClass('text-white');
        } else {
          expect(element).toHaveClass(`text-${color}-500`);
        }
        
        unmount();
      });
    });

    it('applies color with intensity classes correctly', () => {
      render(<Text color="blue-700">Blue 700 text</Text>);
      const element = screen.getByText('Blue 700 text');
      expect(element).toHaveClass('text-blue-700');
    });

    it('applies alignment classes correctly', () => {
      const alignments: Array<TextProps['align']> = ['left', 'center', 'right', 'justify', 'start', 'end'];
      
      alignments.forEach((align) => {
        const { unmount } = render(<Text align={align}>Align test</Text>);
        const element = screen.getByText('Align test');
        expect(element).toHaveClass(`text-${align}`);
        unmount();
      });
    });

    it('applies decoration classes correctly', () => {
      const decorations: Array<TextProps['decoration']> = ['none', 'underline', 'overline', 'line-through'];
      
      decorations.forEach((decoration) => {
        const { unmount } = render(<Text decoration={decoration}>Decoration test</Text>);
        const element = screen.getByText('Decoration test');
        
        if (decoration === 'none') {
          expect(element).toHaveClass('no-underline');
        } else {
          expect(element).toHaveClass(decoration);
        }
        
        unmount();
      });
    });

    it('applies transform classes correctly', () => {
      const transforms: Array<TextProps['transform']> = ['none', 'uppercase', 'lowercase', 'capitalize'];
      
      transforms.forEach((transform) => {
        const { unmount } = render(<Text transform={transform}>Transform test</Text>);
        const element = screen.getByText('Transform test');
        
        if (transform === 'none') {
          expect(element).toHaveClass('normal-case');
        } else {
          expect(element).toHaveClass(transform);
        }
        
        unmount();
      });
    });

    it('applies letter spacing classes correctly', () => {
      const spacingOptions: Array<TextProps['spacing']> = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'];
      
      spacingOptions.forEach((spacing) => {
        const { unmount } = render(<Text spacing={spacing}>Spacing test</Text>);
        const element = screen.getByText('Spacing test');
        expect(element).toHaveClass(`tracking-${spacing}`);
        unmount();
      });
    });

    it('applies line height classes correctly', () => {
      const lineHeights: Array<TextProps['lineHeight']> = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', '3', '4', '5'];
      
      lineHeights.forEach((lineHeight) => {
        const { unmount } = render(<Text lineHeight={lineHeight}>Line height test</Text>);
        const element = screen.getByText('Line height test');
        expect(element).toHaveClass(`leading-${lineHeight}`);
        unmount();
      });
    });
  });

  describe('Layout Props', () => {
    it('applies margin classes correctly', () => {
      const margins = ['0', '1', '2', '4', '8', '16', 'px', 'auto'];
      
      margins.forEach((margin) => {
        const { unmount } = render(<Text margin={margin}>Margin test</Text>);
        const element = screen.getByText('Margin test');
        expect(element).toHaveClass(`m-${margin}`);
        unmount();
      });
    });

    it('applies directional margin classes correctly', () => {
      render(
        <Text 
          marginTop="2" 
          marginRight="4" 
          marginBottom="6" 
          marginLeft="8"
          marginX="3"
          marginY="5"
        >
          Directional margin test
        </Text>
      );
      
      const element = screen.getByText('Directional margin test');
      expect(element).toHaveClass('mt-2', 'mr-4', 'mb-6', 'ml-8', 'mx-3', 'my-5');
    });

    it('applies padding classes correctly', () => {
      const paddings = ['0', '1', '2', '4', '8', '16', 'px'];
      
      paddings.forEach((padding) => {
        const { unmount } = render(<Text padding={padding}>Padding test</Text>);
        const element = screen.getByText('Padding test');
        expect(element).toHaveClass(`p-${padding}`);
        unmount();
      });
    });

    it('applies directional padding classes correctly', () => {
      render(
        <Text 
          paddingTop="2" 
          paddingRight="4" 
          paddingBottom="6" 
          paddingLeft="8"
          paddingX="3"
          paddingY="5"
        >
          Directional padding test
        </Text>
      );
      
      const element = screen.getByText('Directional padding test');
      expect(element).toHaveClass('pt-2', 'pr-4', 'pb-6', 'pl-8', 'px-3', 'py-5');
    });

    it('applies display classes correctly', () => {
      const displays: Array<TextProps['display']> = [
        'block', 'inline', 'inline-block', 'flex', 'inline-flex', 
        'grid', 'inline-grid', 'table', 'table-cell', 'table-row', 'hidden'
      ];
      
      displays.forEach((display) => {
        const { unmount } = render(<Text display={display}>Display test</Text>);
        const element = screen.getByText('Display test');
        expect(element).toHaveClass(display);
        unmount();
      });
    });

    it('applies truncate correctly', () => {
      render(<Text truncate>Truncated text</Text>);
      const element = screen.getByText('Truncated text');
      expect(element).toHaveClass('truncate');
    });

    it('applies wrap options correctly', () => {
      const wrapOptions = [false, 'nowrap', 'wrap', 'balance'];
      
      wrapOptions.forEach((wrap) => {
        const { unmount } = render(<Text wrap={wrap}>Wrap test</Text>);
        const element = screen.getByText('Wrap test');
        
        if (wrap === false || wrap === 'nowrap') {
          expect(element).toHaveClass('whitespace-nowrap');
        } else if (wrap === 'wrap') {
          expect(element).toHaveClass('whitespace-normal');
        } else if (wrap === 'balance') {
          expect(element).toHaveClass('text-balance');
        }
        
        unmount();
      });
    });

    it('applies word break options correctly', () => {
      const wordBreakOptions: Array<TextProps['wordBreak']> = ['normal', 'words', 'all', 'keep'];
      
      wordBreakOptions.forEach((wordBreak) => {
        const { unmount } = render(<Text wordBreak={wordBreak}>Word break test</Text>);
        const element = screen.getByText('Word break test');
        expect(element).toHaveClass(`break-${wordBreak}`);
        unmount();
      });
    });
  });

  describe('Semantic Props', () => {
    it('applies error styling correctly', () => {
      render(<Text error>Error message</Text>);
      const element = screen.getByText('Error message');
      expect(element).toHaveClass('text-red-600');
    });

    it('applies success styling correctly', () => {
      render(<Text success>Success message</Text>);
      const element = screen.getByText('Success message');
      expect(element).toHaveClass('text-green-600');
    });

    it('applies warning styling correctly', () => {
      render(<Text warning>Warning message</Text>);
      const element = screen.getByText('Warning message');
      expect(element).toHaveClass('text-yellow-600');
    });

    it('applies info styling correctly', () => {
      render(<Text info>Info message</Text>);
      const element = screen.getByText('Info message');
      expect(element).toHaveClass('text-blue-500');
    });

    it('prioritizes semantic props over color prop', () => {
      render(<Text color="blue" error>Error message</Text>);
      const element = screen.getByText('Error message');
      expect(element).toHaveClass('text-red-600');
      expect(element).not.toHaveClass('text-blue-500');
    });
  });

  describe('Accessibility', () => {
    it('applies ARIA attributes correctly', () => {
      render(
        <Text 
          role="button" 
          ariaLabel="Custom label"
          ariaDescribedBy="description"
          ariaLabelledBy="label-id"
          tabIndex={0}
          ariaExpanded={true}
          ariaPressed={false}
          ariaSelected={true}
          ariaDisabled={false}
          ariaHidden={false}
          ariaLive="polite"
          ariaAtomic={true}
        >
          Accessible text
        </Text>
      );
      
      const element = screen.getByText('Accessible text');
      expect(element).toHaveAttribute('role', 'button');
      expect(element).toHaveAttribute('aria-label', 'Custom label');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-labelledby', 'label-id');
      expect(element).toHaveAttribute('tabIndex', '0');
      expect(element).toHaveAttribute('aria-expanded', 'true');
      expect(element).toHaveAttribute('aria-pressed', 'false');
      expect(element).toHaveAttribute('aria-selected', 'true');
      expect(element).toHaveAttribute('aria-disabled', 'false');
      expect(element).toHaveAttribute('aria-hidden', 'false');
      expect(element).toHaveAttribute('aria-live', 'polite');
      expect(element).toHaveAttribute('aria-atomic', 'true');
    });

    it('supports keyboard navigation when interactive', () => {
      const handleClick = jest.fn();
      const handleKeyDown = jest.fn();
      
      render(
        <Text 
          onClick={handleClick} 
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
        >
          Interactive text
        </Text>
      );
      
      const element = screen.getByText('Interactive text');
      expect(element).toHaveAttribute('tabIndex', '0');
      expect(element).toHaveAttribute('role', 'button');
    });

    it('has proper semantic structure with headings', () => {
      render(<Text tag="h2">Section Heading</Text>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('supports language and direction attributes', () => {
      render(
        <Text lang="fr" dir="rtl">
          Bonjour le monde
        </Text>
      );
      
      const element = screen.getByText('Bonjour le monde');
      expect(element).toHaveAttribute('lang', 'fr');
      expect(element).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Text onClick={handleClick}>Clickable text</Text>);
      
      const element = screen.getByText('Clickable text');
      await user.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles double click events', async () => {
      const user = userEvent.setup();
      const handleDoubleClick = jest.fn();
      
      render(<Text onDoubleClick={handleDoubleClick}>Double-clickable text</Text>);
      
      const element = screen.getByText('Double-clickable text');
      await user.dblClick(element);
      
      expect(handleDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse enter events', async () => {
      const user = userEvent.setup();
      const handleMouseEnter = jest.fn();
      
      render(<Text onMouseEnter={handleMouseEnter}>Hoverable text</Text>);
      
      const element = screen.getByText('Hoverable text');
      await user.hover(element);
      
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('handles mouse leave events', async () => {
      const user = userEvent.setup();
      const handleMouseLeave = jest.fn();
      
      render(<Text onMouseLeave={handleMouseLeave}>Hoverable text</Text>);
      
      const element = screen.getByText('Hoverable text');
      await user.hover(element);
      await user.unhover(element);
      
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles focus events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      
      render(<Text onFocus={handleFocus} tabIndex={0}>Focusable text</Text>);
      
      const element = screen.getByText('Focusable text');
      await user.tab();
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();
      
      render(<Text onBlur={handleBlur} tabIndex={0}>Focusable text</Text>);
      
      const element = screen.getByText('Focusable text');
      await user.tab();
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles key down events', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      
      render(<Text onKeyDown={handleKeyDown} tabIndex={0}>Interactive text</Text>);
      
      const element = screen.getByText('Interactive text');
      await user.tab();
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes correctly', () => {
      render(
        <Text 
          id="test-id" 
          title="Test title"
          data-testid="custom-test-id"
        >
          Attributed text
        </Text>
      );
      
      const element = screen.getByText('Attributed text');
      expect(element).toHaveAttribute('id', 'test-id');
      expect(element).toHaveAttribute('title', 'Test title');
      expect(element).toHaveAttribute('data-testid', 'custom-test-id');
    });

    it('applies inline styles correctly', () => {
      const customStyle = { fontSize: '20px', lineHeight: '1.5' };
      render(<Text style={customStyle}>Styled text</Text>);
      
      const element = screen.getByText('Styled text');
      expect(element).toHaveStyle('font-size: 20px');
      expect(element).toHaveStyle('line-height: 1.5');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Text>{''}</Text>);
      const element = screen.getByText('', { selector: 'p' });
      expect(element).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Text>{null}</Text>);
      const element = document.querySelector('p');
      expect(element).toBeInTheDocument();
    });

    it('combines multiple classes correctly', () => {
      render(
        <Text 
          size="lg" 
          weight="bold" 
          color="blue" 
          align="center"
          decoration="underline"
          transform="uppercase"
          spacing="wide"
          margin="4"
          padding="2"
          className="custom-class"
        >
          Multi-class text
        </Text>
      );
      
      const element = screen.getByText('Multi-class text');
      expect(element).toHaveClass(
        'text-lg', 
        'font-bold', 
        'text-blue-500', 
        'text-center',
        'underline',
        'uppercase',
        'tracking-wide',
        'm-4',
        'p-2',
        'custom-class'
      );
    });

    it('handles invalid prop values gracefully', () => {
      // @ts-expect-error - Testing invalid prop handling
      render(<Text size="invalid">Invalid prop test</Text>);
      const element = screen.getByText('Invalid prop test');
      expect(element).toBeInTheDocument();
    });

    it('handles responsive margin values', () => {
      render(
        <Text margin={{ sm: '2', md: '4', lg: '6' }}>
          Responsive margin
        </Text>
      );
      
      const element = screen.getByText('Responsive margin');
      expect(element).toHaveClass('sm:m-2', 'md:m-4', 'lg:m-6');
    });
  });
});