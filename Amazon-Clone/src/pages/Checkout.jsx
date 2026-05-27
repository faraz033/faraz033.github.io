import React, { useState } from 'react';

export default function Checkout({ cart, onEmptyCart, setCurrentPage }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Success Modal
  const [shippingAddress, setShippingAddress] = useState({
    fullName: 'Alex Student',
    addressLine1: 'Dorm Room 304, Quadrangle Hall',
    city: 'University Town',
    state: 'State College',
    zipCode: '12345',
    phone: '555-0199'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: 'Alex Student',
    cardNumber: '•••• •••• •••• 4321',
    expiry: '12/28',
    cvv: '•••'
  });

  const [orderNumber, setOrderNumber] = useState('');

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const itemsPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingPrice = itemsPrice >= 49.00 ? 0.00 : 5.99;
  const taxPrice = itemsPrice * 0.08;
  const grandTotal = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = () => {
    // Generate a simulated order number
    const randNum = Math.floor(100000000 + Math.random() * 900000000);
    setOrderNumber(`AMZ-COL-${randNum}`);
    setStep(4); // Trigger Success Modal
  };

  const handleFinishCheckout = () => {
    onEmptyCart();
    setCurrentPage('home');
  };

  return (
    <div className="checkout-page-container container animated-fade-in">
      <h1>Checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      {step < 4 ? (
        <div className="checkout-grid">
          {/* Left Column: Form Steps */}
          <div className="checkout-steps-col">
            
            {/* Step 1: Shipping Address */}
            <div className={`checkout-step-card ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-header" onClick={() => step > 1 && setStep(1)}>
                <span className="step-number">1</span>
                <h2>Shipping Address</h2>
                {step > 1 && (
                  <span className="step-summary-text">
                    {shippingAddress.fullName}, {shippingAddress.addressLine1}
                  </span>
                )}
                {step > 1 && <button type="button" className="step-edit-btn">Change</button>}
              </div>

              {step === 1 && (
                <div className="step-body">
                  <div className="form-grid">
                    <div className="form-group col-span-2">
                      <label htmlFor="fullName">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                      />
                    </div>
                    <div className="form-group col-span-2">
                      <label htmlFor="addressLine1">Address (Dorm/Street)</label>
                      <input 
                        type="text" 
                        id="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input 
                        type="text" 
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input 
                        type="text" 
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code</label>
                      <input 
                        type="text" 
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="text" 
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="amazon-btn orange step-next-btn"
                    onClick={() => setStep(2)}
                  >
                    Use this address
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className={`checkout-step-card ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-header" onClick={() => step > 2 && setStep(2)}>
                <span className="step-number">2</span>
                <h2>Payment Method</h2>
                {step > 2 && (
                  <span className="step-summary-text">
                    Paying with Card ending in 4321
                  </span>
                )}
                {step > 2 && <button type="button" className="step-edit-btn">Change</button>}
              </div>

              {step === 2 && (
                <div className="step-body">
                  <div className="form-grid">
                    <div className="form-group col-span-2">
                      <label htmlFor="cardName">Name on Card</label>
                      <input 
                        type="text" 
                        id="cardName"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      />
                    </div>
                    <div className="form-group col-span-2">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiry">Expiration Date</label>
                      <input 
                        type="text" 
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input 
                        type="password" 
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="amazon-btn orange step-next-btn"
                    onClick={() => setStep(3)}
                  >
                    Use this payment method
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Review Items and Delivery */}
            <div className={`checkout-step-card ${step === 3 ? 'active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3</span>
                <h2>Review Items and Shipping</h2>
              </div>

              {step === 3 && (
                <div className="step-body">
                  <p className="delivery-guarantee-text">
                    🎉 Guaranteed Delivery: <strong>Tomorrow</strong> by 3:00 PM
                  </p>
                  
                  <div className="checkout-review-items">
                    {cart.map((item) => (
                      <div key={item.product.id} className="review-item-row">
                        <img src={item.product.image} alt="" className="review-item-img" />
                        <div className="review-item-info">
                          <h4>{item.product.title}</h4>
                          <span className="review-qty-price">
                            Qty: {item.quantity} | <strong>${item.product.price.toFixed(2)} each</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    className="amazon-btn orange place-order-btn"
                    onClick={handlePlaceOrder}
                  >
                    Place your order
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Cost Summary */}
          <div className="checkout-summary-col">
            <div className="checkout-summary-card">
              <button 
                type="button" 
                className={`amazon-btn w-full orange place-order-top-btn ${step !== 3 ? 'disabled' : ''}`}
                onClick={handlePlaceOrder}
                disabled={step !== 3}
              >
                Place your order
              </button>
              <p className="agreement-text">
                By placing your order, you agree to Amazon Prime's conditions of use and privacy notice.
              </p>
              
              <div className="summary-divider" />
              
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({totalItems}):</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Total before tax:</span>
                <span>${(itemsPrice + shippingPrice).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              
              <div className="summary-divider" />

              <div className="summary-row grand-total">
                <span>Order Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Step 4: Success Modal Dialog */
        <div className="success-modal-overlay">
          <div className="success-modal-card animated-fade-in">
            <div className="success-icon-wrapper">
              <svg viewBox="0 0 24 24" width="72" height="72" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            
            <h2>Order Placed Successfully!</h2>
            <p className="order-id-label">Order Number: <strong>{orderNumber}</strong></p>
            
            <div className="success-details">
              <p>Thank you for shopping at <strong>Amazon Prime College</strong>!</p>
              <p>A confirmation email has been sent to <strong>alex.student@college.edu</strong>.</p>
              
              <div className="delivery-estimate-box">
                <span className="truck-icon">🚚</span>
                <div>
                  <p className="est-title">Estimated Delivery</p>
                  <p className="est-desc"><strong>Tomorrow</strong> by 3:00 PM at <strong>Quadrangle Hall Dorms</strong></p>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className="amazon-btn orange success-home-btn"
              onClick={handleFinishCheckout}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Styled styles for Checkout */}
      <style>{`
        .checkout-page-container {
          padding-top: 24px;
          padding-bottom: 60px;
          text-align: left;
        }
        .checkout-page-container h1 {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          color: var(--text-primary);
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 72% 28%;
          gap: 20px;
          align-items: start;
        }

        /* Left Steps styling */
        .checkout-steps-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .checkout-step-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          overflow: hidden;
        }
        .checkout-step-card.active {
          border-color: var(--border-focus);
          box-shadow: var(--shadow-sm);
        }

        .step-header {
          display: flex;
          align-items: center;
          padding: 18px 24px;
          background-color: var(--bg-secondary);
          gap: 16px;
        }
        .checkout-step-card.completed .step-header {
          cursor: pointer;
        }
        .step-number {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-secondary);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--border-color);
          border-radius: 50%;
        }
        .checkout-step-card.active .step-number {
          color: var(--amazon-accent);
          border-color: var(--amazon-accent);
        }
        .checkout-step-card.completed .step-number {
          background-color: var(--success-color);
          color: white;
          border-color: var(--success-color);
        }
        .step-header h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: var(--text-primary);
        }
        .step-summary-text {
          font-size: 13px;
          color: var(--text-secondary);
          margin-left: auto;
          max-width: 280px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-edit-btn {
          margin-left: 12px;
          background: none;
          border: none;
          color: var(--text-link);
          cursor: pointer;
          font-size: 13px;
        }
        .step-edit-btn:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }

        .step-body {
          padding: 24px;
          border-top: 1px solid var(--border-color);
          animation: fadeIn 0.3s ease-out;
        }

        /* Form grid styling */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 600px;
          margin-bottom: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group.col-span-2 {
          grid-column: span 2;
        }
        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .form-group input {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 8px 12px;
          outline: none;
          font-size: 14px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }
        .form-group input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 3px rgba(228, 121, 17, 0.5);
        }
        .step-next-btn {
          padding: 10px 24px;
        }

        /* Review step items */
        .delivery-guarantee-text {
          font-size: 14px;
          color: var(--success-color);
          margin-bottom: 16px;
        }
        .checkout-review-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          max-height: 250px;
          overflow-y: auto;
          border: 1px solid var(--border-color);
          padding: 12px;
          border-radius: var(--border-radius-sm);
        }
        .review-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }
        .review-item-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .review-item-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          background: white;
          padding: 2px;
          border-radius: var(--border-radius-sm);
        }
        .review-item-info h4 {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 2px;
        }
        .review-qty-price {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .place-order-btn {
          padding: 12px 30px;
          font-size: 15px;
        }

        /* Right cost summary */
        .checkout-summary-col {
          display: flex;
          flex-direction: column;
        }
        .checkout-summary-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 20px;
        }
        .place-order-top-btn {
          padding: 12px;
          font-size: 15px;
          margin-bottom: 12px;
        }
        .agreement-text {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.4;
        }
        .summary-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 16px 0;
        }
        .checkout-summary-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .summary-row.grand-total {
          font-size: 18px;
          font-weight: 700;
          color: var(--danger-color);
        }

        /* Step 4: Success Modal dialog */
        .success-modal-overlay {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0;
          width: 100%;
        }
        .success-modal-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 40px;
          width: 100%;
          max-width: 600px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrapper {
          background-color: var(--success-color);
          width: 96px;
          height: 96px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 10px rgba(0, 118, 0, 0.3);
        }
        .success-modal-card h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--success-color);
          margin-bottom: 8px;
        }
        .order-id-label {
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 24px;
        }
        .success-details {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          width: 100%;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 20px 0;
          margin-bottom: 30px;
        }
        .delivery-estimate-box {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-md);
          padding: 16px;
          margin-top: 16px;
          text-align: left;
        }
        .truck-icon {
          font-size: 32px;
        }
        .est-title {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .est-desc {
          font-size: 14px;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .success-home-btn {
          padding: 12px 40px;
          font-size: 16px;
        }

        /* Responsiveness settings */
        @media (max-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .checkout-summary-col {
            margin-top: 20px;
          }
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-group.col-span-2 {
            grid-column: span 1;
          }
          .step-header {
            padding: 12px 16px;
          }
          .step-body {
            padding: 16px;
          }
          .success-modal-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
