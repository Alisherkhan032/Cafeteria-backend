// controllers/authController.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sessions = new Set();

const loginUser = async (req, res, next) => {
  // console.log('api hit');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    const userInfo = {
      id: user._id
    };
    const token = generateAccessToken(userInfo);
    sessions.add(token);

    const userObj = user.toObject();
    delete userObj.password;
    // delete userObj.cart; 

    return res
      .status(200)
      .json({ message: "Login successful", token: token, user: userObj });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userData = {
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: "customer",
    };
    const user = await User.create(userData);

    // Convert to plain object and remove password
    const userObj = user.toObject();
    delete userObj.password;
    // delete userObj.cart;

    res
      .status(201)
      .json({ message: "User registered successfully", data: userObj });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res, next) =>{ //also get its cart
  try {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({ message: "Unauthorized" });
    if(!sessions.has(token)) return res.status(401).json({ message: "Forbidden token not found" });

    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    if(!userInfo) return res.status(401).json({ message: "Unauthorized" });

    const {id} = userInfo;
    const user = await User.findById(id).select("-password"); 

    if(!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User found", user });
    
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({ message: "Unauthorized" });
    if(!sessions.has(token)) return res.status(401).json({ message: "Forbidden" });

    sessions.delete(token);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
}

module.exports = { loginUser, registerUser, logoutUser, getUser };
