const User = require("../models/user");
const Activity = require("../models/activity");

exports.addActivity = async function(req, res, next) {
  const { userId } = req.body;
  const { name, type, description, time, distance, sets, reps } = req.body.data;

  User.findById(userId)
    .then((user) => {
      const activity = new Activity({
        name: name,
        type: type,
        description: description,
        time: time,
        distance: distance,
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
  
};
