const passport = require("passport");
const passportService = require("./services/passport");
const Authentication = require("./controllers/authentication");
const Activity = require("./controllers/activity");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // auth
  app.post("/auth/signup", Authentication.signUp)
  app.post("/auth/signin", requireSignin, Authentication.signIn)
  app.get("/auth/current_user", requireAuth, Authentication.currentUser)

  // activity
  app.post("/api/addActivity", requireAuth, Activity.addActivity)
  app.get("/api/getUserActivities", requireAuth, Activity.getUserActivities)
  
}