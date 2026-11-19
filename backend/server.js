
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log("--------------------------------");
  console.log("Dhanraj Portfolio Backend");
  console.log("--------------------------------");
  console.log(`Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log("--------------------------------");
});
