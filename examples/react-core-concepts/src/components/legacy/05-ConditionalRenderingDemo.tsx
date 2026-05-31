// 5. Conditional Rendering - CLASS COMPONENT VERSION

import React, { Component } from 'react';

// If Statements
function UserStatusIf({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

// Ternary Operator
function UserStatusTernary({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <h1>
      {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
    </h1>
  );
}

// Logical AND Operator
function Mailbox({ unreadMessages }: { unreadMessages: string[] }) {
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

// Conditional Classes
function ButtonConditional({ isActive }: { isActive: boolean }) {
  return (
    <button className={`btn ${isActive ? 'active' : ''}`}>
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}

// Switch Statements
function StatusMessage({ status }: { status: 'loading' | 'success' | 'error' | 'idle' }) {
  switch (status) {
    case 'loading':
      return <div className="status-loading">Loading...</div>;
    case 'success':
      return <div className="status-success">Success!</div>;
    case 'error':
      return <div className="status-error">Error occurred</div>;
    default:
      return <div className="status-idle">Ready</div>;
  }
}

type State = {
  isLoggedIn: boolean;
  messages: string[];
  isButtonActive: boolean;
  status: 'loading' | 'success' | 'error' | 'idle';
};

class ConditionalRenderingDemo extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      isLoggedIn: false,
      messages: ['Message 1', 'Message 2', 'Message 3'],
      isButtonActive: false,
      status: 'idle'
    };
  }

  toggleLogin = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

  toggleButtonState = () => {
    this.setState({ isButtonActive: !this.state.isButtonActive });
  };

  setStatus = (status: 'loading' | 'success' | 'error' | 'idle') => {
    this.setState({ status });
  };

  render() {
    const { isLoggedIn, messages, isButtonActive, status } = this.state;

    return (
      <section className="demo-section">
        <h2>5. Conditional Rendering (Class Component)</h2>
        <p className="description">
          Show different content based on conditions using if statements, ternary operators, logical AND, and switch statements.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>Use if statements for simple true/false conditions</li>
            <li>Ternary operators for inline conditional rendering</li>
            <li>Logical AND (&&) to conditionally show elements</li>
            <li>Switch statements for multiple conditions</li>
            <li>Conditional classes to change styling based on state</li>
          </ul>
          
          <div className="example">
            <h4>Example 1: If Statement</h4>
            <div className="output-box">
              <UserStatusIf isLoggedIn={isLoggedIn} />
              <button onClick={this.toggleLogin}>
                Toggle Login Status
              </button>
            </div>
          </div>

          <div className="example">
            <h4>Example 2: Ternary Operator</h4>
            <div className="output-box">
              <UserStatusTernary isLoggedIn={isLoggedIn} />
            </div>
          </div>

          <div className="example">
            <h4>Example 3: Logical AND Operator</h4>
            <div className="output-box">
              <Mailbox unreadMessages={messages} />
            </div>
          </div>

          <div className="example">
            <h4>Example 4: Conditional Classes</h4>
            <div className="output-box">
              <ButtonConditional isActive={isButtonActive} />
              <button onClick={this.toggleButtonState} style={{ marginLeft: '10px' }}>
                Toggle Button State
              </button>
            </div>
          </div>

          <div className="example">
            <h4>Example 5: Switch Statement</h4>
            <div className="output-box">
              <StatusMessage status={status} />
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => this.setStatus('loading')}>Loading</button>
                <button onClick={() => this.setStatus('success')} style={{ marginLeft: '5px' }}>Success</button>
                <button onClick={() => this.setStatus('error')} style={{ marginLeft: '5px' }}>Error</button>
                <button onClick={() => this.setStatus('idle')} style={{ marginLeft: '5px' }}>Idle</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ConditionalRenderingDemo;
