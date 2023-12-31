const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  iat: String,
  activities: [{ type: Schema.Types.ObjectId, ref: "activity" }],
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("workout", WorkoutSchema);