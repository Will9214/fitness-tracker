const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const UserSchema = new Schema({
  username: { type: String, unique: true },
  activities: [{ type: Schema.Types.ObjectId, ref: "activity" }],
  workouts: [{ type: Schema.Types.ObjectId, ref: "workout" }],
  completedWorkouts: [{ type: Schema.Types.ObjectId, ref: "completedWorkout"}],
  objectives: [{ type: Schema.Types.ObjectId, ref: "objective" }],  
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

  return this.hash === hash;
};

module.exports = mongoose.model("user", UserSchema);