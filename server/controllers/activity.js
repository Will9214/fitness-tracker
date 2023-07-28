const User = require("../models/user");
const Activity = require("../models/activity");

exports.addActivity = async function(req, res, next) {
  const { userId } = req.body;
  const { name, type, description, time, distance, weight, sets, reps } = req.body.data;

  User.findById(userId)
    .then((user) => {
      const activity = new Activity({
        name: name,
        type: type,
        description: description,
        time: time,
        distance: distance,
        weight: weight,
        sets: sets,
        reps: reps,
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

exports.getUserActivities = async function(req, res, next) {
  const activities = await Activity.find({ user: req.user._id })
  console.log(req.user);
  
  res.send({ activities })
};

exports.updateActivity = async function(req, res, next) {

};

exports.removeActivity = async function(req, res, next) {
  const { activityId } = req.body;

  const deletedActivity = await Activity.findByIdAndDelete(activityId);
  const user = await User.findById(deletedActivity.user);
  const deletedActivityIndex = user.activities.indexOf(activityId);
  user.activities.splice(deletedActivityIndex, 1);
  await user.save();

  res.status(200).send(deletedActivity);
};