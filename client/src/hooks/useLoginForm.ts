import { useState } from "react";
import Axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./contextHooks";
import { User } from "../types";
import { AxiosError } from "axios";
import { errorToast } from "../toasts";

interface LoginForm {
  email: "";
  password: "";
}

interface LoginResponse {
  User: User;
  authenticated: boolean;
  token: string;
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
  const isBtnDisabled: boolean = !(
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError({
      email: false,
      password: false,
    });
    const { email, password } = loginForm;
    if (!email || !password) return;

    Axios.post<LoginResponse>("/login", { email, password })
      .then(({ data }) => {
        if (!data.authenticated) {
          throw new Error("");
        }
        localStorage.setItem("jwtToken", data.token);
        setUser(data.User);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof AxiosError) {
          if (err.response) {
            if (err.response.status === 404) {
              setShowError({ email: true, password: false });
              errorToast("No existe ningun usuario con ese correo");
            }
            if (err.response.status === 401) {
              setShowError({ email: false, password: true });
              errorToast("Contraseña incorrecta");
            }
          }
          if (err.message === "Network Error") {
            errorToast("Error al conectarse con el servidor");
          }
        }
      });
  };

  return { handleSubmit, handleChange, showError, isBtnDisabled, loginForm };
};

export default useLoginForm;
