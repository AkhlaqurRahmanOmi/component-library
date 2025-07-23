"use client";

import * as React from "react";
import { Container } from "../../ui/Container";
import { Text } from "../../ui/Text";
import { Button } from "../../ui/Button";
import { cn } from "../../utils/classNames";
import type {
  DropdownProps,
  DropdownRef,
  DropdownOption,
} from "./Dropdown.types";

/**
 * Dropdown component combining Button, Container, and Text for selection menus
 *
 * A flexible dropdown/select component that supports single and multiple selection,
 * search functionality, custom options, and various styling configurations.
 *
 * @example
 * ```tsx
 * // Basic single select dropdown
 * <Dropdown
 *   placeholder="Select an option"
 *   options={[
 *     { id: '1', label: 'Option 1', value: 'option1' },
 *     { id: '2', label: 'Option 2', value: 'option2' },
 *     { id: '3', label: 'Option 3', value: 'option3' }
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multi-select with search
 * <Dropdown
 *   placeholder="Select multiple options"
 *   options={options}
 *   multiple
 *   searchable
 *   clearable
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
export const Dropdown = React.forwardRef<DropdownRef, DropdownProps>(
  (
    {
      // Core props
      options,
      value: controlledValue,
      defaultValue,
      onChange,

      // Trigger props
      trigger,
      placeholder = "Select...",
      disabled = false,
      loading = false,

      // Selection props
      multiple = false,
      searchable = false,
      clearable = false,
      closeOnSelect = true,

      // Dropdown state props
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,

      // Positioning props
      placement = "bottom-start",
      offset = 4,

      // Styling props
      size = "md",
      variant = "outline",
      fullWidth = false,

      // Search props
      searchPlaceholder = "Search...",
      onSearch,
      filterOptions,

      // Empty state props
      emptyMessage = "No options found",
      renderEmpty,

      // Custom renderers
      renderTrigger,
      renderOption,
      renderSelectedValue,

      // Override props
      triggerProps,
      dropdownProps,
      optionProps,
      searchProps,

      // Accessibility props
      ariaLabel,
      ariaDescribedBy,

      // HTML props
      name,
      form,
      required,
    },
    ref
  ) => {
    // Internal state
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (multiple ? [] : "")
    );
    const [searchQuery, setSearchQuery] = React.useState("");

    // Refs
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => dropdownRef.current!);

    // Use controlled or internal state
    const isOpen = controlledOpen ?? internalOpen;
    const value = controlledValue ?? internalValue;

    // Get selected options
    const selectedOptions = React.useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter((option) => value.includes(option.value));
      } else if (!multiple && typeof value === "string") {
        const option = options.find((option) => option.value === value);
        return option ? [option] : [];
      }
      return [];
    }, [options, value, multiple]);

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;

      if (filterOptions) {
        return filterOptions(options, searchQuery);
      }

      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery, filterOptions]);

    // Handle open state change
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);

        // Focus search input when opening
        if (newOpen && searchable) {
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        }

        // Clear search when closing
        if (!newOpen) {
          setSearchQuery("");
        }
      },
      [controlledOpen, onOpenChange, searchable]
    );

    // Handle option selection
    const handleOptionSelect = React.useCallback(
      (option: DropdownOption) => {
        if (option.disabled) return;

        let newValue: string | string[];
        let selectedOption: DropdownOption | DropdownOption[];

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          if (currentValues.includes(option.value)) {
            // Remove option
            newValue = currentValues.filter((v) => v !== option.value);
          } else {
            // Add option
            newValue = [...currentValues, option.value];
          }
          selectedOption = options.filter((opt) =>
            newValue.includes(opt.value)
          );
        } else {
          newValue = option.value;
          selectedOption = option;
        }

        // Update internal state if not controlled
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        // Call onChange
        onChange?.(newValue, selectedOption);

        // Close dropdown if configured
        if (closeOnSelect && !multiple) {
          handleOpenChange(false);
        }
      },
      [
        multiple,
        value,
        options,
        controlledValue,
        onChange,
        closeOnSelect,
        handleOpenChange,
      ]
    );

    // Handle clear selection
    const handleClear = React.useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        const newValue = multiple ? [] : "";
        const selectedOption = multiple ? [] : options[0] || null;

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        onChange?.(newValue, selectedOption as any);
      },
      [multiple, options, controlledValue, onChange]
    );

    // Handle search input change
    const handleSearchChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch?.(query);
      },
      [onSearch]
    );

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen, handleOpenChange]);

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
          case "Escape":
            handleOpenChange(false);
            triggerRef.current?.focus();
            break;
          case "ArrowDown":
          case "ArrowUp":
            event.preventDefault();
            // TODO: Implement keyboard navigation between options
            break;
          case "Enter":
            event.preventDefault();
            // TODO: Select focused option
            break;
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [isOpen, handleOpenChange]);

    // Get trigger size classes
    const getTriggerSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 px-3 text-sm";
        case "lg":
          return "h-12 px-4 text-lg";
        default:
          return "h-10 px-3 text-base";
      }
    };

    // Render trigger button
    const renderTriggerButton = () => {
      if (renderTrigger) {
        return renderTrigger({
          isOpen,
          selectedOptions,
          placeholder,
        });
      }

      if (trigger) {
        return React.cloneElement(
          trigger as React.ReactElement,
          {
            onClick: () => handleOpenChange(!isOpen),
            ref: triggerRef,
          } as any
        );
      }

      const displayValue = renderSelectedValue
        ? renderSelectedValue(selectedOptions)
        : selectedOptions.length > 0
        ? multiple
          ? `${selectedOptions.length} selected`
          : selectedOptions[0].label
        : placeholder;

      return (
        <Button
          ref={triggerRef}
          variant={variant}
          disabled={disabled ?? false}
          loading={loading ?? false}
          onClick={() => handleOpenChange(!isOpen)}
          className={cn(
            "justify-between",
            getTriggerSizeClasses(),
            fullWidth && "w-full"
          )}
          rightIcon={
            <svg
              className={cn(
                "w-4 h-4 transition-transform",
                isOpen && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          }
          ariaLabel={ariaLabel ?? placeholder ?? "Select option"}
          {...(ariaDescribedBy && { ariaDescribedBy })}
          ariaExpanded={isOpen}
          aria-haspopup="listbox"
          {...triggerProps}
        >
          <span className="truncate text-left">{displayValue}</span>
          {clearable && selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 p-0.5 hover:bg-gray-200 rounded"
              aria-label="Clear selection"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </Button>
      );
    };

    // Render search input
    const renderSearchInput = () => {
      if (!searchable) return null;

      return (
        <div className="p-2 border-b border-gray-200">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...searchProps}
          />
        </div>
      );
    };

    // Render option
    const renderDropdownOption = (option: DropdownOption) => {
      const isSelected = selectedOptions.some(
        (selected) => selected.id === option.id
      );

      if (renderOption) {
        return renderOption(option, isSelected);
      }

      return (
        <Button
          key={option.id}
          variant="ghost"
          size="sm"
          disabled={option.disabled ?? false}
          onClick={() => handleOptionSelect(option)}
          className={cn(
            "w-full justify-start px-3 py-2 text-left",
            isSelected && "bg-blue-50 text-blue-700",
            option.disabled && "opacity-50 cursor-not-allowed"
          )}
          leftIcon={option.icon}
          {...optionProps}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Text className="truncate">{option.label}</Text>
              {isSelected && multiple && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            {option.description && (
              <Text size="sm" color="gray-600" className="mt-1">
                {option.description}
              </Text>
            )}
          </div>
        </Button>
      );
    };

    // Render dropdown content
    const renderDropdownContent = () => {
      if (filteredOptions.length === 0) {
        return (
          <div className="p-4 text-center text-gray-500">
            {renderEmpty ? renderEmpty() : emptyMessage}
          </div>
        );
      }

      return (
        <div className="py-1">
          {filteredOptions.map((option) => renderDropdownOption(option))}
        </div>
      );
    };

    return (
      <div ref={dropdownRef} className="relative inline-block">
        {renderTriggerButton()}

        {isOpen && (
          <Container
            className={cn(
              "absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg",
              "min-w-full max-h-60 overflow-auto",
              placement.includes("top") && "bottom-full mb-1 mt-0",
              placement.includes("end") && "right-0",
              placement.includes("left") && "left-full ml-1",
              placement.includes("right") && "right-full mr-1"
            )}
            style={{
              marginTop: placement.includes("bottom") ? offset : undefined,
            }}
            {...dropdownProps}
          >
            {renderSearchInput()}
            {renderDropdownContent()}
          </Container>
        )}

        {/* Hidden input for form integration */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={Array.isArray(value) ? value.join(",") : value}
            form={form}
            required={required}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
