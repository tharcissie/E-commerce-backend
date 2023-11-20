const models = require("../../models");
const { product } = models;

exports.addProduct = (req, res) => {
  let productInfo = req.body;
  product
    .create(productInfo)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.findProductById = (req, res) => {
    product
      .findByPk(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

exports.deleteById = (req, res) => {
  product
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).json({
        message: "Product deleted successfully",
        Product: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.updateProduct = (req, res) => {
  product
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).json({
        message: "Product updated successfully",
        Product: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.findProducts = (req, res) => {
  product
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
