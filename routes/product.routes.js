const express = require("express");
const router = express.Router();
const {
  addProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteById,
} = require("../controller/Product/product.controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), addProduct);
router.get("/", findProducts);
router.get("/:id", findProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteById);

module.exports = router;
