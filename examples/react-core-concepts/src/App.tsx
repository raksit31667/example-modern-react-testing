import './App.css';
import ComponentsDemo from './components/01-ComponentsDemo';
import JSXDemo from './components/02-JSXDemo';
import StylingDemo from './components/03-StylingDemo';
import PropsDemo from './components/04-PropsDemo';
import ConditionalRenderingDemo from './components/05-ConditionalRenderingDemo';
import RenderingListsDemo from './components/06-RenderingListsDemo';
import SharingDataDemo from './components/07-SharingDataDemo';

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
        <PropsDemo />
        <ConditionalRenderingDemo />
        <RenderingListsDemo />
        <SharingDataDemo />
      </main>
    </div>
  );
}

export default App;
