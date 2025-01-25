const User = require("../models/user.model");
const Dish = require("../models/Dish.model");

const getCart = async (req, res) => {
  try {
    await req.user.populate('cart.dish')
    const cart = req.user.cart;
    res.json({ cart: cart, user : req.user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addDishToCart = async (req, res) => {
  try {
    const { dish } = req.body;

    // Validate dish exists and is in stock
    const existingDish = await Dish.findById(dish._id);
    if (!existingDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    if (!existingDish.inStock) {
      return res.status(400).json({ msg: "Dish is currently out of stock" });
    }

    // Find existing cart item using dish ObjectId
    const cartItem = req.user.cart.find((item) => 
      item.dish.toString() === existingDish._id.toString()
    );

    if (cartItem) {
      // Limit quantity to prevent overloading
      if (cartItem.quantity >= 10) {
        return res.status(400).json({ msg: "Maximum quantity reached" });
      }
      cartItem.quantity += 1;
    } else {
      // Add new cart item with dish ObjectId
      req.user.cart.push({ 
        dish: existingDish._id, 
        quantity: 1 
      });
    }

    await req.user.save();

    // let us populate the dish
    await req.user.populate('cart.dish')


    res.json({
      message: "Dish added successfully",
      cart: req.user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


const updateDishInCart = async (req, res) => {
  try {
    const dishItem = req.user.cart.find(
      (item) => item.dish.id.toString() === req.params.dishId
    );
    const changedQuantity = req.body.changedQuantity || 0;

    if (!dishItem) {
      return res
        .status(404)
        .json({ msg: `Dish with id ${req.params.dishId} not found in cart` });
    }

    dishItem.quantity += changedQuantity;

    const cart = req.user.cart;
    await req.user.save();

    res.json({ "Dish updated successfully": cart });

  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteDishFromCart = async (req, res) => {
    try {
        const updatedCart = req.user.cart.filter(
            (item) => item.dish.toString() !== req.params.dishId
        );
        
        req.user.cart = updatedCart;
        await req.user.save();

        res.status(200).json({ message: 'Dish deleted successfully', cart: req.user.cart });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        req.user.cart = [];
        await req.user.save();
        res.status(200).json({ message: 'Cart cleared successfully', cart: req.user.cart });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
  getCart,
  addDishToCart,
  updateDishInCart,
  deleteDishFromCart,
  clearCart,
  clearCart
};
