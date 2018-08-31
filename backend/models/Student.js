const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  _class: {
    type: Schema.Types.ObjectId,
    ref: "ClassLS",
    required: true
  },
  _admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  classname: {
    type: String,
    required: true,
    unique: false
  },
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
    required: true
    // unique: true
  },
  huntr: {
    type: String,
    required: true
    // unique: true
  },
  hired: {
    type: Boolean,
    default: false,
    required: true,
    unique: false
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = mongoose.model("student", Student);
