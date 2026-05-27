import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

// Carousel slide definition
const SLIDES = [
  {
    image: '/assets/hero_banner.png',
    title: 'Welcome to College Prime',
    subtitle: 'Exclusive student discounts on electronics, textbooks, and essentials with free fast shipping.',
    theme: 'dark'
  },
  {
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1500&q=80',
    title: 'Elevate Your Dorm Space',
    subtitle: 'Shop cozy bedding, study lamps, smart coffee makers, and room organization.',
    theme: 'light'
  },
  {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1500&q=80',
    title: 'Tech for the Semester',
    subtitle: 'Laptops, noise-canceling headphones, and smart watches to power your productivity.',
    theme: 'dark'
  }
];

export default function Home({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Automatic carousel slide advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Filter products by category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All Departments' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id;
  });

  return (
    <main className="home-container animated-fade-in">
      {/* Hero Carousel */}
      <section className="hero-carousel" aria-label="Hero Carousel">
        <div 
          className="carousel-inner" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slide, index) => (
            <div 
              key={index} 
              className={`carousel-slide ${slide.theme}`}
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(234, 237, 237, 1)), url(${slide.image})` }}
            >
              <div className="slide-content-box">
                <span className="slide-tag">Prime College</span>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button 
                  type="button" 
                  className="amazon-btn orange"
                  onClick={() => {
                    if (index === 0) setSelectedCategory('Electronics');
                    if (index === 1) setSelectedCategory('Home & Kitchen');
                    if (index === 2) setSelectedCategory('Electronics');
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel buttons */}
        <button className="carousel-btn prev" onClick={handlePrevSlide} aria-label="Previous Slide">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        <button className="carousel-btn next" onClick={handleNextSlide} aria-label="Next Slide">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {SLIDES.map((_, index) => (
            <span 
              key={index} 
              className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Overlapping Quick Shop Cards */}
      <section className="quick-cards-grid container">
        <div className="quick-card">
          <h3>Tech For College</h3>
          <div className="quick-card-img-box">
            <img src={SLIDES[2].image} alt="Tech Gear" />
          </div>
          <p onClick={() => setSelectedCategory('Electronics')}>See all deals</p>
        </div>
        <div className="quick-card">
          <h3>Cozy Dorm Decor</h3>
          <div className="quick-card-img-box">
            <img src={SLIDES[1].image} alt="Dorm Decor" />
          </div>
          <p onClick={() => setSelectedCategory('Home & Kitchen')}>Explore styles</p>
        </div>
        <div className="quick-card">
          <h3>Semester Readings</h3>
          <div className="quick-card-img-box">
            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80" alt="Books" />
          </div>
          <p onClick={() => setSelectedCategory('Books & Literature')}>Browse textbooks</p>
        </div>
        <div className="quick-card">
          <h3>Campus Outfits</h3>
          <div className="quick-card-img-box">
            <img src="https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=300&q=80" alt="Fashion" />
          </div>
          <p onClick={() => setSelectedCategory('Fashion & Apparel')}>Shop clothing</p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="catalog-section container">
        {/* Filter Headers */}
        <div className="catalog-header">
          <div className="catalog-info">
            <h2>{selectedCategory}</h2>
            {searchQuery && (
              <span className="search-result-label">
                Results for "{searchQuery}" ({filteredProducts.length} items found)
              </span>
            )}
          </div>

          <div className="catalog-sort">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid-container">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results-box">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" className="empty-icon">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <h3>No Results Found</h3>
            <p>We couldn't find anything matching your search filters. Try selecting a different department or checking spelling.</p>
            <button 
              type="button" 
              className="amazon-btn"
              onClick={() => { setSelectedCategory('All Departments'); setSearchQuery(''); }}
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Styled styles for Home page */}
      <style>{`
        .home-container {
          padding-bottom: 60px;
          background-color: var(--bg-primary);
        }

        /* Carousel styles */
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
          background-color: #000;
        }
        .carousel-inner {
          display: flex;
          height: 100%;
          width: 100%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .carousel-slide {
          flex: 0 0 100%;
          height: 100%;
          background-size: cover;
          background-position: center 20%;
          background-repeat: no-repeat;
          display: flex;
          align-items: flex-start;
          padding: 40px 80px;
          position: relative;
        }
        .slide-content-box {
          max-width: 480px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: var(--border-radius-md);
          padding: 24px;
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.5s ease-out;
        }
        [data-theme='dark'] .slide-content-box {
          background: rgba(28, 30, 39, 0.9);
          color: white;
        }
        .slide-tag {
          background-color: var(--amazon-accent);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8px;
        }
        .slide-content-box h2 {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .slide-content-box p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 18px;
        }

        .carousel-btn {
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #333;
          cursor: pointer;
          border-radius: 4px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast), color var(--transition-fast);
          z-index: 5;
        }
        .carousel-btn:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: black;
        }
        .carousel-btn.prev { left: 20px; }
        .carousel-btn.next { right: 20px; }
        [data-theme='dark'] .carousel-btn {
          color: #ccc;
        }
        [data-theme='dark'] .carousel-btn:hover {
          color: white;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 105px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 5;
        }
        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .indicator-dot.active {
          background-color: white;
          width: 18px;
          border-radius: 4px;
        }

        /* Quick overlapping cards */
        .quick-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: -90px;
          position: relative;
          z-index: 10;
          padding-bottom: 30px;
        }
        .quick-card {
          background-color: var(--card-bg);
          border-radius: var(--border-radius-sm);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          min-height: 270px;
        }
        .quick-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .quick-card-img-box {
          flex: 1;
          overflow: hidden;
          border-radius: var(--border-radius-sm);
          background-color: #eee;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .quick-card-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .quick-card:hover img {
          transform: scale(1.05);
        }
        .quick-card p {
          font-size: 13px;
          color: var(--text-link);
          cursor: pointer;
          font-weight: 500;
          align-self: flex-start;
        }
        .quick-card p:hover {
          color: var(--text-link-hover);
          text-decoration: underline;
        }

        /* Catalog section styles */
        .catalog-section {
          background-color: transparent;
          margin-top: 10px;
        }
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 16px;
          gap: 16px;
        }
        .catalog-info h2 {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .search-result-label {
          font-size: 13px;
          color: var(--text-secondary);
          display: block;
          margin-top: 2px;
        }
        .catalog-sort {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .catalog-sort label {
          color: var(--text-secondary);
        }
        .sort-dropdown {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 6px 12px;
          font-size: 13px;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
        }

        /* Empty results state */
        .empty-results-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          background-color: var(--card-bg);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
        }
        .empty-icon {
          color: var(--text-secondary);
          opacity: 0.5;
          margin-bottom: 16px;
        }
        .empty-results-box h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .empty-results-box p {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 420px;
          margin-bottom: 24px;
        }

        /* Responsive settings */
        @media (max-width: 1024px) {
          .quick-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            margin-top: -60px;
            padding: 0 10px;
          }
          .hero-carousel {
            height: 320px;
          }
          .carousel-slide {
            padding: 30px 40px;
          }
        }
        @media (max-width: 768px) {
          .quick-cards-grid {
            grid-template-columns: 1fr;
            margin-top: -30px;
            gap: 15px;
          }
          .hero-carousel {
            height: 250px;
          }
          .carousel-btn {
            display: none;
          }
          .slide-content-box h2 {
            font-size: 20px;
          }
          .slide-content-box p {
            display: none;
          }
          .slide-content-box {
            padding: 12px;
          }
          .carousel-indicators {
            bottom: 45px;
          }
        }
      `}</style>
    </main>
  );
}
