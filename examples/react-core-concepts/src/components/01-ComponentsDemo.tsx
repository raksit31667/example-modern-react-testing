// 1. Creating Components - Function Components and Nesting

// Basic function component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Greeting = () => {
  return <p>Welcome to React!</p>;
};

// Nesting components
function ComponentsDemo() {
  return (
    <section className="demo-section">
      <h2>1. Creating Components</h2>
      <p className="description">
        Components are the building blocks of React applications. They are JavaScript functions that return JSX.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Components are JavaScript functions</li>
          <li>They return JSX (React elements)</li>
          <li>Component names must be capitalized</li>
          <li>Components can be nested inside each other</li>
        </ul>
        
        <div className="example">
          <h4>Example Output:</h4>
          <div className="output-box">
            <Welcome />
            <Greeting />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComponentsDemo;
