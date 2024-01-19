import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";


function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
