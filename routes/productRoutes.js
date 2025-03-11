const express = require("express");  
const router = express.Router();  
const Product = require("../models/Product");  
const asyncHandler = require("express-async-handler");  

// Get all products  
router.get("/", asyncHandler(async (req, res) => {  
    const products = await Product.find();  
    res.json(products);  
}));  

// Get product by ID  
router.get("/:id", asyncHandler(async (req, res) => {  
    const product = await Product.findById(req.params.id);  
    if (!product) return res.status(404).json({ message: "Product not found" });  
    res.json(product);  
}));  

// Create a new product  
router.post("/", asyncHandler(async (req, res) => {  
    const { name, price, brand } = req.body;

    // Validate input  
    if (!name || !price || !brand) {  
        return res.status(400).json({ message: "All fields are required" });  
    }  

    const newProduct = new Product({ name, price, brand });  
    await newProduct.save();  
    res.status(201).json({ message: "Product created successfully", newProduct });  
}));  

// Update a product by ID  
router.put("/:id", asyncHandler(async (req, res) => {  
    const { id } = req.params;  
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });  

    if (!updatedProduct) {  
        return res.status(404).json({ message: "Product not found" });  
    }  

    res.json({ message: "Product updated successfully", updatedProduct });  
}));  

// Delete a product by ID  
router.delete("/:id", asyncHandler(async (req, res) => {  
    const { id } = req.params;  
    const deletedProduct = await Product.findByIdAndDelete(id);  

    if (!deletedProduct) {  
        return res.status(404).json({ message: "Product not found" });  
    }  

    res.json({ message: "Product deleted successfully" });  
}));  

module.exports = router;  