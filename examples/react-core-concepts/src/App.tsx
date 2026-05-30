import './App.css';
import ComponentsDemo from './components/01-ComponentsDemo';
import JSXDemo from './components/02-JSXDemo';
import StylingDemo from './components/03-StylingDemo';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Core Concepts Demo</h1>
        <p>Interactive demonstrations of fundamental React concepts</p>
      </header>

      <main className="app-main">
        <ComponentsDemo />
        <JSXDemo />
        <StylingDemo />
      </main>
    </div>
  );
}

export default App;
