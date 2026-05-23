import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const faqs = [
  {
    q: "Where are HomeDine products sourced from?",
    a: "All our products are handcrafted by artisans across India. We work directly with bamboo artisans in Punjab, ceramic potters in Rajasthan, and textile weavers in Gujarat. No middlemen — directly from the maker to your home.",
  },
  {
    q: "Are your products truly eco-friendly?",
    a: "Absolutely! We only use materials that are BPA-free, PFOA-free, and non-toxic. Our bamboo is sourced from FSC-certified forests, our ceramics contain no heavy metals, and our entire packaging is 100% plastic-free and recyclable.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3-7 working days, and express delivery (1-2 days) is available for select pin codes. We deliver to all major cities and towns across India.",
  },
  {
    q: "When do I qualify for free shipping?",
    a: "We offer free standard delivery on all orders above ₹5,000. For orders below this amount, a flat shipping fee of ₹99 is applicable.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "You can return or exchange any product within 30 days of delivery, no questions asked. The product must be in its original packaging and unused. We arrange the pickup for you — you don’t need to go anywhere.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes! We offer Cash on Delivery. Simply select COD at checkout and have the exact amount ready upon delivery. There are no additional COD charges.",
  },
  {
    q: "Do you offer a quality guarantee?",
    a: "Every product comes with a 1-year manufacturer warranty. If any defect arises, we will provide a free replacement. With over 50,000 satisfied customers, we never compromise on quality!",
  },
  {
    q: "What are the options for bulk orders or corporate gifting?",
    a: "Special discounts are available for orders of 50+ units. For corporate gifting, we also offer custom packaging and branding options. Fill out the contact form or email us directly — we typically respond within 24 hours.",
  },
  {
    q: "Do I need to create an account to purchase?",
    a: "No! You can always checkout as a guest. however, creating an account makes it much easier to track your orders, manage returns, and save your wishlist.",
  },
  {
    q: "Are the products dishwasher safe?",
    a: "Most of our ceramic and stainless steel products are dishwasher safe. For bamboo products, we recommend hand-washing to extend their lifespan. Full care instructions are provided on every product page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />
      <main className="grow pt-32">
        {/* Hero */}
        <div className="bg-brand-forest py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grainy opacity-10"></div>
          <p className="text-brand-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-6 relative z-10 animate-fade-in-up">
            Help Center
          </p>
          <h1
            className="text-5xl md:text-7xl font-serif font-bold text-brand-pearl mb-8 relative z-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Common <span className="text-brand-gold italic">Questions.</span>
          </h1>
          <p
            className="text-brand-pearl/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed relative z-10 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Find answers about our products, shipping, and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto px-6 py-32">
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`group rounded-4xl overflow-hidden transition-all duration-700 bg-white shadow-2xl ${openIndex === i ? "ring-1 ring-brand-gold/30" : "border border-brand-stone/20"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-8 md:px-12 py-8 flex items-center justify-between gap-6"
                >
                  <span
                    className={`font-serif font-bold text-lg md:text-xl transition-colors duration-500 ${openIndex === i ? "text-brand-gold" : "text-brand-forest"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${openIndex === i ? "bg-brand-forest text-brand-pearl rotate-180" : "bg-brand-pearl text-brand-stone border border-brand-stone/30"}`}
                  >
                    <svg
                      className="w-5 h-5"
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
                </button>
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${openIndex === i ? "max-h-125 opacity-100 pb-12" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-8 md:px-12 text-gray-400 text-base md:text-lg leading-relaxed font-medium pt-4">
                    <span className="block w-12 h-px bg-brand-gold/30 mb-6"></span>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-32 bg-brand-forest rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grainy opacity-10"></div>
            <p className="text-3xl md:text-4xl font-serif font-bold text-brand-pearl mb-6 relative z-10">
              Still Have Questions<span className="text-brand-gold">?</span>
            </p>
            <p className="text-brand-pearl/50 font-medium mb-12 max-w-xl mx-auto relative z-10">
              We are here to help you with anything you need.
            </p>
            <a
              href="/contact"
              className="relative z-10 inline-block bg-brand-gold text-brand-forest font-bold py-6 px-16 rounded-2xl shadow-2xl hover:bg-brand-pearl transition-all text-[11px] uppercase tracking-[0.4em]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
