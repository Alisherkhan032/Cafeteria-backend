const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish.controller');
const {checkRole, authCounter} = require('../middleware/permissions');
const {ROLES} = require('../utils/constants')
const {populateCounter} = require('../middleware/counter');


router.get('/', dishController.getDishes);
router.get('/:id', dishController.getDishById);
router.get('/counter/:counterId', dishController.getDishesByCounterId);

router.use(checkRole(ROLES.MERCHANT));
router.use(populateCounter);
router.use(authCounter);

router.post('/', dishController.addNewDish);
router.patch('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router;