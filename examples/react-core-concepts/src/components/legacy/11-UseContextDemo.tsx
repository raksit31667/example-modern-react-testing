// 11. Context API - CLASS COMPONENT VERSION (Context.Consumer pattern)

import React, { Component, createContext } from 'react';
import type { ReactNode } from 'react';

// Create Theme Context
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// Theme Provider Component (Class-based)
class ThemeProvider extends Component<{ children: ReactNode }, { theme: Theme }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      theme: 'light'
    };
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  render() {
    const value: ThemeContextType = {
      theme: this.state.theme,
      toggleTheme: this.toggleTheme
    };

    return (
      <ThemeContext.Provider value={value}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

// Components that consume the context using Context.Consumer
class ThemedButton extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button 
            className={`themed-button ${theme}`}
            onClick={toggleTheme}
          >
            Toggle Theme (Current: {theme})
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ThemedCard extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`themed-card ${theme}`}>
            <h4>Themed Card</h4>
            <p>This card adapts to the current theme: <strong>{theme}</strong></p>
            <p>No prop drilling needed! 🎉</p>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ThemedText extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <p className={`themed-text ${theme}`}>
            This text also uses the theme context without passing props through intermediate components.
          </p>
        )}
      </ThemeContext.Consumer>
    );
  }
}

// Demo App using Context
class ThemeDemo extends Component {
  render() {
    return (
      <ThemeProvider>
        <div className="theme-demo-container">
          <ThemedButton />
          <ThemedCard />
          <ThemedText />
        </div>
      </ThemeProvider>
    );
  }
}

class ContextDemo extends Component {
  render() {
    return (
      <section className="demo-section">
        <h2>11. Context API (Class Component)</h2>
        <p className="description">
          Class components use Context.Consumer to access context values without prop drilling. Perfect for global state like themes, user auth, or language preferences.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>Create context with createContext()</li>
            <li>Wrap components with Provider to share values</li>
            <li>Use Context.Consumer render prop pattern to consume context values</li>
            <li>Avoids prop drilling through multiple component levels</li>
            <li>Great for global state (theme, auth, language)</li>
            <li>Provider can be a class component managing state</li>
          </ul>
          
          <div className="example">
            <h4>Example: Theme Context (No Prop Drilling)</h4>
            <div className="output-box">
              <ThemeDemo />
            </div>
          </div>

          <div className="example">
            <h4>How It Works:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Step</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Code</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>1. Create</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>createContext()</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Define the context</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>2. Provide</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Context.Provider value={'{...}'}&gt;</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Share values to children</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>3. Consume</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>&lt;Context.Consumer&gt;</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Access values with render prop</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="example">
            <h4>Context.Consumer vs useContext:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
              <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '8px', border: '2px solid #ff9800' }}>
                <h5 style={{ color: '#ff9800', marginBottom: '10px' }}>Context.Consumer (Class)</h5>
                <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Uses render prop pattern</li>
                  <li>More verbose syntax</li>
                  <li>Works with class components</li>
                  <li>Can nest multiple consumers</li>
                </ul>
              </div>
              <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', border: '2px solid #28a745' }}>
                <h5 style={{ color: '#28a745', marginBottom: '10px' }}>useContext (Hooks)</h5>
                <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Direct value access</li>
                  <li>Cleaner, more concise</li>
                  <li>Only works with function components</li>
                  <li>Modern React approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContextDemo;
