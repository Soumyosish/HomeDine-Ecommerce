import axios from "axios";

const getBaseURL = () => {
  // If explicitly provided via env (e.g. for local development or specific builds)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback for Docker environment (assuming Nginx proxy at /api)
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // If we are on localhost, we prefer using the same host with /api
    // This works perfectly with the Nginx proxy in docker-compose
    return "/api";
  }

  // Fallback for AWS or other environments
  return import.meta.env.VITE_API_URL_AWS || "http://localhost:5000/api";
};

const rawBaseURL = getBaseURL();
const API = axios.create({
  baseURL: rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`,
});

API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("homedine_user");
    const user = raw ? JSON.parse(raw) : null;
    const token = user?.token;

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }
  } catch {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("homedine_user");
    }
    return Promise.reject(error);
  },
);

export default API;
