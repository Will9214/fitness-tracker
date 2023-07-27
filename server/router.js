const passport = require("passport");
const passportService = require("./services/passport");
const Authentication = require("./controllers/authentication");
const Activity = require("./controllers/activity");
const Workout = require("./controllers/workout");
const Objective = require("./controllers/objective");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // auth
  app.post("/auth/signup", Authentication.signUp)
  app.post("/auth/signin", requireSignin, Authentication.signIn)
  app.get("/auth/current_user", requireAuth, Authentication.currentUser)

  // activities
  app.post("/api/addActivity", requireAuth, Activity.addActivity)
  app.get("/api/getUserActivities", requireAuth, Activity.getUserActivities)
  app.post("/api/updateActivity", requireAuth, Activity.updateActivity)
  app.delete("/api/removeActivity", requireAuth, Activity.removeActivity)

  // workouts
  app.post("/api/addWorkout", requireAuth, Workout.addWorkout)
  app.get("/api/getUserWorkouts", requireAuth, Workout.getUserWorkouts)
  app.post("/api/updateWorkout", requireAuth, Workout.updateWorkout)
  app.delete("/api/removeWorkout", requireAuth, Workout.removeWorkout)

  // objectives
  app.post("/api/addObjective", requireAuth, Objective.addObjective)
  app.get("/api/getUserObjectives", requireAuth, Objective.getUserObjectives)
  app.post("/api/updateObjective", requireAuth, Objective.updateObjective)
  app.delete("/api/removeObjective", requireAuth, Objective.removeObjective)
  
}