const express = require('express');
const router = express.Router();
const productRoutes = require('./product.routes');
const authRoutes = require("./auth.routes")

router.use('/products', productRoutes);
router.use('/auth', authRoutes);

module.exports = router;