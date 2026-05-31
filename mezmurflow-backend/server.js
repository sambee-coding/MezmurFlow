const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mezmurRoutes = require("./routes/mezmurRoutes");
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

dotenv.config();

console.log("--- Server Starting ---");
console.log("PORT:", process.env.PORT);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log("CONNECTED TO MONGODB ATLAS"))
    .catch((err) => console.error("COULD NOT CONNECT TO MONGODB:", err));

console.log("API KEY FOUND:", process.env.GEMINI_API_KEY ? "YES (Starts with " + process.env.GEMINI_API_KEY.substring(0, 5) + ")" : "NO");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'] : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/mezmur", mezmurRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/favorites", favoriteRoutes);
// Health Check
app.get("/", (req, res) => {
  res.send("MezmurFlow Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
