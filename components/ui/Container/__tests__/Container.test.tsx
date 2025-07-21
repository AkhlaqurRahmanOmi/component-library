import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Container } from '../Container';
import type { ContainerProps } from '../Container.types';

describe('Container Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Container>Default container</Container>);
      const container = screen.getByText('Default container');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    it('renders with custom element tag', () => {
      render(<Container as="section">Section container</Container>);
      const container = screen.getByText('Section container');
      expect(container.tagName).toBe('SECTION');
    });

    it('renders with various HTML elements', () => {
      const elements = ['article', 'aside', 'main', 'nav', 'header', 'footer'] as const;
      
      elements.forEach((element) => {
        const { unmount } = render(
          <Container as={element} data-testid={`container-${element}`}>
            {element} container
          </Container>
        );
        
        const container = screen.getByTestId(`container-${element}`);
        expect(container.tagName).toBe(element.toUpperCase());
        unmount();
      });
    });

    it('renders children correctly', () => {
      render(
        <Container>
          <span>Child 1</span>
          <span>Child 2</span>
        </Container>
      );
      
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Container className="custom-container">Content</Container>);
      const container = screen.getByText('Content');
      expect(container).toHaveClass('custom-container');
    });
  });

  describe('Layout Props', () => {
    it('applies display classes correctly', () => {
      const displays: Array<ContainerProps['display']> = [
        'block', 'inline', 'inline-block', 'flex', 'inline-flex', 
        'grid', 'inline-grid', 'table', 'table-cell', 'table-row', 'hidden'
      ];
      
      displays.forEach((display) => {
        const { unmount } = render(
          <Container display={display} data-testid={`container-${display}`}>
            Display test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${display}`);
        expect(container).toHaveClass(display);
        unmount();
      });
    });

    it('applies flex direction classes correctly', () => {
      const directions: Array<ContainerProps['direction']> = ['row', 'column', 'row-reverse', 'column-reverse'];
      
      directions.forEach((direction) => {
        const { unmount } = render(
          <Container display="flex" direction={direction} data-testid={`container-${direction}`}>
            Direction test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${direction}`);
        const expectedClass = direction === 'column' ? 'flex-col' : direction === 'column-reverse' ? 'flex-col-reverse' : `flex-${direction}`;
        expect(container).toHaveClass(expectedClass);
        unmount();
      });
    });

    it('applies justify content classes correctly', () => {
      const justifyOptions: Array<ContainerProps['justify']> = ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'];
      
      justifyOptions.forEach((justify) => {
        const { unmount } = render(
          <Container display="flex" justify={justify} data-testid={`container-${justify}`}>
            Justify test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${justify}`);
        expect(container).toHaveClass(`justify-${justify}`);
        unmount();
      });
    });

    it('applies align items classes correctly', () => {
      const alignOptions: Array<ContainerProps['align']> = ['start', 'center', 'end', 'stretch', 'baseline'];
      
      alignOptions.forEach((align) => {
        const { unmount } = render(
          <Container display="flex" align={align} data-testid={`container-${align}`}>
            Align test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${align}`);
        expect(container).toHaveClass(`items-${align}`);
        unmount();
      });
    });

    it('applies flex wrap classes correctly', () => {
      const wrapOptions: Array<ContainerProps['wrap']> = ['nowrap', 'wrap', 'wrap-reverse'];
      
      wrapOptions.forEach((wrap) => {
        const { unmount } = render(
          <Container display="flex" wrap={wrap} data-testid={`container-${wrap}`}>
            Wrap test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${wrap}`);
        expect(container).toHaveClass(`flex-${wrap}`);
        unmount();
      });
    });

    it('applies gap classes correctly', () => {
      const gaps = ['0', '1', '2', '4', '8', '12', '16'];
      
      gaps.forEach((gap) => {
        const { unmount } = render(
          <Container display="flex" gap={gap} data-testid={`container-gap-${gap}`}>
            Gap test
          </Container>
        );
        
        const container = screen.getByTestId(`container-gap-${gap}`);
        expect(container).toHaveClass(`gap-${gap}`);
        unmount();
      });
    });

    it('applies grid column classes correctly', () => {
      const gridCols = ['1', '2', '3', '4', '6', '12', 'none'];
      
      gridCols.forEach((cols) => {
        const { unmount } = render(
          <Container display="grid" gridCols={cols} data-testid={`container-grid-${cols}`}>
            Grid columns test
          </Container>
        );
        
        const container = screen.getByTestId(`container-grid-${cols}`);
        expect(container).toHaveClass(`grid-cols-${cols}`);
        unmount();
      });
    });

    it('applies grid row classes correctly', () => {
      const gridRows = ['1', '2', '3', '4', '6', 'none'];
      
      gridRows.forEach((rows) => {
        const { unmount } = render(
          <Container display="grid" gridRows={rows} data-testid={`container-grid-rows-${rows}`}>
            Grid rows test
          </Container>
        );
        
        const container = screen.getByTestId(`container-grid-rows-${rows}`);
        expect(container).toHaveClass(`grid-rows-${rows}`);
        unmount();
      });
    });

    it('applies grid column span classes correctly', () => {
      const gridColSpans = ['1', '2', '3', '4', '6', '12', 'full'];
      
      gridColSpans.forEach((span) => {
        const { unmount } = render(
          <Container display="grid" gridColSpan={span} data-testid={`container-col-span-${span}`}>
            Grid column span test
          </Container>
        );
        
        const container = screen.getByTestId(`container-col-span-${span}`);
        expect(container).toHaveClass(`col-span-${span}`);
        unmount();
      });
    });

    it('applies grid row span classes correctly', () => {
      const gridRowSpans = ['1', '2', '3', '4', '6', 'full'];
      
      gridRowSpans.forEach((span) => {
        const { unmount } = render(
          <Container display="grid" gridRowSpan={span} data-testid={`container-row-span-${span}`}>
            Grid row span test
          </Container>
        );
        
        const container = screen.getByTestId(`container-row-span-${span}`);
        expect(container).toHaveClass(`row-span-${span}`);
        unmount();
      });
    });

    it('applies position classes correctly', () => {
      const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
      
      positions.forEach((position) => {
        const { unmount } = render(
          <Container position={position} data-testid={`container-position-${position}`}>
            Position test
          </Container>
        );
        
        const container = screen.getByTestId(`container-position-${position}`);
        expect(container).toHaveClass(position);
        unmount();
      });
    });

    it('applies positioning values correctly', () => {
      render(
        <Container 
          position="absolute" 
          top="0" 
          right="0" 
          bottom="0" 
          left="0"
          zIndex="10"
        >
          Positioned container
        </Container>
      );
      
      const container = screen.getByText('Positioned container');
      expect(container).toHaveClass('absolute', 'top-0', 'right-0', 'bottom-0', 'left-0', 'z-10');
    });

    it('applies overflow classes correctly', () => {
      const overflowOptions = ['visible', 'hidden', 'scroll', 'auto'];
      
      overflowOptions.forEach((overflow) => {
        const { unmount } = render(
          <Container overflow={overflow} data-testid={`container-overflow-${overflow}`}>
            Overflow test
          </Container>
        );
        
        const container = screen.getByTestId(`container-overflow-${overflow}`);
        expect(container).toHaveClass(`overflow-${overflow}`);
        unmount();
      });
    });

    it('applies directional overflow classes correctly', () => {
      render(
        <Container 
          overflowX="scroll" 
          overflowY="hidden"
        >
          Directional overflow test
        </Container>
      );
      
      const container = screen.getByText('Directional overflow test');
      expect(container).toHaveClass('overflow-x-scroll', 'overflow-y-hidden');
    });

    it('applies opacity classes correctly', () => {
      const opacities = ['0', '50', '75', '100'];
      
      opacities.forEach((opacity) => {
        const { unmount } = render(
          <Container opacity={opacity} data-testid={`container-opacity-${opacity}`}>
            Opacity test
          </Container>
        );
        
        const container = screen.getByTestId(`container-opacity-${opacity}`);
        expect(container).toHaveClass(`opacity-${opacity}`);
        unmount();
      });
    });
  });

  describe('Sizing Props', () => {
    it('applies width classes correctly', () => {
      const widths = ['auto', 'full', 'screen', 'min', 'max', 'fit', '1/2', '1/3', '2/3', '1/4', '3/4'];
      
      widths.forEach((width) => {
        const { unmount } = render(
          <Container width={width} data-testid={`container-${width.replace('/', '-')}`}>
            Width test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${width.replace('/', '-')}`);
        expect(container).toHaveClass(`w-${width}`);
        unmount();
      });
    });

    it('applies height classes correctly', () => {
      const heights = ['auto', 'full', 'screen', 'min', 'max', 'fit', '1/2', '1/3', '2/3'];
      
      heights.forEach((height) => {
        const { unmount } = render(
          <Container height={height} data-testid={`container-height-${height.replace('/', '-')}`}>
            Height test
          </Container>
        );
        
        const container = screen.getByTestId(`container-height-${height.replace('/', '-')}`);
        expect(container).toHaveClass(`h-${height}`);
        unmount();
      });
    });

    it('applies max width classes correctly', () => {
      const maxWidths = ['none', 'full', 'min', 'max', 'fit', 'screen'];
      
      maxWidths.forEach((maxWidth) => {
        const { unmount } = render(
          <Container maxWidth={maxWidth} data-testid={`container-max-width-${maxWidth}`}>
            Max width test
          </Container>
        );
        
        const container = screen.getByTestId(`container-max-width-${maxWidth}`);
        expect(container).toHaveClass(`max-w-${maxWidth}`);
        unmount();
      });
    });

    it('applies max height classes correctly', () => {
      const maxHeights = ['none', 'full', 'screen'];
      
      maxHeights.forEach((maxHeight) => {
        const { unmount } = render(
          <Container maxHeight={maxHeight} data-testid={`container-max-height-${maxHeight}`}>
            Max height test
          </Container>
        );
        
        const container = screen.getByTestId(`container-max-height-${maxHeight}`);
        expect(container).toHaveClass(`max-h-${maxHeight}`);
        unmount();
      });
    });

    it('applies fullWidth and fullHeight correctly', () => {
      render(<Container fullWidth fullHeight>Full size container</Container>);
      const container = screen.getByText('Full size container');
      expect(container).toHaveClass('w-full', 'h-full');
    });

    it('applies centered class correctly', () => {
      render(<Container centered>Centered container</Container>);
      const container = screen.getByText('Centered container');
      expect(container).toHaveClass('mx-auto');
    });
  });

  describe('Spacing Props', () => {
    it('applies margin classes correctly', () => {
      const margins = ['0', '1', '2', '4', '8', '16', 'px', 'auto'];
      
      margins.forEach((margin) => {
        const { unmount } = render(
          <Container margin={margin} data-testid={`container-margin-${margin}`}>
            Margin test
          </Container>
        );
        
        const container = screen.getByTestId(`container-margin-${margin}`);
        expect(container).toHaveClass(`m-${margin}`);
        unmount();
      });
    });

    it('applies padding classes correctly', () => {
      const paddings = ['0', '1', '2', '4', '8', '16', 'px'];
      
      paddings.forEach((padding) => {
        const { unmount } = render(
          <Container padding={padding} data-testid={`container-padding-${padding}`}>
            Padding test
          </Container>
        );
        
        const container = screen.getByTestId(`container-padding-${padding}`);
        expect(container).toHaveClass(`p-${padding}`);
        unmount();
      });
    });

    it('applies directional spacing correctly', () => {
      render(
        <Container 
          marginTop="2" 
          marginRight="4" 
          marginBottom="6" 
          marginLeft="8"
          marginX="3"
          marginY="5"
          paddingTop="2"
          paddingRight="4"
          paddingBottom="6"
          paddingLeft="8"
          paddingX="3" 
          paddingY="5"
        >
          Directional spacing test
        </Container>
      );
      
      const container = screen.getByText('Directional spacing test');
      expect(container).toHaveClass(
        'mt-2', 'mr-4', 'mb-6', 'ml-8', 'mx-3', 'my-5',
        'pt-2', 'pr-4', 'pb-6', 'pl-8', 'px-3', 'py-5'
      );
    });
  });

  describe('Visual Props', () => {
    it('applies background color classes correctly', () => {
      const colors = [
        'black', 'white', 'gray', 'red', 'blue', 'green', 
        'yellow', 'purple', 'pink', 'indigo', 'orange', 'teal', 'cyan',
        'primary', 'secondary', 'success', 'warning', 'error', 'info'
      ];
      
      colors.forEach((color) => {
        const { unmount } = render(
          <Container background={color} data-testid={`container-bg-${color}`}>
            Background test
          </Container>
        );
        
        const container = screen.getByTestId(`container-bg-${color}`);
        
        if (color === 'primary') {
          expect(container).toHaveClass('bg-blue-600');
        } else if (color === 'secondary') {
          expect(container).toHaveClass('bg-gray-600');
        } else if (color === 'success') {
          expect(container).toHaveClass('bg-green-600');
        } else if (color === 'warning') {
          expect(container).toHaveClass('bg-yellow-600');
        } else if (color === 'error') {
          expect(container).toHaveClass('bg-red-600');
        } else if (color === 'info') {
          expect(container).toHaveClass('bg-blue-500');
        } else if (color === 'black') {
          expect(container).toHaveClass('bg-black');
        } else if (color === 'white') {
          expect(container).toHaveClass('bg-white');
        } else {
          expect(container).toHaveClass(`bg-${color}-500`);
        }
        
        unmount();
      });
    });

    it('applies border classes correctly', () => {
      const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none'];
      
      borderStyles.forEach((style) => {
        const { unmount } = render(
          <Container border={style} data-testid={`container-border-${style}`}>
            Border test
          </Container>
        );
        
        const container = screen.getByTestId(`container-border-${style}`);
        expect(container).toHaveClass(`border-${style}`);
        unmount();
      });
    });

    it('applies complex border configuration', () => {
      render(
        <Container 
          border={{ width: '2', style: 'dashed', color: 'red' }}
        >
          Complex border test
        </Container>
      );
      
      const container = screen.getByText('Complex border test');
      expect(container).toHaveClass('border-2', 'border-dashed', 'border-red-500');
    });

    it('applies border radius classes correctly', () => {
      const radiusOptions: Array<ContainerProps['borderRadius']> = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
      
      radiusOptions.forEach((radius) => {
        const { unmount } = render(
          <Container borderRadius={radius} data-testid={`container-${radius}`}>
            Radius test
          </Container>
        );
        
        const container = screen.getByTestId(`container-${radius}`);
        const expectedClass = radius === 'base' ? 'rounded' : `rounded-${radius}`;
        expect(container).toHaveClass(expectedClass);
        unmount();
      });
    });

    it('applies shadow classes correctly', () => {
      const shadowOptions: Array<ContainerProps['shadow']> = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner'];
      
      shadowOptions.forEach((shadow) => {
        const { unmount } = render(
          <Container shadow={shadow} data-testid={`container-shadow-${shadow}`}>
            Shadow test
          </Container>
        );
        
        const container = screen.getByTestId(`container-shadow-${shadow}`);
        const expectedClass = shadow === 'base' ? 'shadow' : `shadow-${shadow}`;
        expect(container).toHaveClass(expectedClass);
        unmount();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive classes correctly', () => {
      render(
        <Container 
          responsive={{
            sm: { display: 'block' },
            md: { display: 'flex' },
            lg: { display: 'grid' },
            xl: { display: 'inline-block' },
            '2xl': { display: 'inline-flex' }
          }}
        >
          Responsive test
        </Container>
      );
      
      const container = screen.getByText('Responsive test');
      expect(container).toHaveClass(
        'sm:block',
        'md:flex',
        'lg:grid',
        'xl:inline-block',
        '2xl:inline-flex'
      );
    });

    it('handles responsive width and height', () => {
      render(
        <Container 
          responsive={{
            sm: { width: 'full', height: 'auto' },
            md: { width: '1/2', height: 'full' },
            lg: { width: '1/3', height: 'screen' },
            xl: { maxWidth: 'screen', maxHeight: 'screen' }
          }}
        >
          Responsive sizing test
        </Container>
      );
      
      const container = screen.getByText('Responsive sizing test');
      expect(container).toHaveClass(
        'sm:w-full', 'sm:h-auto', 
        'md:w-1/2', 'md:h-full', 
        'lg:w-1/3', 'lg:h-screen',
        'xl:max-w-screen', 'xl:max-h-screen'
      );
    });

    it('handles responsive flexbox properties', () => {
      render(
        <Container 
          display="flex"
          responsive={{
            sm: { direction: 'column', justify: 'start', align: 'start', wrap: 'wrap' },
            md: { direction: 'row', justify: 'center', align: 'center', wrap: 'nowrap' },
            lg: { gap: '4' }
          }}
        >
          Responsive flex test
        </Container>
      );
      
      const container = screen.getByText('Responsive flex test');
      expect(container).toHaveClass(
        'flex',
        'sm:flex-col', 'sm:justify-start', 'sm:items-start', 'sm:flex-wrap',
        'md:flex-row', 'md:justify-center', 'md:items-center', 'md:flex-nowrap',
        'lg:gap-4'
      );
    });

    it('handles responsive spacing properties', () => {
      render(
        <Container 
          responsive={{
            sm: { margin: '2', padding: '2' },
            md: { margin: '4', padding: '4' },
            lg: { margin: '8', padding: '8' }
          }}
        >
          Responsive spacing test
        </Container>
      );
      
      const container = screen.getByText('Responsive spacing test');
      expect(container).toHaveClass(
        'sm:m-2', 'sm:p-2',
        'md:m-4', 'md:p-4',
        'lg:m-8', 'lg:p-8'
      );
    });
  });

  describe('Interactions', () => {
    it('handles click events correctly', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(
        <Container onClick={handleClick}>
          Clickable container
        </Container>
      );
      
      const container = screen.getByText('Clickable container');
      await user.click(container);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles double click events correctly', async () => {
      const user = userEvent.setup();
      const handleDoubleClick = jest.fn();
      
      render(
        <Container onDoubleClick={handleDoubleClick}>
          Double-clickable container
        </Container>
      );
      
      const container = screen.getByText('Double-clickable container');
      await user.dblClick(container);
      
      expect(handleDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse enter and leave events', async () => {
      const user = userEvent.setup();
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      
      render(
        <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover container
        </Container>
      );
      
      const container = screen.getByText('Hover container');
      
      await user.hover(container);
      expect(handleMouseEnter).toHaveBeenCalled();
      
      await user.unhover(container);
      expect(handleMouseLeave).toHaveBeenCalled();
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(
        <Container 
          tabIndex={0}
          onFocus={handleFocus} 
          onBlur={handleBlur}
        >
          Focusable container
        </Container>
      );
      
      const container = screen.getByText('Focusable container');
      
      await user.tab();
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles keyboard events correctly', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();
      const handleKeyUp = jest.fn();
      const handleKeyPress = jest.fn();
      
      render(
        <Container 
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
        >
          Keyboard interactive container
        </Container>
      );
      
      const container = screen.getByText('Keyboard interactive container');
      container.focus();
      
      await user.keyboard('{ArrowDown}');
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes correctly', () => {
      render(
        <Container 
          id="custom-container"
          role="main"
          tabIndex={0}
          data-testid="custom-container"
          title="Container title"
        >
          Attributed container
        </Container>
      );
      
      const container = screen.getByTestId('custom-container');
      expect(container).toHaveAttribute('id', 'custom-container');
      expect(container).toHaveAttribute('role', 'main');
      expect(container).toHaveAttribute('tabIndex', '0');
      expect(container).toHaveAttribute('title', 'Container title');
    });

    it('applies inline styles correctly', () => {
      const customStyle = { minHeight: '200px', zIndex: 10 };
      render(
        <Container style={customStyle}>
          Styled container
        </Container>
      );
      
      const container = screen.getByText('Styled container');
      expect(container).toHaveStyle('min-height: 200px');
      expect(container).toHaveStyle('z-index: 10');
    });
  });

  describe('Accessibility', () => {
    it('applies ARIA attributes correctly', () => {
      render(
        <Container 
          role="region"
          ariaLabel="Custom label"
          ariaDescribedBy="description-id"
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
          Accessible container
        </Container>
      );
      
      const container = screen.getByLabelText('Custom label');
      expect(container).toHaveAttribute('role', 'region');
      expect(container).toHaveAttribute('aria-label', 'Custom label');
      expect(container).toHaveAttribute('aria-describedby', 'description-id');
      expect(container).toHaveAttribute('aria-labelledby', 'label-id');
      expect(container).toHaveAttribute('tabIndex', '0');
      expect(container).toHaveAttribute('aria-expanded', 'true');
      expect(container).toHaveAttribute('aria-pressed', 'false');
      expect(container).toHaveAttribute('aria-selected', 'true');
      expect(container).toHaveAttribute('aria-disabled', 'false');
      expect(container).toHaveAttribute('aria-hidden', 'false');
      expect(container).toHaveAttribute('aria-live', 'polite');
      expect(container).toHaveAttribute('aria-atomic', 'true');
    });

    it('supports semantic roles', () => {
      const roles = ['main', 'navigation', 'banner', 'contentinfo', 'complementary', 'region'];
      
      roles.forEach((role) => {
        const { unmount } = render(
          <Container role={role} data-testid={`container-role-${role}`}>
            {role} content
          </Container>
        );
        
        const container = screen.getByTestId(`container-role-${role}`);
        expect(container).toHaveAttribute('role', role);
        unmount();
      });
    });

    it('supports keyboard navigation when focusable', () => {
      render(<Container tabIndex={0}>Focusable container</Container>);
      const container = screen.getByText('Focusable container');
      expect(container).toHaveAttribute('tabIndex', '0');
    });

    it('maintains proper focus management', () => {
      render(
        <Container tabIndex={0} role="region" ariaLabel="Content area">
          Accessible container
        </Container>
      );
      
      const container = screen.getByLabelText('Content area');
      expect(container).toHaveAttribute('role', 'region');
      expect(container).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Container>{''}</Container>);
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Container>{null}</Container>);
      const container = document.querySelector('div');
      expect(container).toBeInTheDocument();
    });

    it('combines multiple layout classes correctly', () => {
      render(
        <Container 
          display="flex"
          direction="column"
          justify="center"
          align="center"
          wrap="wrap"
          gap="4"
          width="full"
          height="full"
          padding="6"
          margin="4"
          background="gray"
          border="solid"
          borderRadius="lg"
          shadow="md"
          className="custom-class"
        >
          Complex container
        </Container>
      );
      
      const container = screen.getByText('Complex container');
      expect(container).toHaveClass(
        'flex', 'flex-col', 'justify-center', 'items-center', 'flex-wrap',
        'gap-4', 'w-full', 'h-full', 'p-6', 'm-4', 'bg-gray-500', 
        'border-solid', 'rounded-lg', 'shadow-md', 'custom-class'
      );
    });

    it('handles conflicting responsive and base classes', () => {
      render(
        <Container 
          display="block"
          responsive={{
            md: { display: 'flex' }
          }}
        >
          Conflicting classes test
        </Container>
      );
      
      const container = screen.getByText('Conflicting classes test');
      expect(container).toHaveClass('block', 'md:flex');
    });

    it('handles invalid prop values gracefully', () => {
      // @ts-expect-error - Testing invalid prop handling
      render(<Container display="invalid">Invalid prop test</Container>);
      const container = screen.getByText('Invalid prop test');
      expect(container).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      render(
        <Container 
          display={undefined} 
          direction={undefined}
          background={undefined}
        >
          Undefined props
        </Container>
      );
      
      const container = screen.getByText('Undefined props');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      
      const TestContainer = ({ children }: { children: React.ReactNode }) => {
        renderSpy();
        return <Container>{children}</Container>;
      };
      
      const { rerender } = render(<TestContainer>Initial</TestContainer>);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      rerender(<TestContainer>Initial</TestContainer>);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });

    it('handles complex nested containers efficiently', () => {
      render(
        <Container display="flex" direction="column">
          <Container display="flex" justify="between" padding="4">
            <Container width="1/3">Left</Container>
            <Container width="1/3">Center</Container>
            <Container width="1/3">Right</Container>
          </Container>
          <Container padding="4">
            <Container background="gray" padding="4" borderRadius="md">
              Nested content
            </Container>
          </Container>
        </Container>
      );
      
      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Center')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });
  });
});