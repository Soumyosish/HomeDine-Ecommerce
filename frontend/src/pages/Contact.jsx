/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import API from "../utils/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/contact", form);
      setSubmitted(true);
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-700 text-base transition-all";

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />
      <main className="grow pt-32">
        {/* Hero */}
        <div className="bg-brand-forest py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grainy opacity-10"></div>
          <p className="text-brand-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-6 relative z-10 animate-fade-in-up">
            Contact Us
          </p>
          <h1
            className="text-5xl md:text-7xl font-serif font-bold text-brand-pearl mb-8 relative z-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Get in <span className="text-brand-gold italic">Touch.</span>
          </h1>
          <p
            className="text-brand-pearl/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed relative z-10 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Have a question? We are here to help you. Send us a message and
            we'll reply as soon as possible.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-16 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-forest mb-10">
                Our Details
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: "📞",
                    label: "Call Us",
                    val: "+91 98765 43210",
                    sub: "Hours: 9 AM – 7 PM",
                  },
                  {
                    icon: "📧",
                    label: "Email Us",
                    val: "concierge@homedine.in",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: "📍",
                    label: "Visit Us",
                    val: "Sector 18, Delhi",
                    sub: "Office Address",
                  },
                ].map(({ icon, label, val, sub }) => (
                  <div key={label} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-3xl shadow-xl border border-brand-stone/30 flex items-center justify-center text-2xl shrink-0 group-hover:bg-brand-forest group-hover:text-brand-pearl transition-all duration-500">
                      {icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 text-[9px] uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      <p className="text-brand-forest font-serif font-bold text-lg">
                        {val}
                      </p>
                      <p className="font-medium text-[11px] mt-1 italic">
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-brand-forest mb-6">
                Quick Links
              </h3>
              <div className="space-y-4 font-bold text-[10px] uppercase tracking-widest">
                {[
                  ["FAQ", "/faq"],
                  ["Shop", "/shop"],
                  ["My Cart", "/cart"],
                ].map(([text, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center text-brand-forest hover:text-brand-gold transition-colors gap-3"
                  >
                    <span className="w-8 h-px bg-brand-gold opacity-30"></span>
                    {text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white border border-brand-stone/30 rounded-[3rem] p-16 md:p-24 text-center shadow-2xl animate-fade-in-up">
                <div className="w-24 h-24 bg-brand-pearl rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <svg
                    className="w-12 h-12 text-brand-gold"
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
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-forest mb-6">
                  Thank You<span className="text-brand-gold">!</span>
                </h2>
                <p className="text-gray-400 font-medium leading-relaxed mb-12">
                  Hello{" "}
                  <span className="text-brand-forest font-bold">
                    {form.name}
                  </span>
                  . We have received your message and will get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="bg-brand-forest text-brand-pearl px-12 py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-brand-gold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div
                className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-brand-stone/30 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <h2 className="text-3xl font-serif font-bold text-brand-forest mb-4">
                  Send a Message
                </h2>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                  Fill out the form below and we will get back to you soon.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                        Your Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        type="text"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                        Email Address
                      </label>
                      <input
                        required
                        value={form.email}
                        onChange={set("email")}
                        type="email"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                        Phone Number
                      </label>
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        type="tel"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                        Subject
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={set("subject")}
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select subject...</option>
                        <option value="order">Order Status</option>
                        <option value="return">Returns</option>
                        <option value="product">Product Question</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                      Message
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set("message")}
                      rows={6}
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-red-100">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 rounded-2xl shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.4em] disabled:opacity-50 mt-4"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
