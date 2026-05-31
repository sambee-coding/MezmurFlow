
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function check() {
    try {
        console.log("Attempting to connect to:", uri.replace(/:([^@]+)@/, ":****@"));
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    } catch (err) {
        console.error("FAILURE: Could not connect to MongoDB:", err.message);
        process.exit(1);
    }
}

check();
