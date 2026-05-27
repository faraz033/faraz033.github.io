import React from 'react';

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const {
    title,
    price,
    originalPrice,
    rating,
    reviewsCount,
    image,
    badge,
    inStock
  } = product;

  // Calculate discount percentage
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Rating percentage for stars width
  const ratingPercent = (rating / 5) * 100;

  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSelectProduct(product);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // prevent card click navigation
    if (inStock) {
      onAddToCart(product);
    }
  };

  return (
    <article className="product-card animated-fade-in" onClick={handleCardClick}>
      {/* Badge Ribbon */}
      {badge && (
        <div className="card-badge-container">
          <span className={`badge ${badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="product-img-wrapper">
        <img src={image} alt={title} className="product-img" loading="lazy" />
      </div>

      {/* Details */}
      <div className="product-details">
        <h3 className="product-title-text" title={title}>
          {title}
        </h3>

        {/* Rating Row */}
        <div className="product-rating-row">
          <div className="stars-outer">
            <div className="stars-inner" style={{ width: `${ratingPercent}%` }}></div>
          </div>
          <span className="reviews-count-text">({reviewsCount.toLocaleString()})</span>
        </div>

        {/* Pricing Row */}
        <div className="product-price-row">
          <span className="price-symbol">$</span>
          <span className="price-integer">{Math.floor(price)}</span>
          <span className="price-decimal">{(price % 1).toFixed(2).substring(2)}</span>

          {originalPrice && (
            <>
              <span className="original-price-text">${originalPrice.toFixed(2)}</span>
              <span className="discount-tag">({discountPercent}% off)</span>
            </>
          )}
        </div>

        {/* Shipping details */}
        <div className="shipping-info-row">
          <span className="prime-logo-badge">✓ prime</span>
          <span className="delivery-speed-text">FREE delivery Tomorrow</span>
        </div>

        {/* Stock Status */}
        <div className="stock-info-row">
          {inStock ? (
            <span className="in-stock-label">In Stock</span>
          ) : (
            <span className="out-of-stock-label">Temporarily Out of Stock</span>
          )}
        </div>

        {/* Button Wrapper */}
        <div className="card-action-row">
          <button 
            type="button" 
            className={`amazon-btn w-full ${!inStock ? 'disabled' : ''}`}
            onClick={handleAddClick}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Styled styles for ProductCard */}
      <style>{`
        .product-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          padding: 16px;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--amazon-orange-light);
        }
        
        .card-badge-container {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 5;
        }
        .badge.best-seller {
          background-color: var(--amazon-accent);
          color: white;
        }
        .badge.deal-of-the-day {
          background-color: #b12704;
          color: white;
        }
        .badge.choice {
          background-color: var(--amazon-dark);
          color: white;
        }
        .badge.popular {
          background-color: #007185;
          color: white;
        }

        .product-img-wrapper {
          width: 100%;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          background-color: white;
          border-radius: var(--border-radius-sm);
        }
        .product-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }

        .product-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .product-title-text {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 38px;
        }

        .product-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }
        .reviews-count-text {
          font-size: 12px;
          color: var(--text-link);
        }

        .product-price-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 2px;
          margin-bottom: 6px;
        }
        .price-symbol {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          position: relative;
          top: -4px;
        }
        .price-integer {
          font-size: 21px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }
        .price-decimal {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          position: relative;
          top: -4px;
        }
        .original-price-text {
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: line-through;
          margin-left: 8px;
        }
        .discount-tag {
          font-size: 13px;
          color: #cc0c39;
          font-weight: 600;
          margin-left: 4px;
        }

        .shipping-info-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
          font-size: 12px;
        }
        .prime-logo-badge {
          color: #00a8e1;
          font-weight: 800;
          font-style: italic;
        }
        .delivery-speed-text {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .stock-info-row {
          font-size: 12px;
          margin-bottom: 12px;
          min-height: 18px;
        }
        .in-stock-label {
          color: var(--success-color);
          font-weight: 600;
        }
        .out-of-stock-label {
          color: var(--danger-color);
          font-weight: 600;
        }

        .card-action-row {
          margin-top: auto;
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </article>
  );
}
