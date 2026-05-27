import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
  setSearchQuery,
  user,
  onLoginToggle
}) {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setCurrentPage('home');
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      
      {/* Sidebar Drawer */}
      <aside className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="user-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          <span className="sidebar-title">Hello, {user ? user.name : 'Sign In'}</span>
          
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content list */}
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3>Trending Departments</h3>
            <ul className="sidebar-links">
              {CATEGORIES.map((cat, i) => (
                <li 
                  key={i} 
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="arrow-right">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-section">
            <h3>Help & Settings</h3>
            <ul className="sidebar-links secondary">
              <li onClick={() => { setCurrentPage('home'); onClose(); }}>Your Account</li>
              <li onClick={() => { setCurrentPage('home'); onClose(); }}>Customer Service</li>
              <li onClick={() => { onLoginToggle(); onClose(); }}>
                {user ? 'Sign Out' : 'Sign In / Register'}
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Styled styles for Sidebar */}
      <style>{`
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .sidebar-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .sidebar-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 360px;
          max-width: 85%;
          height: 100vh;
          background-color: var(--card-bg);
          z-index: 1001;
          box-shadow: var(--shadow-lg);
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
          display: flex;
          flex-direction: column;
        }
        .sidebar-drawer.open {
          transform: translateX(0);
        }

        .sidebar-header {
          background-color: var(--amazon-light-dark);
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .user-icon {
          color: #eee;
        }
        .sidebar-title {
          font-size: 18px;
          font-weight: 700;
        }
        .sidebar-close-btn {
          position: absolute;
          right: -45px;
          top: 15px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          outline: none;
          transition: transform 0.2s ease;
        }
        .sidebar-close-btn:hover {
          transform: rotate(90deg);
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;
        }
        .sidebar-section {
          padding: 0 20px;
        }
        .sidebar-section h3 {
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        .sidebar-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-links li {
          font-size: 14px;
          padding: 10px 12px;
          cursor: pointer;
          color: var(--text-primary);
          border-radius: var(--border-radius-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color var(--transition-fast);
          margin-left: -12px;
          margin-right: -12px;
        }
        .sidebar-links li:hover {
          background-color: var(--bg-primary);
        }
        .sidebar-links li.active {
          font-weight: 700;
          color: var(--amazon-orange-hover);
          background-color: var(--bg-secondary);
        }
        .arrow-right {
          color: #999;
        }
        .sidebar-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 20px 0;
        }
      `}</style>
    </>
  );
}
