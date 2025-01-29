// middleware/cartSanitizer.js
const sanitizeCart = async (user) => {
    if (!user.cart || user.cart.length === 0) return;
  
    // Populate cart with dish details
    await user.populate('cart.dish');
  
    const updatedCart = user.cart.map(item => {
      if (!item.dish) {
        // Case: Dish was deleted
        return null;
      }
  
      if (!item.dish.inStock) {
        // Case: Dish is out of stock
        return {
          ...item.toObject(),
          isAvailable: false,
          unavailableReason: 'OUT_OF_STOCK'
        };
      }
  
      return {
        ...item.toObject(),
        isAvailable: true
      };
    }).filter(Boolean); // Remove null items
  
    // Update user's cart
    user.cart = updatedCart;
    await user.save();
  
    return updatedCart;
  };
  
  module.exports = sanitizeCart;