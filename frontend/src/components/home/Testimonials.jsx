import React, { useState, useEffect, useCallback } from "react";

const allReviews = [
  {
    id: 1,
    text: "The quality is simply unmatched. It feels amazing to use products that are good for the planet without sacrificing aesthetics or durability. I've replaced my entire kitchen with HomeDine and the difference is night and day.",
    author: "Mukesh Sen",
    role: "Nutritionist",
    rating: 5,
    location: "Mumbai",
  },
  {
    id: 2,
    text: "I replaced all my plastic containers with HomeDine's glass jars. My pantry looks incredibly beautiful now and, more importantly, my food stays fresh much longer. Absolutely worth every rupee.",
    author: "Sonam Kapoor",
    role: "Home Chef",
    rating: 5,
    location: "Bangalore",
  },
  {
    id: 3,
    text: "Beautiful design and truly sustainable. The wooden utensils have become my absolute favourite tools in the kitchen. They're sturdy, beautiful and feel amazing in the hand.",
    author: "Priya Kumari",
    role: "Food Blogger",
    rating: 5,
    location: "Delhi",
  },
  {
    id: 4,
    text: "The bamboo floor lamp is a masterpiece. It completely transformed my living room. I've received so many compliments from guests. Shipping was fast and the packaging was completely eco-friendly.",
    author: "Arjun Sharma",
    role: "Interior Designer",
    rating: 5,
    location: "Pune",
  },
  {
    id: 5,
    text: "Ordered the AquaSip Eco Bottle and I'm obsessed. My drink stays cold for the entire day. The build quality is exceptional — feels premium, zero plastic taste, and looks gorgeous on my desk.",
    author: "Isha Rajan",
    role: "Fitness Coach",
    rating: 5,
    location: "Chennai",
  },
  {
    id: 6,
    text: "The Ceramic Coffee Mug is the best mug I've ever owned. The glaze is absolutely stunning, it keeps my chai warm for ages and I feel good knowing no chemicals leach into my drink. Worth every penny!",
    author: "Meena Krishnan",
    role: "Yoga Instructor",
    rating: 5,
    location: "Hyderabad",
  },
  {
    id: 7,
    text: "HomeDine's cast iron fry pan is a game changer. Every single dish I cook in it tastes better. The seasoning it builds over time is incredible. My family has been talking about the food non-stop.",
    author: "Rohan Mehta",
    role: "Home Cook",
    rating: 5,
    location: "Kolkata",
  },
];

const StarRating = ({ count }) => (
  <div className="flex items-center space-x-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = allReviews.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const review = allReviews[current];

  return (
    <section className="py-32 px-6 lg:px-16 bg-white overflow-hidden grainy">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Header/Context */}
        <div className="lg:w-1/3 animate-fade-in-up">
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            Reviews
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-forest tracking-tighter leading-[1.1] mb-8">
            What Our <br /> <span className="italic">Customers Say</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
            Read reviews from our happy customers across India. We care about
            your experience.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-brand-stone flex items-center justify-center text-brand-forest hover:bg-brand-forest hover:border-brand-forest hover:text-brand-pearl transition-all duration-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" strokeWidth={1.5} />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-brand-stone flex items-center justify-center text-brand-forest hover:bg-brand-forest hover:border-brand-forest hover:text-brand-pearl transition-all duration-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeWidth={1.5} />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="lg:w-2/3 relative flex items-center justify-center py-10">
          {/* Subtle Decorative Quote Icon */}
          <div className="absolute top-0 left-0 text-[180px] font-serif text-brand-stone font-bold opacity-10 leading-none pl-10 select-none">
            “
          </div>

          <div key={current} className="relative z-10 p-4 animate-scale-in">
            <StarRating count={review.rating} />
            <blockquote className="text-2xl md:text-4xl font-serif text-brand-forest leading-[1.3] mb-12 tracking-tight italic font-medium">
              "{review.text}"
            </blockquote>
            <div className="flex items-center space-x-6 border-t border-brand-stone/30 pt-10 mt-10">
              <div className="w-16 h-16 rounded-full bg-brand-stone/30 flex items-center justify-center text-brand-forest font-serif font-bold text-2xl">
                {review.author.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold text-brand-forest uppercase tracking-widest">
                  {review.author}
                </p>
                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.2em]">
                  {review.role} · {review.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
