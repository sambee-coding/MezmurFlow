const express = require('express');
const router = express.Router();

// This is a "Mock" database since we don't have a database yet
const USERS = [
    { name: "Admin", email: "test@gmail.com", password: "123" }
];

// Signup route
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = USERS.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
    }

    // Add to our mock database
    USERS.push({ name, email, password });
    console.log("NEW USER REGISTERED:", name, email);
    
    res.status(201).json({ message: "Welcome to the Haven!" });
});

// Login route
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    
    console.log("SIGN IN ATTEMPT:", email);

    // Find the user in our mock array
    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({ 
            message: "Success! You are signed in.",
            user: { name: user.name, email: user.email } 
        });
    } else {
        res.status(401).json({ 
            message: "Invalid email or password. Please try again." 
        });
    }
});

module.exports = router;