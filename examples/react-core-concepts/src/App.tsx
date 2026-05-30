import './App.css';
import ComponentsDemo from './components/01-ComponentsDemo';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Core Concepts Demo</h1>
        <p>Interactive demonstrations of fundamental React concepts</p>
      </header>

      <main className="app-main">
        <ComponentsDemo />
      </main>
    </div>
  );
}

export default App;
