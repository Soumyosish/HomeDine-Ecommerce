import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-forest text-brand-pearl pt-24 pb-12 px-6 lg:px-16 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 pb-16 border-b border-white/10 mb-10">
        {/* Brand Column */}
        <div className="col-span-1 lg:col-span-1">
          <h2 className="text-4xl font-serif font-bold mb-6 tracking-tighter">
            HomeDine
          </h2>
          Quality kitchen and home products for every home. High-quality items
          for your daily needs.
          <div className="flex space-x-5 mt-6">
            <a
              href="https://www.linkedin.com/in/soumyosishpal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-stone/70 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Soumyosish"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-stone/70 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div className="lg:pl-10">
          <h3 className="text-xs font-bold mb-8 tracking-[0.2em] uppercase text-brand-gold">
            Collection
          </h3>
          <ul className="space-y-4">
            {[
              "All Products",
              "CupEco & Spoons",
              "Water Bottles",
              "Cooking Utensils",
              "Home Decor",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="/shop"
                  className="text-brand-stone/70 hover:text-brand-gold transition-all text-sm font-medium block nav-link w-fit"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h3 className="text-xs font-bold mb-8 tracking-[0.2em] uppercase text-brand-gold">
            Support
          </h3>
          <ul className="space-y-4">
            {[
              { label: "Contact Us", path: "/contact" },
              { label: "Support & FAQ", path: "/faq" },
              { label: "Order Tracking", path: "/profile" },
              { label: "Shipping Policy", path: "/faq" },
              { label: "Privacy Policy", path: "/faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-brand-stone/70 hover:text-brand-gold transition-all text-sm font-medium block nav-link w-fit"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Contact info */}
        <div className="lg:pl-5">
          <h3 className="text-xs font-bold mb-8 tracking-[0.2em] uppercase text-brand-gold">
            Connection
          </h3>
          <div className="space-y-6">
            <div className="group">
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1 opacity-60">
                General Inquiries
              </p>
              <p className="text-brand-stone hover:text-white transition-colors">
                support@homedine.in
              </p>
            </div>
            <div className="group">
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1 opacity-60">
                Partner with Us
              </p>
              <p className="text-brand-stone hover:text-white transition-colors">
                creators@homedine.in
              </p>
            </div>
            <div className="pt-4">
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-3">
                Region
              </p>
              <p className="text-brand-pearl text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                Pan India Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] text-brand-stone/40 gap-4 font-bold uppercase tracking-[0.3em]">
        <p>
          © {new Date().getFullYear()} HomeDine Studio. All rights reserved.
        </p>
        <div className="flex space-x-8">
          <span className="hover:text-brand-gold transition-colors cursor-default">
            Modern Indian Craft
          </span>
          <span>Made in 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
