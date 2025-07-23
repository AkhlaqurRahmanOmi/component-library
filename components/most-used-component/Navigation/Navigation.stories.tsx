import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Navigation } from './Navigation';
import type { NavigationItem } from './Navigation.types';

const meta: Meta<typeof Navigation> = {
  title: 'Composite Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible navigation component that supports horizontal and vertical layouts, multiple variants, dropdown menus, and responsive behavior using Container, Button, and Text components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Navigation orientation',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'tabs', 'sidebar', 'breadcrumb'],
      description: 'Navigation variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Navigation size',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between navigation items',
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around'],
      description: 'Navigation alignment (horizontal only)',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable mobile collapsible behavior',
    },
    allowMultipleOpen: {
      control: 'boolean',
      description: 'Allow multiple dropdowns to be open',
    },
    closeOnItemClick: {
      control: 'boolean',
      description: 'Close dropdowns when item is clicked',
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'Item click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons for stories
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);



// Sample navigation items
const basicItems: NavigationItem[] = [
  { id: '1', label: 'Home', icon: <HomeIcon />, active: true },
  { id: '2', label: 'About', href: '/about' },
  { id: '3', label: 'Services', href: '/services' },
  { id: '4', label: 'Contact', href: '/contact' }
];

const itemsWithDropdown: NavigationItem[] = [
  { id: '1', label: 'Home', icon: <HomeIcon />, active: true },
  {
    id: '2',
    label: 'Products',
    children: [
      { id: '2-1', label: 'Web Apps', href: '/products/web' },
      { id: '2-2', label: 'Mobile Apps', href: '/products/mobile' },
      { id: '2-3', label: 'Desktop Apps', href: '/products/desktop' }
    ]
  },
  {
    id: '3',
    label: 'Services',
    children: [
      { id: '3-1', label: 'Consulting', href: '/services/consulting' },
      { id: '3-2', label: 'Development', href: '/services/development' },
      { id: '3-3', label: 'Support', href: '/services/support' }
    ]
  },
  { id: '4', label: 'Contact', href: '/contact' }
];

const sidebarItems: NavigationItem[] = [
  { id: '1', label: 'Dashboard', icon: <HomeIcon />, active: true },
  { id: '2', label: 'Users', icon: <UserIcon />, badge: '12' },
  {
    id: '3',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { id: '3-1', label: 'General', href: '/settings/general' },
      { id: '3-2', label: 'Security', href: '/settings/security' },
      { id: '3-3', label: 'Notifications', href: '/settings/notifications' }
    ]
  },
  { id: '4', label: 'Reports', href: '/reports' },
  { id: '5', label: 'Help', href: '/help' }
];

export const Default: Story = {
  args: {
    items: basicItems,
    onItemClick: (item) => console.log('Item clicked:', item),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <Navigation
          items={basicItems}
          variant="default"
          onItemClick={(item) => console.log('Default:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Pills</h3>
        <Navigation
          items={basicItems}
          variant="pills"
          onItemClick={(item) => console.log('Pills:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Tabs</h3>
        <Navigation
          items={basicItems}
          variant="tabs"
          onItemClick={(item) => console.log('Tabs:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Breadcrumb</h3>
        <Navigation
          items={[
            { id: '1', label: 'Home', href: '/' },
            { id: '2', label: 'Products', href: '/products' },
            { id: '3', label: 'Web Apps', href: '/products/web', active: true }
          ]}
          variant="breadcrumb"
          onItemClick={(item) => console.log('Breadcrumb:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different navigation variants: default, pills, tabs, and breadcrumb.',
      },
    },
  },
};

export const HorizontalNavigation: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Horizontal</h3>
        <Navigation
          items={basicItems}
          orientation="horizontal"
          onItemClick={(item) => console.log('Horizontal:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">With Dropdowns</h3>
        <Navigation
          items={itemsWithDropdown}
          orientation="horizontal"
          variant="default"
          onItemClick={(item) => console.log('Dropdown:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">With Brand</h3>
        <Navigation
          items={basicItems}
          orientation="horizontal"
          brand={{
            title: "My App",
            logo: <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          }}
          onItemClick={(item) => console.log('Brand:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal navigation layouts with different configurations.',
      },
    },
  },
};

export const VerticalSidebar: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-64">
        <Navigation
          items={sidebarItems}
          orientation="vertical"
          variant="sidebar"
          brand={{
            title: "Admin Panel",
            logo: <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          }}
          onItemClick={(item) => console.log('Sidebar:', item)}
        />
      </div>
      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">Main Content Area</h2>
        <p className="text-gray-600 mt-2">This is where your main content would go.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical sidebar navigation with brand, icons, badges, and dropdowns.',
      },
    },
  },
};

export const ResponsiveNavigation: Story = {
  render: () => {
    const ResponsiveExample = () => {
      const [activeItem, setActiveItem] = useState('1');
      
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation
            items={itemsWithDropdown.map(item => ({
              ...item,
              active: item.id === activeItem
            }))}
            orientation="horizontal"
            variant="default"
            brand={{
              title: "Responsive App",
              logo: <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            }}
            collapsible
            onItemClick={(item) => {
              setActiveItem(item.id);
              console.log('Responsive:', item);
            }}
            className="bg-white shadow-sm"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Responsive Navigation</h2>
            <p className="text-gray-600 mt-2">
              This navigation collapses on mobile devices. Try resizing your browser window to see the mobile menu.
            </p>
          </div>
        </div>
      );
    };
    
    return <ResponsiveExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive navigation that collapses on mobile devices with a hamburger menu.',
      },
    },
  },
};

export const NavigationSizes: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <Navigation
          items={basicItems}
          size="sm"
          variant="pills"
          onItemClick={(item) => console.log('Small:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <Navigation
          items={basicItems}
          size="md"
          variant="pills"
          onItemClick={(item) => console.log('Medium:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <Navigation
          items={basicItems}
          size="lg"
          variant="pills"
          onItemClick={(item) => console.log('Large:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different navigation sizes: small, medium (default), and large.',
      },
    },
  },
};

export const NavigationSpacing: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tight Spacing</h3>
        <Navigation
          items={basicItems}
          spacing="tight"
          variant="pills"
          onItemClick={(item) => console.log('Tight:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Normal Spacing</h3>
        <Navigation
          items={basicItems}
          spacing="normal"
          variant="pills"
          onItemClick={(item) => console.log('Normal:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Loose Spacing</h3>
        <Navigation
          items={basicItems}
          spacing="loose"
          variant="pills"
          onItemClick={(item) => console.log('Loose:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options between navigation items: tight, normal, and loose.',
      },
    },
  },
};

export const NavigationAlignment: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Start Alignment</h3>
        <Navigation
          items={basicItems}
          alignment="start"
          variant="tabs"
          onItemClick={(item) => console.log('Start:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Alignment</h3>
        <Navigation
          items={basicItems}
          alignment="center"
          variant="tabs"
          onItemClick={(item) => console.log('Center:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">End Alignment</h3>
        <Navigation
          items={basicItems}
          alignment="end"
          variant="tabs"
          onItemClick={(item) => console.log('End:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Space Between</h3>
        <Navigation
          items={basicItems}
          alignment="between"
          variant="tabs"
          onItemClick={(item) => console.log('Between:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alignment options for horizontal navigation: start, center, end, and space between.',
      },
    },
  },
};

export const WithBadges: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal with Badges</h3>
        <Navigation
          items={[
            { id: '1', label: 'Dashboard', icon: <HomeIcon />, active: true },
            { id: '2', label: 'Messages', badge: '5' },
            { id: '3', label: 'Notifications', badge: '12' },
            { id: '4', label: 'Tasks', badge: '3' }
          ]}
          variant="pills"
          onItemClick={(item) => console.log('Badge horizontal:', item)}
        />
      </div>
      
      <div className="flex">
        <div className="w-64">
          <h3 className="text-lg font-semibold mb-4">Vertical with Badges</h3>
          <Navigation
            items={[
              { id: '1', label: 'Dashboard', icon: <HomeIcon />, active: true },
              { id: '2', label: 'Users', icon: <UserIcon />, badge: '24' },
              { id: '3', label: 'Orders', badge: '156' },
              { id: '4', label: 'Support', badge: '8' }
            ]}
            orientation="vertical"
            variant="sidebar"
            onItemClick={(item) => console.log('Badge vertical:', item)}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation items with badges for notifications and counts.',
      },
    },
  },
};

export const DisabledItems: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <Navigation
        items={[
          { id: '1', label: 'Home', icon: <HomeIcon />, active: true },
          { id: '2', label: 'About', href: '/about' },
          { id: '3', label: 'Services', href: '/services', disabled: true },
          { id: '4', label: 'Contact', href: '/contact' },
          {
            id: '5',
            label: 'Admin',
            disabled: true,
            children: [
              { id: '5-1', label: 'Users', href: '/admin/users' },
              { id: '5-2', label: 'Settings', href: '/admin/settings' }
            ]
          }
        ]}
        variant="pills"
        onItemClick={(item) => console.log('Disabled example:', item)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with disabled items that cannot be clicked.',
      },
    },
  },
};

export const CustomRendering: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Brand Renderer</h3>
        <Navigation
          items={basicItems}
          renderBrand={() => (
            <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center font-bold">
                C
              </div>
              <span className="font-semibold">Custom Brand</span>
            </div>
          )}
          onItemClick={(item) => console.log('Custom brand:', item)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Item Renderer</h3>
        <Navigation
          items={basicItems}
          renderItem={(item, isActive) => (
            <div
              key={item.id}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => console.log('Custom item:', item)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          )}
          onItemClick={(item) => console.log('Custom item renderer:', item)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with custom brand and item renderers for complete customization.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    items: itemsWithDropdown,
    orientation: 'horizontal',
    variant: 'default',
    size: 'md',
    spacing: 'normal',
    alignment: 'start',
    collapsible: false,
    allowMultipleOpen: false,
    closeOnItemClick: true,
    brand: {
      title: 'Playground',
      logo: <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
    },
    onItemClick: (item) => console.log('Playground:', item),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of navigation props.',
      },
    },
  },
};