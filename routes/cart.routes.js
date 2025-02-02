const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getCart);
router.post('/', cartController.addDishToCart);
router.patch('/:itemId', cartController.updateItemQuantityInCart);
router.delete('/:itemId', cartController.deleteItemFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;