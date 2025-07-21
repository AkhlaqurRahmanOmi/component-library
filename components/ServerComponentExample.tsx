// This is a Server Component (no "use client" directive)
import { Text } from "./ui";

export function ServerComponentExample() {
  return (
    <section className="mb-12 p-6 bg-blue-50 rounded-lg">
      <Text
        tag="h3"
        size="xl"
        weight="semibold"
        color="blue-800"
        marginBottom="4"
      >
        Server Component Example
      </Text>
      <Text tag="p" color="blue-700" marginBottom="2">
        This Text component is being rendered in a Server Component.
      </Text>
      <Text tag="p" size="sm" color="blue-600">
        No JavaScript is sent to the client for this component - it&apos;s
        rendered on the server.
      </Text>

      {/* These work fine in Server Components */}
      <div className="mt-4 space-y-2">
        <Text tag="h4" weight="medium" color="blue-800">
          Static Text Features:
        </Text>
        <Text size="sm" color="green-600">
          ✓ Typography styling
        </Text>
        <Text size="sm" color="green-600">
          ✓ Color variants
        </Text>
        <Text size="sm" color="green-600">
          ✓ Spacing props
        </Text>
        <Text size="sm" color="green-600">
          ✓ Accessibility attributes
        </Text>
        <Text size="sm" color="green-600">
          ✓ Semantic HTML tags
        </Text>
      </div>
    </section>
  );
}
