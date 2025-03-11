const express = require("express");  
const asyncHandler = require("express-async-handler");  
const Cart = require("../models/cart");  
const Product = require("../models/Product");  
const { authMiddleware } = require("../middleware/authMiddleware");  

const router = express.Router();  

// Add a Product to the Cart  
router.post("/", authMiddleware, asyncHandler(async (req, res) => {  
    const { productId, quantity } = req.body;  

    if (!productId || typeof quantity !== "number" || quantity < 1) {  
        return res.status(400).json({ message: "Invalid input" });  
    }  

    const productExists = await Product.findById(productId);  
    if (!productExists) return res.status(404).json({ message: "Product not found" });  

    let cart = await Cart.findOne({ userId: req.user.userId });  
    if (!cart) {  
        cart = new Cart({ userId: req.user.userId, products: [{ productId, quantity }] });  
    } else {  
        const existingProduct = cart.products.find((p) => p.productId.toString() === productId);  
        if (existingProduct) {  
            existingProduct.quantity += quantity;  
        } else {  
            cart.products.push({ productId, quantity });  
        }  
    }  

    await cart.save();  
    res.status(201).json({ message: "Product added to cart", cart });  
}));  

// Update product quantity in the cart  
router.put("/:id", authMiddleware, asyncHandler(async (req, res) => {  
    const { id } = req.params;  
    const { quantity } = req.body;  

    if (typeof quantity !== "number" || quantity < 1) {  
        return res.status(400).json({ message: "Invalid quantity" });  
    }  

    const cart = await Cart.findOne({ userId: req.user.userId });  
    if (!cart) {  
        return res.status(404).json({ message: "Cart not found" });  
    }  

    const productInCart = cart.products.find(p => p.productId.toString() === id);  
    if (!productInCart) {  
        return res.status(404).json({ message: "Product not found in cart" });  
    }  

    productInCart.quantity = quantity; // Update quantity  
    await cart.save();  
    res.json({ message: "Cart updated successfully", cart });  
}));  

// Remove a product from the cart  
router.delete("/:id", authMiddleware, asyncHandler(async (req, res) => {  
    const { id } = req.params;  
    const cart = await Cart.findOne({ userId: req.user.userId });  

    if (!cart) {  
        return res.status(404).json({ message: "Cart not found" });  
    }  

    cart.products = cart.products.filter(p => p.productId.toString() !== id);  
    await cart.save();  
    res.json({ message: "Product removed from cart", cart });  
}));  

// Get the current user's cart  
router.get("/", authMiddleware, asyncHandler(async (req, res) => {  
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');  
    if (!cart) {  
        return res.status(404).json({ message: "Cart not found" });  
    }  

    res.json(cart);  
}));  

module.exports = router;  