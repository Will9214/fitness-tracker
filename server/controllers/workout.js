const User = require("../models/user");
const Activity = require("../models/activity");
const Workout = require("../models/workout");

const addWorkout = async function(req, res, next) {
  const { userId } = req.body;
  const { name } = req.body.data;

  User.findById(userId)
    .then((user) => {
      const workout = new Workout({
        name: name,
        activities: [],
        createdOn: new Date(),
        user: user._id,
      });
      workout.save();
      user.workouts.push(workout);
      user.save();
      res.status(200).send({ workout });
    })
    .catch((err) => {
      res.json(err);
    })
};

const getUserWorkouts = async function (req, res, next) {
  const workouts = await Workout.find({ user: req.user._id }).populate({
    path: "activities",
    model: "activity"
  });

  res.send({ workouts });
};

const updateWorkout = async function (req, res, next) {

};

const removeWorkout = async function (req, res, next) {
  const { workoutId } = req.body;

  const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
  const user = await User.findById(deletedWorkout.user);
  const deletedWorkoutIndex = user.workouts.indexOf(workoutId);
  user.workouts.splice(deletedWorkoutIndex, 1);
  await user.save();

  res.status(200).send(deletedWorkout);
};

const addActivityToWorkout = async function (req, res, next) {
  const { workoutId, activityId } = req.body;

  const workout = await Workout.findById(workoutId);
  const activity = await Activity.findById(activityId);

  workout.activities.push(activity);
  workout.save();
  res.status(200).send({ workout, activity });
};

const deleteActivityFromWorkout = async function (req, res, next) {
  const { workoutId, activityId } = req.body;

  const workout = await Workout.findById(workoutId);
  const activity = await Activity.findById(activityId);
  const deletedActivityIndex = workout.activities.indexOf(activityId);
  workout.activities.splice(deletedActivityIndex, 1);
  await workout.save();

  res.status(200).send({ workout, activity });
}

module.exports = {
  addWorkout,
  getUserWorkouts,
  updateWorkout,
  removeWorkout,
  addActivityToWorkout,
  deleteActivityFromWorkout,
}