import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-8 bg-[#232f3e] text-white">
      {/* Back to top */}
      <div 
        className="bg-[#37475a] hover:bg-[#485769] text-center py-4 cursor-pointer text-sm font-medium"
        onClick={scrollToTop}
      >
        Back to top
      </div>

      {/* Main Footer Links */}
      <div className="flex flex-col md:flex-row justify-center py-10 px-4 md:space-x-24 space-y-8 md:space-y-0 text-sm">
        
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-base mb-2">Get to Know Us</h3>
          <p className="hover:underline cursor-pointer text-gray-300">About Us</p>
          <p className="hover:underline cursor-pointer text-gray-300">Careers</p>
          <p className="hover:underline cursor-pointer text-gray-300">Press Releases</p>
          <p className="hover:underline cursor-pointer text-gray-300">Amazon Science</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-base mb-2">Connect with Us</h3>
          <p className="hover:underline cursor-pointer text-gray-300">Facebook</p>
          <p className="hover:underline cursor-pointer text-gray-300">Twitter</p>
          <p className="hover:underline cursor-pointer text-gray-300">Instagram</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-base mb-2">Make Money with Us</h3>
          <p className="hover:underline cursor-pointer text-gray-300">Sell on Amazon</p>
          <p className="hover:underline cursor-pointer text-gray-300">Sell under Amazon Accelerator</p>
          <p className="hover:underline cursor-pointer text-gray-300">Protect and Build Your Brand</p>
          <p className="hover:underline cursor-pointer text-gray-300">Amazon Global Selling</p>
          <p className="hover:underline cursor-pointer text-gray-300">Become an Affiliate</p>
          <p className="hover:underline cursor-pointer text-gray-300">Fulfilment by Amazon</p>
          <p className="hover:underline cursor-pointer text-gray-300">Advertise Your Products</p>
          <p className="hover:underline cursor-pointer text-gray-300">Amazon Pay on Merchants</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-base mb-2">Let Us Help You</h3>
          <p className="hover:underline cursor-pointer text-gray-300">COVID-19 and Amazon</p>
          <p className="hover:underline cursor-pointer text-gray-300">Your Account</p>
          <p className="hover:underline cursor-pointer text-gray-300">Returns Centre</p>
          <p className="hover:underline cursor-pointer text-gray-300">100% Purchase Protection</p>
          <p className="hover:underline cursor-pointer text-gray-300">Amazon App Download</p>
          <p className="hover:underline cursor-pointer text-gray-300">Help</p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="bg-[#131921] py-8 border-t border-gray-700 flex flex-col items-center text-xs text-gray-300">
        
        {/* Logo area */}
        <div className="flex items-center space-x-2 mb-6 cursor-pointer">
           <img 
              className="w-20 object-contain invert"
              src="\Static\img\amazon_logo.svg" 
              alt="Amazon Logo" 
            />
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-200 mb-8 text-center px-4">
          <span className="hover:underline cursor-pointer">Australia</span>
          <span className="hover:underline cursor-pointer">Brazil</span>
          <span className="hover:underline cursor-pointer">Canada</span>
          <span className="hover:underline cursor-pointer">China</span>
          <span className="hover:underline cursor-pointer">France</span>
          <span className="hover:underline cursor-pointer">Germany</span>
          <span className="hover:underline cursor-pointer">Italy</span>
          <span className="hover:underline cursor-pointer">Japan</span>
          <span className="hover:underline cursor-pointer">Mexico</span>
          <span className="hover:underline cursor-pointer">Netherlands</span>
          <span className="hover:underline cursor-pointer">Poland</span>
          <span className="hover:underline cursor-pointer">Singapore</span>
          <span className="hover:underline cursor-pointer">Spain</span>
          <span className="hover:underline cursor-pointer">Turkey</span>
          <span className="hover:underline cursor-pointer">United Arab Emirates</span>
          <span className="hover:underline cursor-pointer">United Kingdom</span>
          <span className="hover:underline cursor-pointer">United States</span>
        </div>

        {/* Legal */}
        <div className="flex items-center space-x-6 mb-2">
          <span className="hover:underline cursor-pointer">Conditions of Use & Sale</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;