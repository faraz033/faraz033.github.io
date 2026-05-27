import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LoginModal from './components/LoginModal';

export default function App() {
  // Products from API fetch simulation
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Router navigator
  const navigate = useNavigate();

  // Local states
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('amazon_clone_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('amazon_clone_theme') || 'light';
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('amazon_clone_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Asynchronous Fetch API loading local products JSON
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/products.json');
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Satisfies Promises & async/await: simulation of standard network response time
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProducts(data);
    } catch (err) {
      console.error('Fetch error details:', err);
      setError(err.message || 'Network connection failed. Unable to retrieve catalog.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync Cart to Local Storage
  useEffect(() => {
    localStorage.setItem('amazon_clone_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync User to Local Storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('amazon_clone_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('amazon_clone_user');
    }
  }, [user]);

  // Apply Theme with direct DOM Manipulation (Syllabus Topic)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('amazon_clone_theme', theme);
  }, [theme]);

  // Global window DOM event listener to show explicit DOM Event Handling (Syllabus Topic)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setLoginModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Theme Toggler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId, newQty) => {
    setCart((prev) => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  // Buy Now: adds to cart and redirects immediately
  const handleBuyNow = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      {/* Header Navbar */}
      <Navbar 
        cart={cart}
        currentPage="" 
        setCurrentPage={(page) => {
          if (page === 'home') navigate('/');
          if (page === 'cart') navigate('/cart');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        onLoginToggle={() => setLoginModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen(true)}
        allProducts={products}
      />

      {/* Sidebar Navigation Drawer */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={(page) => {
          if (page === 'home') navigate('/');
        }}
        setSearchQuery={setSearchQuery}
        user={user}
        onLoginToggle={() => {
          if (user) {
            setUser(null);
          } else {
            setLoginModalOpen(true);
          }
        }}
      />

      {/* Main Container - with Loading and Error templates */}
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="loading-spinner-container flex flex-col justify-center items-center py-20">
            <div className="loading-spinner"></div>
            <p className="mt-4 text-sm font-semibold tracking-wide text-gray-500">Loading catalog from Prime server...</p>
          </div>
        ) : error ? (
          <div className="error-panel container py-16 text-center">
            <div className="error-card max-w-md mx-auto p-8 bg-white dark:bg-zinc-800 rounded-lg border border-red-200 shadow-md">
              <span className="error-icon text-5xl">⚠️</span>
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mt-4 mb-2">Failed to load catalog</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button 
                type="button" 
                className="amazon-btn orange px-6 py-2 rounded"
                onClick={fetchProducts}
              >
                Retry Request
              </button>
            </div>
          </div>
        ) : (
          /* React Router Routes configuration */
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  products={products}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSelectProduct={(p) => navigate(`/product/${p.id}`)}
                  onAddToCart={handleAddToCart}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  products={products}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  setCurrentPage={(page) => {
                    if (page === 'home') navigate('/');
                  }}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  setCurrentPage={(page) => {
                    if (page === 'home') navigate('/');
                  }}
                  onSelectProduct={(p) => navigate(`/product/${p.id}`)}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart}
                  onEmptyCart={handleEmptyCart}
                  setCurrentPage={(page) => {
                    if (page === 'home') navigate('/');
                  }}
                />
              } 
            />
          </Routes>
        )}
      </div>

      {/* Footer Navigation */}
      <Footer 
        setCurrentPage={(page) => {
          if (page === 'home') navigate('/');
        }} 
      />

      {/* Login modal card */}
      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={setUser}
        user={user}
      />

      <style>{`
        .loading-spinner-container {
          min-height: 400px;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--border-color);
          border-top: 4px solid var(--amazon-orange);
          border-radius: 50%;
          animation: rotateSpinner 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
