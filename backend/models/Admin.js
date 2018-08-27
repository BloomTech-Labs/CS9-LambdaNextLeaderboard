const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model("admin", Admin);
