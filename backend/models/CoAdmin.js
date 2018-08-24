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
    _admin: {type: Schema.Types.ObjectId, ref: 'Admin'},
});

module.exports = User = mongoose.model("coAdmin", CoAdmin);
