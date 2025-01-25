const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish.controller');

router.get('/', dishController.getDishes);
router.post('/', dishController.addNewDish);
router.get('/:id', dishController.getDishById);
router.get('/counter/:counterId', dishController.getDishesByCounterId);
router.patch('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router;