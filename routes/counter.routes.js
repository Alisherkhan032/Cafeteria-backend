const express = require('express');
const router = express.Router();
const counterController = require('../controllers/counter.controller'); 
const {checkRole} = require('../middleware/permissions');
const {ROLES} = require('../utils/constants')

router.get('/', counterController.getAllCounters);
router.get('/:id', counterController.getCounterById);

router.use(checkRole(ROLES.ADMIN));

router.post('/', counterController.createCounter);
router.put('/:id', counterController.updateCounter);
router.delete('/:id', counterController.deleteCounter);

module.exports = router;