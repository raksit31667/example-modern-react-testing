# TDD Theme Toggle

A demonstration project showcasing Test-Driven Development (TDD) approach for building a modern React theme toggle component.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **Playwright** - End-to-end testing
- **MSW** - API mocking

## Features

- Theme toggle component (Light/Dark mode)
- Theme context for global state management
- LocalStorage persistence
- System preference detection
- Comprehensive unit tests
- E2E tests demonstrating user behavior

## TDD Approach

This project demonstrates the Red-Green-Refactor cycle with atomic commits:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass the test
3. **Refactor**: Improve code while keeping tests green
4. **Commit**: Create atomic commit for each cycle

Each commit represents a complete unit of work following the TDD methodology.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   └── ThemeToggle.tsx   # Theme toggle component
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme context provider
├── e2e/                  # Playwright E2E tests
├── tests/                # Test setup and utilities
└── README.md
```

## Testing Strategy

### Unit Tests
- Component rendering
- User interactions
- Context integration
- LocalStorage persistence

### E2E Tests
- User behavior flows
- Theme persistence across page reloads
- System preference detection

## Learn More

This project demonstrates modern React development practices including:
- Test-Driven Development (TDD)
- Atomic commits
- Component testing
- E2E testing
- Context API usage
- LocalStorage integration
