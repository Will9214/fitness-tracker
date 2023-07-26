const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: String,
  type: String,
  description: String,
  time: String,
  distance: Number,
  weight: Number,
  sets: Number,
  reps: Number,
  iat: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("activity", ActivitySchema);