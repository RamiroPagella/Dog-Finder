import { useState } from "react";
import Axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./contextHooks";

interface LoginForm {
  email: "";
  password: "";
}

const useLoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserContext();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState({
    email: false,
    password: false,
  });
  const btnDisabled: boolean = !(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(loginForm.email) &&
    loginForm.password.length >= 6
  );
  //a diferencia del componente Register, los errores se muestran solo en caso de contraseña incorrecta o usuario inexistente, no por validaciones

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleClick = () => {
    setShowError({
      email: false,
      password: false,
    });
    const { email, password } = loginForm;
    if (!email || !password) return;

    Axios
      .post("/login", { email, password })
      .then(({ data }) => {
        if (!data.authenticated) {
          throw new Error(data.message);
        }
        console.log(data);
        localStorage.setItem('jwtToken', data.token);
        setIsAuthenticated(true)
        setUser(data.user)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404)
            setShowError({ email: true, password: false });
          if (err.response.status === 401)
            setShowError({ email: false, password: true });
        }
      });
  };

  return {handleClick, handleChange, showError, btnDisabled, loginForm}

}

export default useLoginForm