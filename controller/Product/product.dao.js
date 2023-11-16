const Product = require('../../models/Product');

var productDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateProduct: updateProduct
}

function findAll() {
    return Product.findAll();
}

function findById(id) {
    return Product.findByPk(id);
}

function deleteById(id) {
    return Product.destroy({ where: { id: id } });
}

function create(product) {
    var newProduct = new Product(product);
    return newProduct.save();
}

function updateProduct(product, id) {
    var updateProduct = {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        user_id: product.user_id
    };
    return Product.update(updateProduct, { where: { id: id } });
}
module.exports = productDao;