const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompletedWorkoutSchema = new Schema({
  name: String,
  iat: String,
  activities: Array,
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("completedWorkout", CompletedWorkoutSchema);