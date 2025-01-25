const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const User = require('../models/user.model');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/', cartController.addDishToCart);
router.patch('/:dishId', cartController.updateDishInCart);
router.delete('/:dishId', cartController.deleteDishFromCart);
router.delete('/', cartController.clearCart);

async function auth(req, res, next){
    const id = '679505337a60fca83347067f'
    req.user = await User.findById(id);
    next();
}

module.exports = router;