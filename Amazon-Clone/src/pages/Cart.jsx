import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onSelectProduct
}) {
  
  // Syllabus Topic: for...of loop to calculate total quantity
  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.quantity;
  }

  // Syllabus Topic: for...in loop to calculate subtotal price
  let totalPrice = 0;
  for (const idx in cart) {
    const item = cart[idx];
    totalPrice += item.product.price * item.quantity;
  }
  
  // Free shipping threshold
  const freeShippingThreshold = 49.00;
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const neededForFreeShipping = (freeShippingThreshold - totalPrice).toFixed(2);

  return (
    <div className="cart-page-container container animated-fade-in">
      {totalItems > 0 ? (
        <div className="cart-grid">
          {/* Left Column: Cart List */}
          <section className="cart-list-col" aria-label="Shopping Cart List">
            <div className="cart-list-header">
              <h1>Shopping Cart</h1>
              <span className="price-header-label">Price</span>
            </div>
            
            <div className="cart-items-wrapper">
              {cart.map((item) => {
                const { product, quantity } = item;
                
                return (
                  <div key={product.id} className="cart-item-row">
                    {/* Item Image using Link */}
                    <Link to={`/product/${product.id}`} className="cart-item-img-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <img src={product.image} alt={product.title} />
                    </Link>

                    {/* Item Details */}
                    <div className="cart-item-details">
                      <h2 className="cart-item-title">
                        <Link to={`/product/${product.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          {product.title}
                        </Link>
                      </h2>
                      
                      <div className="cart-item-stock-status">
                        <span className="in-stock-text">In Stock</span>
                      </div>

                      <div className="cart-item-shipping">
                        <span className="prime-icon">✓ prime</span>
                        <span className="shipping-text">Eligible for FREE Shipping</span>
                      </div>

                      {/* Quantity & Delete Action controls */}
                      <div className="cart-item-actions">
                        <div className="qty-picker">
                          <label htmlFor={`qty-select-${product.id}`}>Qty:</label>
                          <select 
                            id={`qty-select-${product.id}`}
                            value={quantity}
                            onChange={(e) => onUpdateCartQty(product.id, Number(e.target.value))}
                            className="qty-dropdown"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <span className="action-divider">|</span>
                        <button 
                          className="cart-delete-btn" 
                          onClick={() => onRemoveFromCart(product.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Item Price */}
                    <div className="cart-item-price-col">
                      <span className="item-price-text">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart footer total */}
            <div className="cart-list-footer">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
              <strong className="footer-total-price">${totalPrice.toFixed(2)}</strong>
            </div>
          </section>

          {/* Right Column: Checkout Widget */}
          <section className="cart-summary-col" aria-label="Shopping Cart Summary">
            {/* Free shipping bar indicator */}
            <div className="shipping-qualify-card">
              {isFreeShipping ? (
                <div className="shipping-qualified">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--success-color)">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div className="shipping-status-text">
                    <p className="status-title">Your order qualifies for FREE Shipping.</p>
                    <p className="status-sub">Choose this option at checkout. See details</p>
                  </div>
                </div>
              ) : (
                <div className="shipping-needed">
                  <div className="shipping-progress-bar">
                    <div className="progress-fill" style={{ width: `${(totalPrice / freeShippingThreshold) * 100}%` }}></div>
                  </div>
                  <p className="needed-text">
                    Add <strong>${neededForFreeShipping}</strong> of eligible items to your order for <strong>FREE Shipping</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Subtotal summary card */}
            <div className="summary-card">
              <div className="summary-price-row">
                <span className="summary-label">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                <span className="summary-price-val">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="gift-check-row">
                <input type="checkbox" id="gift-checkbox" />
                <label htmlFor="gift-checkbox">This order contains a gift</label>
              </div>

              <Link 
                to="/checkout" 
                className="amazon-btn w-full orange text-lg text-center font-bold hover:no-underline"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="empty-cart-card">
          <div className="empty-cart-content">
            <svg viewBox="0 0 24 24" width="80" height="80" fill="currentColor" className="cart-empty-icon">
              <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.44-.83-.44s-.64.16-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.88 1.46h13.08c.88 0 1.65-.62 1.89-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.5L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <div className="empty-cart-text">
              <h2>Your Amazon Cart is empty.</h2>
              <p>Your shopping cart lives to serve. Give it purpose—fill it with electronics, dorm essentials, books, and more.</p>
              <Link 
                to="/" 
                className="amazon-btn orange inline-block hover:no-underline"
              >
                Shop College Deals
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Styled styles for Cart */}
      <style>{`
        .cart-page-container {
          padding-top: 30px;
          padding-bottom: 60px;
          text-align: left;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 75% 25%;
          gap: 20px;
          align-items: start;
        }

        /* Cart List Section */
        .cart-list-col {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 24px;
        }
        .cart-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 12px;
        }
        .cart-list-header h1 {
          font-size: 26px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }
        .price-header-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .cart-items-wrapper {
          display: flex;
          flex-direction: column;
        }
        .cart-item-row {
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
          gap: 20px;
        }
        .cart-item-img-wrapper {
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          padding: 8px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
        }
        .cart-item-img-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-item-title a {
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 6px;
          color: var(--text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-item-title a:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }
        .cart-item-stock-status {
          font-size: 12px;
          color: var(--success-color);
          font-weight: 600;
          margin-bottom: 4px;
        }
        .cart-item-shipping {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .prime-icon {
          color: #00a8e1;
          font-weight: 800;
          font-style: italic;
        }
        .shipping-text {
          color: var(--text-secondary);
        }

        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          margin-top: auto;
        }
        .qty-picker {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .action-divider {
          color: var(--border-color);
        }
        .cart-delete-btn {
          background: none;
          border: none;
          color: var(--text-link);
          cursor: pointer;
          padding: 4px;
        }
        .cart-delete-btn:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }

        .cart-item-price-col {
          text-align: right;
          width: 80px;
        }
        .item-price-text {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cart-list-footer {
          text-align: right;
          padding-top: 16px;
          font-size: 16px;
          color: var(--text-primary);
        }
        .footer-total-price {
          font-size: 20px;
          margin-left: 6px;
        }

        /* Cart Summary Column */
        .cart-summary-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* Shipping Qualify card */
        .shipping-qualify-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 16px;
        }
        .shipping-qualified {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .shipping-status-text {
          font-size: 12px;
        }
        .status-title {
          color: var(--success-color);
          font-weight: 600;
        }
        .status-sub {
          color: var(--text-secondary);
        }
        
        .shipping-needed {
          font-size: 12px;
        }
        .shipping-progress-bar {
          height: 8px;
          background-color: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-fill {
          height: 100%;
          background-color: var(--amazon-orange-hover);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .needed-text {
          color: var(--text-primary);
          line-height: 1.4;
        }

        /* Summary card details */
        .summary-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 20px;
        }
        .summary-price-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .summary-price-val {
          font-size: 20px;
          font-weight: 700;
        }
        .gift-check-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .text-lg {
          font-size: 16px;
          padding: 12px;
        }

        /* Empty Cart State styling */
        .empty-cart-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 40px;
        }
        .empty-cart-content {
          display: flex;
          align-items: center;
          gap: 30px;
          max-width: 700px;
          margin: 0 auto;
        }
        .cart-empty-icon {
          color: var(--text-secondary);
          opacity: 0.5;
        }
        .empty-cart-text h2 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .empty-cart-text p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        /* Responsiveness settings */
        @media (max-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cart-item-row {
            flex-direction: column;
            gap: 12px;
          }
          .cart-item-img-wrapper {
            width: 100px;
            height: 100px;
          }
          .cart-item-price-col {
            text-align: left;
            width: 100%;
          }
          .empty-cart-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
