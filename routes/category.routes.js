const express = require("express");
const router = express.Router();

const {
    addCategory,
    findCategories,
    findCategoryById,
    updateCategory,
    deleteCategoryById,
  } = require("../controller/category.controller");
  const upload = require("../utils/multerConfig");
  
  router.post("/",addCategory);
  router.get("/", findCategories);
  router.get("/:id", findCategoryById);
  router.put("/:id", updateCategory);
  router.delete("/:id", deleteCategoryById);
  
  module.exports = router;