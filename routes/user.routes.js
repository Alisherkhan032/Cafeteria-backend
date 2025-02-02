const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUser);
// router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/counters/merchant/:merchantId', userController.getCountersByMerchantId);

module.exports = router;

