const models = require("../models");
const { product } = models;
const cloudinary = require("../utils/cloudinaryConfig");
const authJwt = require("../middleware/authjwt");

exports.addProduct = async (req, res) => {
  authJwt.verifyToken(req, res, async () => {
    try {
      let productInfo = req.body;
      const imageFile = req.file.path;

      if (!imageFile) {
        return res.status(400).send("No image file found");
      }

      const uploadedImage = await cloudinary.uploader.upload(imageFile);
      const imageUrl = uploadedImage.secure_url;

      productInfo.image = imageUrl;

      const createdProduct = await product.create(productInfo);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Error adding product.");
    }
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
  authJwt.verifyToken(req, res, async () => {
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
  });
};

exports.updateProduct = (req, res) => {
  authJwt.verifyToken(req, res, async () => {
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
