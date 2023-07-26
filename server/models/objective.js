const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectiveSchema = new Schema({
  name: String,
  description: String,
  iat: String,
  exp: String,
});

module.exports = mongoose.model("objective", ObjectiveSchema);