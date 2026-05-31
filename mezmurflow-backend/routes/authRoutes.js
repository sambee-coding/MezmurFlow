const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    try {

        const { name, email, password } = req.body;
        
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Create JWT
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ 
            message: "Welcome to the Haven! Your soul is registered.",
            token,
            user: { name: newUser.name, email: newUser.email }
        });

    } catch (err) {
        console.error("Signup error:", err);
        // Expose validation errors or other specific issues
        const message = err.name === 'ValidationError' 
            ? Object.values(err.errors).map(val => val.message).join(', ')
            : "Error creating account.";
        res.status(err.name === 'ValidationError' ? 400 : 500).json({ message });
    }
});

// Login route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message:'please provide all the required fields.'
            })
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Create JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ 
            message: "Success! You are signed in.",
            token,
            user: { name: user.name, email: user.email } 
        });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ message: "Server error during sign in." });
    }
});

module.exports = router;