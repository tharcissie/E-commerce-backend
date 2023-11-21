const express = require("express");
const router = express.Router();
const {
  addProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteById,
} = require("../controller/product.controller");
const upload = require("../utils/multerConfig");

router.post("/", upload.single("image"), addProduct);
router.get("/", findProducts);
router.get("/:id", findProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteById);

module.exports = router;
