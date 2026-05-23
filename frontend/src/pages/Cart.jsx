import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

// Trash-can icon component (inline SVG)
const TrashIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />
      <main className="grow pt-32 px-6 lg:px-16 max-w-7xl mx-auto w-full pb-24">
        {/* Page Header */}
        <div className="mb-16 border-b border-brand-stone pb-12 flex items-baseline justify-between animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-forest tracking-tighter">
            Your <span className="text-brand-gold italic">Cart.</span>
          </h1>
          <span className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] hidden sm:block">
            {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"} in Cart
          </span>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="py-32 text-center animate-fade-in-up">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-stone/10 transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
              <svg
                className="w-16 h-16 text-brand-stone relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-bold text-brand-forest mb-6 tracking-tight">
              Your cart is empty.
            </h2>
            <p className="text-gray-400 mb-12 max-w-md mx-auto text-lg leading-relaxed font-medium">
              You haven't added anything to your cart yet. Start shopping now!
            </p>
            <Link
              to="/shop"
              className="bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 px-16 rounded-2xl transition-all inline-block shadow-2xl text-[11px] uppercase tracking-[0.3em] active:scale-95"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ── Cart Items ── */}
            <div className="lg:col-span-12 xl:col-span-8 animate-fade-in-up">
              {/* Desktop header row */}
              <div className="hidden sm:grid grid-cols-12 gap-8 pb-6 border-b border-brand-stone text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantities</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-1"></div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="py-12 border-b border-brand-stone/30 grid grid-cols-12 gap-8 items-center group transition-all"
                >
                  {/* Image + name */}
                  <div className="col-span-12 sm:col-span-6 flex items-center">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 bg-white border border-brand-stone/30 rounded-3xl overflow-hidden shrink-0 mr-8 block shadow-sm group-hover:shadow-xl transition-all duration-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-bold font-serif text-2xl text-brand-forest hover:text-brand-gold transition-colors block mb-2 leading-tight"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                        ₹{item.numericPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-6 sm:col-span-3 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-brand-stone/50 rounded-2xl overflow-hidden h-14 bg-white/50 backdrop-blur shadow-sm">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-12 h-full flex items-center justify-center text-brand-forest hover:bg-brand-pearl transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M20 12H4"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-sm font-bold font-serif">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-12 h-full flex items-center justify-center text-brand-forest hover:bg-brand-pearl transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4v16m8-8H4"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-bold font-serif text-brand-forest text-xl">
                      ₹
                      {(item.numericPrice * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>

                  {/* DELETE button */}
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from cart"
                      className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shadow-sm hover:shadow-md"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-12">
                <Link
                  to="/shop"
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-forest hover:text-brand-gold transition-colors flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-3 transform group-hover:-translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Shop
                </Link>
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:col-span-12 xl:col-span-4 animate-fade-in-up">
              <div className="bg-white rounded-[3rem] p-12 lg:p-14 border border-brand-stone/30 shadow-2xl sticky top-32">
                <h2 className="text-3xl font-bold font-serif text-brand-forest mb-10 border-b border-brand-stone/30 pb-6">
                  Order Summary
                </h2>

                <div className="space-y-6 mb-10 text-sm font-medium">
                  <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                    <span>Subtotal</span>
                    <span className="text-brand-forest">
                      ₹{getCartTotal().toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                    <span>Shipping</span>
                    <span className="text-brand-gold">Calculated Next</span>
                  </div>
                </div>

                <div className="border-t border-brand-stone/30 pt-8 mb-12">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-2">
                        Total Amount
                      </span>
                    </div>
                    <span className="text-4xl font-serif font-bold text-brand-forest">
                      ₹{getCartTotal().toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-7 rounded-2xl transition-all shadow-2xl active:scale-95 text-[11px] uppercase tracking-[0.3em]"
                >
                  Proceed to Checkout
                </button>

                {/* Trust row */}
                <p className="text-center text-[9px] uppercase tracking-[0.2em] font-bold text-brand-stone mt-10 flex items-center justify-center opacity-60">
                  <svg
                    className="w-4 h-4 mr-3 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secure Payment Gateway
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
