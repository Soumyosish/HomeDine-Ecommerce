/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("homedine_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("homedine_user");
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("homedine_user", JSON.stringify(user));
    else localStorage.removeItem("homedine_user");
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/users/login", { email, password });
      setUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/users", { name, email, password });
      setUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => setUser(null);

  const updateUser = async (payload) => {
    try {
      const { data } = await API.put("/users/profile", payload);
      setUser(data);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update profile",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
