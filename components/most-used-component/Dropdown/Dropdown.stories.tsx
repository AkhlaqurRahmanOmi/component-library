import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Button } from '../../ui/Button';
import type { DropdownOption } from './Dropdown.types';

const meta: Meta<typeof Dropdown> = {
  title: 'Composite Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown/select component that supports single and multiple selection, search functionality, custom options, and various styling configurations using Button, Container, and Text components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown after selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Dropdown size',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Dropdown variant',
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'],
      description: 'Dropdown placement',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder',
    },
    emptyMessage: {
      control: 'text',
      description: 'Empty state message',
    },
    onChange: {
      action: 'selection-changed',
      description: 'Selection change handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons for stories
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FlagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

// Sample options for stories
const basicOptions: DropdownOption[] = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' },
  { id: '3', label: 'Option 3', value: 'option3' },
  { id: '4', label: 'Option 4', value: 'option4' },
  { id: '5', label: 'Option 5', value: 'option5' }
];

const optionsWithIcons: DropdownOption[] = [
  { id: '1', label: 'Profile', value: 'profile', icon: <UserIcon /> },
  { id: '2', label: 'Favorites', value: 'favorites', icon: <StarIcon /> },
  { id: '3', label: 'Reports', value: 'reports', icon: <FlagIcon /> },
  { id: '4', label: 'Settings', value: 'settings', icon: <UserIcon /> }
];

const optionsWithDescriptions: DropdownOption[] = [
  {
    id: '1',
    label: 'Basic Plan',
    value: 'basic',
    description: 'Perfect for individuals and small teams'
  },
  {
    id: '2',
    label: 'Pro Plan',
    value: 'pro',
    description: 'Advanced features for growing businesses'
  },
  {
    id: '3',
    label: 'Enterprise Plan',
    value: 'enterprise',
    description: 'Full-featured solution for large organizations'
  }
];

const countryOptions: DropdownOption[] = [
  { id: '1', label: 'United States', value: 'us' },
  { id: '2', label: 'Canada', value: 'ca' },
  { id: '3', label: 'United Kingdom', value: 'uk' },
  { id: '4', label: 'Germany', value: 'de' },
  { id: '5', label: 'France', value: 'fr' },
  { id: '6', label: 'Japan', value: 'jp' },
  { id: '7', label: 'Australia', value: 'au' },
  { id: '8', label: 'Brazil', value: 'br' },
  { id: '9', label: 'India', value: 'in' },
  { id: '10', label: 'China', value: 'cn' }
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option...',
    onChange: (value, option) => console.log('Selected:', value, option),
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <div className="space-y-4 w-64">
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          placeholder="Choose one option"
        />
        <div className="text-sm text-gray-600">
          Selected: {value || 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic single selection dropdown with controlled state.',
      },
    },
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    
    return (
      <div className="space-y-4 w-64">
        <Dropdown
          options={basicOptions}
          value={values}
          onChange={(newValues) => setValues(newValues as string[])}
          placeholder="Choose multiple options"
          multiple
          closeOnSelect={false}
        />
        <div className="text-sm text-gray-600">
          Selected: {values.length > 0 ? values.join(', ') : 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection dropdown that allows selecting multiple options.',
      },
    },
  },
};

export const SearchableDropdown: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <div className="space-y-4 w-64">
        <Dropdown
          options={countryOptions}
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          placeholder="Search countries..."
          searchable
          searchPlaceholder="Type to search..."
        />
        <div className="text-sm text-gray-600">
          Selected: {value || 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Searchable dropdown with filtering functionality.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown
        options={optionsWithIcons}
        placeholder="Select with icons"
        onChange={(value, option) => console.log('Icon selection:', value, option)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown options with icons for better visual identification.',
      },
    },
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Dropdown
        options={optionsWithDescriptions}
        placeholder="Choose a plan"
        onChange={(value, option) => console.log('Plan selection:', value, option)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown options with descriptions for additional context.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <label className="block text-sm font-medium mb-1">Small Size</label>
        <Dropdown
          options={basicOptions}
          size="sm"
          placeholder="Small dropdown"
          onChange={(value) => console.log('Small:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Medium Size (Default)</label>
        <Dropdown
          options={basicOptions}
          size="md"
          placeholder="Medium dropdown"
          onChange={(value) => console.log('Medium:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Large Size</label>
        <Dropdown
          options={basicOptions}
          size="lg"
          placeholder="Large dropdown"
          onChange={(value) => console.log('Large:', value)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different dropdown sizes: small, medium (default), and large.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <label className="block text-sm font-medium mb-1">Default Variant</label>
        <Dropdown
          options={basicOptions}
          variant="primary"
          placeholder="Default variant"
          onChange={(value) => console.log('Default:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Outline Variant</label>
        <Dropdown
          options={basicOptions}
          variant="outline"
          placeholder="Outline variant"
          onChange={(value) => console.log('Outline:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Ghost Variant</label>
        <Dropdown
          options={basicOptions}
          variant="ghost"
          placeholder="Ghost variant"
          onChange={(value) => console.log('Ghost:', value)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different dropdown variants: default, outline, and ghost.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <label className="block text-sm font-medium mb-1">Normal State</label>
        <Dropdown
          options={basicOptions}
          placeholder="Normal dropdown"
          onChange={(value) => console.log('Normal:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Loading State</label>
        <Dropdown
          options={basicOptions}
          placeholder="Loading..."
          loading
          onChange={(value) => console.log('Loading:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Disabled State</label>
        <Dropdown
          options={basicOptions}
          placeholder="Disabled dropdown"
          disabled
          onChange={(value) => console.log('Disabled:', value)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different dropdown states: normal, loading, and disabled.',
      },
    },
  },
};

export const ClearableDropdown: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>('option2');
    const [multipleValues, setMultipleValues] = useState<string[]>(['option1', 'option3']);
    
    return (
      <div className="space-y-4 w-64">
        <div>
          <label className="block text-sm font-medium mb-1">Single Selection (Clearable)</label>
          <Dropdown
            options={basicOptions}
            value={singleValue}
            onChange={(newValue) => setSingleValue(newValue as string)}
            placeholder="Select option"
            clearable
          />
          <div className="text-xs text-gray-500 mt-1">
            Selected: {singleValue || 'None'}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Multiple Selection (Clearable)</label>
          <Dropdown
            options={basicOptions}
            value={multipleValues}
            onChange={(newValues) => setMultipleValues(newValues as string[])}
            placeholder="Select options"
            multiple
            clearable
            closeOnSelect={false}
          />
          <div className="text-xs text-gray-500 mt-1">
            Selected: {multipleValues.length > 0 ? multipleValues.join(', ') : 'None'}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Clearable dropdowns that allow clearing the selection.',
      },
    },
  },
};

export const CustomTrigger: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown
        options={basicOptions}
        trigger={
          <Button variant="outline" className="w-full justify-between">
            Custom Trigger Button
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        }
        onChange={(value, option) => console.log('Custom trigger:', value, option)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with a custom trigger element instead of the default button.',
      },
    },
  },
};

export const CustomRendering: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">Custom Option Renderer</label>
        <Dropdown
          options={optionsWithDescriptions}
          placeholder="Custom options"
          renderOption={(option, isSelected) => (
            <div className="flex items-center justify-between p-3 hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
              {isSelected && (
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
          onChange={(value, option) => console.log('Custom option:', value, option)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Custom Selected Value Renderer</label>
        <Dropdown
          options={optionsWithDescriptions}
          placeholder="Custom selected value"
          renderSelectedValue={(selectedOptions) => {
            if (selectedOptions.length === 0) return 'No plan selected';
            const option = selectedOptions[0];
            return (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{option.label}</span>
              </div>
            );
          }}
          onChange={(value, option) => console.log('Custom selected:', value, option)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with custom option and selected value renderers.',
      },
    },
  },
};

export const EmptyStates: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <label className="block text-sm font-medium mb-1">Default Empty Message</label>
        <Dropdown
          options={[]}
          placeholder="No options available"
          onChange={(value) => console.log('Empty default:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Custom Empty Message</label>
        <Dropdown
          options={[]}
          placeholder="Custom empty state"
          emptyMessage="No items found. Try a different search."
          onChange={(value) => console.log('Empty custom:', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Custom Empty Renderer</label>
        <Dropdown
          options={[]}
          placeholder="Custom empty renderer"
          renderEmpty={() => (
            <div className="p-4 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No options available</p>
              <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                Add new option
              </button>
            </div>
          )}
          onChange={(value) => console.log('Empty renderer:', value)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different empty state presentations when no options are available.',
      },
    },
  },
};

export const DisabledOptions: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown
        options={[
          { id: '1', label: 'Available Option 1', value: 'option1' },
          { id: '2', label: 'Disabled Option', value: 'option2', disabled: true },
          { id: '3', label: 'Available Option 2', value: 'option3' },
          { id: '4', label: 'Another Disabled', value: 'option4', disabled: true },
          { id: '5', label: 'Available Option 3', value: 'option5' }
        ]}
        placeholder="Some options disabled"
        onChange={(value, option) => console.log('Disabled options:', value, option)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with some options disabled and unselectable.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      plan: '',
      features: [] as string[]
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Form submitted! Check console for data.');
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <Dropdown
            name="country"
            options={countryOptions.slice(0, 5)}
            value={formData.country}
            onChange={(value) => setFormData(prev => ({ ...prev, country: value as string }))}
            placeholder="Select your country"
            required
            fullWidth
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Plan</label>
          <Dropdown
            name="plan"
            options={optionsWithDescriptions}
            value={formData.plan}
            onChange={(value) => setFormData(prev => ({ ...prev, plan: value as string }))}
            placeholder="Choose a plan"
            required
            fullWidth
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Additional Features</label>
          <Dropdown
            name="features"
            options={[
              { id: '1', label: 'Analytics Dashboard', value: 'analytics' },
              { id: '2', label: 'API Access', value: 'api' },
              { id: '3', label: 'Priority Support', value: 'support' },
              { id: '4', label: 'Custom Branding', value: 'branding' }
            ]}
            value={formData.features}
            onChange={(value) => setFormData(prev => ({ ...prev, features: value as string[] }))}
            placeholder="Select features"
            multiple
            closeOnSelect={false}
            fullWidth
          />
        </div>
        
        <Button type="submit" className="w-full">
          Submit Form
        </Button>
        
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Current form data:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown components integrated within a form with validation and submission.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Playground dropdown',
    multiple: false,
    searchable: false,
    clearable: false,
    closeOnSelect: true,
    disabled: false,
    loading: false,
    size: 'md',
    variant: 'outline',
    placement: 'bottom-start',
    fullWidth: false,
    searchPlaceholder: 'Search...',
    emptyMessage: 'No options found',
    onChange: (value, option) => console.log('Playground:', value, option),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of dropdown props.',
      },
    },
  },
};