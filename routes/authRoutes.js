const express = require("express");  
const asyncHandler = require("express-async-handler");  
const jwt = require("jsonwebtoken");  
const User = require("../models/User"); // Assuming the User model is defined  
const router = express.Router();  

// Register a new user  
router.post("/register", asyncHandler(async (req, res) => {  
    const { username, password } = req.body;  
    if (!username || !password) {  
        return res.status(400).json({ message: "Username and password are required." });  
    }  

    const newUser = new User({ username, password });
    await newUser.save();  
    
    res.status(201).json({ message: "User registered successfully" });  
}));  

// Login a user  
router.post("/login", asyncHandler(async (req, res) => {  
    const { username, password } = req.body;  

    const user = await User.findOne({ username });  
    if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ message: "Invalid Credentials" });  
    }  

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });  
    res.json({ message: "Login successful", token });  
}));  

module.exports = router;  