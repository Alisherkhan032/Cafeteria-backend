const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const User = require('../models/user.model');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/', cartController.addDishToCart);
router.patch('/:itemId', cartController.updateItemQuantityInCart);
router.delete('/:itemId', cartController.deleteItemFromCart);
router.delete('/', cartController.clearCart);

async function auth(req, res, next){
    const id = '6793ee024389c9e84d3b0c39'
    req.user = await User.findById(id);
    next();
}

module.exports = router;