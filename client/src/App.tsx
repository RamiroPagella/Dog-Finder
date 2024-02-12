import "./style/App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Explore from "./Pages/Explore/Explore";
import { useEffect } from "react";
import NotFound from "./Pages/NotFound/NotFound";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./Pages/Favorites/Favorites";
import CreateDog from "./Pages/CreateDog/CreateDog";
import Axios from "./axios";
import Detail from "./Pages/Detail/Detail";
import { useUserContext } from "./hooks/contextHooks";
import { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setIsAuthenticated, setUser } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      Axios.get("/user/info", { headers: { Authorization: token } })
        .then((res) => {
          if (!res.data.username) throw new Error("Unauthorized");
          const { username, email, id } = res.data;
          setIsAuthenticated(true);
          setUser({ username, email, id });
          navigate("/");
        })
        .catch((err) => {
          setIsAuthenticated(false);
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {pathname !== "/login" && pathname !== "/register" ? <NavBar /> : null}

      <Toaster />

      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-dog" element={<CreateDog />} />
        <Route path="/dog/:id" element={<Detail />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Landing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
