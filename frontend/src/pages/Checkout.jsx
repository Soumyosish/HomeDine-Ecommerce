import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Enforce Login
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=checkout");
    }
  }, [user, navigate]);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'cod'
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [orderId] = useState(
    `HD-${Math.floor(100000 + Math.random() * 900000)}`,
  );

  // Shipping form values (controlled)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zip: user?.zip || "",
  });

  // Card info state
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const shipping = 40;
  const taxes = Math.round(getCartTotal() * 0.05);
  const finalTotal = getCartTotal() + shipping + taxes;

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); // numbers only
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCardInfo({ ...cardInfo, expiry: val });
  };

  const isCardValid =
    cardInfo.number.length >= 16 &&
    cardInfo.name.trim().split(/\s+/).length >= 2 &&
    /^[a-zA-Z\s]+$/.test(cardInfo.name) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiry) &&
    cardInfo.cvv.length >= 3;

  // Redirect away from empty checkout (before order is complete)
  if (cart.length === 0 && !orderComplete) {
    navigate("/cart");
    return null;
  }

  const handleShippingContinue = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
      };

      // Save directly to backend
      const { data } = await API.put("/users/profile", payload);

      // Keep auth state in sync (works whether updateUser is sync or async)
      if (updateUser) await Promise.resolve(updateUser(data));

      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save address");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (paymentMethod === "card" && !isCardValid) return;

    setError("");
    setIsProcessing(true);

    const toNumberPrice = (value) => {
      if (typeof value === "number") return value;
      return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
    };

    // FIX: cartItems -> cart
    const orderItems = cart.map((item) => ({
      name: item.name,
      qty: item.qty || item.quantity || 1,
      image: item.image,
      price: toNumberPrice(item.numericPrice ?? item.price),
      product: item._id || item.product || String(item.id),
    }));

    const payload = {
      orderItems,
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.zip,
        country: "India",
      },
      paymentMethod:
        paymentMethod === "card" ? "Credit Card" : "Cash on Delivery",
      itemsPrice: orderItems.reduce((sum, i) => sum + i.price * i.qty, 0),
      taxPrice: taxes,
      shippingPrice: shipping,
      totalPrice: finalTotal,
    };

    try {
      await API.post("/orders", payload);
      setConfirmedTotal(finalTotal);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Order Confirmed Screen ──
  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
        <Navbar />
        <main className="grow pt-32 flex items-center justify-center px-6 py-24">
          <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-brand-stone/30 max-w-2xl w-full text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-brand-pearl rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner relative group">
              <div className="absolute inset-0 bg-brand-gold/10 transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
              <svg
                className="w-12 h-12 text-brand-gold relative z-10"
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-forest mb-6 tracking-tight">
              Order Placed<span className="text-brand-gold">!</span>
            </h1>
            <p className="text-gray-400 mb-2 font-medium">
              Your order has been placed successfully and is on its way.
            </p>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-12">
              Order Ref: <span className="text-brand-gold">{orderId}</span>
              {paymentMethod === "cod" && (
                <span className="block mt-6 text-brand-forest bg-brand-pearl p-6 rounded-2xl border border-brand-stone/30">
                  Please prepare{" "}
                  <span className="text-brand-gold text-2xl px-2">
                    ₹{confirmedTotal.toLocaleString("en-IN")}
                  </span>{" "}
                  for the delivery person.
                </span>
              )}
            </p>
            <Link
              to="/shop"
              className="bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl font-bold py-6 px-12 rounded-2xl shadow-2xl transition-all inline-block w-full text-[11px] uppercase tracking-[0.3em] active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Main Checkout ──
  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />
      <main className="grow pt-32 px-6 lg:px-16 max-w-7xl mx-auto w-full pb-24">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-forest mb-16 tracking-tighter text-center md:text-left animate-fade-in-up">
          Checkout<span className="text-brand-gold italic">.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* ── Left: Forms ── */}
          <div className="lg:col-span-8 space-y-12 animate-fade-in-up">
            {/* STEP 1 — Shipping */}
            <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-stone/30 p-10 md:p-14">
              <div className="flex items-center mb-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold mr-6 text-base ${step >= 1 ? "bg-brand-forest text-brand-pearl shadow-xl" : "bg-brand-stone text-gray-400"}`}
                >
                  1
                </div>
                <h2 className="text-3xl font-bold font-serif text-brand-forest">
                  Shipping Address
                </h2>
                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="ml-auto text-[10px] text-brand-gold font-bold uppercase tracking-widest hover:text-brand-forest transition-colors"
                  >
                    Modify
                  </button>
                )}
              </div>

              {step === 1 && (
                <form
                  onSubmit={handleShippingContinue}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                      First Name
                    </label>
                    <input
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          firstName: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Priya"
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                      Last Name
                    </label>
                    <input
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          lastName: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Sharma"
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                      Home Address
                    </label>
                    <input
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          address: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Plot 42, Green Meadows"
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                      City
                    </label>
                    <input
                      required
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo((s) => ({ ...s, city: e.target.value }))
                      }
                      type="text"
                      placeholder="Bengaluru"
                      className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        State
                      </label>
                      <input
                        required
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo((s) => ({
                            ...s,
                            state: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="KA"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        Pincode
                      </label>
                      <input
                        required
                        value={shippingInfo.zip}
                        onChange={(e) =>
                          setShippingInfo((s) => ({
                            ...s,
                            zip: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="560001"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="md:col-span-2 mt-6 bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl py-6 rounded-2xl font-bold shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.3em]"
                  >
                    Proceed to Payment
                  </button>
                </form>
              )}

              {step > 1 && (
                <div className="bg-brand-pearl/50 backdrop-blur border border-brand-stone/30 px-8 py-6 rounded-2xl text-sm">
                  <p className="font-bold text-brand-forest text-lg mb-1">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </p>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.state} {shippingInfo.zip}
                  </p>
                </div>
              )}
            </div>

            {/* STEP 2 — Payment */}
            {step === 2 && (
              <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-stone/30 p-10 md:p-14 animate-fade-in-up">
                <div className="flex items-center mb-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold mr-6 text-base bg-brand-forest text-brand-pearl shadow-xl">
                    2
                  </div>
                  <h2 className="text-3xl font-bold font-serif text-brand-forest">
                    Payment Method
                  </h2>
                </div>

                {/* Payment Method Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {/* Credit Card */}
                  <label
                    className={`flex items-center p-8 rounded-4xl border transition-all cursor-pointer ${paymentMethod === "card" ? "border-brand-gold bg-brand-pearl shadow-lg scale-[1.02]" : "border-brand-stone/50 hover:border-brand-stone opacity-60 hover:opacity-100"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${paymentMethod === "card" ? "border-brand-gold" : "border-brand-stone"}`}
                    >
                      {paymentMethod === "card" && (
                        <div className="w-3 h-3 rounded-full bg-brand-gold" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-brand-forest text-sm uppercase tracking-widest">
                        Credit / Debit Card
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                        Visa, Mastercard, Rupay
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center p-8 rounded-4xl border transition-all cursor-pointer ${paymentMethod === "cod" ? "border-brand-gold bg-brand-pearl shadow-lg scale-[1.02]" : "border-brand-stone/50 hover:border-brand-stone opacity-60 hover:opacity-100"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-brand-gold" : "border-brand-stone"}`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-brand-gold" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-brand-forest text-sm uppercase tracking-widest">
                        Cash on Delivery
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                        Pay when delivered
                      </p>
                    </div>
                  </label>
                </div>

                {/* Credit Card form */}
                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fade-in-up">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardInfo.number}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            number: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength="16"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="PRIYA SHARMA"
                        value={cardInfo.name}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            name: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                          })
                        }
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={handleExpiryChange}
                        maxLength="5"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4">
                        CVV / Security Code
                      </label>
                      <input
                        type="text"
                        placeholder="•••"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            cvv: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength="3"
                        className="w-full px-6 py-5 rounded-2xl border border-brand-stone bg-brand-pearl/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-forest font-medium transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* ── COD Order Preview ── */}
                {paymentMethod === "cod" && (
                  <div className="bg-brand-pearl border border-brand-stone/30 rounded-3xl p-10 mb-12 animate-fade-in-up">
                    <h3 className="font-bold font-serif text-brand-forest text-2xl mb-8 flex items-center">
                      Order Summary
                    </h3>

                    {/* Price breakdown */}
                    <div className="space-y-4 mb-10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="text-brand-forest">
                          ₹{getCartTotal().toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-brand-forest">₹40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes (5%)</span>
                        <span className="text-brand-forest">
                          ₹{taxes.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Big highlighted total */}
                    <div className="bg-brand-forest rounded-2xl px-10 py-8 flex justify-between items-center shadow-2xl overflow-hidden relative group">
                      <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
                      <span className="text-brand-pearl font-serif italic text-lg z-10">
                        Total to Pay
                      </span>
                      <span className="text-4xl font-serif font-bold text-brand-gold z-10">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold mt-6 text-center opacity-70">
                      Please keep the exact change ready for delivery.
                    </p>
                  </div>
                )}

                {/* Place Order button */}
                <form onSubmit={handlePlaceOrder}>
                  {error && (
                    <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-red-100 mb-8">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      isProcessing || (paymentMethod === "card" && !isCardValid)
                    }
                    className={`w-full font-bold py-8 rounded-2xl transition-all flex items-center justify-center text-[11px] uppercase tracking-[0.4em] shadow-2xl
                      ${
                        !isProcessing &&
                        (paymentMethod !== "card" || isCardValid)
                          ? "bg-brand-forest hover:bg-brand-forest/90 text-brand-pearl active:scale-[0.98]"
                          : "bg-brand-stone text-gray-400 cursor-not-allowed opacity-50"
                      }`}
                  >
                    {isProcessing
                      ? "Placing Order..."
                      : paymentMethod === "cod"
                        ? `Place Order — ₹${finalTotal.toLocaleString("en-IN")}`
                        : `Pay ₹${finalTotal.toLocaleString("en-IN")}`}
                  </button>
                  {paymentMethod === "card" &&
                    !isCardValid &&
                    !isProcessing && (
                      <p className="text-center text-red-400 text-[10px] font-bold uppercase tracking-widest mt-6 animate-pulse">
                        Please enter valid card details.
                      </p>
                    )}
                </form>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary sidebar ── */}
          <div
            className="lg:col-span-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-brand-stone/30 sticky top-32">
              <h2 className="text-3xl font-bold font-serif text-brand-forest mb-10 pb-6 border-b border-brand-stone/20">
                Order Items
              </h2>

              <div className="space-y-8 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center group">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-16 h-16 bg-brand-pearl rounded-2xl overflow-hidden mr-6 shrink-0 border border-brand-stone/30 group-hover:shadow-xl transition-all duration-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000"
                      />
                    </Link>
                    <div className="grow min-w-0">
                      <p className="font-bold font-serif text-brand-forest truncate leading-tight mb-1">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-serif font-bold text-brand-forest ml-4 shrink-0 text-lg">
                      ₹
                      {(item.numericPrice * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-brand-stone/20 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-forest">
                    ₹{getCartTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brand-forest">₹40</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="text-brand-forest">
                    ₹{taxes.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="border-t border-brand-stone/20 pt-8 mt-8 flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
                  Total Amount
                </span>
                <span className="text-4xl font-serif font-bold text-brand-forest">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
