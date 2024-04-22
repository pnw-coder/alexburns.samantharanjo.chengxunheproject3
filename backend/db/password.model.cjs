const model = require('mongoose').model;

const PasswordSchema = require('./password.schema.cjs');

const PasswordModel = model('Password', PasswordSchema);

function insertPassword(password) {
    return PasswordModel.create(password);
}

function getAllPasswords() {
    return PasswordModel.find().exec();
}

function getPasswordById(id) {
    return PasswordModel.findById(id).exec();
}

function deletePassword(id) {
    return PasswordModel.deleteOne({_id: id})
}

function updatePassword(id, password) {
    return PasswordModel.findOneAndUpdate({_id: id}, password)
}

module.exports = {
    getPasswordById,
    deletePassword,
    updatePassword,
    insertPassword,
    getAllPasswords
}