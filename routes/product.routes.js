const express = require("express");
const router = express.Router();
const {
  addProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteById,
} = require("../controller/Product/product.controller");

router.post("/", addProduct);
router.get("/", findProducts);
router.get("/:id", findProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteById);

module.exports = router;
