// 11. useContext Hook - Global state management

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Create Theme Context
type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

// Theme Provider Component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Components that consume the context
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={`themed-button ${theme}`}
      onClick={toggleTheme}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}

function ThemedCard() {
  const { theme } = useTheme();

  return (
    <div className={`themed-card ${theme}`}>
      <h4>Themed Card</h4>
      <p>This card adapts to the current theme: <strong>{theme}</strong></p>
      <p>No prop drilling needed! 🎉</p>
    </div>
  );
}

function ThemedText() {
  const { theme } = useTheme();

  return (
    <p className={`themed-text ${theme}`}>
      This text also uses the theme context without passing props through intermediate components.
    </p>
  );
}

// Demo App using Context
function ThemeDemo() {
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

function UseContextDemo() {
  return (
    <section className="demo-section">
      <h2>11. useContext Hook</h2>
      <p className="description">
        useContext lets you access context values without prop drilling. Perfect for global state like themes, user auth, or language preferences.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Create context with createContext()</li>
          <li>Wrap components with Provider to share values</li>
          <li>Use useContext() hook to consume context values</li>
          <li>Avoids prop drilling through multiple component levels</li>
          <li>Great for global state (theme, auth, language)</li>
          <li>Custom hooks can encapsulate context logic</li>
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
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>useContext(Context)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Access values anywhere</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          <h4>Benefits vs Prop Drilling:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div style={{ padding: '15px', background: '#f8d7da', borderRadius: '8px', border: '2px solid #dc3545' }}>
              <h5 style={{ color: '#dc3545', marginBottom: '10px' }}>❌ Prop Drilling</h5>
              <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Pass props through every level</li>
                <li>Intermediate components need props</li>
                <li>Hard to maintain and refactor</li>
                <li>Verbose and repetitive code</li>
              </ul>
            </div>
            <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', border: '2px solid #28a745' }}>
              <h5 style={{ color: '#28a745', marginBottom: '10px' }}>✅ useContext</h5>
              <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Direct access to values</li>
                <li>No intermediate props needed</li>
                <li>Easy to maintain and refactor</li>
                <li>Clean and concise code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UseContextDemo;
