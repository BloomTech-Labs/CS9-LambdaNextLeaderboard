const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    _class: {type: Schema.Types.ObjectId, ref: 'ClassLS'},

    students: [
        {
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            github: {
                type: String,
                required: true,
                unique: true
            },
            huntr: {
                type: String,
                required: true,
                unique: true
            },
            hired: {
                type: Boolean,
                default: false,
                unique: true
            }
        }
    ]

})

module.exports = Class = mongoose.model("student", Student);
