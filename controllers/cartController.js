const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/cart");

const router = express.Router();

router.post("/cart", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Validate userId format (optional but recommended)
        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId: new mongoose.Types.ObjectId(productId), quantity }]
            });
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId: new mongoose.Types.ObjectId(productId), quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart", cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
