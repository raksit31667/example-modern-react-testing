// 4. Displaying Data - Props

// Props Basics
function GreetingBasic({ name, age }: { name: string; age: number }) {
  return (
    <div className="greeting-card">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Default Props
function GreetingDefault({ name = "Guest", age }: { name?: string; age?: number }) {
  return (
    <div className="greeting-card">
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
}

// Different Prop Types
function PropTypesExample({
  text,
  count,
  isVisible,
  items,
  user,
  onClick
}: {
  text: string;
  count: number;
  isVisible: boolean;
  items: number[];
  user: { name: string };
  onClick: () => void;
}) {
  return (
    <div className="prop-types-card">
      <p><strong>String:</strong> {text}</p>
      <p><strong>Number:</strong> {count}</p>
      <p><strong>Boolean:</strong> {isVisible ? 'Visible' : 'Hidden'}</p>
      <p><strong>Array:</strong> {items.join(', ')}</p>
      <p><strong>Object:</strong> {user.name}</p>
      <button onClick={onClick}>Function Prop</button>
    </div>
  );
}

function PropsDemo() {
  const handleClick = () => {
    alert('Function prop clicked!');
  };

  return (
    <section className="demo-section">
      <h2>4. Displaying Data (Props)</h2>
      <p className="description">
        Props allow you to pass data from parent to child components. They are read-only and help make components reusable.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Props pass data from parent to child components</li>
          <li>Props are read-only (immutable)</li>
          <li>Use destructuring for cleaner code</li>
          <li>Props can be any JavaScript type: strings, numbers, booleans, arrays, objects, functions</li>
          <li>Default props provide fallback values</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Basic Props</h4>
          <div className="output-box">
            <GreetingBasic name="Alice" age={25} />
            <GreetingBasic name="Bob" age={30} />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: Default Props</h4>
          <div className="output-box">
            <GreetingDefault name="Charlie" age={35} />
            <GreetingDefault /> {/* Uses default "Guest" */}
          </div>
        </div>

        <div className="example">
          <h4>Example 3: Different Prop Types</h4>
          <div className="output-box">
            <PropTypesExample
              text="Hello World"
              count={42}
              isVisible={true}
              items={[1, 2, 3, 4, 5]}
              user={{ name: "John Doe" }}
              onClick={handleClick}
            />
          </div>
        </div>

        <div className="example">
          <h4>Common Prop Patterns:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Type</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>String</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component text="Hello" /&gt;</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Number</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component count={'{5}'} /&gt;</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Boolean</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component isVisible={'{true}'} /&gt;</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Array</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component items={'{[1,2,3]}'} /&gt;</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Object</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component user={'{{name: "John"}}'} /&gt;</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Function</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Component onClick={'{handleClick}'} /&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PropsDemo;
