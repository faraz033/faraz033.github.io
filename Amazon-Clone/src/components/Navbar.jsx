import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';

export default function Navbar({
  cart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  theme,
  toggleTheme,
  user,
  onLoginToggle,
  onToggleSidebar,
  allProducts
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [cartAnimate, setCartAnimate] = useState(false);

  const navigate = useNavigate();

  // Total quantity in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Trigger bounce animation when cart count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  // Handle live search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = allProducts.filter(product => {
        const matchesQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Departments' || product.category === selectedCategory;
        return matchesQuery && matchesCategory;
      });
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, selectedCategory, allProducts]);

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedCategory('All Departments');
    navigate('/');
  };

  return (
    <header className="navbar-container" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Upper Main Nav Bar */}
      <div className="navbar-main">
        {/* Hamburger Menu & Logo */}
        <div className="nav-left">
          <button className="nav-hamburger-mobile" onClick={onToggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          
          <div className="nav-logo" onClick={handleLogoClick}>
            <span className="logo-text">amazon</span>
            <span className="logo-dot">.prime</span>
          </div>

          <div className="nav-location desktop-only">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="loc-icon">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div className="loc-text">
              <span className="loc-line1">Deliver to</span>
              <span className="loc-line2">College Campus</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
          <div className="search-category-container">
            <select 
              value={selectedCategory} 
              onChange={(e) => { setSelectedCategory(e.target.value); setShowSuggestions(false); }}
              className="search-category-select"
            >
              {CATEGORIES.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search Amazon Prime..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="search-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions-dropdown">
                {suggestions.map((product) => (
                  <div 
                    key={product.id} 
                    className="suggestion-item"
                    onMouseDown={() => handleSuggestionClick(product)}
                  >
                    <img src={product.image} alt="" className="suggestion-img" />
                    <div className="suggestion-info">
                      <span className="suggestion-title">{product.title}</span>
                      <span className="suggestion-price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="search-submit-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </form>

        {/* Right Side Options & Actions */}
        <div className="nav-right">
          {/* Theme Toggle Button */}
          <button 
            type="button" 
            className="theme-toggle-btn nav-link-box" 
            onClick={toggleTheme} 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Theme Toggle"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: '#ff9900' }}>
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: '#febd69' }}>
                <path d="M12.3 2a10 10 0 0 0-1.9 19.5 10 10 0 0 0 11.5-12.2A8 8 0 1 1 12.3 2z"/>
              </svg>
            )}
            <span className="theme-toggle-label desktop-only">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Account Login Simulation */}
          <div className="nav-link-box" onClick={onLoginToggle}>
            <span className="nav-line-1">Hello, {user ? user.name : 'Sign in'}</span>
            <span className="nav-line-2 font-bold flex-align-center">
              Account & Lists
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style={{ marginLeft: 3 }}>
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
            </span>
          </div>

          {/* Returns & Orders */}
          <Link to="/" className="nav-link-box desktop-only text-white hover:no-underline">
            <span className="nav-line-1">Returns</span>
            <span className="nav-line-2 font-bold">& Orders</span>
          </Link>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className={`nav-cart-container nav-link-box text-white hover:no-underline ${cartAnimate ? 'cart-bounce' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="cart-icon-wrapper">
              <span className="cart-count">{cartItemCount}</span>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="cart-icon">
                <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm-1.83-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L18.8 5.41C19.1 4.87 18.71 4 18 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.25c-.14 0-.25-.11-.25-.25z"/>
              </svg>
            </div>
            <span className="nav-line-2 font-bold cart-label desktop-only">Cart</span>
          </Link>
        </div>
      </div>

      {/* Lower Subnav Bar */}
      <div className="navbar-sub">
        <div className="sub-left">
          <button className="sub-menu-btn" onClick={onToggleSidebar}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            All
          </button>
          
          <ul className="sub-links-list">
            <li onClick={() => { setSelectedCategory('All Departments'); setSearchQuery(''); navigate('/'); }}>Today's Deals</li>
            <li onClick={() => { setSelectedCategory('Electronics'); navigate('/'); }}>Electronics</li>
            <li onClick={() => { setSelectedCategory('Home & Kitchen'); navigate('/'); }}>Home & Kitchen</li>
            <li onClick={() => { setSelectedCategory('Fashion & Apparel'); navigate('/'); }}>Fashion</li>
            <li onClick={() => { setSelectedCategory('Books & Literature'); navigate('/'); }}>Books</li>
            <li className="desktop-only">Customer Service</li>
            <li className="desktop-only">Gift Cards</li>
            <li className="desktop-only">Registry</li>
          </ul>
        </div>
        <div className="sub-right font-bold">
          <span className="college-banner-text">🎓 College Prime Special: Free Fast Delivery on Campus!</span>
        </div>
      </div>

      {/* Styled styles for Navbar */}
      <style>{`
        .navbar-container {
          background-color: var(--amazon-dark);
          color: white;
          width: 100%;
        }
        .navbar-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          height: var(--nav-height);
          gap: 12px;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-hamburger-mobile {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: none;
          padding: 4px;
        }
        .nav-logo {
          cursor: pointer;
          display: flex;
          align-items: baseline;
          padding: 4px 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          transition: border-color var(--transition-fast);
        }
        .nav-logo:hover {
          border-color: white;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 24px;
          letter-spacing: -1.2px;
          color: white;
        }
        .logo-dot {
          font-size: 13px;
          color: var(--amazon-orange);
          font-weight: 600;
          margin-left: 2px;
        }
        .nav-location {
          display: flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
        }
        .nav-location:hover {
          border-color: white;
        }
        .loc-icon {
          margin-top: 10px;
          margin-right: 3px;
        }
        .loc-text {
          display: flex;
          flex-direction: column;
        }
        .loc-line1 {
          font-size: 11px;
          color: #ccc;
        }
        .loc-line2 {
          font-size: 13px;
          font-weight: 700;
        }
        
        /* Search form styling */
        .nav-search-form {
          display: flex;
          flex: 1;
          height: 40px;
          background-color: white;
          border-radius: 4px;
          overflow: hidden;
          transition: box-shadow var(--transition-fast);
          position: relative;
        }
        .nav-search-form:focus-within {
          box-shadow: 0 0 0 3px var(--border-focus);
        }
        .search-category-container {
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          align-items: center;
        }
        .search-category-select {
          background: #f3f3f3;
          border: none;
          outline: none;
          padding: 0 12px;
          font-size: 12px;
          height: 100%;
          color: #555;
          cursor: pointer;
        }
        .search-category-select:hover {
          background: #e3e3e3;
          color: #111;
        }
        .search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 100%;
          border: none;
          outline: none;
          padding: 0 12px;
          font-size: 15px;
          color: #111;
          height: 100%;
          background: white;
        }
        .search-submit-btn {
          background-color: var(--amazon-orange-light);
          border: none;
          outline: none;
          width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: background-color var(--transition-fast);
        }
        .search-submit-btn:hover {
          background-color: var(--amazon-orange-hover);
        }
        
        /* Suggestions Dropdown */
        .search-suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          z-index: 101;
          max-height: 320px;
          overflow-y: auto;
          animation: fadeIn 0.15s ease-out;
        }
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          border-bottom: 1px solid var(--border-color);
        }
        .suggestion-item:last-child {
          border-bottom: none;
        }
        .suggestion-item:hover {
          background-color: var(--bg-primary);
        }
        .suggestion-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 4px;
          background: white;
          padding: 2px;
        }
        .suggestion-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .suggestion-title {
          font-size: 13px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
        }
        .suggestion-price {
          font-size: 11px;
          color: var(--amazon-accent);
          font-weight: 600;
        }

        /* Nav Right Options */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6px 10px;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color var(--transition-fast);
        }
        .nav-link-box:hover {
          border-color: white;
        }
        .nav-line-1 {
          font-size: 11px;
          color: #ccc;
        }
        .nav-line-2 {
          font-size: 13px;
          font-weight: 700;
          color: white;
        }
        .flex-align-center {
          display: flex;
          align-items: center;
        }
        .font-bold {
          font-weight: 700;
        }
        
        /* Theme Toggle styles */
        .theme-toggle-btn {
          background: none;
          border: 1px solid transparent;
          outline: none;
          color: white;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
        }
        .theme-toggle-label {
          font-size: 12px;
          font-weight: 600;
        }

        /* Cart Icon styles */
        .nav-cart-container {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          position: relative;
        }
        .cart-icon-wrapper {
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .cart-icon {
          color: white;
        }
        .cart-count {
          position: absolute;
          top: 0;
          left: 45%;
          transform: translateX(-50%);
          background-color: var(--amazon-orange);
          color: #111;
          font-weight: 700;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          padding: 2px;
        }
        .cart-bounce {
          animation: cartBounce 0.4s ease-out;
        }

        /* Sub-Navbar styling */
        .navbar-sub {
          background-color: var(--amazon-light-dark);
          height: var(--subnav-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-size: 14px;
        }
        .sub-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .sub-menu-btn {
          background: none;
          border: 1px solid transparent;
          outline: none;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 6px;
          border-radius: 2px;
          transition: border-color var(--transition-fast);
        }
        .sub-menu-btn:hover {
          border-color: white;
        }
        .sub-links-list {
          display: flex;
          align-items: center;
          gap: 12px;
          list-style: none;
        }
        .sub-links-list li {
          color: white;
          cursor: pointer;
          padding: 4px 6px;
          border: 1px solid transparent;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .sub-links-list li:hover {
          border-color: white;
        }
        .college-banner-text {
          color: var(--amazon-orange-light);
          font-size: 13px;
        }

        /* Responsiveness settings */
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
          .nav-hamburger-mobile {
            display: block;
          }
          .nav-search-form {
            order: 4;
            flex: 1 1 100%;
            margin-top: 6px;
          }
          .navbar-main {
            flex-wrap: wrap;
            height: auto;
            padding-bottom: 10px;
          }
          .navbar-sub {
            overflow-x: auto;
          }
          .sub-links-list {
            white-space: nowrap;
          }
          .college-banner-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
