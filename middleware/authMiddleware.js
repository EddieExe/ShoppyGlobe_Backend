const jwt = require("jsonwebtoken");  

const tokenBlacklist = new Set(); // Store blacklisted tokens  

const authMiddleware = (req, res, next) => {  
  const token = req.header("Authorization")?.split(" ")[1];  

  if (!token) return res.status(401).json({ message: "No Token Provided" });  

  if (tokenBlacklist.has(token)) {  
    return res.status(403).json({ message: "Token is Blacklisted. Please login again." });  
  }  

  try {  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded; // Attach decoded user information to request  
    next(); // Move to next middleware or route handler  
  } catch (error) {  
    return res.status(403).json({ message: "Invalid Token" });  
  }  
};  

module.exports = { authMiddleware, tokenBlacklist };  