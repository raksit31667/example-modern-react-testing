// 2. JSX - JavaScript + XML

function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>Card Description</p>
    </div>
  );
}

function GreetingWithProps({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <img
        src="https://via.placeholder.com/150"
        alt="Profile picture"
        className="avatar"
      />
      <p>Bio information...</p>
    </>
  );
}

function JSXDemo() {
  return (
    <section className="demo-section">
      <h2>2. JSX - JavaScript + XML</h2>
      <p className="description">
        JSX allows you to write HTML-like syntax in JavaScript. It must have one root element and supports embedding JavaScript expressions.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>JSX expressions must have one root element</li>
          <li>Use curly braces {'{}'} to embed JavaScript</li>
          <li>Use className instead of class</li>
          <li>Use camelCase for event handlers (onClick, onChange)</li>
          <li>Use fragments {'<>'} when you don't want extra wrapper elements</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Basic JSX with className</h4>
          <div className="output-box">
            <Card />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: Embedding JavaScript</h4>
          <div className="output-box">
            <GreetingWithProps name="Alice" age={25} />
          </div>
        </div>

        <div className="example">
          <h4>Example 3: Using Fragments</h4>
          <div className="output-box">
            <Profile />
          </div>
        </div>

        <div className="example">
          <h4>HTML vs JSX Differences:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>HTML</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>JSX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>class</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>className</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>onclick</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>onClick</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>for (label)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>htmlFor</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>All lowercase</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>camelCase for events</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default JSXDemo;
