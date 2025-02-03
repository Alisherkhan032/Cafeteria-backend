const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', authController.logoutUser);
router.get('/getuser', authController.getUser);

module.exports = router;