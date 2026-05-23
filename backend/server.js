const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config(); // Fallback to default

console.log("Environment Debug:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- MONGO_URI present:", !!process.env.MONGO_URI);
console.log("- FRONTEND_URL present:", !!process.env.FRONTEND_URL);
console.log("- PORT:", process.env.PORT);

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost",
  "http://localhost:80",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://127.0.0.1",
]
  .filter(Boolean)
  .map((o) => o.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      // Check if origin is in allowed list or is a localhost variant
      const isAllowed =
        allowedOrigins.includes(normalizedOrigin) ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin);

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        // Instead of throwing an error, we just pass false to deny CORS
        // This avoids triggering the global error handler
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Basic Route
app.get("/", (req, res) => {
  res.send("HomeDine API is running...");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, db: mongoose.connection.readyState });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Backend Error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Important for Vercel serverless:
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  // Listen on 0.0.0.0 for AWS/Docker compatibility
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
}

module.exports = app;
