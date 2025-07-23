# Composite Components - Accessibility & Visibility Guide

This document outlines the accessibility features and visibility improvements implemented in our composite components.

## Accessibility Features

### 1. Card Component
- **Keyboard Navigation**: Supports Enter and Space key activation when clickable
- **ARIA Attributes**: Proper role, aria-label, and aria-describedby attributes
- **Focus Management**: Visible focus indicators and proper tab order
- **Screen Reader Support**: Descriptive labels and semantic structure

```tsx
<Card
  title="Accessible Card"
  description="This card follows accessibility best practices"
  clickable
  onCardClick={handleClick}
  // Automatically adds:
  // role="button"
  // tabIndex={0}
  // aria-label="Card: Accessible Card"
  // aria-describedby="accessible-card-description"
/>
```

### 2. Modal Component
- **Focus Management**: Traps focus within modal, restores focus on close
- **Keyboard Navigation**: Escape key closes modal
- **ARIA Attributes**: aria-modal, aria-labelledby, aria-describedby
- **Overlay Interaction**: Click outside to close (configurable)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Accessible Modal"
  ariaLabel="User settings dialog"
  // Automatically adds:
  // role="dialog"
  // aria-modal="true"
  // tabIndex={-1}
  // Focus management
/>
```

### 3. Form Component
- **Field Validation**: Real-time validation with screen reader announcements
- **Error Handling**: Clear error messages associated with fields
- **Required Fields**: Proper required attribute and visual indicators
- **Label Association**: All inputs properly labeled

```tsx
<Form
  title="Registration Form"
  fields={[
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      validation: { pattern: '^[^@]+@[^@]+\.[^@]+$' }
    }
  ]}
  // Automatically provides:
  // - Proper form structure
  // - Field validation
  // - Error announcements
  // - Required field indicators
/>
```

### 4. Navigation Component
- **Keyboard Navigation**: Arrow keys, Enter, and Space support
- **ARIA Attributes**: Proper navigation landmarks and states
- **Dropdown Support**: Expandable/collapsible with proper ARIA states
- **Mobile Accessibility**: Touch-friendly and screen reader compatible

```tsx
<Navigation
  items={navigationItems}
  ariaLabel="Main navigation"
  // Automatically provides:
  // role="navigation"
  // Keyboard navigation
  // ARIA expanded states for dropdowns
  // Focus management
/>
```

### 5. Alert Component
- **Live Regions**: Proper aria-live announcements for dynamic content
- **Severity Levels**: Different announcement priorities
- **Dismissible**: Keyboard accessible dismiss functionality
- **Action Support**: Accessible action buttons

```tsx
<Alert
  variant="error"
  title="Error Occurred"
  message="Please check your input and try again"
  dismissible
  ariaLive="assertive" // For urgent messages
  // Automatically provides:
  // role="alert"
  // aria-atomic="true"
  // Keyboard accessible dismiss
/>
```

### 6. Dropdown Component
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **ARIA Attributes**: Proper listbox semantics
- **Search Support**: Accessible search functionality
- **Multi-select**: Clear selection states and announcements

```tsx
<Dropdown
  options={options}
  placeholder="Select an option"
  searchable
  ariaLabel="Country selection"
  // Automatically provides:
  // aria-haspopup="listbox"
  // aria-expanded states
  // Keyboard navigation
  // Search accessibility
/>
```

## Visibility Improvements

### 1. Focus Indicators
All interactive elements have clear focus indicators:
- High contrast focus rings
- Consistent focus styling across components
- Visible focus states for keyboard users

### 2. Color Contrast
- All text meets WCAG AA contrast requirements
- Error states use sufficient contrast ratios
- Interactive elements have proper contrast

### 3. Responsive Design
- Components adapt to different screen sizes
- Touch targets meet minimum size requirements (44px)
- Mobile-friendly interactions

### 4. Loading States
- Clear loading indicators with proper ARIA attributes
- Disabled states are visually distinct
- Loading states announced to screen readers

## Testing Accessibility

### Automated Testing
Run the accessibility test suite:
```bash
npm test -- accessibility.test.tsx
```

### Manual Testing Checklist
- [ ] Tab through all interactive elements
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard navigation works
- [ ] Check color contrast ratios
- [ ] Test with high contrast mode
- [ ] Verify focus indicators are visible

### Browser Extensions
Recommended accessibility testing tools:
- axe DevTools
- WAVE Web Accessibility Evaluator
- Lighthouse Accessibility Audit

## Common Issues Fixed

### 1. Button Props Type Safety
**Issue**: `disabled` and `loading` props not handling `false` values correctly
**Fix**: Use nullish coalescing (`??`) instead of logical OR (`||`)

```tsx
// Before (incorrect)
disabled={action.disabled || false}

// After (correct)
disabled={action.disabled ?? false}
```

### 2. ARIA Attribute Consistency
**Issue**: Inconsistent ARIA attribute naming
**Fix**: Use consistent camelCase naming throughout

```tsx
// Before (incorrect)
aria-label={label}

// After (correct)
ariaLabel={label}
```

### 3. Focus Management
**Issue**: Focus not properly managed in modals and dropdowns
**Fix**: Implement proper focus trapping and restoration

### 4. Keyboard Navigation
**Issue**: Components not fully keyboard accessible
**Fix**: Add comprehensive keyboard event handlers

## Best Practices

### 1. Always Provide Labels
- Use descriptive labels for all interactive elements
- Provide context for screen reader users
- Use aria-label when visible labels aren't sufficient

### 2. Manage Focus Properly
- Trap focus in modals and dropdowns
- Restore focus when closing overlays
- Provide clear focus indicators

### 3. Use Semantic HTML
- Use proper HTML elements (button, form, nav)
- Leverage built-in accessibility features
- Avoid div/span for interactive elements

### 4. Test with Real Users
- Include users with disabilities in testing
- Test with actual assistive technologies
- Gather feedback on usability

### 5. Progressive Enhancement
- Ensure basic functionality without JavaScript
- Provide fallbacks for complex interactions
- Support various input methods

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Accessibility Resources](https://webaim.org/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Reporting Issues

If you discover accessibility issues:
1. Check this guide for known solutions
2. Test with multiple assistive technologies
3. Create detailed bug reports with reproduction steps
4. Include information about affected user groups