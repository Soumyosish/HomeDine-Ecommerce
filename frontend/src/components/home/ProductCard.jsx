import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col bg-white rounded-4xl overflow-hidden transition-all duration-700 hover:shadow-2xl border border-brand-stone/30">
      {/* Image container */}
      <Link
        to={`/product/${product._id || product.id}`}
        className="relative block overflow-hidden bg-brand-pearl h-72"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.badges &&
            product.badges.map((badge, index) => (
              <span
                key={index}
                className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md
                ${
                  badge.toLowerCase() === "new"
                    ? "bg-brand-forest text-brand-pearl"
                    : badge.toLowerCase() === "promotion"
                      ? "bg-brand-gold text-brand-pearl"
                      : badge.toLowerCase() === "limited edition"
                        ? "bg-brand-stone text-brand-forest"
                        : "bg-white/80 text-brand-forest"
                }`}
              >
                {badge}
              </span>
            ))}
        </div>

        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-brand-forest/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </Link>

      {/* Product info */}
      <div className="p-8 flex flex-col grow relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-1">
              Premium Product
            </p>
            <Link to={`/product/${product._id || product.id}`}>
              <h3 className="text-xl font-serif font-bold text-brand-forest group-hover:text-brand-gold transition-colors duration-500 line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          ₹
          {typeof product.price === "number"
            ? product.price.toLocaleString("en-IN")
            : String(product.price).replace(/[^\d,]/g, "")}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-8 font-medium leading-relaxed">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full py-4 rounded-xl bg-brand-forest text-brand-pearl font-bold tracking-widest text-[11px] uppercase shadow-lg hover:bg-brand-forest/90 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
