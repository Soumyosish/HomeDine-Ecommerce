/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/home/ProductCard";
import { useCart } from "../context/CartContext";
import { categories, products as localProducts } from "../data/mockData";

const getNumericPrice = (p) => {
  if (typeof p.numericPrice === "number") return p.numericPrice;
  return Number(String(p.price || "").replace(/[^\d.]/g, "")) || 0;
};

const Shop = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("featured");

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category") || "all";
  const searchQuery = params.get("search") || "";

  const setParam = (key, value) => {
    const p = new URLSearchParams(location.search);
    if (!value || value === "all") p.delete(key);
    else p.set(key, value);
    navigate(`/shop?${p.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    let list = [...localProducts];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          String(p.name || "")
            .toLowerCase()
            .includes(q) ||
          String(p.description || "")
            .toLowerCase()
            .includes(q),
      );
    }

    if (sortBy === "price-low")
      list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
    if (sortBy === "price-high")
      list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />

      <main className="grow pt-25 px-6 lg:px-16 max-w-7xl mx-auto w-full py-20">
        <div className="mb-16 animate-fade-in-up">
          <p className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            Shop
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tighter leading-tight text-brand-forest">
            Our <br /> <span className="italic">Collection</span>
          </h1>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-brand-stone/30 rounded-4xl p-6 mb-16 animate-fade-in-up shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
            <div className="relative group flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setParam("search", e.target.value)}
                placeholder="Search the collection..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-brand-stone bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white text-sm transition-all placeholder:text-gray-400 font-medium"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-brand-gold transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setParam("category", "all")}
                className={`px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all duration-500 border ${
                  activeCategory === "all"
                    ? "bg-brand-forest text-brand-pearl border-brand-forest shadow-lg scale-105"
                    : "bg-white/50 text-gray-500 border-brand-stone hover:bg-white hover:text-brand-forest hover:border-brand-forest"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setParam("category", c.id)}
                  className={`px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all duration-500 border ${
                    activeCategory === c.id
                      ? "bg-brand-forest text-brand-pearl border-brand-forest shadow-lg scale-105"
                      : "bg-white/50 text-gray-500 border-brand-stone hover:bg-white hover:text-brand-forest hover:border-brand-forest"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-auto">
              <select
                className="w-full lg:w-auto pl-6 pr-12 py-4 rounded-xl border border-brand-stone bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold text-[10px] uppercase font-bold tracking-widest text-brand-forest appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <svg
                className="w-4 h-4 text-brand-forest absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-white/30 backdrop-blur-sm rounded-[3rem] border border-brand-stone/30 animate-fade-in-up">
            <p className="text-2xl font-serif text-brand-stone italic mb-8">
              No pieces matching your search...
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="text-brand-forest font-bold uppercase tracking-[0.3em] text-[11px] border-b border-brand-forest pb-1 hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id || product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index % 3) * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
