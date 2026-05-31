// 9. Sharing Data Between Components - CLASS COMPONENT VERSION

import React, { Component } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

// Child component - receives cart data via props
function ProductCard({
  product,
  onAddToCart
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

// Child component - displays cart data
function CartDisplay({
  cart,
  total
}: {
  cart: Product[];
  total: number;
}) {
  return (
    <div className="cart-display">
      <h3>Shopping Cart ({cart.length} items)</h3>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={`${item.id}-${index}`} className="cart-item">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}

// Parent component - manages shared state
class EcommerceApp extends Component<Record<string, never>, { cart: Product[] }> {
  products: Product[] = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
  ];

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cart: []
    };
  }

  addToCart = (product: Product) => {
    this.setState({
      cart: [...this.state.cart, product]
    });
  };

  render() {
    const total = this.state.cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="ecommerce-app">
        <div className="products-grid">
          {this.products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={this.addToCart}
            />
          ))}
        </div>
        <CartDisplay cart={this.state.cart} total={total} />
      </div>
    );
  }
}

class SharingDataDemo extends Component {
  render() {
    return (
      <section className="demo-section">
        <h2>9. Sharing Data Between Components (Class Component)</h2>
        <p className="description">
          When sibling components need to share data, lift the state up to their common parent component.
        </p>
        
        <div className="demo-box">
          <h3>Key Points:</h3>
          <ul>
            <li>Lift state up to the closest common ancestor</li>
            <li>Parent manages the state with this.state and this.setState()</li>
            <li>Children receive data via props</li>
            <li>Children communicate with parent through callback props</li>
            <li>This pattern enables data sharing between siblings</li>
            <li>Single source of truth for shared data</li>
          </ul>
          
          <div className="example">
            <h4>Example: E-commerce Cart (Lifting State Up)</h4>
            <div className="output-box">
              <EcommerceApp />
            </div>
          </div>

          <div className="example">
            <h4>How It Works:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Component</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Data Flow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Parent (EcommerceApp)</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Manages cart state</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Owns cart data, passes down props</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Child (ProductCard)</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Displays product</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Receives onAddToCart callback</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Child (CartDisplay)</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Shows cart</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Receives cart data as props</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default SharingDataDemo;
