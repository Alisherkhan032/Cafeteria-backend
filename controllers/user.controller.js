const Counter = require("../models/counter.model");
const User = require("../models/user.model");

const getAllUser = async (req, res) => {
  try {
    const { role } = req.query; // Extract role from query parameters
    const filter = role ? { role } : {}; // Apply filter only if role is provided

    const users = await User.find(filter).select("-cart -password");

    res.json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

("@access Admin");
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-cart, -password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // re-run model validators
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "User updated",
      data: user,
    });
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteDishFromCart = async (req, res) => {
  try {
    const updatedCart = req.user.cart.filter(
      (item) => item.dish.toString() !== req.params.dishId
    );

    req.user.cart = updatedCart;
    await req.user.save();

    res
      .status(200)
      .json({ message: "Dish deleted successfully", cart: req.user.cart });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getCountersByMerchantId = async (req, res) => {
  try {
    const counters = await Counter.find({
      merchant: req.params.merchantId,
    }).populate({
      path: "merchant",
      select: "-password",
    });
    if (counters.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No counter found",
      });
    }
    res.json({
      status: "success",
      counters: counters,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getCountersByMerchantId,
};
