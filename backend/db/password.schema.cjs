const Schema = require('mongoose').Schema;

module.exports = new Schema ({
    website: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: String,
    created: {
        type: Date,
        default: Date.now
    }
}, { collection : 'passwordSpr2024'})