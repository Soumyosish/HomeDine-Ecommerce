import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroKitchen from "../assets/hero-kitchen.jpg";
import API from "../utils/api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/users/forgotpassword", { email });
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-brand-forest bg-brand-pearl grainy">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-forest flex-col justify-between p-20">
        <div className="absolute inset-0 bg-grainy opacity-10"></div>
        <img
          src={heroKitchen}
          alt="HomeDine kitchen"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transform scale-110 motion-safe:animate-pulse"
        />
        <Link
          to="/"
          className="relative text-brand-pearl text-4xl font-serif font-bold z-10 tracking-tighter"
        >
          HomeDine<span className="text-brand-gold">.</span>
        </Link>
        <div className="relative z-10 max-w-lg">
          <p className="text-brand-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
            Forgot Password
          </p>
          <h2 className="text-brand-pearl text-5xl md:text-6xl font-serif font-bold leading-tight mb-8">
            Reset Your <span className="text-brand-gold italic">Password.</span>
          </h2>
          <p className="text-brand-pearl/40 text-xl font-medium leading-relaxed">
            Don't worry, it happens. Enter your email below and we'll help you
            get back into your account.
          </p>
        </div>
        <p className="relative z-10 text-brand-pearl/20 text-[10px] font-bold uppercase tracking-widest">
          © 2025 HomeDine Curations.
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex flex-col bg-brand-pearl lg:bg-transparent relative">
        <div className="lg:hidden px-8 pt-12 flex justify-center">
          <Link
            to="/"
            className="text-brand-forest text-3xl font-serif font-bold tracking-tighter"
          >
            HomeDine<span className="text-brand-gold">.</span>
          </Link>
        </div>

        <div className="grow flex items-center justify-center px-8 sm:px-12 lg:px-24 py-20 relative z-10">
          <div className="w-full max-w-md animate-fade-in-up">
            {step === 1 ? (
              <>
                <div className="mb-12">
                  <div className="w-20 h-20 bg-white border border-brand-stone/30 rounded-3xl shadow-xl flex items-center justify-center mb-10 mx-auto lg:mx-0">
                    <svg
                      className="w-8 h-8 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-forest mb-6 tracking-tight text-center lg:text-left">
                    Reset{" "}
                    <span className="text-brand-gold italic">Account.</span>
                  </h1>
                  <p className="text-gray-400 font-medium text-base leading-relaxed text-center lg:text-left">
                    Enter your registered email address. We will send you a
                    secure link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-red-100 animate-shake">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all shadow-inner"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 rounded-2xl shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.4em] disabled:opacity-50"
                  >
                    {loading ? "Checking..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              /* Step 2 — Success */
              <div className="text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-white border border-brand-stone/30 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
                  <svg
                    className="w-10 h-10 text-brand-gold"
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
                <h1 className="text-4xl font-serif font-bold text-brand-forest mb-6 tracking-tight">
                  Sent<span className="text-brand-gold">.</span>
                </h1>
                <p className="text-gray-400 font-medium mb-2 leading-relaxed">
                  A secure portal link has been sent to:
                </p>
                <p className="font-serif font-bold text-brand-gold text-2xl mb-8 leading-tight">
                  {email}
                </p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-12 leading-relaxed px-4">
                  The link expires in 30 minutes. Please check your inbox
                  promptly.
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-brand-forest text-brand-pearl font-bold py-6 px-12 rounded-2xl shadow-2xl hover:bg-brand-gold transition-all w-full text-[11px] uppercase tracking-[0.3em] text-center"
                >
                  Return to Login
                </Link>
                <button
                  onClick={() => setStep(1)}
                  className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] hover:text-brand-gold transition-colors block w-full text-center"
                >
                  Change Email
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
