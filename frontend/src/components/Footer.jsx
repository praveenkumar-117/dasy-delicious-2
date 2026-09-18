import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-zinc-900 text-white ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-3">
              Dasy Delicious
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Delicious food, fresh ingredients and great taste delivered right
              to your doorstep. Enjoy every bite with Dasy Delicious.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <a
                href="/"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Home
              </a>

              <a
                href="/menu"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Menu
              </a>

              <a
                href="/contact"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Contact
              </a>

              <a
                href="/cart"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Cart
              </a>

              <a
                href="/myorders"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                My Orders
              </a>
            </div>
          </div>

          {/* Contact / Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Get In Touch</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>📍 Delicious food, delivered to you</p>

              <p>📞 +91 98765 43210</p>

              <p>✉️ support@dasydelicious.com</p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-yellow-400 text-black font-semibold hover:bg-yellow-500 active:scale-95 transition-all duration-200"
            >
              <FaArrowUp size={13} />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Dasy Delicious. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Developed by{" "}
            <span className="text-yellow-400 font-semibold hover:bg-yellow-600">Praveen Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
