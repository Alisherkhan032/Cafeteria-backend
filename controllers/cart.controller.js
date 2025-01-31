const User = require("../models/user.model");
const Dish = require("../models/Dish.model");

const getCart = async (req, res) => {
  try {
    await req.user.populate('cart.dish');
    
    // Filter out cart items where dish is null
    const validCartItems = req.user.cart.filter(item => item.dish !== null);
    
    // If we found invalid items, update the user's cart
    if (validCartItems.length !== req.user.cart.length) {
      req.user.cart = validCartItems;
      await req.user.save();
    }
    
    res.json({ cart: validCartItems, user: req.user });
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


const updateItemQuantityInCart = async (req, res) => {
  try {
    // Find the item in the cart
    const itemInCart = req.user.cart.find(
      (item) => item._id.toString() === req.params.itemId
    );

    if (!itemInCart) {
      return res
        .status(404)
        .json({ msg: `Item with id ${req.params.itemId} not found in cart` });
    }

    const changedQuantity = Number(req.body.increment) || 0;

    // Ensure the increment is a valid number
    if (isNaN(changedQuantity)) {
      return res.status(400).json({ msg: "Invalid increment value" });
    }

    // Ensure the quantity doesn't go negative
    if (itemInCart.quantity + changedQuantity < 0) {
      return res.status(400).json({
        msg: "Quantity cannot be less than 0",
      });
    }

    // remove item if quantity is 0
    if (itemInCart.quantity + changedQuantity === 0) {
      req.user.cart = req.user.cart.filter(
        (item) => item._id.toString() !== req.params.itemId
      );
      await req.user.save();
      await req.user.populate('cart.dish')
      return res.json({ msg: "Dish removed from cart", cart: req.user.cart });
    }

    // Update the quantity
    itemInCart.quantity += changedQuantity;

    // Save the updated user data and populate cart
    await req.user.save();
    await req.user.populate('cart.dish')

    res.json({ msg: "Dish quantity updated successfully", cart: req.user.cart });
  } catch (error) {
    res.status(500).json({ msg: error.message || "An error occurred" });
  }
};


const deleteItemFromCart = async (req, res) => {
    try {
        const updatedCart = req.user.cart.filter(
            (item) => item._id.toString() !== req.params.itemId
        );
        
        req.user.cart = updatedCart;
        await req.user.save();
        await req.user.populate('cart.dish')

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
  updateItemQuantityInCart,
  deleteItemFromCart,
  clearCart,
  clearCart
};