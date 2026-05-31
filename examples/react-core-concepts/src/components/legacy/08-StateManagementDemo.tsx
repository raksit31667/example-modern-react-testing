// 8. State Management - CLASS COMPONENT VERSION

import React, { Component } from 'react';

// Basic State
class BasicStateDemo extends Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div className="state-demo">
        <h4>Basic State with this.state</h4>
        <p className="count-display">Count: {this.state.count}</p>
        <div className="button-group">
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
          <button onClick={() => this.setState({ count: this.state.count - 1 })}>Decrement</button>
        </div>
      </div>
    );
  }
}

// State Updates - Functional Updates
class FunctionalUpdateDemo extends Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { count: 0 };
  }

  incrementTwice = () => {
    // ✅ Use functional updates for multiple state changes
    this.setState(prevState => ({ count: prevState.count + 1 }));
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div className="state-demo">
        <h4>Functional State Updates</h4>
        <p className="count-display">Count: {this.state.count}</p>
        <div className="button-group">
          <button onClick={() => this.setState(prevState => ({ count: prevState.count + 1 }))}>+1</button>
          <button onClick={this.incrementTwice}>+2 (Functional Update)</button>
          <button onClick={() => this.setState({ count: 0 })}>Reset</button>
        </div>
      </div>
    );
  }
}

// Multiple State Variables
class MultipleStateDemo extends Component<Record<string, never>, { name: string; email: string; age: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: 0
    };
  }

  render() {
    return (
      <div className="state-demo">
        <h4>Multiple State Variables</h4>
        <div className="form-group">
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            className="form-input"
          />
          <input
            type="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email"
            className="form-input"
          />
          <input
            type="number"
            value={this.state.age}
            onChange={e => this.setState({ age: Number(e.target.value) })}
            placeholder="Age"
            className="form-input"
          />
        </div>
        <div className="state-display">
          <p><strong>Name:</strong> {this.state.name || '(empty)'}</p>
          <p><strong>Email:</strong> {this.state.email || '(empty)'}</p>
          <p><strong>Age:</strong> {this.state.age || 0}</p>
        </div>
      </div>
    );
  }
}

// Object State
class ObjectStateDemo extends Component<Record<string, never>, { user: { name: string; email: string; age: number } }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      }
    };
  }

  updateName = (newName: string) => {
    this.setState({
      user: { ...this.state.user, name: newName }
    });
  };

  updateEmail = (newEmail: string) => {
    this.setState({
      user: { ...this.state.user, email: newEmail }
    });
  };

  render() {
    return (
      <div className="state-demo">
        <h4>Object State (Spread Operator)</h4>
        <div className="form-group">
          <input
            type="text"
            value={this.state.user.name}
            onChange={e => this.updateName(e.target.value)}
            placeholder="Name"
            className="form-input"
          />
          <input
            type="email"
            value={this.state.user.email}
            onChange={e => this.updateEmail(e.target.value)}
            placeholder="Email"
            className="form-input"
          />
        </div>
        <div className="state-display">
          <p><strong>User Object:</strong></p>
          <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

// Array State
class ArrayStateDemo extends Component<Record<string, never>, { items: string[]; newItem: string }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: ['Apple', 'Banana'],
      newItem: ''
    };
  }

  addItem = () => {
    if (this.state.newItem.trim()) {
      this.setState({
        items: [...this.state.items, this.state.newItem],
        newItem: ''
      });
    }
  };

  removeItem = (index: number) => {
    this.setState({
      items: this.state.items.filter((_, i) => i !== index)
    });
  };

  render() {
    return (
      <div className="state-demo">
        <h4>Array State</h4>
        <div className="form-group">
          <input
            type="text"
            value={this.state.newItem}
            onChange={e => this.setState({ newItem: e.target.value })}
            placeholder="Add new item"
            className="form-input"
          />
          <button onClick={this.addItem}>Add</button>
        </div>
        <ul className="items-list">
          {this.state.items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => this.removeItem(index)} className="remove-btn">×</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class StateManagementDemo extends Component {
  render() {
    return (
      <section className="demo-section">
        <h2>8. State Management (Class Component)</h2>
        <p className="description">
          Manage component data that changes over time using this.state and this.setState(). State allows components to remember information and re-render when it changes.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>State is initialized in the constructor with this.state</li>
            <li>Use this.setState() to update state (never mutate this.state directly)</li>
            <li>setState() triggers re-renders</li>
            <li>Use functional updates for state that depends on previous state</li>
            <li>setState() merges updates (doesn't replace entire state object)</li>
            <li>Use spread operator (...) to update nested objects and arrays immutably</li>
          </ul>
          
          <div className="example">
            <h4>Example 1: Basic State with this.state</h4>
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
                  <li>Use this.setState() to update state</li>
                  <li>Use functional updates for async operations</li>
                  <li>Initialize state in constructor</li>
                  <li>Use spread operator for immutable updates</li>
                </ul>
              </div>
              <div style={{ padding: '15px', background: '#f8d7da', borderRadius: '8px', border: '2px solid #dc3545' }}>
                <h5 style={{ color: '#dc3545', marginBottom: '10px' }}>❌ Don't</h5>
                <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Mutate this.state directly</li>
                  <li>Store derived data in state</li>
                  <li>Use deep nesting in state objects</li>
                  <li>Forget to bind methods (use arrow functions)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default StateManagementDemo;
