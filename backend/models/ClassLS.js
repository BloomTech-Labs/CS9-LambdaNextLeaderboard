const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassLS = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    _admin:
        {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
    _coadmin: [{
            type: Schema.Types.ObjectId,
            ref: 'CoAdmin'
        }],
});

module.exports = Class = mongoose.model("classls", ClassLS);
