const express = require("express");
const router = express.Router();
const {
  addCategory,
  findCategories,
  updateCategory,
  deleteCategoryById,
} = require("../controller/category.controller");
const verifyToken = require("../middleware/authjwt")

router.post("/", verifyToken, addCategory);
router.get("/", findCategories);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategoryById);

module.exports = router;
