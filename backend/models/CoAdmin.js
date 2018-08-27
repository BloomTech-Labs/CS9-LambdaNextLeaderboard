const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoAdmin = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    },
    _admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
});

module.exports = mongoose.model("coAdmin", CoAdmin);
