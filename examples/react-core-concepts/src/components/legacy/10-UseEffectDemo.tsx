// 10. Lifecycle Methods - CLASS COMPONENT VERSION (replaces useEffect)

import React, { Component } from 'react';

// Document Title with componentDidUpdate
class DocumentTitleDemo extends Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <div className="effect-demo">
        <h4>Document Title Update (componentDidUpdate)</h4>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
        <p className="hint">Check the browser tab title!</p>
      </div>
    );
  }
}

// Timer with componentDidMount and componentWillUnmount
class TimerDemo extends Component<Record<string, never>, { seconds: number; isRunning: boolean }> {
  private timer?: ReturnType<typeof setInterval>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { seconds: 0, isRunning: false };
  }

  componentDidUpdate(_prevProps: Record<string, never>, prevState: { seconds: number; isRunning: boolean }) {
    if (this.state.isRunning && !prevState.isRunning) {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);
    } else if (!this.state.isRunning && prevState.isRunning) {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="effect-demo">
        <h4>Timer with Cleanup (componentWillUnmount)</h4>
        <p className="timer-display">{this.state.seconds}s</p>
        <button onClick={() => this.setState({ isRunning: !this.state.isRunning })}>
          {this.state.isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => this.setState({ seconds: 0 })} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>
    );
  }
}

// API Call with componentDidMount
class UsersDemo extends Component<Record<string, never>, { 
  users: Array<{ id: number; name: string }>; 
  loading: boolean; 
  error: string | null 
}> {
  private abortController?: AbortController;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    this.abortController = new AbortController();
    
    try {
      this.setState({ loading: true, error: null });
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: this.abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      this.setState({ users: data.slice(0, 5), loading: false });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        this.setState({ error: (err as Error).message, loading: false });
      }
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  render() {
    if (this.state.loading) return <div className="effect-demo">Loading users...</div>;
    if (this.state.error) return <div className="effect-demo error">Error: {this.state.error}</div>;

    return (
      <div className="effect-demo">
        <h4>API Call (componentDidMount)</h4>
        <ul className="users-list">
          {this.state.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class LifecycleDemo extends Component {
  render() {
    return (
      <section className="demo-section">
        <h2>10. Lifecycle Methods (Class Component)</h2>
        <p className="description">
          Class components use lifecycle methods instead of useEffect: componentDidMount, componentDidUpdate, and componentWillUnmount.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>componentDidMount() runs once after component mounts (like useEffect with [])</li>
            <li>componentDidUpdate() runs after every update (like useEffect without dependencies)</li>
            <li>componentWillUnmount() runs before component unmounts (cleanup function)</li>
            <li>Always cleanup timers and subscriptions in componentWillUnmount</li>
            <li>Use componentDidUpdate with prevProps/prevState to control when effects run</li>
          </ul>
          
          <div className="example">
            <h4>Example 1: Document Title (componentDidUpdate)</h4>
            <div className="output-box">
              <DocumentTitleDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 2: Timer with Cleanup (componentWillUnmount)</h4>
            <div className="output-box">
              <TimerDemo />
            </div>
          </div>

          <div className="example">
            <h4>Example 3: API Call (componentDidMount)</h4>
            <div className="output-box">
              <UsersDemo />
            </div>
          </div>

          <div className="example">
            <h4>Lifecycle Methods vs useEffect:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Lifecycle Method</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect Equivalent</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>When It Runs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>componentDidMount()</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect(() ={'>'} {'{}'}, [])</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Only on mount</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>componentDidUpdate()</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect(() ={'>'} {'{}'})</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>After every update</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>componentWillUnmount()</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect cleanup function</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Before unmount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default LifecycleDemo;
