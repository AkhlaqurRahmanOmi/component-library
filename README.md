# Component Library

A collection of reusable React components built with TypeScript and Tailwind CSS, designed to be easily integrated into any React project.

## Features

- Pre-built, customizable UI components
- Written in TypeScript for better developer experience
- Built with accessibility in mind
- Fully tested components
- Lightweight and modular

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- React 19.1.0 or later
- TypeScript

### Installation

1. **Copy the component library**
   Copy the following directories to your project:
   ```
   /components
   /index.ts
   ```

2. **Install required dependencies**
   ```bash
   npm install react@^19.1.0 react-dom@^19.1.0
   npm install -D typescript @types/react @types/react-dom
   ```

3. **Install Tailwind CSS** (if not already installed)
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

## Usage

### Importing Components

Import components directly from the library:

```typescript
import { Button, Container, Input, Text } from './path-to-components';

function MyApp() {
  return (
    <Container>
      <Text variant="h1">Welcome to My App</Text>
      <Input placeholder="Enter your name" />
      <Button onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </Container>
  );
}
```

### Available Components

- **Button**: A customizable button component with multiple variants
- **Container**: A responsive container component
- **Input**: Form input with validation support
- **Text**: Typography component with various text styles

### Component Props

Each component comes with TypeScript types for better development experience. You can explore the available props by hovering over the component in your IDE.

## Development

### Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
