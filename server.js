const express = require("express");  
const mongoose = require("mongoose");  
const cors = require("cors");  
const dotenv = require("dotenv");  
const Product = require("./models/Product");  
const Cart = require("./models/cart");  
const productRoutes = require("./routes/productRoutes");  
const cartRoutes = require("./routes/cartRoutes");  
const authRoutes = require("./routes/authRoutes");

dotenv.config();  

const app = express();

const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(express.json());  

// Use routes after initializing app  
app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);  
app.use("/cart", cartRoutes);  

// Connect to MongoDB  
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoppyglobe", {  
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
})  
.then(() => console.log("✅ Connected to MongoDB"))  
.catch((error) => console.error("❌ MongoDB connection error:", error));  

/*   
=========================================  
        🚀 API ROUTES (CRUD)  
=========================================  
*/

// 1️⃣ GET /products → Fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2️⃣ GET /products/:id → Fetch a single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3️⃣ POST /products → Add a new product
app.post("/products", async (req, res) => {  
  try {  
      console.log("Received request body:", req.body);  // Log the incoming request  

      const { name, price, brand } = req.body;  
      if (!name || !price || !brand) {  
          return res.status(400).json({ message: "All fields are required" });  
      }  
      const newProduct = new Product({ name, price, brand });  
      await newProduct.save();  
      res.status(201).json({ message: "Product created successfully", product: newProduct });  
  } catch (error) {  
      console.error("Error creating product:", error);  // Log the error  
      res.status(500).json({ error: error.message });  
  }  
});  

// 4️⃣ PUT /products/:id → Update a product by ID
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // DEBUG: Check if product exists before updating
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in database" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5️⃣ DELETE /products/:id → Delete a product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {  
  console.log(`🚀 Server running on http://localhost:${PORT}`);  
}); 