const User = require('../../models/User');

var userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser
}

function findAll() {
    return User.findAll();
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(User) {
    var newUser = new User(User);
    return newUser.save();
}

function updateUser(User, id) {
    var updateUser = {
        name: User.name,
        category: User.category,
        description: User.description,
        price: User.price,
        user_id: User.user_id
    };
    return User.update(updateUser, { where: { id: id } });
}
module.exports = userDao;