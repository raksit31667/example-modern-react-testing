// 3. Adding Styles - Multiple ways to style React components

import styles from './StylingDemo.module.css';

// Inline Styles
function InlineStyleComponent() {
  const componentStyles = {
    color: 'blue',
    fontSize: '20px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#e3f2fd',
    border: '2px solid #2196f3'
  };

  return <div style={componentStyles}>Styled with Inline Styles</div>;
}

// CSS Classes
function CSSClassComponent() {
  return (
    <div className="styled-card">
      <h2 className="styled-card-title">CSS Classes</h2>
      <p className="styled-card-content">This component uses regular CSS classes</p>
    </div>
  );
}

// CSS Modules
function CSSModuleComponent() {
  return (
    <div className={styles.moduleCard}>
      <h2 className={styles.moduleTitle}>CSS Modules</h2>
      <p className={styles.moduleContent}>This component uses CSS Modules for scoped styling</p>
    </div>
  );
}

function StylingDemo() {
  return (
    <section className="demo-section">
      <h2>3. Adding Styles</h2>
      <p className="description">
        React provides multiple ways to style components: inline styles, CSS classes, and CSS Modules.
      </p>
      
      <div className="demo-box">
        <h3>Key Points:</h3>
        <ul>
          <li>Inline styles use JavaScript objects with camelCase properties</li>
          <li>CSS classes use className instead of class</li>
          <li>CSS Modules provide scoped styling and prevent naming conflicts</li>
          <li>CSS Modules support tree shaking (unused styles are removed)</li>
        </ul>
        
        <div className="example">
          <h4>Example 1: Inline Styles</h4>
          <div className="output-box">
            <InlineStyleComponent />
          </div>
        </div>

        <div className="example">
          <h4>Example 2: CSS Classes</h4>
          <div className="output-box">
            <CSSClassComponent />
          </div>
        </div>

        <div className="example">
          <h4>Example 3: CSS Modules</h4>
          <div className="output-box">
            <CSSModuleComponent />
          </div>
        </div>

        <div className="example">
          <h4>CSS vs CSS Modules Comparison:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Aspect</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>CSS</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>CSS Modules</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Import</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>import './Card.css'</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>import styles from './Card.module.css'</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Usage</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>className="card"</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>className={'{styles.card}'}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Naming Conflicts</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>No (Global scope)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Yes (Local scope)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Tree Shaking</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>No</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default StylingDemo;
