import React from 'react';

function ProductCard({ id, title, image, price, mrp, discount, rating, reviewCount }) {
  const formattedPrice = new Intl.NumberFormat('en-IN').format(price);
  const formattedMRP = mrp ? new Intl.NumberFormat('en-IN').format(mrp) : null;

  return (
    <div className="flex flex-col bg-white z-10 p-3 sm:p-5 m-1 sm:m-2.5 w-full max-w-sm rounded-sm hover:shadow-lg transition-shadow duration-300">
      {/* Fix: h-[200px]→h-50, max-h-[200px]→max-h-50 */}
      <div className="h-50 w-full flex items-center justify-center mb-4 cursor-pointer">
        <img src={image} alt={title} className="max-h-50 max-w-full object-contain" />
      </div>

      <p className="text-base text-gray-800 line-clamp-3 mb-1 cursor-pointer hover:text-[#c7511f] font-medium leading-tight">
        {title}
      </p>
      
      {/* Rating Row */}
      <div className="flex items-center mb-1">
        <div className="flex text-[#f3a847] text-sm">
          {Array(Math.round(rating))
            .fill()
            .map((_, i) => (
              <span key={`filled-${i}`}>★</span>
            ))}
          {Array(5 - Math.round(rating))
            .fill()
            .map((_, i) => (
              <span key={`empty-${i}`} className="text-gray-300">★</span>
            ))}
        </div>
        <span className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer ml-2">
          {reviewCount ? reviewCount.toLocaleString('en-IN') : Math.floor(Math.random() * 5000) + 100}
        </span>
      </div>
      
      {/* Price Row */}
      <div className="flex items-end mb-1">
        <span className="text-xl font-medium mr-1">
          <small className="align-top text-xs mt-1 inline-block">₹</small>
          {formattedPrice}
        </span>
        {formattedMRP && (
          <span className="text-xs text-gray-500 line-through mb-1 ml-1">M.R.P: ₹{formattedMRP}</span>
        )}
        {discount && (
          <span className="text-xs text-red-600 mb-1 ml-2">({discount}% off)</span>
        )}
      </div>

      {/* Prime & Delivery */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center text-xs text-gray-800 mb-0.5">
          <img 
            src="/static/img/amazon_logo.svg" 
            alt="Prime" 
            className="h-3 object-contain mr-1 filter brightness-0 opacity-80" 
          />
          <span className="text-[#00a8e1] font-bold italic mr-1">prime</span>
        </div>
        <p className="text-xs text-gray-800">
          FREE Delivery by <strong>Tomorrow, 10 am</strong>
        </p>
      </div>

      <button className="bg-[#ffd814] border border-transparent rounded-full py-1.5 px-3 mt-auto text-sm text-[#111] hover:bg-[#f7ca00] shadow-sm font-medium w-full">
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;