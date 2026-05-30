# React Core Concepts Demo

An interactive demonstration of fundamental React concepts built with Vite + React + TypeScript.

## 🎯 Purpose

This project visualizes the core concepts from `REACT_CORE_CONCEPT.md` through a hands-on demo application. Each concept is implemented as a separate component with clear examples and explanations.

## 📚 Concepts Covered

### ✅ Implemented

1. **Creating Components** - Function components, arrow functions, and component nesting
2. **JSX** - JavaScript + XML syntax, embedding expressions, fragments, and HTML vs JSX differences
3. **Adding Styles** - Inline styles, CSS classes, and CSS Modules comparison

### 🚧 Coming Soon

4. Displaying Data (Props)
5. Conditional Rendering
6. Rendering Lists
7. Event Handling
8. State Management (useState)
9. Sharing Data Between Components
10. useEffect Hook
11. useContext Hook

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── 01-ComponentsDemo.tsx      # Creating Components
│   ├── 02-JSXDemo.tsx             # JSX Syntax
│   ├── 03-StylingDemo.tsx         # Styling Approaches
│   └── StylingDemo.module.css     # CSS Modules example
├── App.tsx                         # Main application
├── App.css                         # Global styles
└── main.tsx                        # Entry point
```

## 🎨 Features

- **Interactive Examples** - Each concept includes working code examples
- **Visual Demonstrations** - See React concepts in action
- **Comparison Tables** - Understand differences between approaches
- **Responsive Design** - Works on desktop and mobile devices
- **TypeScript** - Full type safety throughout the application

## 📖 Learning Path

The demos are organized sequentially to build understanding progressively:

1. Start with **Creating Components** to understand the basics
2. Move to **JSX** to learn the syntax
3. Explore **Adding Styles** to make components look good
4. Continue with props, state, and hooks as they're added

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling
- **ESLint** - Code quality

## 📝 Atomic Commits

This project follows atomic commit practices. Each core concept is implemented in a separate commit:

- `feat: add React core concepts demo - 1. Creating Components`
- `feat: add JSX demo - 2. JSX`
- `feat: add styling demo - 3. Adding Styles`

## 🤝 Contributing

This is a learning project. Feel free to:

- Add more examples
- Improve explanations
- Fix bugs
- Suggest new concepts to demonstrate

## 📄 License

This project is part of the example-modern-react-testing repository.

## 🔗 Related

- [REACT_CORE_CONCEPT.md](../../REACT_CORE_CONCEPT.md) - Original concept documentation
- [React Documentation](https://react.dev) - Official React docs
- [Vite Documentation](https://vite.dev) - Vite build tool docs
