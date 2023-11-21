const models = require("../models");
const { category } = models;
const authJwt = require("../middleware/authjwt");

exports.addCategory = async (req, res) => {
  authJwt.verifyToken(req, res, async () => {
    await category
      .create({ name: req.body.name })
      .then((data) => {
        res.status(200).json({
          message: "Category added successfully",
          Category: data,
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        res.status(400).send("Error adding category.");
      });
  });
};

exports.findCategoryById = (req, res) => {
  category
    .findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteCategoryById = (req, res) => {
  authJwt.verifyToken(req, res, async () => {
    category
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((data) => {
        res.status(200).json({
          message: "Category deleted successfully",
          Category: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.updateCategory = (req, res) => {
  authJwt.verifyToken(req, res, async () => {
    category
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then((data) => {
        res.status(200).json({
          message: "Category updated successfully",
          Category: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.findCategories = (req, res) => {
  category
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
