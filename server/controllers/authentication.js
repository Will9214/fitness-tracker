const jwt = require("jwt-simple");
const keys = require("../config/dev");
const User = require("../models/user");

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

exports.signUp = function (req, res, next) {
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

exports.signIn = async function (req, res, next) {
  // User has already had their email and password auth'd
  // Just need to give them a token
  res.send({
    username: req.body.username,
    userToken: tokenForUser(req.user),
  })
};

exports.currentUser = function(req, res) {
  const user = {
    username: req.user.username,
    userToken: tokenForUser(req.user),
    // activities
    // workouts
    // objectives
    // groups
  };

  res.send(user);
};
