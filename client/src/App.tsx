import "./style/App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Landing from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Explore from "./Pages/Explore/Explore";
import { useEffect } from "react";
import NotFound from "./Pages/NotFound/NotFound";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./Pages/Favorites/Favorites";
import CreateDog from "./Pages/CreateDog/CreateDog";
import Detail from "./Pages/Detail/Detail";
import { Toaster } from "react-hot-toast";
import { GetUserInfo } from "./services/userServices";
import { GetTempsAndBreedGroups } from "./services/appServices";
import { useAppContext, useUserContext } from "./hooks/contextHooks";
import Profile from "./Pages/Profile/Profile";
import useDogs from "./hooks/useDogs";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useUserContext();
  const { setAllBreedGroups, setAllTemperaments } = useAppContext();
  useDogs();

  useEffect(() => {
    GetUserInfo({ setIsAuthenticated, setUser, navigate });
    GetTempsAndBreedGroups({ setAllBreedGroups, setAllTemperaments });
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
        <Route path='/favorite/:id' element={<Detail />} />
        <Route path="/my-dog/:id" element={<Detail />} />
        <Route path='my-dog/pending/:id' element={<Detail />} />
        <Route path="/pending-dog/:id" element={<Detail />}/>

        <Route path="/profile/*" element={<Profile />}/>


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Landing />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
