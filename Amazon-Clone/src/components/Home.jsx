import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch 20 products from an external API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Map data to Amazon India specific format
        const formattedData = data.map((item) => {
          const basePriceINR = Math.round(item.price * 83); // Convert to INR roughly
          const discount = Math.floor(Math.random() * 40) + 10; // Random discount 10-50%
          const mrp = Math.round(basePriceINR / (1 - discount / 100)); // Calculate MRP based on discount
          
          return {
            id: item.id,
            title: item.title,
            price: basePriceINR,
            mrp: mrp,
            discount: discount,
            rating: item.rating.rate,
            reviewCount: item.rating.count,
            image: item.image,
            category: item.category,
          };
        });
        setProducts(formattedData);
      });
  }, []);

  return (
    <div className="flex justify-center mx-auto  max-w-screen-2xl">
      <div className="w-full relative">
        <img
          className="w-full lg:h-150 h-75 object-cover md:object-top -z-1 -mb-12.5 sm:-mb-37.5 mask-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"
          src="\public\Static\img\banner.jpg"
          alt="Banner"
        />

        {/* Dynamic Product Grid */}
        <div className="flex z-1 mx-1.25 flex-wrap justify-center px-1 sm:px-4">
          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                mrp={product.mrp}
                discount={product.discount}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.image}
              />
            </div>
          ))}
          
          {/* Skeleton loading state if products haven't loaded */}
          {products.length === 0 && (
            <div className="w-full text-center py-20 text-white font-bold text-xl">
              Loading Products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;