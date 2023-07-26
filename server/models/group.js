const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
  workouts: [{ type: Schema.Types.ObjectId, ref: "workout" }],
  objectives: [{ type: Schema.Types.ObjectId, ref: "objective" }],
  scores: String,
  iat: String,
  exp: String,
});

module.exports = mongoose.model("group", GroupSchema);