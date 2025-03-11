# 🛍️ ShoppyGlobe API  

## GitHub Link: https://github.com/EddieExe/ShoppyGlobe_Backend

## 📌 Overview  
ShoppyGlobe is the backend for an e-commerce application built using **Node.js, Express, and MongoDB**. It provides RESTful APIs for managing products, cart functionality, and user authentication.  

## 🚀 Features  
- ✅ User Authentication (Register & Login)  
- ✅ Product Management (CRUD Operations)  
- ✅ Cart Management (Add, Update, Remove Products)  
- ✅ Secure Routes using JWT Authentication  
- ✅ MongoDB Integration for Data Storage  

## ⚡ Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB & Mongoose**  
- **JSON Web Token (JWT)**  
- **Thunder Client (for API testing)**  

## 🛠️ Setup & Installation  

1. **Clone this repository:**  
   ```bash
   git clone <your-github-repo-link>
   cd shoppyglobe-api
   ```

2. **Install dependencies:**  
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add:**  
   ```ini
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the server:**  
   ```bash
   npm start
   ```

---

## 📢 API Endpoints  

### 🔹 **User Routes**  
| Method | Endpoint  | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST   | `/register` | Register a new user | ❌ No |
| POST   | `/login` | Login & get JWT token | ❌ No |

### 🔹 **Product Routes**  
| Method | Endpoint  | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET    | `/products` | Get all products | ❌ No |
| GET    | `/products/:id` | Get product by ID | ❌ No |
| POST   | `/products` | Add a new product | ✅ Yes |
| PUT    | `/products/:id` | Update a product | ✅ Yes |
| DELETE | `/products/:id` | Delete a product | ✅ Yes |

### 🔹 **Cart Routes**  
| Method | Endpoint  | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST   | `/cart` | Add product to cart | ✅ Yes |
| PUT    | `/cart/:id` | Update product quantity | ✅ Yes |
| DELETE | `/cart/:id` | Remove product from cart | ✅ Yes |
| GET    | `/cart` | Get user’s cart | ✅ Yes |

---

## 🧪 Testing  
- All API routes were tested using **Thunder Client**.  
- Screenshots of API tests are available in the `/API Testing Results` folder.  

---
