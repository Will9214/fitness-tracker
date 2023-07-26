const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  iat: String,
  activities: [{ type: Schema.Types.ObjectId, ref: "activity" }],
});

module.export = mongoose.model("workout", WorkoutSchema);