const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

module.exports = User = mongoose.model("admin", Admin);
