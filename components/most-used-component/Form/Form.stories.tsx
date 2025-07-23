import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from './Form';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import type { FormField } from './Form.types';

const meta: Meta<typeof Form> = {
  title: 'Composite Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive form component that handles form state, validation, and submission with a flexible field configuration system, combining Input, Button, and Text components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'inline'],
      description: 'Form layout orientation',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between form fields',
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Validate fields on change',
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Validate fields on blur',
    },
    showErrorsOnSubmit: {
      control: 'boolean',
      description: 'Show validation errors on submit',
    },
    loading: {
      control: 'boolean',
      description: 'Form loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Form disabled state',
    },
    title: {
      control: 'text',
      description: 'Form title',
    },
    subtitle: {
      control: 'text',
      description: 'Form subtitle',
    },
    description: {
      control: 'text',
      description: 'Form description',
    },
    onSubmit: {
      action: 'form-submitted',
      description: 'Form submit handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample form fields for stories
const basicFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    required: true,
    validation: { minLength: 2 }
  },
  {
    name: 'lastName',
    label: 'Last Name',
    required: true,
    validation: { minLength: 2 }
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validation: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
    }
  }
];

const contactFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    required: true,
    validation: { minLength: 2, maxLength: 50 }
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '(555) 123-4567'
  },
  {
    name: 'subject',
    label: 'Subject',
    required: true,
    validation: { minLength: 5, maxLength: 100 }
  },
  {
    name: 'message',
    label: 'Message',
    required: true,
    validation: { minLength: 10, maxLength: 500 }
  }
];

export const Default: Story = {
  args: {
    title: 'Basic Form',
    fields: basicFields,
    onSubmit: (values) => console.log('Form submitted:', values),
  },
};

export const ContactForm: Story = {
  render: () => (
    <Form
      title="Contact Us"
      subtitle="Get in touch"
      description="Fill out the form below and we'll get back to you as soon as possible."
      fields={contactFields}
      onSubmit={(values) => console.log('Contact form submitted:', values)}
      submitButton={{ label: 'Send Message' }}
      resetButton={{ label: 'Clear Form' }}
      validateOnBlur
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete contact form with validation and multiple field types.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => {
    const validationFields: FormField[] = [
      {
        name: 'username',
        label: 'Username',
        required: true,
        validation: {
          minLength: 3,
          maxLength: 20,
          pattern: '^[a-zA-Z0-9_]+$'
        }
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: {
          minLength: 8,
          custom: (value) => {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
              return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            }
            return null;
          }
        }
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        required: true
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        required: true,
        validation: { min: 18, max: 120 }
      }
    ];

    return (
      <Form
        title="Registration Form"
        description="Create your account with secure validation."
        fields={validationFields}
        onSubmit={(values) => console.log('Registration submitted:', values)}
        validateOnChange
        validateOnBlur
        submitButton={{ label: 'Create Account' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with comprehensive validation including custom validation rules.',
      },
    },
  },
};

export const FormLayouts: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Layout (Default)</h3>
        <Form
          title="Vertical Form"
          fields={basicFields.slice(0, 2)}
          layout="vertical"
          onSubmit={(values) => console.log('Vertical form:', values)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
        <Form
          title="Horizontal Form"
          fields={basicFields.slice(0, 2)}
          layout="horizontal"
          onSubmit={(values) => console.log('Horizontal form:', values)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Layout</h3>
        <Form
          title="Inline Form"
          fields={[
            { name: 'search', label: 'Search', placeholder: 'Enter search term...' },
            { name: 'category', label: 'Category', placeholder: 'Select category' }
          ]}
          layout="inline"
          onSubmit={(values) => console.log('Inline form:', values)}
          submitButton={{ label: 'Search' }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different form layouts: vertical, horizontal, and inline.',
      },
    },
  },
};

export const FormSpacing: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tight Spacing</h3>
        <Form
          title="Tight Form"
          fields={basicFields}
          spacing="tight"
          onSubmit={(values) => console.log('Tight form:', values)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Normal Spacing</h3>
        <Form
          title="Normal Form"
          fields={basicFields}
          spacing="normal"
          onSubmit={(values) => console.log('Normal form:', values)}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Loose Spacing</h3>
        <Form
          title="Loose Form"
          fields={basicFields}
          spacing="loose"
          onSubmit={(values) => console.log('Loose form:', values)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options between form fields: tight, normal, and loose.',
      },
    },
  },
};

export const CustomChildren: Story = {
  render: () => (
    <Form
      title="Custom Form"
      subtitle="With custom children"
      description="This form uses custom children instead of field configuration."
      onSubmit={(values) => console.log('Custom form submitted:', values)}
      submitButton={{ label: 'Save Changes' }}
      resetButton={{ label: 'Reset' }}
    >
      <Input
        name="username"
        label="Username"
        placeholder="Enter username"
        required
        fullWidth
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email"
        required
        fullWidth
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="firstName"
          label="First Name"
          placeholder="First name"
          fullWidth
        />
        <Input
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          fullWidth
        />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Custom content can be mixed with form inputs for complex layouts.
        </p>
      </div>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form using custom children instead of field configuration for complex layouts.',
      },
    },
  },
};

export const FormStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <Form
        title="Loading Form"
        description="This form is in a loading state."
        fields={basicFields.slice(0, 2)}
        loading
        onSubmit={(values) => console.log('Loading form:', values)}
        submitButton={{ label: 'Submitting...' }}
      />
      
      <Form
        title="Disabled Form"
        description="This form is disabled."
        fields={basicFields.slice(0, 2)}
        disabled
        onSubmit={(values) => console.log('Disabled form:', values)}
        submitButton={{ label: 'Submit' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Forms in different states: loading and disabled.',
      },
    },
  },
};

export const CustomActions: Story = {
  render: () => (
    <Form
      title="Custom Actions"
      description="Form with custom action buttons."
      fields={basicFields.slice(0, 2)}
      onSubmit={(values) => console.log('Custom actions form:', values)}
      submitButton={{ label: 'Save', variant: 'primary' }}
      resetButton={{ label: 'Reset', variant: 'outline' }}
      customActions={
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => console.log('Draft saved')}>
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => console.log('Preview')}>
            Preview
          </Button>
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form with custom action buttons in addition to submit and reset.',
      },
    },
  },
};

export const ControlledForm: Story = {
  render: () => {
    const ControlledFormExample = () => {
      const [values, setValues] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: ''
      });
      
      const [errors, setErrors] = useState<Record<string, string>>({});
      
      const handleSubmit = (formValues: Record<string, string>) => {
        console.log('Controlled form submitted:', formValues);
        // Custom validation
        const newErrors: Record<string, string> = {};
        if (!formValues.phone) {
          newErrors.phone = 'Phone number is required for this form';
        }
        setErrors(newErrors);
      };
      
      const handleChange = (newValues: Record<string, string>) => {
        setValues({
          name: newValues.name || '',
          email: newValues.email || '',
          phone: newValues.phone || ''
        });
        // Clear errors when user starts typing
        if (errors.phone && newValues.phone) {
          setErrors(prev => ({ ...prev, phone: '' }));
        }
      };
      
      return (
        <Form
          title="Controlled Form"
          description="This form is controlled externally with custom validation."
          fields={[
            { name: 'name', label: 'Name', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Phone', type: 'tel', required: true }
          ]}
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitButton={{ label: 'Submit Controlled' }}
        />
      );
    };
    
    return <ControlledFormExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled form with external state management and custom validation.',
      },
    },
  },
};

export const ValidationModes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <Form
        title="Validate on Change"
        description="Validation happens as you type."
        fields={[
          {
            name: 'username',
            label: 'Username',
            required: true,
            validation: { minLength: 3 }
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
          }
        ]}
        validateOnChange
        onSubmit={(values) => console.log('Change validation:', values)}
      />
      
      <Form
        title="Validate on Blur"
        description="Validation happens when you leave a field."
        fields={[
          {
            name: 'username',
            label: 'Username',
            required: true,
            validation: { minLength: 3 }
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
          }
        ]}
        validateOnBlur
        onSubmit={(values) => console.log('Blur validation:', values)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation modes: validate on change vs validate on blur.',
      },
    },
  },
};

export const ComplexValidation: Story = {
  render: () => {
    const complexFields: FormField[] = [
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: {
          minLength: 8,
          custom: (value) => {
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            if (!hasUpper) return 'Password must contain at least one uppercase letter';
            if (!hasLower) return 'Password must contain at least one lowercase letter';
            if (!hasNumber) return 'Password must contain at least one number';
            if (!hasSpecial) return 'Password must contain at least one special character';
            
            return null;
          }
        }
      },
      {
        name: 'website',
        label: 'Website URL',
        type: 'url',
        validation: {
          pattern: '^https?:\\/\\/.+\\..+',
          custom: (value) => {
            if (value && !value.startsWith('http')) {
              return 'URL must start with http:// or https://';
            }
            return null;
          }
        }
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        required: true,
        validation: {
          min: 13,
          max: 120,
          custom: (value) => {
            const age = parseInt(value);
            if (age < 18 && age >= 13) {
              return 'Users under 18 require parental consent';
            }
            return null;
          }
        }
      }
    ];

    return (
      <Form
        title="Complex Validation"
        description="Form with advanced validation rules and custom error messages."
        fields={complexFields}
        validateOnBlur
        onSubmit={(values) => console.log('Complex validation:', values)}
        submitButton={{ label: 'Validate & Submit' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with complex validation rules including custom validation functions.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    title: 'Playground Form',
    subtitle: 'Interactive Example',
    description: 'Use the controls below to experiment with different form configurations.',
    fields: basicFields,
    layout: 'vertical',
    spacing: 'normal',
    validateOnChange: false,
    validateOnBlur: true,
    showErrorsOnSubmit: true,
    loading: false,
    disabled: false,
    submitButton: {
      label: 'Submit Form',
    },
    resetButton: {
      label: 'Reset Form',
    },
    onSubmit: (values) => console.log('Playground form:', values),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of form props.',
      },
    },
  },
};