  const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    
    if (!userInfo) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    const { id } = userInfo;
    req.user = await User.findById(id).populate("cart.dish");

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
}


module.exports = authenticateToken;