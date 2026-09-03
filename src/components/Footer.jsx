import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Dasy Delicious</h2>
        <p className="text-gray-400 mb-6">Delivering happiness, one meal at a time!</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="/about" className="text-gray-300 hover:text-white">About Us</a>
          <a href="/menu" className="text-gray-300 hover:text-white">Menu</a>
          <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/faq" className="text-gray-300 hover:text-white">FAQ</a>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Twitter</a>
        </div>
        <p className="text-gray-500">© {new Date().getFullYear()} Dasy Delicious. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
