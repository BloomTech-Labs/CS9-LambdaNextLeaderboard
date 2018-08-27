const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassLS = new Schema({
    name: {
        type: String,
        required: true,
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
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model("classls", ClassLS);
