import React, { useState } from "react";
import API from "../../utils/api";
import heroKitchen from "../../assets/cta-banner.jpg"; // replace with your preferred banner image if needed

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      await API.post("/contact/subscribe", { email: email.trim() });
      window.alert(
        "Subscription successful! Welcome to the HomeDine inner circle.",
      );
      setEmail("");
    } catch (err) {
      window.alert(
        err?.response?.data?.message ||
          "Subscription failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-24 pb-32 bg-brand-pearl overflow-hidden grainy">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 animate-fade-in-up">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-brand-stone/30 h-112.5">
          <img
            src={heroKitchen}
            alt="Sustainable Sanctuary"
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand-forest/80 via-brand-forest/40 to-transparent" />

          <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-center">
            <div className="max-w-xl text-brand-pearl">
              <p className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
                Our Promise
              </p>
              <h3 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tighter mb-10">
                Crafting <br /> Tomorrow's <br />{" "}
                <span className="italic text-brand-gold">Heirlooms.</span>
              </h3>
              <p className="text-brand-stone/80 text-lg font-medium leading-relaxed mb-8 hidden md:block">
                We strive for the finest quality in every artisanal piece,
                ensuring a legacy of sustainability and beauty.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter block */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            The Inner Circle
          </p>
          <h4 className="text-3xl md:text-5xl font-serif font-bold text-brand-forest leading-tight mb-12 tracking-tight">
            Subscribe for exclusive <br /> artisanal{" "}
            <span className="italic">releases</span>
          </h4>

          <form
            onSubmit={handleSubscribe}
            className="group relative flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your finest email address..."
              required
              className="w-full px-8 py-5 rounded-2xl border border-brand-stone bg-white/50 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white text-brand-forest transition-all placeholder:text-gray-400 font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-brand-forest text-brand-pearl font-bold tracking-widest text-[11px] uppercase shadow-2xl hover:bg-brand-forest/90 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? "Joining..." : "Join Private List"}
            </button>
          </form>
          <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
            Minimalist updates. Zero clutter. Pure inspiration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
