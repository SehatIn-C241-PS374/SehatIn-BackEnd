const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.get('/', storeController.getAllStores);
router.get('/location', storeController.getStoresByLocation);
router.get('/:name', storeController.getStoreByName);
router.post('/', storeController.addStore);
router.put('/:index', storeController.updateStore);
router.delete('/:index', storeController.deleteStore);

module.exports = router;
