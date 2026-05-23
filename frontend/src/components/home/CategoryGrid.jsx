import React from "react";
import { categories } from "../../data/mockData";
import { useNavigate } from "react-router-dom";

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <section
      id="categories"
      className="py-32 px-6 lg:px-16 bg-brand-pearl overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center animate-fade-in-up">
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 text-center">
            Curated Spaces
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-forest tracking-tighter leading-tight">
            Planet-First <span className="italic">Collections</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, idx) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer aspect-10/12 animate-scale-in"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />

              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-forest/90 via-brand-forest/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  Browse collection
                </p>
                <h3 className="text-3xl font-serif font-bold text-brand-pearl mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                  {category.name}
                </h3>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 rounded-full border border-brand-pearl/30 flex items-center justify-center bg-brand-pearl/10 backdrop-blur-sm group-hover:bg-brand-pearl group-hover:text-brand-forest transition-all">
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
                  <span className="ml-4 text-[10px] font-bold uppercase tracking-widest text-brand-pearl">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
