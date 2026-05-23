/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { products as localProducts } from "../../data/mockData";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Take exactly 3 products for the homepage grid from local data
    setProducts(localProducts.slice(0, 3));
    setLoading(false);
  }, []);

  return (
    <section
      id="bestsellers"
      className="py-32 px-6 lg:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 animate-fade-in-up">
          <div className="max-w-2xl mb-10 lg:mb-0">
            <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              The Essentials
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-forest tracking-tighter leading-tight">
              Honest Crafted <br /> <span className="italic">Bestsellers</span>
              <span className="text-brand-gold ml-2 font-serif text-5xl">
                .
              </span>
            </h2>
            <p className="text-gray-500 mt-8 text-lg font-medium leading-relaxed max-w-lg">
              Explore our best-selling items — built for everyday life.
            </p>
          </div>

          <Link to="/shop" className="group flex flex-col items-end">
            <div className="flex items-center text-brand-forest font-bold mb-1 tracking-widest text-[11px] uppercase group-hover:text-brand-gold transition-colors">
              View All Products
              <svg
                className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
            <div className="w-full h-[1.5px] bg-brand-forest/20 group-hover:bg-brand-gold/40 transition-colors"></div>
          </Link>
        </div>

        {/* 3-column grid – exactly 3 products */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {products.map((product, index) => (
              <div
                key={product._id || product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-20 lg:hidden flex justify-center">
          <Link
            to="/shop"
            className="w-full bg-brand-forest text-brand-pearl font-bold py-6 px-10 rounded-2xl shadow-xl flex items-center justify-center uppercase tracking-widest text-xs hover:bg-brand-forest/90 transition-all"
          >
            Shop All Products
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
