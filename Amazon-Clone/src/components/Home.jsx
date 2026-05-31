import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => {
          const basePriceINR = Math.round(item.price * 83);
          const discount = Math.floor(Math.random() * 40) + 10;
          const mrp = Math.round(basePriceINR / (1 - discount / 100));
          
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
    <div className="flex justify-center mx-auto max-w-screen-2xl">
      <div className="w-full relative">
        {/* Fixes: lg:h-[600px]→lg:h-150, h-[300px]→h-75, mb-[-50px]→-mb-12.5,
            sm:mb-[-150px]→sm:-mb-37.5, z-[-1]→-z-1, mx-[5px]→mx-1.25
            mask-image arbitrary→mask-[linear-gradient(...)] canonical form */}
        <img
          className="w-full lg:h-150 h-75 object-cover md:object-top -z-1 -mb-12.5 sm:-mb-37.5 mask-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"
        />

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