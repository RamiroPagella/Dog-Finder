import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setIsAuthenticated } from "../redux/userSlice";
import { useState } from "react";

export interface RegisterForm {
  email: "";
  username: "";
  password: "";
}

export interface Validations {
  email: boolean;
  username: boolean;
  password: boolean;
}

const useRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
  });
  const validations: Validations = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      registerForm.email
    ),
    username: registerForm.username !== "",
    password: registerForm.password.length >= 6,
  };
  const btnDisabled: boolean = !(
    validations.email &&
    validations.username &&
    validations.password
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleClick = (): void => {
    const { email, username, password } = registerForm;
    if (!email || !username || !password || btnDisabled) return;

    axiosInstance
      .post("/register", { email, username, password })
      .then(({ data }) => {
        if (!data.authenticated) {
          throw new Error(data.message);
        }
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
        localStorage.setItem('jwtToken', data.token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return { handleClick, handleChange, registerForm, validations, btnDisabled}

}

export default useRegisterForm