// 7. Event Handling - Respond to user interactions

import { useState } from 'react';

// Basic Event Handler
function BasicEventDemo() {
  function handleClick() {
    alert('Button clicked!');
  }

  return (
    <div className="event-demo">
      <h4>Basic Event Handler</h4>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

// Event Handler with Parameters
function ParameterEventDemo() {
  function handleClick(message: string) {
    alert(message);
  }

  return (
    <div className="event-demo">
      <h4>Event Handler with Parameters</h4>
      <button onClick={() => handleClick('Hello from parameter!')}>
        Show Message
      </button>
    </div>
  );
}

// Arrow Function Handlers with State
function CounterEventDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="event-demo">
      <h4>Arrow Function Handlers</h4>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

// Form Event with preventDefault
function FormEventDemo() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div className="event-demo">
      <h4>Form Event (preventDefault)</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="form-input"
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p className="success-message">Form submitted! Name: {name}</p>}
    </div>
  );
}

// Multiple Event Types
function MultipleEventsDemo() {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (eventType: string) => {
    setEvents([...events, `${eventType} at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="event-demo">
      <h4>Multiple Event Types</h4>
      <div className="event-buttons">
        <button onClick={() => addEvent('Click')}>Click</button>
        <button onDoubleClick={() => addEvent('Double Click')}>Double Click</button>
        <input
          type="text"
          onFocus={() => addEvent('Focus')}
          onBlur={() => addEvent('Blur')}
          placeholder="Focus/Blur me"
          className="form-input"
        />
      </div>
      <div className="event-log">
        <h5>Event Log:</h5>
        <ul>
          {events.slice(-5).map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EventHandlingDemo() {
  return (
    <section className="demo-section">
      <h2>7. Event Handling</h2>
      <p className="description">
        Respond to user interactions like clicks, form submissions, and keyboard events. Event handlers let you make your components interactive.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Use camelCase for event names (onClick, onChange, onSubmit)</li>
          <li>Pass functions, not function calls (onClick={'{handleClick}'} not onClick={'{handleClick()'})</li>
          <li>Use arrow functions for inline handlers or handlers with parameters</li>
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

export default EventHandlingDemo;
