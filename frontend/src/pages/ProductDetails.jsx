/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import API from "../utils/api";
import { products as localProducts } from "../data/mockData";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [localReviews, setLocalReviews] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const productId = id;
    const foundProduct = localProducts.find(
      (p) => String(p._id || p.id) === String(productId),
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);

      const key = `hd_reviews_${foundProduct._id || foundProduct.id}`;
      const saved = localStorage.getItem(key);
      setLocalReviews(saved ? JSON.parse(saved) : []);
    } else {
      setError("Product Not Found.");
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-pearl flex flex-col items-center justify-center grainy">
        <Navbar />
        <div className="w-20 h-20 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-8"></div>
        <p className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">
          Loading Details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-pearl text-brand-forest grainy">
        <Navbar />
        <main className="pt-48 pb-20 px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-5xl font-serif font-bold mb-8">
            Product <span className="text-brand-gold italic">Not Found.</span>
          </h2>
          <p className="text-gray-400 font-medium mb-12 leading-relaxed">
            This product is not available right now. Please check our other
            items.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-12 py-5 rounded-2xl bg-brand-forest text-brand-pearl font-bold uppercase tracking-widest text-[11px] shadow-2xl hover:bg-brand-gold transition-all"
          >
            Go to Shop
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const unitPrice =
    typeof product.numericPrice === "number"
      ? product.numericPrice
      : Number(String(product.price).replace(/[^\d.]/g, "")) || 0;

  const total = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const defaultLongDescription = `${product.name} is made for your daily needs. 
It is strong, durable, and looks beautiful in your home. We use natural materials to make sure it is safe and long-lasting. 
Whether for your kitchen or as a gift, this product is a great choice for any home.`;

  const descriptionText = product.longDescription || defaultLongDescription;

  const baseReviews = Array.isArray(product.reviews) ? product.reviews : [];
  const allReviews = [...localReviews, ...baseReviews];

  const avgRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((s, r) => s + Number(r.rating || 0), 0) /
          allReviews.length
        ).toFixed(1)
      : (product.rating || 4.7).toFixed(1);

  const reviewCount = allReviews.length;
  const ratingNumber = Number(avgRating) || 0;
  const ratingPercent = Math.min(100, Math.max(0, (ratingNumber / 5) * 100));

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    const newReview = {
      name: reviewName.trim(),
      text: reviewText.trim(),
      rating: Number(reviewRating),
      date: new Date().toISOString(),
    };

    const updated = [newReview, ...localReviews];
    setLocalReviews(updated);
    localStorage.setItem(
      `hd_reviews_${product._id || product.id}`,
      JSON.stringify(updated),
    );

    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  };

  return (
    <div className="min-h-screen bg-brand-pearl text-brand-forest grainy">
      <Navbar />

      <main className="pt-32 pb-24 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Breadcrumbs & Navigation */}
        <div className="mb-12 flex items-center justify-between gap-3 animate-fade-in-up">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
            <Link to="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <span className="mx-3">/</span>
            <Link
              to="/shop"
              className="hover:text-brand-gold transition-colors"
            >
              Shop
            </Link>
            <span className="mx-3">/</span>
            <span className="text-brand-forest">{product.name}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-forest hover:text-brand-gold transition-colors"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeWidth={1.5}
                stroke="currentColor"
              />
            </svg>
            Back to Shop
          </button>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <div className="relative group animate-scale-in">
            <div className="absolute inset-0 bg-brand-stone/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative bg-white rounded-[3rem] p-12 lg:p-16 border border-brand-stone/30 shadow-2xl flex items-center justify-center overflow-hidden h-125 lg:h-162.5">
              <div className="absolute top-10 right-10 w-24 h-24 border border-brand-gold/20 rounded-full animate-float opacity-30"></div>
              <div
                className="absolute bottom-20 left-10 w-16 h-16 bg-brand-stone/10 rounded-full animate-float opacity-20"
                style={{ animationDelay: "1s" }}
              ></div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-12 transform hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          <div className="animate-fade-in-up">
            <p className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-6">
              Premium Quality
            </p>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tighter text-brand-forest mb-8">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-4xl md:text-5xl font-serif font-bold text-brand-forest">
                {unitPrice
                  ? `₹${unitPrice.toLocaleString("en-IN")}`
                  : product.price}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Inclusive of all taxes
              </span>
            </div>

            <div className="flex items-center gap-4 mb-10 text-[11px] font-bold uppercase tracking-widest text-brand-forest">
              <div className="flex text-brand-gold">★ {avgRating} / 5</div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400">
                {allReviews.length || 1} Customer Reviews
              </span>
            </div>

            <div className="flex items-center gap-8 mb-12">
              <div className="flex items-center bg-white rounded-2xl border border-brand-stone/50 p-2 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-brand-forest hover:bg-brand-pearl transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                <span className="w-12 text-center font-bold font-serif text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-brand-forest hover:bg-brand-pearl transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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

              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                  Total Price
                </span>
                <span className="text-2xl font-serif font-bold text-brand-forest">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAdd}
                className="flex-1 py-6 rounded-2xl bg-brand-forest text-brand-pearl font-bold tracking-[0.2em] text-[11px] uppercase shadow-2xl hover:bg-brand-forest/90 transition-all active:scale-95"
              >
                Add to Cart
              </button>
              <Link
                to="/shop"
                className="flex-1 py-6 rounded-2xl border border-brand-stone text-brand-forest text-center font-bold tracking-[0.2em] text-[11px] uppercase hover:bg-white transition-all"
              >
                View All Products
              </Link>
            </div>

            {added && (
              <p className="mt-8 text-[10px] uppercase font-bold tracking-widest text-brand-gold animate-bounce">
                Added to your cart.
              </p>
            )}
          </div>
        </div>

        <section className="bg-white rounded-[3rem] border border-brand-stone/30 shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="flex flex-col md:flex-row border-b border-brand-stone/30">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 py-8 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                activeTab === "description"
                  ? "bg-brand-forest text-brand-pearl"
                  : "bg-white text-gray-400 hover:text-brand-forest hover:bg-brand-stone/10"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-8 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                activeTab === "details"
                  ? "bg-brand-forest text-brand-pearl"
                  : "bg-white text-gray-400 hover:text-brand-forest hover:bg-brand-stone/10"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-8 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                activeTab === "reviews"
                  ? "bg-brand-forest text-brand-pearl"
                  : "bg-white text-gray-400 hover:text-brand-forest hover:bg-brand-stone/10"
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="p-12 lg:p-16">
            {activeTab === "description" && (
              <div className="space-y-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                    <p>{descriptionText}</p>
                  </div>
                  <div className="bg-brand-pearl p-12 rounded-4xl border border-brand-stone/30">
                    <h4 className="text-2xl font-serif font-bold text-brand-forest mb-8">
                      Environmental Impact
                    </h4>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4">
                        <span className="text-brand-gold font-serif text-2xl">
                          01.
                        </span>
                        <p className="text-sm font-medium text-gray-600 italic">
                          Made from natural and safe materials.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-brand-gold font-serif text-2xl">
                          02.
                        </span>
                        <p className="text-sm font-medium text-gray-600 italic">
                          High quality build and finish.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-brand-gold font-serif text-2xl">
                          03.
                        </span>
                        <p className="text-sm font-medium text-gray-600 italic">
                          Built to last for a long time.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "Material", val: "High-quality safe materials" },
                  { label: "Finish", val: "Smooth and safe finish" },
                  { label: "Origin", val: "Handmade in India" },
                  { label: "Durability", val: "Made for daily use" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-10 rounded-4xl border border-brand-stone/30 bg-brand-pearl/30 group hover:bg-brand-forest transition-all duration-700"
                  >
                    <p className="text-[9px] uppercase tracking-widest text-brand-gold font-bold mb-4 group-hover:text-brand-pearl/60 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-lg font-serif font-bold text-brand-forest group-hover:text-brand-pearl transition-colors">
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl mx-auto py-10">
                <form
                  onSubmit={submitReview}
                  className="rounded-4xl border border-brand-stone/30 bg-brand-pearl/20 p-12 space-y-8 shadow-inner"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-brand-stone/30 pb-8">
                    <h4 className="text-3xl font-serif font-bold text-brand-forest">
                      User Review
                    </h4>
                    <span className="text-[10px] px-4 py-2 rounded-full border border-brand-gold text-brand-gold font-bold uppercase tracking-widest">
                      Authenticity Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating || reviewRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setReviewRating(star)}
                          className={`text-3xl leading-none transition-all duration-500 hover:scale-125 ${
                            active ? "text-brand-gold" : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      );
                    })}
                    <span className="ml-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      Rating: {reviewRating} / 5
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <input
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your Name..."
                      className="w-full px-8 py-5 rounded-2xl border border-brand-stone bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white text-brand-forest transition-all placeholder:text-gray-400 font-medium"
                      required
                    />
                    <input
                      value={product.name}
                      readOnly
                      className="w-full px-8 py-5 rounded-2xl border border-brand-stone bg-brand-stone/10 text-gray-500 cursor-not-allowed font-medium"
                    />
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what you think about this product..."
                    className="w-full px-8 py-5 rounded-2xl border border-brand-stone bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white text-brand-forest transition-all placeholder:text-gray-400 font-medium min-h-37.5"
                    required
                  />

                  <button className="w-full py-6 rounded-2xl bg-brand-forest text-brand-pearl font-bold tracking-[0.2em] text-[11px] uppercase shadow-2xl hover:bg-brand-forest/90 transition-all">
                    Post Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
