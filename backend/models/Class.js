const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
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
        required: true
      },
      github: {
        type: String,
        required: true
      },
      huntr: {
        type: String,
        required: true
      },
      hired: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = Class = mongoose.model("classes", ClassSchema);
