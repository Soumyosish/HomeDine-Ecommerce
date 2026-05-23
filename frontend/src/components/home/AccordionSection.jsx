import React, { useState } from "react";
import { faqItems } from "../../data/mockData";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      className={`border-b border-brand-stone/30 py-8 transition-all duration-700 ${isOpen ? "px-8 bg-brand-stone/10 rounded-3xl mb-4 border-transparent" : "px-0 bg-transparent"}`}
    >
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <h3
          className={`text-2xl md:text-3xl font-serif font-bold transition-all duration-500 ${isOpen ? "text-brand-forest" : "text-gray-400 group-hover:text-brand-forest"}`}
        >
          {title}
        </h3>
        <span
          className={`ml-6 shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${isOpen ? "bg-brand-gold border-brand-gold text-brand-pearl rotate-180" : "border-brand-stone text-gray-400 group-hover:border-brand-forest group-hover:text-brand-forest"}`}
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
              d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"}
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "max-h-96 opacity-100 mt-8" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 leading-relaxed pr-12 text-sm md:text-base font-medium">
          {content}
        </p>
      </div>
    </div>
  );
};

const AccordionSection = () => {
  const [openId, setOpenId] = useState(faqItems[0].id);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-32 px-6 lg:px-16 bg-brand-pearl overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24 animate-fade-in-up">
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 text-center">
            Quality
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-forest tracking-tighter leading-tight mb-8">
            Made for <span className="italic">Your Home</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We care about quality and the environment. Each product is made
            carefully to last for a long time.
          </p>
        </div>

        <div className="border-t border-brand-stone/30 animate-fade-in-up">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              title={item.title}
              content={item.content}
              isOpen={openId === item.id}
              onClick={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
