# Create a New React App

## Using Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Using Vite CommonJS
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## Using Vite (Recommended)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

---
layout: two-cols-header
layoutClass: gap-4
class: text-sm
---

# 1. Creating Components

Components are the building blocks of React applications

::left::

#### Function Components

```jsx
// Basic function component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Greeting = () => {
  return <p>Welcome to React!</p>;
};
```

#### Component Naming

- **Capitalize** component names (`Welcome`, not `welcome`)
- Use **PascalCase** for multi-word components (`UserProfile`)
- Components must return **JSX** (React elements)

::right::

#### Nesting Components

```tsx
function App(): JSX.Element {
  return (
    <div>
      <Welcome />
      <Greeting />
    </div>
  );
}
```

<div class="bg-gray-800 p-6 rounded-lg">
<h3 class="mb-4">Key Points</h3>
<ul class="space-y-1">
  <li>Components are JavaScript functions</li>
  <li>They return JSX (React elements)</li>
  <li>Component names must be capitalized</li>
  <li>Components can be nested inside each other</li>
</ul>
</div>

---
layout: two-cols-header
layoutClass: gap-4
class: text-xs
---

# 2. JSX - JavaScript + XML

JSX allows you to write HTML-like syntax in JavaScript

::left::

#### Basic JSX Rules

```jsx
// JSX expressions must have one root element
function Card() {
  return (
    <div className="card">
      <h2>Title</h2>
      <p>Description</p>
    </div>
  );
}
```

#### Embedding JavaScript

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

::right::

#### Multi-line JSX

```jsx
function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <img
        src="profile.jpg"
        alt="Profile picture"
        className="avatar"
      />
      <p>Bio information...</p>
    </>
  );
}
```

--- 
class: text-xs
---

## JSX Attributes

```jsx
// HTML attributes become JSX attributes
<img src="image.jpg" alt="Description" />

// class becomes className
<div className="container">

// onclick becomes onClick (camelCase)
<button onClick={handleClick}>
```

<br/>

## HTML vs JSX Differences

| HTML | JSX |
|------|-----|
| `class` | `className` |
| `onclick` | `onClick` |
| `for` (label) | `htmlFor` |
| All lowercase | camelCase for event handlers |
| String attributes | Expressions in `{}` |

---
layout: two-cols
layoutClass: gap-2
class: text-xs
---

# 3. Adding Styles

Multiple ways to style React components

#### Inline Styles

```jsx
function StyledComponent() {
  const styles = {
    color: 'blue',
    fontSize: '20px',
    padding: '10px',
    borderRadius: '5px'
  };

  return <div style={styles}>Styled Content</div>;
}
```

::right::

#### CSS Classes (Recommended)

```jsx
import './Card.css';

function Card() {
  return (
    <div className="card">
      <h2 className="card-title">Title</h2>
      <p className="card-content">Content</p>
    </div>
  );
}
```

#### CSS Modules

```jsx
import styles from './Card.module.css';

function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Title</h2>
      <p className={styles.content}>Content</p>
    </div>
  );
}
```

---
layout: two-cols-header
layoutClass: gap-2
class: text-xs
---

# CSS vs CSS Modules

<div class="text-xs mb-4">

| Aspect                                   | CSS                                  | CSS Modules                                     |
| ---------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| Import                                   | `import './Card.css';`               | `import styles from './Card.module.css';`       |
| Usage                                    | `card`, `card-title`, `card-content` | `styles.card`, `styles.title`, `styles.content` |
| Prevents Naming Conflicts                | No `card` → `card`                   | Yes `styles.card` → `Card_card__abc123`          |
| Tree Shaking - unused styles are removed | No                                   | Yes                                             |
| Scope                                    | Global                               | Local                                           |

</div>

::left::

#### CSS -- Card.css

```css {none}
.card {
  color: blue;
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
}
```

::right::

#### CSS Modules -- Card.module.css

```css {none}
.card {
  color: blue;
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
}
```

---
layout: two-cols-header
layoutClass: gap-2
class: text-xs
---

# 4. Displaying Data

Pass data to components using **props**

::left::

#### Props Basics

```tsx
// Parent component
function App(): JSX.Element {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </div>
  );
}

// Child component
function Greeting({ name, age }: { name: string; age: number }): JSX.Element {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

::right::

#### Props are Read-Only

```tsx
function Greeting({ name }: { name: string }): JSX.Element {
  // ❌ This won't work
  name = "Modified"; // Props are immutable

  // ✅ Do this instead
  return <h1>Hello, {name}!</h1>;
}
```

#### Default Props

```tsx
function Greeting({ name = "Guest", age }: { name?: string; age?: number }): JSX.Element {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
}
```

---

# Props Types

<div class="bg-dark-500 p-4 rounded-lg">
<h4 class="font-bold mb-2">Common Prop Patterns</h4>

- **String** → `<Component text="Hello" />`
- **Number** → `<Component count={5} />`
- **Boolean** → `<Component isVisible={true} />`
- **Array** → `<Component items={[1,2,3]} />`
- **Object** → `<Component user={{name: "John"}} />`
- **Function** → `<Component onClick={handleClick} />`

<br>

<h4 class="font-bold mb-2">Best Practices</h4>
- Keep props simple and focused
- Use destructuring for cleaner code
- Validate props in development (PropTypes)
- Document prop requirements
</div>

---

# 5. Conditional Rendering

Show different content based on conditions

## If Statements

```tsx
function UserStatus({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }

  return <h1>Please sign in.</h1>;
}
```

## Ternary Operator

```tsx
function UserStatus({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  return (
    <h1>
      {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
    </h1>
  );
}
```

---

## Logical AND Operator

```tsx
function Mailbox({ unreadMessages }: { unreadMessages: unknown[] }): JSX.Element {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <p>
          You have {unreadMessages.length} unread messages.
        </p>
      )}
    </div>
  );
}
```

## Conditional Classes

```jsx
function Button({ isActive }) {
  return (
    <button className={`btn ${isActive ? 'active' : ''}`}>
      Click me
    </button>
  );
}
```

---
layout: two-cols
layoutClass: gap-4
---

## Switch Statements

```jsx
function StatusMessage({ status }) {
  switch (status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Success!</div>;
    case 'error':
      return <div>Error occurred</div>;
    default:
      return <div>Unknown status</div>;
  }
}
```

::right::

## Conditional Lists

```jsx
function ProductList({ products, isAdmin }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {isAdmin && (
            <button>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

# 6. Rendering Lists

Display arrays of data in React

### Basic List Rendering

```tsx
type Product = {
  id: number;
  name: string;
}

type ProductListProps = {
  products: Array<Product>;
}

function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```
--- 

#### Keys in Lists

```jsx {3,8}
// ❌ Missing keys (React warning)
{products.map(product => (
  <li>{product.name}</li>
))}

// ✅ With keys
{products.map(product => (
  <li key={product.id}>{product.name}</li>
))}
```

#### List with Complex JSX

```jsx
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input type="checkbox" checked={todo.completed}/>
          <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---
layoutClass: text-xs
---

# 7. Event Handling -- Respond to user interactions

#### Basic Event Handlers

```tsx
function Button(): JSX.Element {
  function handleClick(): void {
    console.log('Button clicked!');
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

#### Event Handler with Parameters

```tsx
function Button({ msg }: { msg: string }): JSX.Element {
  function handleClick(): void {
    alert(msg);
  }

  return <button onClick={handleClick}>Show Message</button>;
}
```

--- 

#### Arrow Function Handlers

```tsx
function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

#### Event Object

```tsx
function Form(): JSX.Element {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('Form submitted');
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

--- 

## Common Events

| Event | Description | Element |
|-------|-------------|---------|
| `onClick` | User clicks | buttons, links, divs |
| `onChange` | Input value changes | input, textarea, select |
| `onSubmit` | Form submission | form |
| `onKeyDown` | Key pressed | input, textarea |
| `onKeyUp` | Key released | input, textarea |
| `onFocus` | Element focused | input, textarea |
| `onBlur` | Element loses focus | input, textarea |

---

# Event Handler Best Practices

- Use arrow functions for inline handlers
- Pass functions, not function calls
- Use `event.preventDefault()` for forms -- <small>Prevent default form submission behavior e.g. page refresh after submit form</small>
- Clean up event listeners if needed -- <small>e.g. remove event listeners in `useEffect` cleanup function</small>

---
layout: image-right
image: https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop
---

# 8. State Management

Manage component data that changes over time

## useState Hook

```tsx
import { useState } from 'react';

function Counter(): JSX.Element {
  // Declare state variable
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
```

--- 

## State Updates

```tsx
function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => {
    setCount(count + 1);        // ✅ Correct
    setCount(count + 1);        // ❌ May not work as expected. because React batches state updates for performance
  };

  const incrementTwice = (): void => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };
}
```

--- 

## Multiple State Variables

```tsx 
function Form(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  return (
    <form>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={e => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  )};
```

---
layout: two-cols-header
layoutClass: gap-4
---

## State Guidelines

::left::

<h4 class="font-bold mb-2">When to Use State</h4>

- ✅ User input (forms, search)
- ✅ UI state (modals, dropdowns)
- ✅ Server data (API responses)
- ✅ Component lifecycle state

<br>
::right::
<h4 class="font-bold mb-2">State Best Practices</h4>

- Keep state as simple as possible
- Group related state together
- Avoid deep nesting in state objects
- Use functional updates for async operations
- Don't mutate state directly

---
layout: two-cols
---

# 9. Sharing Data Between Components

Pass data from parent to child and lift state up

## Props: Parent to Child

```tsx
// Parent component
function App(): JSX.Element {
  const [user, setUser] = useState<{name: string; email: string}>({
    name: 'John',
    email: 'john@example.com'
  });

  return (
    <div>
      <Header user={user} />
      <Profile user={user} />
    </div>
  );
}

// Child component
function Profile({ user }: { user: {name: string; email: string} }): JSX.Element {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## Lifting State Up - Clear Examples 🚀

When **sibling components** need to share or modify the same data.

::left::

### ❌ **Before: State in Child** (Can't share between siblings)

```tsx
// Each child manages its own cart state
function ProductCard({ product }: { product: { id: number; name: string; price: number } }): JSX.Element {
  const [cart, setCart] = useState<Array<{id: number; name: string; price: number}>>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = (): void => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

function CartDisplay(): JSX.Element {
  const [cart, setCart] = useState<Array<{id: number; name: string; price: number}>>([]); // ❌ Different cart!
  const [total, setTotal] = useState<number>(0);

  return (
    <div className="cart">
      <h3>Shopping Cart ({cart.length} items)</h3>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          {item.name} - ${item.price}
        </div>
      ))}
      <p className="total">Total: ${total}</p>
    </div>
  );
}

// Parent can't coordinate - each has independent cart!
function EcommerceApp(): JSX.Element {
  return (
    <div className="app">
      <ProductCard product={{ id: 1, name: "Laptop", price: 999 }} />
      <ProductCard product={{ id: 2, name: "Mouse", price: 25 }} />
      <CartDisplay /> {/* Shows empty cart - no items added! */}
    </div>
  );
}
```

::right::

### ✅ **After: State in Parent** (Shared state)

```tsx
// Child components receive cart data and callbacks
function ProductCard({
  product,
  onAddToCart
}: {
  product: { id: number; name: string; price: number };
  onAddToCart: (product: { id: number; name: string; price: number }) => void;
}): JSX.Element {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

function CartDisplay({
  cart,
  total
}: {
  cart: Array<{id: number; name: string; price: number}>;
  total: number;
}): JSX.Element {
  return (
    <div className="cart">
      <h3>Shopping Cart ({cart.length} items)</h3>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          {item.name} - ${item.price}
        </div>
      ))}
      <p className="total">Total: ${total.toFixed(2)}</p>
    </div>
  );
}

// Parent manages shared cart state
function EcommerceApp(): JSX.Element {
  const [cart, setCart] = useState<Array<{id: number; name: string; price: number}>>([]);

  const addToCart = (product: { id: number; name: string; price: number }): void => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <ProductCard
        product={{ id: 1, name: "Laptop", price: 999 }}
        onAddToCart={addToCart}
      />
      <ProductCard
        product={{ id: 2, name: "Mouse", price: 25 }}
        onAddToCart={addToCart}
      />
      <CartDisplay cart={cart} total={total} />
      {/* Cart now shows all added items! 🎉 */}
    </div>
  );
}
```

# 10. Building a Complete App

Putting it all together with a practical example

## Tic-Tac-Toe Game

<div class="text-2xl mb-8 font-bold">🎮 Let's Build Tic-Tac-Toe!</div>

<div class="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
  <div class="text-center">
    <div class="grid grid-cols-3 gap-2 mb-4">
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">X</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">O</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">X</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">O</div>
      <div class="w-16 h-16 bg-blue-200 rounded flex items-center justify-center text-2xl font-bold">X</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold"></div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">O</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">X</div>
      <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">O</div>
    </div>
    <div class="text-lg font-bold">Next player: X</div>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Restart Game
    </button>
  </div>
</div>

---
layout: image-right
image: https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop
---

# Project Structure

Organize your React application effectively

## File Organization

```
src/
  components/
    Button.jsx
    Card.jsx
    Header.jsx
  pages/
    Home.jsx
    About.jsx
  hooks/
    useAuth.js
    useApi.js
  utils/
    helpers.js
  App.jsx
  index.jsx
```

## Component Structure

```tsx
// Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary' }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
}): JSX.Element => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

## Best Practices

- **One component per file**
- **Clear component naming**
- **Separate concerns** (UI, logic, styles)
- **Reusable components**
- **Consistent file structure**

::right::

## Project Setup

```bash
# Create new React app
npx create-react-app tic-tac-toe

# Navigate to project
cd tic-tac-toe

# Start development server
npm start
```

<br>

## Development Tools

<div class="bg-green-50 p-4 rounded-lg">
<h4 class="font-bold mb-2">Essential Tools</h4>

- **React DevTools** - Browser extension for debugging
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Vite** - Fast build tool (alternative to CRA)
- **TypeScript** - Type safety (optional)

<br>

<h4 class="font-bold mb-2">Learning Resources</h4>
- 📖 [React Documentation](https://react.dev/learn)
- 🎮 [Tic-tac-toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- 🧪 [React Testing](https://react.dev/learn/testing)
- 📚 [React Patterns](https://www.patterns.dev/posts/react-component-patterns)
</div>

---
layout: center
class: text-center
---

# 11. React Hooks

Modern React state management and side effects

## What are Hooks?

<div class="text-2xl mb-8 font-bold">🪝</div>

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

- **No more classes** - Use state and lifecycle in function components
- **Reusable logic** - Share stateful logic between components
- **Modern React** - The future of React development

## Built-in Hooks

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="text-center">
  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">🎯</div>
  <h3 class="text-lg font-bold">useState</h3>
  <p class="text-sm opacity-75">Manage component state</p>
</div>

<div class="text-center">
  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">⚡</div>
  <h3 class="text-lg font-bold">useEffect</h3>
  <p class="text-sm opacity-75">Side effects & lifecycle</p>
</div>

<div class="text-center">
  <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">🌐</div>
  <h3 class="text-lg font-bold">useContext</h3>
  <p class="text-sm opacity-75">Access context values</p>
</div>

</div>

---
class: text-xs
---

# React Hooks Demo (most ➜ least used)

### useState
```tsx
import { useState } from 'react';

function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### useEffect
```tsx
import { useEffect } from 'react';

useEffect((): (() => void) => {
  const id = setInterval((): void => console.log('tick'), 1000);
  return (): void => clearInterval(id);
}, []);
```

---

### useMemo / useCallback
```tsx
import { useMemo, useCallback } from 'react';

const total = useMemo(() => items.reduce((s, x) => s + x.price, 0), [items]);
const onSelect = useCallback((id: number): void => setSelected(id), [setSelected]);
```

### useRef
```tsx
import { useRef, useEffect } from 'react';

const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => inputRef.current?.focus(), []);
```

### useContext
```tsx
const theme = useContext(ThemeContext);
```

### useReducer
```tsx
import { useReducer } from 'react';

function reducer(c: number, a: 'inc' | 'dec'): number {
  return a === 'inc' ? c + 1 : c - 1;
}
const [count, dispatch] = useReducer(reducer, 0);
```

--- 

### Other hooks (quick refs)
- **useId** → generate stable IDs for accessibility
- **useTransition** → mark state updates as non-urgent
- **useDeferredValue** → defer expensive re-render values
- **useLayoutEffect** → sync after DOM mutations (layout reads)
- **useImperativeHandle** → expose imperative methods to parents
- **useDebugValue** → label values in custom hooks for DevTools
- **useSyncExternalStore** → subscribe to external stores reliably
- **useInsertionEffect** → CSS-in-JS style injection timing

<div class="mt-2 text-[10px] opacity-75">Reference: react.dev/reference/react/hooks</div>

---
layout: two-cols
---

# useEffect Hook

Perform side effects in function components

## Basic useEffect

```tsx
import { useState, useEffect } from 'react';

function Timer(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect((): (() => void) => {
    // Side effect: Update document title
    document.title = `Count: ${count}`;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Effect Dependencies

```tsx
useEffect((): (() => void) => {
  // Runs after every render
}, []);

useEffect((): (() => void) => {
  // Runs only when 'count' changes
}, [count]);

useEffect((): (() => void) => {
  // Runs only when 'userId' changes
}, [userId]);
```

## Cleanup Effects

```tsx
useEffect((): (() => void) => {
  // Set up subscription
  const subscription = subscribeToUserStatus(userId);

  // Cleanup function
  return (): void => {
    subscription.unsubscribe();
  };
}, [userId]);
```

::right::

## Common useEffect Patterns

<div class="bg-gray-800 p-4 rounded-lg">

### 1. **API Calls**
```jsx
useEffect(() => {
  fetchUserData(userId)
    .then(setUser);
}, [userId]);
```

### 2. **Event Listeners**
```jsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### 3. **Timers**
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

<br>

<h4 class="font-bold">Effect Rules</h4>
- Effects run **after** every render
- Use dependencies array to control when effects run
- Always cleanup subscriptions/timers in return function
- Don't put objects/functions in dependencies (use useCallback/useMemo)

</div>

---
layout: two-cols-header
class: text-xs
---

# useEffect: Calling an API

::left::

```tsx
import { useEffect, useState } from 'react';

type User = { id: number; name: string };

function Users(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    async function load(): Promise<void> {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        if ((err as any).name !== 'AbortError') setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ctrl.abort();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

::right::

- **Dependencies** — add to array when fetch depends on props/state (e.g., `userId`)
- **Abort on cleanup** — cancel in-flight requests on unmount or param change
- **Handle loading/error** — show UI states for better UX
- **Idempotent effects** — avoid re-fetching by stabilizing inputs
- **Separate concerns** — extract to `useFetch` custom hook for reuse

<div class="mt-2 text-[10px] opacity-75">Reference: react.dev/reference/react/useEffect</div>

---
layout: image-right
image: https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop
---

# useContext Hook

Access context values without nesting

## Creating Context

```tsx
// ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext<string>('light');
```

## Providing Context

```tsx
// App.jsx
import { ThemeContext } from './ThemeContext';

function App(): JSX.Element {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## Consuming Context

```tsx
// Button.jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button(): JSX.Element {
  const theme = useContext(ThemeContext);

  return (
    <button className={`btn-${theme}`}>
      Themed Button
    </button>
  );
}
```

::right::

## Context with State

<div class="bg-gray-800 p-4 rounded-lg">

```tsx
// UserContext.jsx
import { createContext, useContext } from 'react';

const UserContext = createContext<{
  user: unknown;
  login: (userData: unknown) => void;
  logout: () => void;
} | undefined>(undefined);

export function useUser(): {
  user: unknown;
  login: (userData: unknown) => void;
  logout: () => void;
} {
  return useContext(UserContext)!;
}

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<unknown>(null);

  const login = (userData: unknown): void => {
    setUser(userData);
  };

  const logout = (): void => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
```

## Usage in Components

```tsx
function Profile(): JSX.Element {
  const { user, logout } = useUser();

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

</div>

---
layout: two-cols
---

# Custom Hooks

Extract component logic into reusable functions

## Creating Custom Hooks

```tsx
// useCounter.js
import { useState } from 'react';

export function useCounter(initialValue: number = 0): {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
} {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => setCount(c => c + 1);
  const decrement = (): void => setCount(c => c - 1);
  const reset = (): void => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

## Using Custom Hooks

```tsx
function Counter(): JSX.Element {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
