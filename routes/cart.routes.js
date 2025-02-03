const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const {checkRole} = require('../middleware/permissions');
const {ROLES} = require('../utils/constants')

router.get('/', cartController.getCart);

router.use(checkRole(ROLES.CUSTOMER));
router.post('/', cartController.addDishToCart);
router.patch('/:itemId', cartController.updateItemQuantityInCart);
router.delete('/:itemId', cartController.deleteItemFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;