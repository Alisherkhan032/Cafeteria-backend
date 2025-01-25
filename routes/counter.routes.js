const express = require('express');
const router = express.Router();
const counterController = require('../controllers/counter.controller'); 

router.get('/', counterController.getAllCounters);
router.post('/', counterController.createCounter);
router.get('/:id', counterController.getCounterById);
router.put('/:id', counterController.updateCounter);
router.delete('/:id', counterController.deleteCounter);

module.exports = router;