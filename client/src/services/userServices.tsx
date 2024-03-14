import { NavigateFunction } from "react-router-dom";
import Axios from "../axios";
import { UserContextType } from "../context/userContext";

interface GetUserInfoParams {
  setIsAuthenticated: UserContextType['setIsAuthenticated'];
  setUser: UserContextType['setUser'];
  navigate: NavigateFunction
}

export const GetUserInfo = ({ setIsAuthenticated, setUser, navigate }: GetUserInfoParams) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    Axios.get("/user/info")
      .then((res) => {
        if (!res.data.username) throw new Error("Unauthorized");
        setIsAuthenticated(true);
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        setIsAuthenticated(false);
        console.log(err);
      });
  }
};
