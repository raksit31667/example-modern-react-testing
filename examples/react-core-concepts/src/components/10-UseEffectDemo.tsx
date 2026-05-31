// 10. useEffect Hook - Side effects and lifecycle

import { useState, useEffect } from 'react';

// Basic useEffect - Document Title
function DocumentTitleDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="effect-demo">
      <h4>Document Title Update</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p className="hint">Check the browser tab title!</p>
    </div>
  );
}

// useEffect with Cleanup - Timer
function TimerDemo() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="effect-demo">
      <h4>Timer with Cleanup</h4>
      <p className="timer-display">{seconds}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  );
}

// useEffect with API Call
function UsersDemo() {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data.slice(0, 5)); // Only show first 5 users
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, []);

  if (loading) return <div className="effect-demo">Loading users...</div>;
  if (error) return <div className="effect-demo error">Error: {error}</div>;

  return (
    <div className="effect-demo">
      <h4>API Call with useEffect</h4>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function UseEffectDemo() {
  return (
    <section className="demo-section">
      <h2>10. useEffect Hook</h2>
      <p className="description">
        useEffect lets you perform side effects in function components: data fetching, subscriptions, timers, and manual DOM changes.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Effects run after every render by default</li>
          <li>Use dependency array to control when effects run</li>
          <li>Return cleanup function to prevent memory leaks</li>
          <li>Empty dependency array [] runs effect only once (on mount)</li>
          <li>Always cleanup subscriptions, timers, and event listeners</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Document Title (Side Effect)</h4>
          <div className="output-box">
            <DocumentTitleDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: Timer with Cleanup</h4>
          <div className="output-box">
            <TimerDemo />
          </div>
        </div>

        <div className="example">
          <h4>Example 3: API Call on Mount</h4>
          <div className="output-box">
            <UsersDemo />
          </div>
        </div>

        <div className="example">
          <h4>Common useEffect Patterns:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Pattern</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Dependencies</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>When It Runs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect(() ={'>'} {'{}'})</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>No array</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>After every render</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect(() ={'>'} {'{}'}, [])</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Empty array</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Only on mount</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>useEffect(() ={'>'} {'{}'}, [count])</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>With dependencies</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>When count changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UseEffectDemo;
