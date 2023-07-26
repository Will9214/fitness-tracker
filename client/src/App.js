import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Home from "./components/Home";
import ProtectedRoute from './routing/ProtectedRoute';
import AddActivity from './components/AddActivity';

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
            <Route path="/add_activity" element={<AddActivity />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
