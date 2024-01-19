import { useState } from "react";
import style from "./register.module.scss";
import { RegisterForm, Validations } from "./register.types";
import { FormValidationError as ErrorIcon } from "../../icons/FormValidationError";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        navigate("/home");
        localStorage.setItem('jwtToken', data.token);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={style.Register}>
      <h1 className={style.Title}>Registrarse</h1>

      <div className={style.Form}>
        <label>
          Nombre de usuario
          <input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleChange}
          />
          {!validations.username ? (
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="username"
              data-tooltip-content={"Ingresa un nombre de usuario"}
            />
          ) : null}
          <Tooltip id="username" />
        </label>
        <label>
          Correo electronico
          <input
            type="text"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
          />
          {!validations.email ? (
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="email"
              data-tooltip-content={"Ingresa un correo electronico valido"}
            />
          ) : null}
          <Tooltip id="email" />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
          />
          {!validations.password ? (
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="password"
              data-tooltip-content="Ingresa una contraseña mayor a 6 caracteres"
            />
          ) : null}
          <Tooltip id="password" />
        </label>

        <button
          onClick={handleClick}
          disabled={btnDisabled}
          style={btnDisabled ? { pointerEvents: "none" } : {}}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Register;
