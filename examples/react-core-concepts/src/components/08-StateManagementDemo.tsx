// 8. State Management - Manage component data that changes over time

import { useState } from 'react';

// Basic useState
function BasicStateDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="state-demo">
      <h4>Basic useState Hook</h4>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
  );
}

// State Updates - Functional Updates
function FunctionalUpdateDemo() {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    // ❌ This won't work as expected (batched updates)
    // setCount(count + 1);
    // setCount(count + 1);

    // ✅ Use functional updates for multiple state changes
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="state-demo">
      <h4>Functional State Updates</h4>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button onClick={incrementTwice}>+2 (Functional Update)</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

// Multiple State Variables
function MultipleStateDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div className="state-demo">
      <h4>Multiple State Variables</h4>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
          placeholder="Age"
          className="form-input"
        />
      </div>
      <div className="state-display">
        <p><strong>Name:</strong> {name || '(empty)'}</p>
        <p><strong>Email:</strong> {email || '(empty)'}</p>
        <p><strong>Age:</strong> {age || 0}</p>
      </div>
    </div>
  );
}

// Object State
function ObjectStateDemo() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  });

  const updateName = (newName: string) => {
    setUser({ ...user, name: newName });
  };

  const updateEmail = (newEmail: string) => {
    setUser({ ...user, email: newEmail });
  };

  return (
    <div className="state-demo">
      <h4>Object State (Spread Operator)</h4>
      <div className="form-group">
        <input
          type="text"
          value={user.name}
          onChange={e => updateName(e.target.value)}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="email"
          value={user.email}
          onChange={e => updateEmail(e.target.value)}
          placeholder="Email"
          className="form-input"
        />
      </div>
      <div className="state-display">
        <p><strong>User Object:</strong></p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

// Array State
function ArrayStateDemo() {
  const [items, setItems] = useState<string[]>(['Apple', 'Banana']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="state-demo">
      <h4>Array State</h4>
      <div className="form-group">
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="form-input"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)} className="remove-btn">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StateManagementDemo() {
  return (
    <section className="demo-section">
      <h2>8. State Management</h2>
      <p className="description">
        Manage component data that changes over time using the useState hook. State allows components to remember information and re-render when it changes.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>State is private to the component and can only be changed by that component</li>
          <li>Use useState hook to declare state variables</li>
          <li>State updates trigger re-renders</li>
          <li>Use functional updates for state that depends on previous state</li>
          <li>Never mutate state directly - always use the setter function</li>
          <li>Use spread operator (...) to update objects and arrays immutably</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Basic useState Hook</h4>
          <div className="output-box">
            <BasicStateDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: Functional State Updates</h4>
          <div className="output-box">
            <FunctionalUpdateDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 3: Multiple State Variables</h4>
          <div className="output-box">
            <MultipleStateDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 4: Object State (Immutable Updates)</h4>
          <div className="output-box">
            <ObjectStateDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 5: Array State</h4>
          <div className="output-box">
            <ArrayStateDemo />
          </div>
        </div>

        <div className="example">
          <h4>State Best Practices:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', border: '2px solid #28a745' }}>
              <h5 style={{ color: '#28a745', marginBottom: '10px' }}>✅ Do</h5>
              <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Keep state as simple as possible</li>
                <li>Use functional updates for async operations</li>
                <li>Group related state together</li>
                <li>Use spread operator for immutable updates</li>
              </ul>
            </div>
            <div style={{ padding: '15px', background: '#f8d7da', borderRadius: '8px', border: '2px solid #dc3545' }}>
              <h5 style={{ color: '#dc3545', marginBottom: '10px' }}>❌ Don't</h5>
              <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Mutate state directly</li>
                <li>Store derived data in state</li>
                <li>Use deep nesting in state objects</li>
                <li>Forget dependencies in useEffect</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StateManagementDemo;
