import axios from "axios";

const getBaseURL = () => {
  // If explicitly provided via env (e.g. for local development or specific builds)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback for Docker environment or CloudFront Proxy
  // If we are NOT on localhost, we use /api to let CloudFront handle the proxy
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "/api";
  }

  // Fallback for local development
  return "http://localhost:5000/api";
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
