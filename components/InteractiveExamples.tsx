"use client";

import { Text } from "./ui";

export function InteractiveExamples() {
  return (
    <section className="mb-12">
      <Text tag="h2" size="2xl" weight="semibold" marginBottom="6">
        Interactive Text Examples
      </Text>
      <div className="space-y-4">
        <Text
          tag="p"
          color="blue-600"
          decoration="underline"
          onClick={() => alert("Text clicked!")}
          onMouseEnter={() => console.log("Mouse entered")}
          className="cursor-pointer hover:text-blue-800 transition-colors"
          role="button"
          tabIndex={0}
          ariaLabel="Clickable text example"
        >
          Click me! (Interactive text with accessibility support)
        </Text>
        
        <Text
          tag="button"
          color="green-600"
          weight="semibold"
          onClick={() => console.log("Button clicked")}
          className="px-4 py-2 bg-green-100 rounded hover:bg-green-200 transition-colors"
        >
          Text rendered as button element
        </Text>
        
        <Text
          tag="span"
          color="purple-600"
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          tabIndex={0}
          className="inline-block p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Focusable span with keyboard support
        </Text>
      </div>
    </section>
  );
}