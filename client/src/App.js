import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Home from "./components/Home";
import ProtectedRoute from './routing/ProtectedRoute';
import AddActivity from './components/AddActivity';
import Activity from './components/Activity';
import Footer from './components/Footer';
import SearchExercise from './components/SearchExersice';
import AddWorkout from './components/AddWorkout';
import AddActivitiesToWorkout from './components/AddActivitiesToWorkout';
import Workout from './components/Workout';
import ShowActivities from './components/ShowActivities';
import ShowWorkouts from './components/ShowWorkouts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/activities" element={<ShowActivities />} />
            <Route path="/add_activity" element={<AddActivity />} />
            <Route path="/activities/:activityId" element={<Activity />} />
            <Route path="/search_exercise" element={<SearchExercise />} />
            <Route path="/add_workout" element={<AddWorkout />} />
            <Route path="/add_activities_to_workout/:workoutId" element={<AddActivitiesToWorkout />} />
            <Route path="/workouts" element={<ShowWorkouts />} />
            <Route path="/workouts/:workoutId" element={<Workout />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
