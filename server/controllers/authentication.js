const jwt = require("jwt-simple");
const keys = require("../config/dev");
const User = require("../models/user");
const Activity = require("../models/activity");

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

const signUp = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({ error: "You must provide username and password" })
  }

  User.findOne({ username: username }).then((result) => {
   
    if (result) {
      return res.status(422).send({ error: "Username is in use. Please create a unique Username." });
    }

    const user = new User({
      username: req.body.username,
      activities: [],
      workouts: [],
      objectives: [],
    });

    user.setPassword(password);

    user.save().then(() => {
      res.json({ userToken: tokenForUser(user), user })
    })

  });
};

const signIn = async function (req, res, next) {
  // User has already had their email and password auth'd
  // Just need to give them a token
  const username = { 
    username: req.body.username, 
  };
  const userToken = tokenForUser(req.user);

  res.send({ username, userToken })
};

const getCurrentUser = async function(req, res) {   
  const user = {
    userId: req.user._id,
    username: req.user.username,
  };

  const userToken = tokenForUser(req.user);

  res.send({ user, userToken });
};

module.exports = {
  signUp,
  signIn,
  getCurrentUser,
};