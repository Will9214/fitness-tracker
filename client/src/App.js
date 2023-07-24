import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
