const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  students: [
    {
      type: ObjectId,
      ref: "students"
    }
  ]
});

module.exports = Class = mongoose.model("classes", ClassSchema);
