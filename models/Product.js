const mongoose = require("mongoose");  

const productSchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    price: { type: Number, required: true },  
    brand: { type: String, required: true } // Ensure this field is present  
});  

module.exports = mongoose.model("Product", productSchema);  