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
const verifyToken = require("../middleware/authjwt");

router.post("/", verifyToken, upload.single("image"), addProduct);
router.get("/", findProducts);
router.get("/:id", findProductById);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteById);

module.exports = router;
