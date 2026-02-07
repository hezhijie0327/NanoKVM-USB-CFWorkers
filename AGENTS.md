# AGENTS.md

This document contains guidelines and commands for agentic coding agents working in this NanoKVM-USB-CFWorkers repository.

## Project Overview

This is a React-based web application for NanoKVM USB device control, built with TypeScript, Vite, and Tailwind CSS. It provides a remote KVM (Keyboard, Video, Mouse) interface through a web browser.

## Commands

### Development

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Run ESLint on TypeScript/TSX files (will show warnings for missing dependencies in useEffect)
- `npm run format` - Format code with Prettier (includes import sorting and Tailwind class sorting)

### Testing

No test framework is currently configured in this project. Tests should be added using a framework like Jest or Vitest if needed.

## Code Style Guidelines

### TypeScript Configuration

- Strict TypeScript mode enabled
- ES2020 target with DOM libraries
- Path aliases configured: `@/*` maps to `./src/*`
- Unused locals and parameters are flagged as errors

### Import Organization

Imports are automatically sorted with this order:

1. React and related modules
2. Next.js modules (if used)
3. Third-party modules
4. Empty line
5. Type-only imports (`^types$`)
6. Internal path aliases (`@/*`)
7. Empty line
8. Relative imports (`^[./]`)

All imports use single quotes and no trailing commas.

### ESLint Rules

- React Hooks rules enforced
- No explicit `any` types allowed (turned off)
- React Refresh exports warning enabled
- Prettier configuration takes precedence

### Prettier Configuration

- Single quotes
- No trailing commas
- 100 character print width
- 2 space tab width
- Bracket spacing enabled

### Component Structure

- Functional components with TypeScript
- Props interfaces defined inline or exported separately
- Custom hooks for complex logic
- Jotai for state management
- Tailwind CSS for styling

### File Organization

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── menu/           # Menu-related components
│   ├── mouse/          # Mouse-related components
│   ├── keyboard/       # Keyboard-related components
│   ├── device-modal/   # Device selection modals
│   └── virtual-keyboard/
├── libs/               # Utility libraries
│   ├── device/         # Device communication
│   ├── media/          # Camera/media handling
│   ├── mouse/          # Mouse utilities
│   ├── keyboard/       # Keyboard utilities
│   ├── storage/        # Local storage helpers
│   └── browser/        # Browser utilities
├── jotai/              # State management atoms
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── assets/             # Static assets
├── types.ts            # Type definitions
└── main.tsx            # Application entry point
```

### Naming Conventions

- Components: PascalCase (e.g., `VirtualKeyboard`, `DeviceModal`)
- Files: kebab-case for folders, PascalCase for component files, camelCase for utilities
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE for localStorage keys
- Types/Interfaces: PascalCase
- CSS Classes: Tailwind utility classes only

### State Management

- Use Jotai atoms for global state
- Define atoms in separate files under `src/jotai/`
- Use `useAtom`, `useAtomValue`, and `useSetAtom` hooks appropriately
- Local state with `useState` for component-specific data

### Error Handling

- Use try-catch blocks for async operations
- Log errors with context information
- Display user-friendly error messages using Antd components
- Handle permission errors gracefully (camera, serial port)

### Styling Guidelines

- Use Tailwind CSS utility classes
- Leverage Antd components for UI elements
- Responsive design with React Responsive
- Dark theme by default using Antd's dark algorithm
- Use clsx for conditional className combination

### Device Communication

- Serial communication through Web Serial API
- Protocol implementation in `src/libs/device/`
- Handle connection states appropriately
- Implement proper cleanup on component unmount

### Performance Considerations

- Use React.memo for expensive components
- Implement proper cleanup in useEffect
- Minimize re-renders with appropriate state splitting
- Use lazy loading for heavy components if needed

### Browser Compatibility

- Target modern browsers with ES2020 support
- Use appropriate polyfills if needed
- Test Web Serial API compatibility
- Handle permissions API appropriately
