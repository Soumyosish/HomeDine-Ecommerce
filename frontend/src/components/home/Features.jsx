import React from "react";

const Features = () => {
  const featureList = [
    {
      title: "Strong Build",
      sub: "High Quality",
      description:
        "Non-toxic materials and long-lasting finishes for your home.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      title: "Smart Design",
      sub: "Thoughtful Style",
      description: "Smart designs made to be useful and easy to use.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Safe Materials",
      sub: "Pure Quality",
      description: "Safe and strong materials like steel, glass, and ceramic.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-brand-pearl py-32 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Core Message Highlight */}
        <div className="max-w-5xl mb-24 animate-fade-in-up">
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-forest leading-[1.1] tracking-tight">
            Making <span className="italic">everyday life</span> easier with
            high-quality and{" "}
            <span className="text-brand-gold underline decoration-brand-stone underline-offset-8 decoration-1 italic">
              safe products
            </span>
            .
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col space-y-8 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 rounded-3xl bg-brand-stone/40 border border-brand-stone/60 flex items-center justify-center text-brand-forest group-hover:bg-brand-gold group-hover:text-brand-pearl group-hover:scale-110 transition-all duration-700 ease-out">
                {feature.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">
                  {feature.sub}
                </p>
                <h3 className="text-2xl font-serif font-bold text-brand-forest mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm lg:text-base font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
