// 6. Rendering Lists

import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// Basic List Rendering
function ProductList({ products }: { products: Product[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {products.map(product => (
        <li key={product.id} style={{ 
          padding: '10px', 
          margin: '5px 0', 
          background: '#f0f0f0', 
          borderRadius: '5px' 
        }}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
}

// List with Complex JSX
function TodoList({ todos, onToggle }: { 
  todos: Todo[]; 
  onToggle: (id: number) => void;
}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RenderingListsDemo() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 299 },
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ]);

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <section className="demo-section">
      <h2>6. Rendering Lists</h2>
      <p className="description">
        Display arrays of data in React using the map() function. Each list item must have a unique key prop.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Use map() to transform arrays into JSX elements</li>
          <li>Each list item must have a unique key prop</li>
          <li>Keys help React identify which items have changed</li>
          <li>Use stable IDs (not array index) for keys when possible</li>
          <li>Keys must be unique among siblings</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Basic List Rendering</h4>
          <div className="output-box">
            <h3>Products</h3>
            <ProductList products={products} />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: Interactive Todo List</h4>
          <div className="output-box">
            <h3>My Todos</h3>
            <TodoList todos={todos} onToggle={handleToggleTodo} />
          </div>
        </div>

        <div className="example">
          <h4>Why Keys Matter:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Approach</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Example</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Issue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>❌ No Key</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;li&gt;{'{item.name}'}&lt;/li&gt;</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>React warning, poor performance</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>⚠️ Index as Key</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;li key={'{index}'}&gt;</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Issues with reordering/filtering</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>✅ Unique ID</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;li key={'{item.id}'}&gt;</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Best practice, stable identity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default RenderingListsDemo;
