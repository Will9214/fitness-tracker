const passport = require("passport");
const passportService = require("./services/passport");
const Authentication = require("./controllers/authentication");
const Activity = require("./controllers/activity");
const Workout = require("./controllers/workout");
const Objective = require("./controllers/objective");
const Health = require("./controllers/health");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // health
  app.get("/api/health", Health.getHealth)

  // auth
  app.post("/auth/signup", Authentication.signUp)
  app.post("/auth/signin", requireSignin, Authentication.signIn)
  app.get("/auth/getCurrentUser", requireAuth, Authentication.getCurrentUser)

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
  app.post("/api/addActivityToWorkout", requireAuth, Workout.addActivityToWorkout)
  app.post("/api/deleteActivityFromWorkout", requireAuth, Workout.deleteActivityFromWorkout)
  app.post("/api/addCompletedWorkout", requireAuth, Workout.addCompletedWorkout)
  app.get("/api/getUserCompletedWorkouts", requireAuth, Workout.getUserCompletedWorkouts)

  // objectives
  app.post("/api/addObjective", requireAuth, Objective.addObjective)
  app.get("/api/getUserObjectives", requireAuth, Objective.getUserObjectives)
  app.post("/api/updateObjective", requireAuth, Objective.updateObjective)
  app.delete("/api/removeObjective", requireAuth, Objective.removeObjective)
  
}