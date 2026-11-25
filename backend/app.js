const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// CORS configuration
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json({ limit: "10kb" }));

// Homepage
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dhanraj Portfolio Backend is running!",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working successfully.",
  });
});

// Contact API
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = app;