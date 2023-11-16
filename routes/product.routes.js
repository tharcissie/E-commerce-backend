const express = require('express');
const router = express.Router();
const productController = require('../controller/Product/product.controller');

router.post('/', productController.addProduct);
router.get('/', productController.findProducts);
router.get('/:id', productController.findProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteById);

module.exports = router;