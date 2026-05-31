import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#eaeded] min-h-screen">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
