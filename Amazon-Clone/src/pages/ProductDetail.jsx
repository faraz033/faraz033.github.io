import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ products, onAddToCart, onBuyNow, setCurrentPage }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2>Product not found</h2>
        <p className="text-secondary mt-2 mb-6">The item you are looking for does not exist in our catalog.</p>
        <Link to="/" className="amazon-btn orange">Back to Home</Link>
      </div>
    );
  }

  const {
    title,
    price,
    originalPrice,
    rating,
    reviewsCount,
    image,
    images = [image],
    description,
    specs = {},
    features = [],
    inStock,
    category
  } = product;

  const [activeImage, setActiveImage] = useState(image);
  const [quantity, setQuantity] = useState(1);

  // Sync active image when product changes
  useEffect(() => {
    setActiveImage(image);
    setQuantity(1);
  }, [product, image]);

  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const savingsAmount = originalPrice 
    ? (originalPrice - price).toFixed(2)
    : 0;

  const ratingPercent = (rating / 5) * 100;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="detail-container container animated-fade-in">
      {/* Breadcrumbs using Link */}
      <nav className="detail-breadcrumbs" aria-label="Breadcrumb navigation">
        <Link to="/">Departments</Link>
        <span className="separator">&gt;</span>
        <span className="active">{category}</span>
      </nav>

      {/* Main Grid: Images | Product Details | Buying Widget */}
      <div className="detail-grid">
        
        {/* Left Column: Image Selection */}
        <section className="detail-images-col" aria-label="Product Images">
          {/* Thumbnails Sidebar */}
          <div className="thumbnail-list">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`thumb-wrapper ${activeImage === img ? 'selected' : ''}`}
                onMouseEnter={() => setActiveImage(img)}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`View ${i + 1}`} />
              </div>
            ))}
          </div>
          
          {/* Active Main Image */}
          <div className="main-image-wrapper">
            <img src={activeImage} alt={title} className="main-img" />
          </div>
        </section>

        {/* Middle Column: Core Info */}
        <section className="detail-info-col" aria-label="Product Information">
          <h1 className="detail-title">{title}</h1>
          
          {/* Rating */}
          <div className="detail-rating-row">
            <div className="stars-outer">
              <div className="stars-inner" style={{ width: `${ratingPercent}%` }}></div>
            </div>
            <span className="detail-rating-number">{rating} out of 5 stars</span>
            <span className="detail-reviews-link">{reviewsCount.toLocaleString()} ratings</span>
          </div>

          <div className="detail-divider" />

          {/* Pricing Details */}
          <div className="detail-price-box">
            {originalPrice && (
              <div className="price-tag-row">
                <span className="discount-value">-{discountPercent}%</span>
                <span className="price-big-container">
                  <span className="currency-small">$</span>
                  <span className="price-value-integer">{Math.floor(price)}</span>
                  <span className="price-value-decimal">{(price % 1).toFixed(2).substring(2)}</span>
                </span>
              </div>
            )}
            
            {originalPrice ? (
              <div className="list-price-row">
                <span className="list-label">List Price:</span>
                <span className="list-value">${originalPrice.toFixed(2)}</span>
                <span className="savings-value">You save: <strong>${savingsAmount} ({discountPercent}%)</strong></span>
              </div>
            ) : (
              <span className="price-big-container">
                <span className="currency-small">$</span>
                <span className="price-value-integer">{Math.floor(price)}</span>
                <span className="price-value-decimal">{(price % 1).toFixed(2).substring(2)}</span>
              </span>
            )}
            <span className="price-tax-label">Prices include import fees deposit. Details</span>
          </div>

          <div className="detail-divider" />

          {/* Description */}
          <div className="detail-desc-box">
            <h3>About this item</h3>
            <ul className="detail-features-list">
              {features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
            <p className="detail-long-desc">{description}</p>
          </div>

          <div className="detail-divider" />

          {/* Specifications Table */}
          {Object.keys(specs).length > 0 && (
            <div className="detail-specs-box">
              <h3>Technical Details</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Right Column: Purchase Widget */}
        <section className="detail-buy-widget" aria-label="Purchase Options">
          <div className="buy-widget-price">
            <span className="widget-currency">$</span>
            <span className="widget-value">{price.toFixed(2)}</span>
          </div>

          <div className="buy-widget-shipping">
            <p className="delivery-line">✓ prime</p>
            <p className="delivery-speed">FREE delivery <strong>Tomorrow</strong>. Order within 4 hrs 12 mins.</p>
            <p className="delivery-location">📍 Deliver to College Campus</p>
          </div>

          {/* Stock state */}
          <div className="buy-widget-stock">
            {inStock ? (
              <span className="in-stock-badge">In Stock</span>
            ) : (
              <span className="out-of-stock-badge">Temporarily Out of Stock</span>
            )}
          </div>

          {/* Quantity selector */}
          {inStock && (
            <div className="buy-widget-qty">
              <label htmlFor="qty-select">Qty:</label>
              <select 
                id="qty-select"
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="qty-dropdown"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="buy-widget-buttons">
            <button 
              type="button" 
              className={`amazon-btn w-full orange ${!inStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              Add to Cart
            </button>
            <button 
              type="button" 
              className={`amazon-btn w-full secondary ${!inStock ? 'disabled' : ''}`}
              onClick={handleBuyNow}
              disabled={!inStock}
              style={{ marginTop: '10px' }}
            >
              Buy Now
            </button>
          </div>

          {/* Trust lines */}
          <div className="buy-widget-trust">
            <div className="trust-row">
              <span className="trust-label">Ships from</span>
              <span className="trust-val">Amazon.com</span>
            </div>
            <div className="trust-row">
              <span className="trust-label">Sold by</span>
              <span className="trust-val">Amazon Prime College</span>
            </div>
            <div className="trust-row">
              <span className="trust-label">Returns</span>
              <span className="trust-val text-link">Eligible for Return or Refund</span>
            </div>
          </div>
        </section>

      </div>

      {/* Styled styles for ProductDetail */}
      <style>{`
        .detail-container {
          padding-top: 20px;
          padding-bottom: 60px;
          text-align: left;
        }

        .detail-breadcrumbs {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .detail-breadcrumbs a {
          cursor: pointer;
        }
        .detail-breadcrumbs a:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }
        .detail-breadcrumbs span.active {
          cursor: default;
          pointer-events: none;
          color: var(--text-primary);
          font-weight: 500;
        }
        .detail-breadcrumbs .separator {
          cursor: default;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 42% 38% 20%;
          gap: 20px;
        }

        /* Left Column: Image Selection */
        .detail-images-col {
          display: flex;
          gap: 16px;
        }
        .thumbnail-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .thumb-wrapper {
          width: 48px;
          height: 48px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 3px;
          cursor: pointer;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color var(--transition-fast);
        }
        .thumb-wrapper:hover, .thumb-wrapper.selected {
          border-color: var(--border-focus);
          box-shadow: 0 0 3px rgba(228, 121, 17, 0.5);
        }
        .thumb-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .main-image-wrapper {
          flex: 1;
          height: 400px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .main-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        /* Middle Column: Details */
        .detail-info-col {
          padding: 0 10px;
        }
        .detail-title {
          font-size: 22px;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .detail-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .detail-rating-number {
          font-weight: 600;
        }
        .detail-reviews-link {
          color: var(--text-link);
          cursor: pointer;
        }
        .detail-reviews-link:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }

        .detail-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 16px 0;
        }

        /* Pricing Details */
        .detail-price-box {
          display: flex;
          flex-direction: column;
        }
        .price-tag-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }
        .discount-value {
          color: #cc0c39;
          font-size: 28px;
          font-weight: 300;
        }
        .price-big-container {
          display: inline-flex;
          align-items: baseline;
        }
        .currency-small {
          font-size: 16px;
          font-weight: 500;
          position: relative;
          top: -10px;
        }
        .price-value-integer {
          font-size: 32px;
          font-weight: 600;
          line-height: 1;
        }
        .price-value-decimal {
          font-size: 16px;
          font-weight: 500;
          position: relative;
          top: -10px;
        }
        .list-price-row {
          font-size: 14px;
          color: var(--text-secondary);
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }
        .list-value {
          text-decoration: line-through;
        }
        .savings-value {
          color: #b12704;
        }
        .price-tax-label {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Description Details */
        .detail-desc-box h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .detail-features-list {
          padding-left: 20px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .detail-features-list li {
          font-size: 14px;
          color: var(--text-primary);
        }
        .detail-long-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Technical specs */
        .detail-specs-box h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .specs-table tr {
          border-bottom: 1px solid var(--border-color);
        }
        .specs-table tr:last-child {
          border-bottom: none;
        }
        .spec-label {
          font-weight: 700;
          padding: 8px 12px 8px 0;
          width: 40%;
          color: var(--text-primary);
        }
        .spec-value {
          padding: 8px 0;
          color: var(--text-secondary);
        }

        /* Right Column: Buy Widget */
        .detail-buy-widget {
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          background-color: var(--card-bg);
          padding: 18px;
          display: flex;
          flex-direction: column;
          height: fit-content;
        }
        .buy-widget-price {
          display: flex;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .widget-currency {
          font-size: 14px;
          font-weight: 600;
          position: relative;
          top: -6px;
        }
        .widget-value {
          font-size: 24px;
          font-weight: 700;
        }
        .buy-widget-shipping {
          font-size: 13px;
          margin-bottom: 16px;
        }
        .delivery-line {
          color: #00a8e1;
          font-weight: 800;
          font-style: italic;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .delivery-speed {
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .delivery-location {
          color: var(--text-link);
          cursor: pointer;
        }
        .buy-widget-stock {
          font-size: 16px;
          margin-bottom: 16px;
        }
        .in-stock-badge {
          color: var(--success-color);
          font-weight: 700;
        }
        .out-of-stock-badge {
          color: var(--danger-color);
          font-weight: 700;
        }
        .buy-widget-qty {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .qty-dropdown {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 4px 8px;
          outline: none;
          cursor: pointer;
        }
        .buy-widget-buttons {
          margin-bottom: 20px;
        }
        .buy-widget-trust {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 11px;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
        .trust-row {
          display: flex;
          justify-content: space-between;
        }
        .trust-label {
          color: var(--text-secondary);
        }
        .trust-val {
          font-weight: 500;
        }

        /* Responsiveness settings */
        @media (max-width: 1024px) {
          .detail-grid {
            grid-template-columns: 45% 55%;
          }
          .detail-buy-widget {
            grid-column: span 2;
            margin-top: 20px;
          }
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
          .detail-images-col {
            flex-direction: column-reverse;
          }
          .thumbnail-list {
            flex-direction: row;
            justify-content: center;
          }
          .main-image-wrapper {
            height: 300px;
          }
          .detail-buy-widget {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
