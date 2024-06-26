import Axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "./contextHooks";

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
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserContext();

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
    if (name === 'username' && value.length >= 25) return;
    if (name === 'email' && value.length >= 100) return;
    if (name === 'password' && value.length >= 50) return;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { email, username, password } = registerForm;
    if (!email || !username || !password || btnDisabled) return;

    Axios
      .post("/register", { email, username, password })
      .then(({ data }) => {
        if (!data.authenticated) {
          throw new Error(data.message);
        }
        console.log('el registro',data);
        setUser(data.User)
        setIsAuthenticated(true)
        localStorage.setItem('jwtToken', data.token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return { handleSubmit, handleChange, registerForm, validations, btnDisabled}

}

export default useRegisterForm