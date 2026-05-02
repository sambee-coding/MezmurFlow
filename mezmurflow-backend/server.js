const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mezmurRoutes = require("./routes/mezmurRoutes");
const authRoutes = require('./routes/authRoutes');

dotenv.config();

console.log("--- Server Starting ---");
console.log("PORT:", process.env.PORT);
console.log("API KEY FOUND:", process.env.GEMINI_API_KEY ? "YES (Starts with " + process.env.GEMINI_API_KEY.substring(0, 5) + ")" : "NO");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mezmur", mezmurRoutes);
app.use("/api/auth",authRoutes);
// Health Check
app.get("/", (req, res) => {
  res.send("MezmurFlow Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
