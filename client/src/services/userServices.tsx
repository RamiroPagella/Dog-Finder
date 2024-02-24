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
    console.log(token)
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
};
