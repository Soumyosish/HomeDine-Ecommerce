import React from "react";
import { useNavigate } from "react-router-dom";
import heroKitchen from "../../assets/hero-kitchen.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <section className="relative w-full min-h-[90vh] lg:h-screen flex items-center bg-brand-pearl overflow-hidden pt-24 pb-12 lg:py-0">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-brand-stone/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-stone/30 border border-brand-stone/50 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-forest/60">
                Quality Home Essentials
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-forest leading-[0.95] mb-8 tracking-tighter">
              Beautiful Home, <br />
              <span className="italic text-brand-gold">Better</span> Life
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-sans max-w-xl">
              Quality kitchen and home products designed for your daily needs.
              Durable, safe, and built to last.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button
                onClick={() => navigate("/shop")}
                className="w-full sm:w-auto bg-brand-forest text-brand-pearl font-bold py-5 px-10 rounded-2xl shadow-2xl hover:bg-brand-forest/90 hover:scale-105 transition-all duration-500 group flex items-center justify-center uppercase tracking-widest text-xs"
              >
                View Collection
                <svg
                  className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform"
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
              </button>

              <button
                onClick={() => scrollToSection("categories")}
                className="w-full sm:w-auto text-brand-forest font-bold py-5 px-10 rounded-2xl border border-brand-stone hover:bg-brand-stone/20 transition-all uppercase tracking-widest text-xs"
              >
                Our Story
              </button>
            </div>
          </div>

          {/* Visual Bento Grid */}
          <div className="lg:col-span-6 relative h-125 lg:h-162.5 animate-scale-in">
            {/* Main Large Image */}
            <div className="absolute top-0 right-0 w-[85%] h-[80%] rounded-4xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={heroKitchen}
                alt="Luxury Organic Kitchen"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-0 left-0 w-[45%] h-[45%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white animate-float z-20">
              <div className="w-full h-full bg-brand-stone flex items-center justify-center p-8 bg-hero-pattern">
                <div className="text-center">
                  <p className="text-4xl font-serif font-bold text-brand-forest mb-1">
                    98%
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-brand-forest/60">
                    Best Quality Products
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="absolute top-[15%] left-[-10%] bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/40 flex items-center space-x-4 z-30 transition-transform hover:-rotate-3 cursor-default md:flex">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-pearl shadow-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="pr-4">
                <p className="text-xs font-bold text-brand-forest uppercase tracking-widest mb-0.5">
                  Safe & Reliable
                </p>
                <p className="text-[10px] text-gray-500">
                  Quality Checked Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
