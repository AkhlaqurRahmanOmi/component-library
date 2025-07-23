import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';
import { Button } from '../../ui/Button';


const meta: Meta<typeof Alert> = {
  title: 'Composite Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile alert component that provides user feedback with different severity levels, customizable actions, and various styling options using Container, Text, and Button components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant/type',
    },
    severity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high', 'critical'],
      description: 'Alert severity level',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Alert size',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Alert layout orientation',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    autoClose: {
      control: 'boolean',
      description: 'Auto close after delay',
    },
    autoCloseDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
      description: 'Auto close delay in milliseconds',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show alert icon',
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded corners',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    filled: {
      control: 'boolean',
      description: 'Filled background style',
    },
    animate: {
      control: 'boolean',
      description: 'Enable animations',
    },
    slideDirection: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Animation slide direction',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    message: {
      control: 'text',
      description: 'Alert message',
    },
    onDismiss: {
      action: 'alert-dismissed',
      description: 'Dismiss handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for dismissible alerts
const DismissibleAlertWrapper = ({ children, ...props }: any) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) {
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(true)}>Show Alert Again</Button>
        <p className="text-gray-500 text-sm">Alert was dismissed</p>
      </div>
    );
  }
  
  return (
    <Alert
      {...props}
      onDismiss={() => setIsVisible(false)}
    >
      {children}
    </Alert>
  );
};

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is a basic informational alert.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        title="Information"
        message="This is an informational alert with helpful details."
      />
      <Alert
        variant="success"
        title="Success!"
        message="Your action was completed successfully."
      />
      <Alert
        variant="warning"
        title="Warning"
        message="Please review this information before proceeding."
      />
      <Alert
        variant="error"
        title="Error"
        message="An error occurred while processing your request."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alert variants: info, success, warning, and error.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        size="sm"
        title="Small Alert"
        message="This is a small-sized alert with compact spacing."
      />
      <Alert
        variant="success"
        size="md"
        title="Medium Alert"
        message="This is a medium-sized alert, which is the default size."
      />
      <Alert
        variant="warning"
        size="lg"
        title="Large Alert"
        message="This is a large-sized alert with generous spacing and larger text."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alert sizes: small, medium (default), and large.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        title="Single Action"
        message="This alert has a single primary action."
        primaryAction={{
          label: "Learn More",
          onClick: () => console.log("Learn more clicked")
        }}
      />
      
      <Alert
        variant="warning"
        title="Multiple Actions"
        message="This alert has both primary and secondary actions."
        primaryAction={{
          label: "Confirm",
          onClick: () => console.log("Confirm clicked")
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel clicked")
        }}
      />
      
      <Alert
        variant="error"
        title="Custom Actions"
        message="This alert has multiple custom actions."
        actions={[
          {
            label: "Retry",
            onClick: () => console.log("Retry clicked"),
            variant: "primary"
          },
          {
            label: "Report Issue",
            onClick: () => console.log("Report clicked"),
            variant: "outline"
          },
          {
            label: "Dismiss",
            onClick: () => console.log("Dismiss clicked"),
            variant: "ghost"
          }
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with different action button configurations.',
      },
    },
  },
};

export const DismissibleAlerts: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <DismissibleAlertWrapper
        variant="success"
        title="Dismissible Alert"
        message="This alert can be dismissed by clicking the X button."
        dismissible
      />
      
      <DismissibleAlertWrapper
        variant="info"
        title="Auto-Close Alert"
        message="This alert will automatically close after 3 seconds."
        dismissible
        autoClose
        autoCloseDelay={3000}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alerts with manual and automatic closing.',
      },
    },
  },
};

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Style</h3>
        <div className="space-y-3">
          <Alert variant="info" title="Default Info" message="Standard alert styling." />
          <Alert variant="success" title="Default Success" message="Standard alert styling." />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Filled Style</h3>
        <div className="space-y-3">
          <Alert variant="info" title="Filled Info" message="Filled background styling." filled />
          <Alert variant="success" title="Filled Success" message="Filled background styling." filled />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Icons</h3>
        <div className="space-y-3">
          <Alert variant="warning" title="No Icon Warning" message="Alert without icon." showIcon={false} />
          <Alert variant="error" title="No Icon Error" message="Alert without icon." showIcon={false} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Borders</h3>
        <div className="space-y-3">
          <Alert variant="info" title="No Border Info" message="Alert without border." bordered={false} />
          <Alert variant="success" title="No Border Success" message="Alert without border." bordered={false} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different styling variations: filled backgrounds, with/without icons and borders.',
      },
    },
  },
};

export const OrientationLayouts: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Layout (Default)</h3>
        <Alert
          variant="info"
          title="Horizontal Alert"
          message="Icon and content are arranged horizontally."
          orientation="horizontal"
          primaryAction={{
            label: "Action",
            onClick: () => console.log("Horizontal action")
          }}
          dismissible
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Layout</h3>
        <Alert
          variant="warning"
          title="Vertical Alert"
          message="Icon and content are arranged vertically for a centered appearance."
          orientation="vertical"
          primaryAction={{
            label: "Action",
            onClick: () => console.log("Vertical action")
          }}
          dismissible
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different layout orientations: horizontal and vertical arrangements.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        title="Processing Request"
        message="Please wait while we process your request."
        primaryAction={{
          label: "Processing...",
          onClick: () => console.log("Processing"),
          loading: true
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log("Cancel")
        }}
      />
      
      <Alert
        variant="warning"
        title="Disabled Actions"
        message="Actions are temporarily disabled."
        primaryAction={{
          label: "Submit",
          onClick: () => console.log("Submit"),
          disabled: true
        }}
        secondaryAction={{
          label: "Reset",
          onClick: () => console.log("Reset"),
          disabled: true
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with loading and disabled action states.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        title="Custom Content Alert"
      >
        <div className="space-y-3">
          <p className="text-sm text-blue-800">
            This alert contains custom React content instead of a simple message.
          </p>
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-1">Additional Information</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Custom lists and formatting</li>
              <li>• Rich content support</li>
              <li>• Nested components</li>
            </ul>
          </div>
        </div>
      </Alert>
      
      <Alert
        variant="success"
        title="Form Submission Success"
      >
        <div className="space-y-2">
          <p className="text-sm text-green-800">
            Your form has been submitted successfully!
          </p>
          <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
            <strong>Reference ID:</strong> #12345<br />
            <strong>Submitted:</strong> March 15, 2024 at 2:30 PM
          </div>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with custom React content for rich layouts and formatting.',
      },
    },
  },
};

export const CustomIcons: Story = {
  render: () => {
    const CustomIcon = () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    );
    
    const HeartIcon = () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    );
    
    return (
      <div className="space-y-4 max-w-2xl">
        <Alert
          variant="warning"
          title="Custom Lightning Icon"
          message="This alert uses a custom lightning bolt icon."
          icon={<CustomIcon />}
        />
        
        <Alert
          variant="success"
          title="Custom Heart Icon"
          message="This alert uses a custom heart icon."
          icon={<HeartIcon />}
          filled
        />
        
        <Alert
          variant="info"
          title="Custom Rendered Icon"
          message="This alert uses a custom icon renderer."
          renderIcon={() => (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              !
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alerts with custom icons and icon renderers.',
      },
    },
  },
};

export const CustomActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="error"
        title="Custom Action Renderer"
        message="This alert uses a custom action renderer."
        renderActions={() => (
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Primary Action
              </button>
              <button className="px-3 py-1 border border-red-300 text-red-700 text-sm rounded hover:bg-red-50">
                Secondary Action
              </button>
            </div>
            <button className="text-xs text-red-600 hover:text-red-800 self-start">
              Additional Option
            </button>
          </div>
        )}
        actions={[]} // Empty actions since we're using custom renderer
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with custom action renderer for complete control over action layout.',
      },
    },
  },
};

export const SeverityLevels: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert
        variant="info"
        severity="low"
        title="Low Severity Info"
        message="This is a low severity informational message."
        dismissible
      />
      
      <Alert
        variant="warning"
        severity="medium"
        title="Medium Severity Warning"
        message="This is a medium severity warning that requires attention."
        primaryAction={{
          label: "Review",
          onClick: () => console.log("Review clicked")
        }}
        dismissible
      />
      
      <Alert
        variant="error"
        severity="high"
        title="High Severity Error"
        message="This is a high severity error that needs immediate action."
        primaryAction={{
          label: "Fix Now",
          onClick: () => console.log("Fix clicked"),
          variant: "danger"
        }}
        secondaryAction={{
          label: "Report",
          onClick: () => console.log("Report clicked")
        }}
        dismissible
      />
      
      <Alert
        variant="error"
        severity="critical"
        title="Critical System Error"
        message="This is a critical error that requires immediate attention."
        primaryAction={{
          label: "Emergency Fix",
          onClick: () => console.log("Emergency fix"),
          variant: "danger"
        }}
        filled
        showIcon
        dismissible={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different severity levels: low, medium, high, and critical.',
      },
    },
  },
};

export const AnimationExamples: Story = {
  render: () => {
    const [alerts, setAlerts] = useState<Array<{ id: number; direction: string }>>([]);
    
    const addAlert = (direction: string) => {
      const id = Date.now();
      setAlerts(prev => [...prev, { id, direction }]);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
      }, 3000);
    };
    
    return (
      <div className="space-y-4 max-w-2xl">
        <div className="flex gap-2 mb-4">
          <Button onClick={() => addAlert('top')} size="sm">Slide from Top</Button>
          <Button onClick={() => addAlert('bottom')} size="sm">Slide from Bottom</Button>
          <Button onClick={() => addAlert('left')} size="sm">Slide from Left</Button>
          <Button onClick={() => addAlert('right')} size="sm">Slide from Right</Button>
        </div>
        
        <div className="space-y-2">
          {alerts.map(alert => (
            <Alert
              key={alert.id}
              variant="success"
              title="Animated Alert"
              message={`This alert slides in from the ${alert.direction}.`}
              animate
              slideDirection={alert.direction as any}
              dismissible
              onDismiss={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
            />
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Click the buttons above to see animated alerts
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alerts with different animation directions and auto-dismiss functionality.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'info',
    severity: 'medium',
    size: 'md',
    orientation: 'horizontal',
    title: 'Playground Alert',
    message: 'Use the controls below to experiment with different alert configurations.',
    dismissible: true,
    autoClose: false,
    autoCloseDelay: 5000,
    showIcon: true,
    rounded: true,
    bordered: true,
    filled: false,
    animate: true,
    slideDirection: 'top',
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
        story: 'Interactive playground to test different combinations of alert props.',
      },
    },
  },
};