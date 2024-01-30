import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import NotFound from "./pages/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "./redux/userSlice";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./pages/Favorites/Favorites";
import CreateDog from "./pages/CreateDog/CreateDog";
import Axios from "./axios";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      dispatch(setIsAuthenticated(true));
      Axios
        .get("/user", { headers: { Authorization: token } })
        .then((res) => {
          if (!res.data.username) throw new Error("Unauthorized");
          const { username, email, id } = res.data;
          dispatch(setUser({ username, email, id }));
          navigate("/");
        })
        .catch((err) => console.log(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {
        pathname !== '/login' && pathname !== '/register' ? <NavBar /> : null
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-dog" element={<CreateDog />} /> 

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Landing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
