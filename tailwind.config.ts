import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './index.ts',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions can go here
      colors: {
        // Add any custom colors if needed
      },
      spacing: {
        // Add any custom spacing if needed
      },
    },
  },
  plugins: [],
  // Optimize for production builds
  corePlugins: {
    // Disable unused core plugins to reduce bundle size
    preflight: true,
  },
  // Enable JIT mode for better performance
  mode: 'jit',
  // Purge unused styles in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './index.ts',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // Safelist important classes that might be generated dynamically
    safelist: [
      // Component size classes
      'min-w-[44px]',
      'min-h-[44px]',
      // Focus ring classes
      'focus:ring-2',
      'focus:ring-offset-2',
      // State classes
      'aria-disabled:opacity-50',
      'aria-busy:cursor-wait',
      // Responsive classes that might be generated dynamically
      /^(sm|md|lg|xl|2xl):/,
      // Color classes that might be generated dynamically
      /^(bg|text|border)-(red|blue|green|yellow|purple|pink|indigo|orange|teal|cyan|gray)-(50|100|200|300|400|500|600|700|800|900)$/,
      // Spacing classes that might be generated dynamically
      /^(m|p)(t|r|b|l|x|y)?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|auto)$/,
    ],
    // Extract dynamic class names from JavaScript
    extractors: [
      {
        extractor: (content) => {
          // Extract class names from template literals and string concatenations
          const matches = content.match(/[A-Za-z0-9-_:\/]+/g) || [];
          return matches;
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    ],
  },
};

export default config;