import React from 'react';

function Header() {
  return (
    <header className="flex flex-col">
      {/* Top Nav */}
      <div className="bg-[#131921] text-white flex flex-wrap items-center p-2 text-sm">
        
        {/* Logo */}
        <div className="flex items-center border border-transparent hover:border-white p-2 rounded cursor-pointer mt-1">
          <img 
            className="w-20 object-contain invert"
            src="public\Static\img\amazon_logo.svg" 
            alt="Amazon Logo" 
          />
          <span className="text-[#00a8e1] font-bold text-lg leading-3 ml-0.5 -mt-2.5">prime</span>
        </div>

        {/* Deliver To */}
        <div className="hidden md:flex items-center border border-transparent hover:border-white p-2 rounded cursor-pointer mx-2">
          <div className="flex flex-col ml-1">
            <span className="text-xs text-gray-300">Deliver to Faraz</span>
            <span className="font-bold text-sm leading-3">New Delhi 110001</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center h-10 rounded-md overflow-hidden bg-white mx-2 sm:mx-4 hover:ring-2 hover:ring-[#f3a847] w-full mt-2 sm:mt-0 order-last sm:order-0 min-w-50">
          <select className="bg-gray-100 text-gray-700 text-xs h-full px-2 border-r border-gray-300 outline-none w-auto max-w-12 md:max-w-none cursor-pointer hidden sm:block">
            <option>All</option>
          </select>
          <input className="h-full p-2 flex-1 border-none outline-none text-black" type="text" placeholder="Search Amazon.in" />
          <button className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] cursor-pointer text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center justify-evenly ml-auto sm:ml-0">
          
          <div className="hidden sm:flex flex-col border border-transparent hover:border-white p-2 rounded cursor-pointer mx-1">
            <span className="text-xs">Hello, Faraz</span>
            <span className="font-bold text-sm leading-3">Account & Lists</span>
          </div>

          <div className="hidden sm:flex flex-col border border-transparent hover:border-white p-2 rounded cursor-pointer mx-1">
            <span className="text-xs">Returns</span>
            <span className="font-bold text-sm leading-3">& Orders</span>
          </div>

          <div className="flex items-center border border-transparent hover:border-white p-2 rounded cursor-pointer mx-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-0 right-1/2 translate-x-1/2 text-[#f3a847] font-bold">0</span>
            <span className="font-bold hidden sm:block mt-3 ml-1">Cart</span>
          </div>

        </div>
      </div>

      {/* Sub Nav */}
      <div className="bg-[#232f3e] text-white flex items-center p-1 text-sm font-medium">
        <div className="flex items-center border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          All
        </div>
        <p className="border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer mx-1">Today's Deals</p>
        <p className="border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer mx-1">Customer Service</p>
        <p className="border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer mx-1 hidden sm:block">Registry</p>
        <p className="border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer mx-1 hidden sm:block">Gift Cards</p>
        <p className="border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer mx-1 hidden sm:block">Sell</p>
      </div>
    </header>
  );
}

export default Header;