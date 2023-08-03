const User = require("../models/user");
const Activity = require("../models/activity");

const addActivity = async function(req, res, next) {
  const { userId } = req.body;
  const { name, type, description, time, distance, weight, sets, reps } = req.body.data;

  User.findById(userId)
    .then((user) => {
      const activity = new Activity({
        name: name,
        type: type,
        description: description,
        time: time || "Enter time",
        distance: distance || 0,
        weight: weight || 0,
        sets: sets || 0,
        reps: reps || 0,
        iat: new Date(),
        user: user._id,
      });
      activity.save();
      user.activities.push(activity);
      user.save();
      res.status(200).send({ activity });
    })
    .catch((err) => {
      res.json(err);
    })
};

const getUserActivities = async function(req, res, next) {
  const activities = await Activity.find({ user: req.user._id })
  
  res.send({ activities })
};

const updateActivity = async function(req, res, next) {
  const { activityId, editedActivityDistance, editedActivityTime, editedActivityWeight, editedActivitySets, editedActivityReps } = req.body;
  
  const activity = await Activity.findByIdAndUpdate(activityId, {
    distance: editedActivityDistance,
    time: editedActivityTime,
    weight: editedActivityWeight,
    sets: editedActivitySets,
    reps: editedActivityReps
  });
  activity.save();

console.log(activity);

  res.status(200).send(activity);
};

const removeActivity = async function(req, res, next) {
  const { activityId } = req.body;

  const deletedActivity = await Activity.findByIdAndDelete(activityId);
  const user = await User.findById(deletedActivity.user);
  const deletedActivityIndex = user.activities.indexOf(activityId);
  user.activities.splice(deletedActivityIndex, 1);
  await user.save();

  res.status(200).send(deletedActivity);
};

module.exports = {
  addActivity,
  getUserActivities,
  updateActivity,
  removeActivity,
};