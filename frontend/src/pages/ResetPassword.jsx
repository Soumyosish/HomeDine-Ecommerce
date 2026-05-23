import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import heroKitchen from "../assets/hero-kitchen.jpg";
import API from "../utils/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      await API.put(`/users/resetpassword/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Link may be expired.",
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
            Reset Password
          </p>
          <h2 className="text-brand-pearl text-5xl md:text-6xl font-serif font-bold leading-tight mb-8">
            New <span className="text-brand-gold italic">Password.</span>
          </h2>
          <p className="text-brand-pearl/40 text-xl font-medium leading-relaxed">
            Choose a strong password to keep your account safe and secure.
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
            {success ? (
              <div className="text-center">
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
                  Password Reset<span className="text-brand-gold">.</span>
                </h1>
                <p className="text-gray-400 font-medium mb-12 leading-relaxed">
                  Your new password has been set. We are taking you back to the
                  login page...
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-brand-forest text-brand-pearl font-bold py-6 px-12 rounded-2xl shadow-2xl hover:bg-brand-gold transition-all w-full text-[11px] uppercase tracking-[0.3em] text-center"
                >
                  Login Now
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-12 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-forest mb-6 tracking-tight text-center lg:text-left">
                    Set New{" "}
                    <span className="text-brand-gold italic">Password.</span>
                  </h1>
                  <p className="text-gray-400 font-medium text-base leading-relaxed">
                    Choose a strong password to secure your account.
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
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all shadow-inner"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 ml-4">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-[13px] font-medium transition-all shadow-inner"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 rounded-2xl shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.4em] disabled:opacity-50 mt-4"
                  >
                    {loading ? "Reseting..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
