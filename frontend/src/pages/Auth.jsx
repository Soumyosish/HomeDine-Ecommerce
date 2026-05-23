import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroKitchen from "../assets/hero-kitchen.jpg";

// Minimal layout — no Navbar/Footer, full-screen immersive
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get("redirect")
    ? `/${new URLSearchParams(location.search).get("redirect")}`
    : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isLogin
        ? await login(email, password)
        : await register(name, email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(
          result.message || (isLogin ? "Login failed" : "Registration failed"),
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-brand-forest bg-brand-pearl grainy overflow-hidden">
      {/* LEFT — Decorative Side */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-brand-forest flex-col justify-between p-24">
        <img
          src={heroKitchen}
          alt="Sustainable kitchen"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-[3s] group-hover:opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-brand-forest via-transparent to-transparent opacity-80"></div>

        {/* Logo top-left */}
        <Link
          to="/"
          className="relative text-brand-pearl text-4xl font-serif font-bold tracking-tighter z-10 group"
        >
          HomeDine<span className="text-brand-gold animate-pulse">.</span>
        </Link>

        {/* Central Quote */}
        <div className="relative z-10 max-w-xl">
          <div className="w-16 h-px bg-brand-gold mb-10 opacity-50" />
          <h2 className="text-brand-pearl text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8 tracking-tighter">
            Quality Home <br />
            <span className="text-brand-gold">Products.</span>
          </h2>
          <p className="text-brand-pearl/50 text-xl font-medium leading-relaxed max-w-md">
            High quality items for your daily needs. Safe and beautiful products
            for every home.
          </p>
        </div>

        {/* Social proof strip at bottom */}
        <div
          className="relative z-10 flex items-center space-x-6 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex -space-x-3">
            {["JC", "RF", "EH", "AM"].map((initials, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-brand-pearl/10 border border-brand-pearl/20 flex items-center justify-center text-brand-pearl text-[10px] font-bold backdrop-blur-sm"
              >
                {initials}
              </div>
            ))}
          </div>
          <div>
            <div className="flex space-x-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-brand-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-brand-pearl/40 text-[9px] font-bold uppercase tracking-widest">
              Favoured by 50,000+ customers
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — Form Side */}
      <div className="w-full lg:w-2/5 flex flex-col min-h-screen bg-brand-pearl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-stone/20 blur-[120px] rounded-full"></div>

        {/* Mobile logo */}
        <div className="lg:hidden px-8 pt-8 relative z-20">
          <Link
            to="/"
            className="text-brand-forest text-2xl font-serif font-bold"
          >
            HomeDine
          </Link>
        </div>

        <div className="grow flex items-center justify-center px-8 sm:px-12 lg:px-20 py-24 relative z-10">
          <div className="w-full max-w-md animate-fade-in-up">
            {/* Heading */}
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold text-brand-forest mb-4 tracking-tight">
                {isLogin ? "Login" : "Sign Up"}
              </h1>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">
                {isLogin ? "Welcome back!" : "Create your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-forest mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all placeholder:text-gray-300"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-forest mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all placeholder:text-gray-300"
                  placeholder="you@luxury.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-forest">
                    Password
                  </label>
                  {isLogin && (
                    <Link
                      to="/forgot-password"
                      university-title="test"
                      className="text-[10px] text-brand-gold hover:text-brand-forest font-bold uppercase tracking-widest transition-colors"
                    >
                      Recover Password
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-5 pr-14 rounded-2xl border border-brand-stone bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all placeholder:text-gray-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-forest transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-5 rounded-2xl text-[11px] font-bold uppercase tracking-wider border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 rounded-2xl shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.25em] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-gray-400 mt-12 text-[11px] font-bold uppercase tracking-[0.2em]">
              {isLogin ? "Need an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-gold hover:text-brand-forest transition-colors ml-2"
              >
                {isLogin ? "Create Account" : "Login"}
              </button>
            </p>

            {/* Back to shop link */}
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-forest transition-colors font-bold"
              >
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
