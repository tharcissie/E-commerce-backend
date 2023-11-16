const productDao = require('../Product/product.dao');
var productController = {
    addProduct: addProduct,
    findProducts: findProducts,
    findProductById: findProductById,
    updateProduct: updateProduct,
    deleteById: deleteById
}

function addProduct(req, res) {
    let product = req.body;
    productDao.create(product).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findProductById(req, res) {
    productDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    productDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Product deleted successfully",
                Product: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateProduct(req, res) {
    productDao.updateProduct(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Product updated successfully",
                Product: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findProducts(req, res) {
    productDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = productController;