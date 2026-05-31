// 7. Event Handling - CLASS COMPONENT VERSION

import React, { Component } from 'react';

// Basic Event Handler
class BasicEventDemo extends Component {
  handleClick = () => {
    alert('Button clicked!');
  };

  render() {
    return (
      <div className="event-demo">
        <h4>Basic Event Handler</h4>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

// Event Handler with Parameters
class ParameterEventDemo extends Component {
  handleClick = (message: string) => {
    alert(message);
  };

  render() {
    return (
      <div className="event-demo">
        <h4>Event Handler with Parameters</h4>
        <button onClick={() => this.handleClick('Hello from parameter!')}>
          Show Message
        </button>
      </div>
    );
  }
}

// Arrow Function Handlers with State
class CounterEventDemo extends Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div className="event-demo">
        <h4>Arrow Function Handlers</h4>
        <p className="count-display">Count: {this.state.count}</p>
        <div className="button-group">
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
          <button onClick={() => this.setState({ count: this.state.count - 1 })}>Decrement</button>
          <button onClick={() => this.setState({ count: 0 })}>Reset</button>
        </div>
      </div>
    );
  }
}

// Form Event with preventDefault
class FormEventDemo extends Component<Record<string, never>, { name: string; submitted: boolean }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { name: '', submitted: false };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ submitted: true });
    setTimeout(() => this.setState({ submitted: false }), 2000);
  };

  render() {
    return (
      <div className="event-demo">
        <h4>Form Event (preventDefault)</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="Enter your name"
            className="form-input"
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.submitted && <p className="success-message">Form submitted! Name: {this.state.name}</p>}
      </div>
    );
  }
}

// Multiple Event Types
class MultipleEventsDemo extends Component<Record<string, never>, { events: string[] }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { events: [] };
  }

  addEvent = (eventType: string) => {
    this.setState({
      events: [...this.state.events, `${eventType} at ${new Date().toLocaleTimeString()}`]
    });
  };

  render() {
    return (
      <div className="event-demo">
        <h4>Multiple Event Types</h4>
        <div className="event-buttons">
          <button onClick={() => this.addEvent('Click')}>Click</button>
          <button onDoubleClick={() => this.addEvent('Double Click')}>Double Click</button>
          <input
            type="text"
            onFocus={() => this.addEvent('Focus')}
            onBlur={() => this.addEvent('Blur')}
            placeholder="Focus/Blur me"
            className="form-input"
          />
        </div>
        <div className="event-log">
          <h5>Event Log:</h5>
          <ul>
            {this.state.events.slice(-5).map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class EventHandlingDemo extends Component {
  render() {
    return (
      <section className="demo-section">
        <h2>7. Event Handling (Class Component)</h2>
        <p className="description">
          Respond to user interactions like clicks, form submissions, and keyboard events. Event handlers let you make your components interactive.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>Use camelCase for event names (onClick, onChange, onSubmit)</li>
            <li>Pass functions, not function calls (onClick={'{this.handleClick}'} not onClick={'{this.handleClick()'})</li>
            <li>Use arrow functions for class methods to bind 'this' automatically</li>
            <li>Use event.preventDefault() to prevent default browser behavior</li>
            <li>Event handlers receive the event object as first parameter</li>
          </ul>
          
          <div className="example">
            <h4>Example 1: Basic Event Handler</h4>
            <div className="output-box">
              <BasicEventDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 2: Event Handler with Parameters</h4>
            <div className="output-box">
              <ParameterEventDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 3: Arrow Function Handlers with State</h4>
            <div className="output-box">
              <CounterEventDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 4: Form Event (preventDefault)</h4>
            <div className="output-box">
              <FormEventDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 5: Multiple Event Types</h4>
            <div className="output-box">
              <MultipleEventsDemo />
            </div>
          </div>

          <div className="example">
            <h4>Common Events:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Event</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Common Elements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>onClick</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>User clicks element</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>buttons, links, divs</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>onChange</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Input value changes</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>input, textarea, select</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>onSubmit</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Form submission</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>form</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>onFocus / onBlur</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Element gains/loses focus</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>input, textarea</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default EventHandlingDemo;
