/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveErr("");
    setSaveMsg("");

    try {
      const { data } = await API.put("/users/profile", {
        name: editData.name,
        email: editData.email,
      });

      await Promise.resolve(updateUser(data));
      setEditData({ name: data.name || "", email: data.email || "" });
      setIsEditing(false);
      setSaveMsg("Profile updated successfully.");
    } catch (err) {
      setSaveErr(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSaveErr("");
    setSaveMsg("");

    try {
      const { data } = await API.put("/users/profile", {
        address: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        zip: newAddress.zip,
      });

      await Promise.resolve(updateUser(data));
      setIsAddingAddress(false);
      setNewAddress({ address: "", city: "", state: "", zip: "" });
      setSaveMsg("Address saved successfully.");
    } catch (err) {
      setSaveErr(err?.response?.data?.message || "Failed to save address");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-forest bg-brand-pearl grainy">
      <Navbar />
      <main className="grow pt-32 px-6 lg:px-16 max-w-7xl mx-auto w-full pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-brand-stone/30 pb-10 animate-fade-in-up">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-forest mb-4 tracking-tighter">
              My <span className="text-brand-gold italic">Profile.</span>
            </h1>
            <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">
              Manage your profile and orders
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] border border-brand-stone rounded-2xl px-8 py-4 mt-6 md:mt-0 hover:bg-brand-forest hover:text-brand-pearl transition-all shadow-xl active:scale-95"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="md:col-span-1 space-y-10 animate-fade-in-up">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-brand-stone/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full"></div>
              <div className="flex items-center space-x-6 mb-10 relative z-10">
                <div className="w-20 h-20 rounded-full bg-brand-pearl border border-brand-stone/30 flex items-center justify-center text-brand-gold text-3xl font-serif font-bold shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-forest leading-tight">
                    {user.name}
                  </h2>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-1">
                    Customer since 2025
                  </p>
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="grow bg-green-800 text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="grow border border-gray-300 py-2 rounded-lg text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-1">
                      Password
                    </p>
                    <p className="text-gray-900 font-medium tracking-widest">
                      ••••••••
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 text-green-700 font-semibold text-sm hover:underline"
                  >
                    Edit Profile Info
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-brand-stone/30">
              <h3 className="text-2xl font-serif font-bold text-brand-forest mb-8">
                Saved Addresses
              </h3>

              {isAddingAddress ? (
                <form onSubmit={handleSaveAddress} className="space-y-4 mb-4">
                  <input
                    required
                    type="text"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-brand-stone bg-brand-pearl/50 rounded-2xl text-[13px] font-medium"
                  />
                  <input
                    required
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-brand-stone bg-brand-pearl/50 rounded-2xl text-[13px] font-medium"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="px-5 py-4 border border-brand-stone bg-brand-pearl/50 rounded-2xl text-[13px] font-medium"
                    />
                    <input
                      required
                      type="text"
                      placeholder="ZIP"
                      value={newAddress.zip}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, zip: e.target.value })
                      }
                      className="px-5 py-4 border border-brand-stone bg-brand-pearl/50 rounded-2xl text-[13px] font-medium"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="grow bg-brand-forest text-brand-pearl py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="grow border border-brand-stone py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {user.address ? (
                    <div className="p-8 border border-brand-stone/30 rounded-2xl bg-brand-pearl/30 text-sm text-gray-500 mb-8 font-medium leading-relaxed relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                      </div>
                      <p className="font-serif font-bold text-brand-forest text-lg mb-2">
                        Home Address
                      </p>
                      <p className="mb-1">{user.name}</p>
                      <p className="mb-1">{user.address}</p>
                      <p>
                        {user.city}, {user.state} {user.zip}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed italic">
                      No saved addresses found.
                    </p>
                  )}
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="text-brand-gold font-bold text-[10px] uppercase tracking-[0.2em] hover:text-brand-forest transition-colors flex items-center"
                  >
                    + Add New Address
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Order History */}
          <div
            className="md:col-span-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-brand-stone/30 h-full">
              <h2 className="text-4xl font-serif font-bold text-brand-forest mb-12">
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-20 bg-brand-pearl/30 rounded-4xl border border-brand-stone/20">
                  <p className="text-gray-400 font-serif italic text-xl mb-8">
                    {loading
                      ? "Loading orders..."
                      : "You haven't placed any orders yet."}
                  </p>
                  {!loading && (
                    <button
                      onClick={() => navigate("/shop")}
                      className="bg-brand-forest text-brand-pearl px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-brand-gold transition-all"
                    >
                      Start Shopping
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-stone/20 text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                        <th className="pb-6">Order ID</th>
                        <th className="pb-6">Date</th>
                        <th className="pb-6 text-center">Status</th>
                        <th className="pb-6">Price</th>
                        <th className="pb-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-stone/10">
                      {orders.map((order) => (
                        <tr key={order._id} className="group">
                          <td className="py-8">
                            <p className="font-serif font-bold text-brand-forest group-hover:text-brand-gold transition-colors">
                              {order._id.slice(-6).toUpperCase()}
                            </p>
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1 block">
                              {order.orderItems.length} items
                            </span>
                          </td>
                          <td className="py-8 text-gray-500 font-medium">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="py-8 text-center">
                            <span
                              className={`py-2 px-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest inline-block ${order.isPaid ? "bg-brand-stone/20 text-brand-forest" : "bg-brand-gold/10 text-brand-gold"}`}
                            >
                              {order.isPaid ? "Paid" : "Pending"}
                            </span>
                          </td>
                          <td className="py-8 font-serif font-bold text-brand-forest text-lg">
                            ₹{order.totalPrice.toLocaleString()}
                          </td>
                          <td className="py-8 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-brand-gold hover:text-brand-forest font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center ml-auto"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-brand-forest/60 backdrop-blur-md z-100 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-in relative border border-brand-stone/30">
              <div className="p-10 border-b border-brand-stone/10 flex justify-between items-start bg-brand-pearl/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-serif font-bold text-brand-forest mb-2">
                    Order Details
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    Ref:{" "}
                    <span className="text-brand-gold">
                      {selectedOrder._id.toUpperCase()}
                    </span>{" "}
                    · {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-4 hover:bg-brand-pearl rounded-full transition-all group relative z-10"
                >
                  <svg
                    className="w-6 h-6 text-brand-forest group-hover:rotate-90 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-10 md:p-14 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-10">
                  {selectedOrder.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center group"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-brand-pearl rounded-2xl border border-brand-stone/20 overflow-hidden shrink-0 group-hover:shadow-lg transition-all duration-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-brand-forest text-lg leading-tight mb-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Qty: {item.qty} × ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-serif font-bold text-brand-forest text-xl">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-brand-stone/10 pt-10 space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <span>Items</span>
                      <span className="text-brand-forest">
                        ₹{selectedOrder.itemsPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <span>Shipping</span>
                      <span className="text-brand-forest">
                        ₹{selectedOrder.shippingPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <span>Taxes</span>
                      <span className="text-brand-forest">
                        ₹{selectedOrder.taxPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-brand-stone/10">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Total Price
                      </span>
                      <span className="text-4xl font-serif font-bold text-brand-forest">
                        ₹{selectedOrder.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-brand-pearl/20 text-center border-t border-brand-stone/10">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-brand-forest text-brand-pearl font-bold py-6 px-16 rounded-2xl shadow-2xl hover:bg-brand-gold transition-all text-[11px] uppercase tracking-[0.3em]"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
