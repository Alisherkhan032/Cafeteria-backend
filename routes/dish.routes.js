const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish.controller');
const {checkRole} = require('../middleware/permissions');
const {ROLES} = require('../utils/constants')

router.get('/', dishController.getDishes);
router.get('/:id', dishController.getDishById);
router.get('/counter/:counterId', dishController.getDishesByCounterId);

router.use(checkRole(ROLES.MERCHANT));
router.post('/', dishController.addNewDish);
router.patch('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router;