import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const cartCount = getCartCount();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  // Smooth scroll to a section ID — works on any page
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      // Navigate to home, then scroll after page loads
      navigate("/");
      // Delay gives home page time to mount
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 350);
    } else {
      // Already on home, just scroll
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full glass-nav grainy z-50 py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Left Navigation */}
      <div className="hidden md:flex items-center space-x-10">
        <Link
          to="/shop"
          className={`font-semibold tracking-wide text-sm uppercase transition-all nav-link ${isActive("/shop") ? "text-brand-forest" : "text-gray-600 hover:text-brand-forest"}`}
        >
          Shop
        </Link>
        <button
          onClick={() => scrollToSection("bestsellers")}
          className="font-semibold tracking-wide text-sm uppercase text-gray-600 hover:text-brand-forest transition-all nav-link"
        >
          Bestsellers
        </button>
        <button
          onClick={() => scrollToSection("categories")}
          className="font-semibold tracking-wide text-sm uppercase text-gray-600 hover:text-brand-forest transition-all nav-link"
        >
          Categories
        </button>
      </div>

      {/* Center Logo */}
      <div className="flex-1 md:flex-none text-center">
        <Link
          to="/"
          className="text-3xl font-bold text-brand-forest tracking-tighter font-serif transition-transform hover:scale-105 inline-block"
        >
          HomeDine
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        <div className="hidden relative lg:block">
          <input
            type="text"
            placeholder="Search collection..."
            className="pl-10 pr-4 py-2 rounded-full border border-brand-stone/50 bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white text-xs w-44 transition-all placeholder:text-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* User Profile / Login */}
        <div className="relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 text-brand-forest group"
              >
                <div className="w-9 h-9 rounded-full bg-brand-stone/30 border border-brand-stone/60 flex items-center justify-center text-brand-forest font-bold text-xs group-hover:bg-brand-stone/50 transition-colors">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-stone/50 py-3 top-full z-50 animate-scale-in">
                  <div className="px-5 py-3 border-b border-brand-stone/30 mb-2">
                    <p className="text-sm font-bold text-brand-forest truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-brand-stone/20 hover:text-brand-forest transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-brand-stone/20 hover:text-brand-forest transition-colors"
                  >
                    My Cart
                  </Link>
                  <div className="mt-2 pt-2 border-t border-brand-stone/30">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-5 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-brand-forest hover:scale-110 transition-transform"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="relative p-1 text-brand-forest hover:scale-110 transition-all group"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-forest text-brand-pearl text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1 text-brand-forest flex flex-col items-center justify-center space-y-1 w-6 h-6"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`block w-full h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[5.5px]" : ""}`}
          ></span>
          <span
            className={`block w-full h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-full h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-pearl/95 backdrop-blur-xl border-b border-brand-stone/50 md:hidden p-8 flex flex-col space-y-6 z-40 animate-fade-in-up">
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-bold text-brand-forest"
          >
            Shop All
          </Link>
          <button
            onClick={() => scrollToSection("bestsellers")}
            className="text-xl font-medium text-gray-700 text-left"
          >
            Bestsellers
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="text-xl font-medium text-gray-700 text-left"
          >
            Categories
          </button>
          <div className="pt-6 border-t border-brand-stone/30 flex flex-col space-y-4">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-semibold text-gray-500"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-semibold text-gray-500"
            >
              Support & FAQ
            </Link>
          </div>
          {user ? (
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-forest text-brand-pearl px-6 py-4 rounded-xl text-center font-bold"
            >
              My Account
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-forest text-brand-pearl px-6 py-4 rounded-xl text-center font-bold"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
