const express = require('express');
const router = express.Router();
const fruitsVegetablesController = require('../controllers/fruitsVegetablesController');

router.get('/', fruitsVegetablesController.getAllFruitVegetables);
router.get('/:name',fruitsVegetablesController.getFruitOrVegetableByName);

module.exports = router;